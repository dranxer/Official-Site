import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export default function BlogPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      // Replace 'YOUR_WORDPRESS_SITE_URL' with your actual WordPress site URL
      const res = await fetch(`YOUR_WORDPRESS_SITE_URL/wp-json/wp/v2/posts?slug=${slug}&_embed`);
      if (!res.ok) {
        throw new Error('Failed to fetch post');
      }
      const data = await res.json();
      
      if (data.length === 0) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      const postData = data[0];
      const formattedPost = {
        id: postData.id,
        title: postData.title.rendered,
        content: postData.content.rendered,
        date: postData.date,
        author: {
          name: postData._embedded?.author?.[0]?.name || 'Unknown Author'
        },
        imageUrl: postData._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
      };

      setPost(formattedPost);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load blog post. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ background: '#0a1033', minHeight: '100vh', color: '#fff', padding: '60px 1rem 30px 1rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ background: '#0a1033', minHeight: '100vh', color: '#fff', padding: '60px 1rem 30px 1rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ color: '#FF9933', fontSize: '2rem', marginBottom: 16 }}>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0a1033', minHeight: '100vh', color: '#fff' }}>
      <Head>
        <title>{post.title} | Think India Blog</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Head>

      <article style={{ maxWidth: 800, margin: '0 auto', padding: '60px 1rem 30px 1rem' }}>
        {post.imageUrl && (
          <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '2rem' }}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover', borderRadius: '12px' }}
              priority
            />
          </div>
        )}

        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#FF9933', fontSize: '2.5rem', fontWeight: 800, marginBottom: 16 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff', opacity: 0.8 }}>
            <span>By {post.author.name}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </header>

        <div 
          className="blog-content"
          style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '2rem',
            borderRadius: '12px',
            color: '#fff',
            lineHeight: 1.8,
            fontSize: '1.1rem'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
} 