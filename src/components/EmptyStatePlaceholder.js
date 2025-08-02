import React from 'react';
import { Container } from 'react-bootstrap';

const EmptySectionWallpaper = () => {
  return (
    <div
      style={{
        minHeight: '350px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        marginTop: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          color: 'white',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <Container>
          <h3 style={{ fontWeight: '400', fontSize: '1.5rem' }}>
            “There's something about being on a bus that brings people together.
            You're all in it together, sharing the same cramped space and the same journey.”
          </h3>
          <p className="text-light mt-3" style={{ fontSize: '0.95rem', opacity: 0.85 }}>
            Let the journey unfold — we’ll update this section soon.
          </p>
        </Container>
      </div>
    </div>
  );
};

export default EmptySectionWallpaper;
