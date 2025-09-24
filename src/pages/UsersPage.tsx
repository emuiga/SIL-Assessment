import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchAlbums, type User, type Album } from '../services/api';
import FooterSection from '../sections/FooterSection';
import LoadingSpinner from '../sections/LoadingSpinner';
import ErrorMessage from '../sections/ErrorMessage';
import PageHeader from '../sections/PageHeader';
import SearchInput from '../sections/SearchInput';
import UserCard from '../sections/UserCard';
import EmptyState from '../sections/EmptyState';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  if (error) {
    return <ErrorMessage title="Error loading users" message={error} />;
  }

  return (
    <div className="bg-portfolio min-h-screen p-8">
      <PageHeader
        title="Our Clients"
        subtitle="Browse through all our clients and see their portfolio collections"
      />

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search users by name, username, or email..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            albumCount={getUserAlbumCount(user.id)}
          />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <EmptyState
          message={searchTerm ? 'No clients match your search.' : 'No clients found.'}
        />
      )}

      <FooterSection />
    </div>
  );
};

export default UsersPage;