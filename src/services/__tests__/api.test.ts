import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchUsers,
  fetchUser,
  fetchAlbum,
  fetchAlbumPhotos,
  fetchPhoto,
  updatePhoto,
  type User,
  type Album,
  type Photo
} from '../api';

// Mock the api module
vi.mock('../api', () => ({
  fetchUsers: vi.fn(),
  fetchUser: vi.fn(),
  fetchAlbums: vi.fn(),
  fetchUserAlbums: vi.fn(),
  fetchAlbum: vi.fn(),
  fetchPhotos: vi.fn(),
  fetchAlbumPhotos: vi.fn(),
  fetchPhoto: vi.fn(),
  updatePhoto: vi.fn(),
}));

// Import the mocked functions
const mockFetchUsers = vi.mocked(fetchUsers);
const mockFetchUser = vi.mocked(fetchUser);
const mockFetchAlbum = vi.mocked(fetchAlbum);
const mockFetchPhoto = vi.mocked(fetchPhoto);
const mockUpdatePhoto = vi.mocked(updatePhoto);
const mockFetchAlbumPhotos = vi.mocked(fetchAlbumPhotos);

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchUsers', () => {
    it('should fetch users successfully', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          address: {
            street: '123 Main St',
            suite: 'Apt 1',
            city: 'New York',
            zipcode: '10001',
            geo: { lat: '40.7128', lng: '-74.0060' }
          },
          phone: '555-1234',
          website: 'johndoe.com',
          company: {
            name: 'Acme Corp',
            catchPhrase: 'Making things better',
            bs: 'harness real-time e-markets'
          }
        }
      ];

      mockFetchUsers.mockResolvedValue(mockUsers);

      const result = await fetchUsers();
      expect(result).toEqual(mockUsers);
      expect(mockFetchUsers).toHaveBeenCalledTimes(1);
    });

    it('should throw error on API failure', async () => {
      mockFetchUsers.mockRejectedValue(new Error('Network error'));

      await expect(fetchUsers()).rejects.toThrow('Network error');
    });
  });

  describe('fetchUser', () => {
    it('should fetch a specific user', async () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'New York',
          zipcode: '10001',
          geo: { lat: '40.7128', lng: '-74.0060' }
        },
        phone: '555-1234',
        website: 'johndoe.com',
        company: {
          name: 'Acme Corp',
          catchPhrase: 'Making things better',
          bs: 'harness real-time e-markets'
        }
      };

      mockFetchUser.mockResolvedValue(mockUser);

      const result = await fetchUser(1);
      expect(result).toEqual(mockUser);
      expect(mockFetchUser).toHaveBeenCalledWith(1);
    });
  });

  describe('fetchAlbum', () => {
    it('should fetch a specific album', async () => {
      const mockAlbum: Album = {
        id: 1,
        userId: 1,
        title: 'My Album'
      };

      mockFetchAlbum.mockResolvedValue(mockAlbum);

      const result = await fetchAlbum(1);
      expect(result).toEqual(mockAlbum);
      expect(mockFetchAlbum).toHaveBeenCalledWith(1);
    });
  });

  describe('fetchPhoto', () => {
    it('should fetch a photo successfully', async () => {
      const mockPhoto: Photo = {
        id: 1,
        albumId: 1,
        title: 'Original Title',
        url: 'https://example.com/photo.jpg',
        thumbnailUrl: 'https://example.com/thumb.jpg'
      };

      mockFetchPhoto.mockResolvedValue(mockPhoto);

      const result = await fetchPhoto(1);
      expect(result).toEqual(mockPhoto);
      expect(mockFetchPhoto).toHaveBeenCalledWith(1);
    });
  });

  describe('updatePhoto', () => {
    it('should update photo successfully', async () => {
      const mockResponse: Photo = {
        id: 1,
        albumId: 1,
        title: 'Updated Title',
        url: 'https://example.com/photo.jpg',
        thumbnailUrl: 'https://example.com/thumb.jpg'
      };

      mockUpdatePhoto.mockResolvedValue(mockResponse);

      const result = await updatePhoto(1, 'Updated Title');

      expect(result).toEqual(mockResponse);
      expect(mockUpdatePhoto).toHaveBeenCalledWith(1, 'Updated Title');
    });

    it('should throw error on API failure', async () => {
      mockUpdatePhoto.mockRejectedValue(new Error('Network error'));

      await expect(updatePhoto(1, 'New Title')).rejects.toThrow('Network error');
    });
  });

  describe('fetchAlbumPhotos', () => {
    it('should fetch album photos successfully', async () => {
      const mockPhotos: Photo[] = [
        {
          id: 1,
          albumId: 1,
          title: 'Photo 1',
          url: 'https://example.com/photo1.jpg',
          thumbnailUrl: 'https://example.com/thumb1.jpg'
        },
        {
          id: 2,
          albumId: 1,
          title: 'Photo 2',
          url: 'https://example.com/photo2.jpg',
          thumbnailUrl: 'https://example.com/thumb2.jpg'
        }
      ];

      mockFetchAlbumPhotos.mockResolvedValue(mockPhotos);

      const result = await fetchAlbumPhotos(1);

      expect(result).toEqual(mockPhotos);
      expect(mockFetchAlbumPhotos).toHaveBeenCalledWith(1);
    });
  });
});
