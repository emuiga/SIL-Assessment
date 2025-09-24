import React from 'react';
import { Link } from 'react-router-dom';
import type { Photo } from '../services/api';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-square bg-gray-50">
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://picsum.photos/300/300?random=${photo.id}`;
            target.alt = photo.title;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
          {photo.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">ID: {photo.id}</span>
          <Link
            to={`/photos/${photo.id}`}
            className="text-accent text-sm font-medium hover:text-orange-600"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;