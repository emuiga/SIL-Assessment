import React from 'react';
import { Link } from 'react-router-dom';
import { getAvatarForUser } from '../utils/avatarUtils';
import type { User } from '../services/api';

interface UserCardProps {
  user: User;
  albumCount: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, albumCount }) => {
  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      <div className="w-16 h-16 rounded-full mb-6 overflow-hidden">
        <img
          src={getAvatarForUser(user.id.toString())}
          alt={`${user.name} avatar`}
          className="w-full h-full object-cover"
        />
      </div>

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

        <div className="flex items-center text-sm text-portfolio mb-4">
          <span className="mr-2">📁</span>
          {albumCount} {albumCount === 1 ? 'portfolio' : 'portfolios'}
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-6 p-3 bg-gray-50 rounded-lg">
        <strong>{user.company.name}</strong><br />
        {user.company.catchPhrase}
      </div>

      <Link
        to={`/users/${user.id}`}
        className="bg-accent text-white no-underline py-3 px-6 rounded-lg text-sm font-medium block text-center transition-colors hover:bg-orange-600"
      >
        View Portfolio
      </Link>
    </div>
  );
};

export default UserCard;