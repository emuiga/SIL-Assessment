import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPhoto, updatePhoto, type Photo } from '../services/api';
import FooterSection from '../sections/FooterSection';
import LoadingSpinner from '../sections/LoadingSpinner';
import ErrorMessage from '../sections/ErrorMessage';
import Breadcrumb from '../sections/Breadcrumb';

const PhotoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [updatingTitle, setUpdatingTitle] = useState(false);

  useEffect(() => {
    const loadPhoto = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const photoId = parseInt(id);
        const photoData = await fetchPhoto(photoId);
        
        setPhoto(photoData);
        setImageLoading(true);
        setImageError(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, [id]);

  const handleEditTitle = () => {
    setTitleInput(photo?.title || '');
    setIsEditingTitle(true);
  };

  const handleSaveTitle = async () => {
    if (!photo || !titleInput.trim()) return;

    try {
      setUpdatingTitle(true);
      const updatedPhoto = await updatePhoto(photo.id, titleInput.trim());
      setPhoto(updatedPhoto);
      setIsEditingTitle(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update title');
    } finally {
      setUpdatingTitle(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
    setTitleInput('');
  };

  if (loading) {
    return <LoadingSpinner message="Loading photo..." />;
  }

  if (error) {
    return <ErrorMessage title="Error loading photo" message={error} />;
  }

  if (!photo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Photo not found.</p>
        <Link to="/users" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
          ← Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb
            items={[
              { label: 'Users', href: '/users' },
              { label: 'User Profile', href: `/users/${Math.ceil(photo.id / 50)}` },
              { label: 'Album', href: `/albums/${photo.albumId}` },
              { label: 'Photo' }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Image Section - Takes up 3/4 of the space */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {imageLoading && (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading image...</p>
                  </div>
                </div>
              )}

              {imageError ? (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 mb-2">Image failed to load</p>
                    <p className="text-sm text-gray-500 mb-4">Using placeholder image</p>
                    <img
                      src={`https://picsum.photos/seed/${photo.id}/800/600`}
                      alt={photo.title}
                      className="w-full h-auto max-h-96 object-cover rounded"
                      onLoad={() => setImageLoading(false)}
                      onError={() => setImageLoading(false)}
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={`https://picsum.photos/800/600?random=${photo.id}`}
                  alt={photo.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageError(true)}
                  style={{ display: imageLoading ? 'none' : 'block' }}
                />
              )}
            </div>
          </div>

          {/* Sidebar - Takes up 1/4 of the space */}
          <div className="space-y-6">
            {/* Photo Title */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Photo Details</h2>
                {!isEditingTitle && (
                  <button
                    onClick={handleEditTitle}
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Edit Title
                  </button>
                )}
              </div>

              {isEditingTitle ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter photo title"
                    disabled={updatingTitle}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveTitle}
                      disabled={updatingTitle || !titleInput.trim()}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updatingTitle ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={updatingTitle}
                      className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-900 leading-relaxed">{photo.title}</p>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Link
                  to={`/albums/${photo.albumId}`}
                  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Album
                </Link>
                <a
                  href={`https://picsum.photos/800/600?random=${photo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View Full Size
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default PhotoPage;






