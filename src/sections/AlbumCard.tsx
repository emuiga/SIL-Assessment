import React from 'react';
import { Link } from 'react-router-dom';
import type { Album } from '../services/api';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-lg leading-tight">
          {album.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">ID: {album.id}</span>
          <Link
            to={`/albums/${album.id}`}
            className="text-accent text-sm font-medium hover:text-orange-600"
          >
            View Album →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;