import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAlbum, fetchAlbumPhotos, type Album, type Photo } from '../services/api';

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAlbumData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const albumId = parseInt(id);
        const [albumData, photosData] = await Promise.all([
          fetchAlbum(albumId),
          fetchAlbumPhotos(albumId)
        ]);
        
        setAlbum(albumData);
        setPhotos(photosData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadAlbumData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading album...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading album</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Album not found.</p>
        <Link to="/users" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
          ← Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-portfolio">
      {/* Header Section with Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  to="/users"
                  className="text-portfolio font-medium"
                >
                  Users
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link
                  to={`/users/${album.userId}`}
                  className="text-portfolio font-medium"
                >
                  User Profile
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-500 font-medium">Album</span>
              </li>
            </ol>
          </nav>

          {/* Album Title Section */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-portfolio mb-3 font-playfair leading-tight">
                {album.title}
              </h1>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Album ID: {album.id}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 ml-6">
              <Link
                to={`/users/${album.userId}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to User
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Photos Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-portfolio font-playfair">
              Photos in this Album
            </h2>
            <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              {photos.length} {photos.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          {photos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
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
                        className="text-accent text-sm font-medium"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No photos in this album</h3>
              <p className="text-gray-500 mb-6">This album doesn't contain any photos yet.</p>
              <Link
                to={`/users/${album.userId}`}
                className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to User Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;




