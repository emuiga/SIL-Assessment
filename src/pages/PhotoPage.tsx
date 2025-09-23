import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPhoto, updatePhoto, type Photo } from '../services/api';

const PhotoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadPhoto = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const photoId = parseInt(id);
        const photoData = await fetchPhoto(photoId);
        
        setPhoto(photoData);
        setEditTitle(photoData.title);
        setImageLoading(true);
        setImageError(false);

        // Debug logging
        console.log('Photo data:', photoData);
        console.log('Photo URL:', photoData.url);
        console.log('Thumbnail URL:', photoData.thumbnailUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, [id]);

  const handleSave = async () => {
    if (!photo || !editTitle.trim()) return;
    
    try {
      setSaving(true);
      setSaveError(null);
      
      const updatedPhoto = await updatePhoto(photo.id, editTitle.trim());
      setPhoto(updatedPhoto);
      setSaveSuccess(true);
      setIsEditing(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(photo?.title || '');
    setIsEditing(false);
    setSaveError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading photo...</p>
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
            <h3 className="text-sm font-medium text-red-800">Error loading photo</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
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
    <div>
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link to="/users" className="text-gray-500 hover:text-gray-700">
              Users
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to={`/users/${Math.ceil(photo.id / 50)}`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                User Profile
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to={`/albums/${photo.albumId}`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Album
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-4 text-sm font-medium text-gray-500">Photo</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Photo title updated successfully!</p>
            </div>
          </div>
        </div>
      )}

      {/* Photo Display */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                    src={`https://picsum.photos/600/400?random=${photo.id}`}
                    alt={photo.title}
                    className="w-full h-auto max-h-96 object-cover rounded"
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                </div>
              </div>
            ) : (
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-auto"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageError(true)}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            )}
          </div>
          
          {/* Photo Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Photo Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">ID:</span>
                <span className="text-gray-900">{photo.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Album ID:</span>
                <span className="text-gray-900">{photo.albumId}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 mb-1">Full Image URL:</span>
                <a href={photo.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 text-xs break-all">
                  {photo.url}
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 mb-1">Thumbnail URL:</span>
                <a href={photo.thumbnailUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 text-xs break-all">
                  {photo.thumbnailUrl}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Photo Title</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <textarea
                    id="title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter photo title..."
                  />
                </div>

                {saveError && (
                  <div className="text-sm text-red-600">
                    {saveError}
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={saving || !editTitle.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link
                to={`/albums/${photo.albumId}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                ← Back to Album
              </Link>
              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                View Full Size
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;




