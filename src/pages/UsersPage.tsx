import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, fetchAlbums, type User, type Album } from '../services/api';
import { getAvatarForUser } from '../utils/avatarUtils';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [usersData, albumsData] = await Promise.all([
          fetchUsers(),
          fetchAlbums()
        ]);
        
        setUsers(usersData);
        setAlbums(albumsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getUserAlbumCount = (userId: number): number => {
    return albums.filter(album => album.userId === userId).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 px-8 bg-portfolio">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full mx-auto mb-4"></div>
          <p className="text-portfolio text-base font-playfair">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-8">
        <div className="flex">
          <div className="mr-3">
            <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Error loading users
            </h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-portfolio min-h-screen p-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-portfolio mb-4 font-playfair">
          Our Clients
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-playfair">
          Browse through all our clients and see their portfolio collections
        </p>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {users.map((user) => {
          const albumCount = getUserAlbumCount(user.id);
          
          return (
            <div 
              key={user.id} 
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
              {/* User Avatar */}
              <div className="w-16 h-16 rounded-full mb-6 overflow-hidden">
                <img
                  src={getAvatarForUser(user.id.toString())}
                  alt={`${user.name} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-portfolio mb-2 font-playfair">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  @{user.username}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {user.email}
                </p>
                
                {/* Album Count */}
                <div className="flex items-center text-sm text-portfolio mb-4">
                  <span className="mr-2">📁</span>
                  {albumCount} {albumCount === 1 ? 'portfolio' : 'portfolios'}
                </div>
              </div>

              {/* Company Info */}
              <div className="text-xs text-gray-500 mb-6 p-3 bg-gray-50 rounded-lg">
                <strong>{user.company.name}</strong><br />
                {user.company.catchPhrase}
              </div>
              
              {/* View Profile Button */}
              <Link
                to={`/users/${user.id}`}
                className="bg-accent text-white no-underline py-3 px-6 rounded-lg text-sm font-medium block text-center transition-colors hover:bg-orange-600"
              >
                View Portfolio
              </Link>
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-base">No clients found.</p>
        </div>
      )}
    </div>
  );
};

export default UsersPage;