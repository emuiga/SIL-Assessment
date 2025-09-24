import React from 'react';
import { Link } from 'react-router-dom';
import type { Album } from '../services/api';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const capitalizedTitle = album.title.charAt(0).toUpperCase() + album.title.slice(1);

  return (
    <Link
      to={`/albums/${album.id}`}
      className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="flex">
        <div className="w-1/4 p-4 flex items-center justify-center">
          <div
            aria-hidden
            className="w-12 h-12"
            style={{
              backgroundColor: 'var(--portfolio-text)',
              WebkitMask: "url('/camera.png') center / contain no-repeat",
              mask: "url('/camera.png') center / contain no-repeat",
            }}
          />
        </div>
        <div className="w-3/4 p-4 flex items-center">
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg leading-tight hover:text-accent transition-colors cursor-pointer">
            {capitalizedTitle}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;