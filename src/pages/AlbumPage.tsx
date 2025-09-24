import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAlbum, fetchAlbumPhotos, type Album, type Photo } from '../services/api';
import FooterSection from '../sections/FooterSection';
import LoadingSpinner from '../sections/LoadingSpinner';
import ErrorMessage from '../sections/ErrorMessage';
import Breadcrumb from '../sections/Breadcrumb';
import PhotoCard from '../sections/PhotoCard';
import EmptyState from '../sections/EmptyState';

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
    return <LoadingSpinner message="Loading album..." />;
  }

  if (error) {
    return <ErrorMessage title="Error loading album" message={error} />;
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
          <Breadcrumb
            items={[
              { label: 'Users', href: '/users' },
              { label: 'User Profile', href: `/users/${album.userId}` },
              { label: 'Album' }
            ]}
          />

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
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title="No photos in this album"
              message="This album doesn't contain any photos yet."
              actionText="Back to User Profile"
              actionLink={`/users/${album.userId}`}
            />
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default AlbumPage;





