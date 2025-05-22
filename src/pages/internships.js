import Head from 'next/head';

export default function Internships() {
  return (
    <div style={{ background: '#0a1033', minHeight: '100vh', color: '#fff' }}>
      <Head>
        <title>Internships | Think India</title>
        <meta name="description" content="Explore internship opportunities at Think India" />
      </Head>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 1rem 30px 1rem', textAlign: 'center' }}>
        <h1 style={{ color: '#FF9933', fontSize: '2.7rem', fontWeight: 800, marginBottom: 8 }}>Internships</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <span style={{ width: 120, height: 5, borderRadius: 3, background: 'linear-gradient(90deg, #FF9933 0%, #fff 50%, #138808 100%)', display: 'block' }}></span>
        </div>
        <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 32 }}>
          Discover a range of impactful internship opportunities with Think India. Our programs connect students with real-world projects, mentors, and a vibrant network of changemakers.
        </p>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '2rem', minHeight: 200 }}>
          <h2 style={{ color: '#FF9933', fontSize: '1.5rem', marginBottom: 12 }}>Current Openings</h2>
          <p style={{ color: '#fff', opacity: 0.8 }}>Internship listings will appear here soon. Stay tuned!</p>
        </div>
      </section>
    </div>
  );
} 