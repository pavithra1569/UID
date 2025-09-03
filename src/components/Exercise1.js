import React from 'react';
import { Link } from 'react-router-dom';

// Safe image with fallback and referrer policy
const FALLBACK_IMG =
  "data:image/svg+xml;utf8,\
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>\
    <defs>\
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>\
        <stop offset='0%' stop-color='%23b91c1c'/>\
        <stop offset='100%' stop-color='%23dc2626'/>\
      </linearGradient>\
    </defs>\
    <rect fill='url(%23g)' width='100%' height='100%'/>\
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' \
          font-family='Segoe UI, Roboto, Helvetica, Arial, sans-serif' \
          font-size='48' fill='white' opacity='0.85'>Artwork</text>\
  </svg>";

const SafeImage = ({ src, alt, style, ...rest }) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setImgSrc(FALLBACK_IMG)}
      {...rest}
    />
  );
};

// Header: Art Studio branding
const Header = () => (
  <header
    style={{
      background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
      color: 'white',
      padding: '28px 0',
      textAlign: 'center',
      marginBottom: '40px',
      borderRadius: '0 0 16px 16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
    }}
  >
    <h1 style={{ fontSize: '2.75rem', margin: 0 }}>Art Studio</h1>
    <p style={{ fontSize: '1.1rem', marginTop: 8, opacity: 0.95 }}>
      Where creativity meets canvas
    </p>
  </header>
);

// Hero: brief intro and actions
const HeroSection = () => (
  <section
    className="card"
    style={{
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      alignItems: 'center',
      gap: 24,
    }}
  >
    <div>
      <h2 style={{ fontSize: '2.25rem', color: '#1f2937', marginBottom: 12 }}>
        Discover Original Artworks & Inspiring Workshops
      </h2>
      <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: 20 }}>
        Explore curated collections, commission custom portraits, and learn
        hands-on techniques from professional artists. Designed with React
        components, elements, and modern styles.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn">View Gallery</button>
        <button className="btn btn-outline">Book a Workshop</button>
      </div>
    </div>
    <div
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 10px 24px rgba(0,0,0,0.12)'
      }}
    >
      <SafeImage
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
        alt="Abstract paint palette"
        style={{ width: '100%', height: 280, objectFit: 'cover' }}
      />
    </div>
  </section>
);

// Small card used for services
const ServiceCard = ({ icon, title, description }) => (
  <div className="card" style={{ textAlign: 'left' }}>
    <div style={{ fontSize: '2rem', marginBottom: 12 }}>{icon}</div>
    <h3 style={{ color: '#1f2937', marginBottom: 8 }}>{title}</h3>
    <p style={{ color: '#6b7280', lineHeight: 1.6 }}>{description}</p>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      icon: '🖌️',
      title: 'Custom Portraits',
      description:
        'Commission bespoke portraits in watercolor, oil, or digital mediums.'
    },
    {
      icon: '🎓',
      title: 'Art Classes',
      description:
        'Weekend workshops and evening classes for beginners to advanced artists.'
    },
    {
      icon: '🖼️',
      title: 'Exhibitions',
      description:
        'Monthly showcases featuring local and emerging artists across styles.'
    },
    {
      icon: '🛍️',
      title: 'Online Store',
      description:
        'Purchase originals, prints, and curated supplies from our studio.'
    }
  ];

  return (
    <section style={{ marginTop: 24 }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          color: '#1f2937',
          marginBottom: 20
        }}
      >
        What We Offer
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 24
        }}
      >
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

// Gallery grid of artworks
const GalleryGrid = () => {
  const artworks = [
    {
      title: 'Crimson Dreams',
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fbig.php%3Fi%3D72270&psig=AOvVaw257RjgHfSKt_MiT_fQmUnZ&ust=1755077121318000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJi8mPb5hI8DFQAAAAAdAAAAABAE'
    },
    {
      title: 'Coastal Haze',
      image:
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Neon Nightfall',
      image:
        'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Silent Forest',
      image:
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  return (
    <section style={{ marginTop: 32 }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          color: '#1f2937',
          marginBottom: 20
        }}
      >
        Gallery Highlights
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20
        }}
      >
        {artworks.map((art, index) => (
          <div key={index} className="card" style={{ padding: 0 }}>
            <SafeImage
              src={art.image}
              alt={art.title}
              style={{ width: '100%', height: 220, objectFit: 'cover' }}
            />
            <div style={{ padding: 16 }}>
              <h3 style={{ color: '#1f2937' }}>{art.title}</h3>
              <button className="btn btn-outline" style={{ marginTop: 12 }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Artist spotlight section
const ArtistSpotlight = () => (
  <section className="card" style={{ marginTop: 32 }}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        alignItems: 'center',
        gap: 16
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
        alt="Featured artist portrait"
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '4px solid #7c3aed'
        }}
      />
      <div>
        <h3 style={{ color: '#1f2937', marginBottom: 6 }}>Artist of the Month: Maya R.</h3>
        <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
          Known for her expressive color work and textured abstractions, Maya
          blends traditional media with modern techniques to create immersive
          pieces.
        </p>
      </div>
    </div>
  </section>
);

// Studio statistics
const Stats = () => {
  const stats = [
    { number: '250+', label: 'Artworks Sold' },
    { number: '60+', label: 'Workshops Hosted' },
    { number: '18', label: 'Artists Represented' },
    { number: '10+', label: 'Years of Creativity' }
  ];

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 20,
        marginTop: 24
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            background: 'white',
            borderRadius: 12,
            padding: 24,
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#7c3aed',
              marginBottom: 6
            }}
          >
            {stat.number}
          </div>
          <div style={{ color: '#6b7280' }}>{stat.label}</div>
        </div>
      ))}
    </section>
  );
};

// Footer
const Footer = () => (
  <footer
    style={{
      background: '#111827',
      color: 'white',
      padding: '36px 0',
      textAlign: 'center',
      marginTop: 48,
      borderRadius: '16px 16px 0 0'
    }}
  >
    <div style={{ marginBottom: 12 }}>
      <h3 style={{ marginBottom: 6 }}>Art Studio</h3>
      <p style={{ opacity: 0.8 }}>Crafted with React components and styles</p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Link to="/" className="btn">
        Back to Home
      </Link>
      <a
        href="#top"
        className="btn btn-outline"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        Back to Top
      </a>
    </div>
  </footer>
);

function Exercise1() {
  return (
    <div className="container">
      <Header />
      <HeroSection />
      <ServicesSection />
      <GalleryGrid />
      <ArtistSpotlight />
      <Stats />
      <Footer />
    </div>
  );
}

export default Exercise1;