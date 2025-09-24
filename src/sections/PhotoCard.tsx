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
        className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden"
      >
        <img
          src={`https://picsum.photos/300/300?random=${photo.id}`}
          alt={photo.title}
          className="w-full h-full object-cover block"
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
        
        <div className="absolute inset-0 flex items-end pointer-events-none">
          <div
            className="w-full p-4 translate-y-0 md:translate-y-full md:hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"
          >
            <h3 className="text-white font-medium text-sm leading-tight m-0 overflow-hidden line-clamp-2 text-shadow">
              {photo.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCard;