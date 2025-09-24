import React from 'react';
import { Link } from 'react-router-dom';
import type { Photo } from '../services/api';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <Link
      to={`/photos/${photo.id}`}
      className="block"
    >
      <div 
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: '#f3f4f6',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          const titleOverlay = e.currentTarget.querySelector('[data-title-overlay]') as HTMLElement;
          if (titleOverlay) {
            titleOverlay.style.transform = 'translateY(0)';
          }
        }}
        onMouseLeave={(e) => {
          const titleOverlay = e.currentTarget.querySelector('[data-title-overlay]') as HTMLElement;
          if (titleOverlay) {
            titleOverlay.style.transform = 'translateY(100%)';
          }
        }}
      >
        <img
          src={`https://picsum.photos/300/300?random=${photo.id}`}
          alt={photo.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', photo.id);
          }}
          onError={(e) => {
            console.log('Image failed to load:', photo.id);
            const target = e.target as HTMLImageElement;
            // Try multiple fallbacks
            if (target.src.includes('random')) {
              target.src = `https://picsum.photos/seed/${photo.id}/300/300`;
            } else if (target.src.includes('seed')) {
              target.src = `https://via.placeholder.com/300x300/cccccc/666666?text=Photo+${photo.id}`;
            }
          }}
        />
        
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'flex-end',
            pointerEvents: 'none'
          }}
        >
          <div 
            data-title-overlay
            style={{
              width: '100%',
              padding: '16px',
              transform: 'translateY(100%)',
              transition: 'transform 0.3s ease',
              background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
              pointerEvents: 'none'
            }}
          >
            <h3 
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '1.4',
                margin: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
              }}
            >
              {photo.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCard;