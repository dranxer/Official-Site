import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Replace 'YOUR_WORDPRESS_SITE_URL' with your actual WordPress site URL
      const res = await fetch('YOUR_WORDPRESS_SITE_URL/wp-json/wp/v2/posts?_embed');
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      
      // Transform WordPress data to match our needs
      const formattedPosts = data.map(post => ({
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        slug: post.slug,
        date: post.date,
        author: {
          name: post._embedded?.author?.[0]?.name || 'Unknown Author'
        },
        imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
      }));

      setPosts(formattedPosts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load blog posts. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0a1033', minHeight: '100vh', color: '#fff' }}>
      <Head>
        <title>Blog | Think India</title>
        <meta name="description" content="Read the latest articles and updates from Think India" />
      </Head>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 1rem 30px 1rem', textAlign: 'center' }}>
        <h1 style={{ color: '#FF9933', fontSize: '2.7rem', fontWeight: 800, marginBottom: 8 }}>Blog</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <span style={{ width: 120, height: 5, borderRadius: 3, background: 'linear-gradient(90deg, #FF9933 0%, #fff 50%, #138808 100%)', display: 'block' }}></span>
        </div>
        <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 32 }}>
          Explore articles, stories, and updates from the Think India community. Stay informed and inspired by our latest blog posts.
        </p>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '2rem', minHeight: 200 }}>
          <h2 style={{ color: '#FF9933', fontSize: '1.5rem', marginBottom: 12 }}>Latest Posts</h2>
          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#fff', opacity: 0.8 }}>Loading posts...</p>
            </div>
          )}
          {error && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
              <p>{error}</p>
              <button 
                onClick={fetchPosts} 
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#FF9933',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          )}
          {!loading && !error && posts.length === 0 && (
            <p style={{ color: '#fff', opacity: 0.8 }}>No blog posts found.</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {posts.map(post => (
              <div key={post.id} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '1.5rem', textAlign: 'left' }}>
                {post.imageUrl && (
                  <div style={{ position: 'relative', width: '100%', height: '300px', marginBottom: '1rem' }}>
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                )}
                <h3 style={{ color: '#FF9933', fontSize: '1.3rem', marginBottom: 8 }}>{post.title}</h3>
                <div style={{ color: '#222', background: '#fff', borderRadius: 6, padding: '1rem', marginBottom: 12 }} 
                     dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ color: '#FF9933', fontWeight: 600, textDecoration: 'underline', fontSize: '1rem' }}
                  >
                    Read Full Post
                  </Link>
                  <div style={{ color: '#fff', opacity: 0.7, fontSize: '0.9rem' }}>
                    <span>By {post.author.name}</span>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 