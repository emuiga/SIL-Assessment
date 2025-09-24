import axios from 'axios';

/**
 * Base URL for the JSONPlaceholder API
 */
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Axios instance configured for the JSONPlaceholder API
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * User interface representing user data from the API
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// API Functions
/**
 * Fetches all users from the API
 * @returns {Promise<User[]>} Array of user objects
 * @throws {Error} If the API request fails
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

/**
 * Fetches a specific user by ID
 * @param {number} id - User ID
 * @returns {Promise<User>} User object
 * @throws {Error} If the API request fails
 */
export const fetchUser = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw new Error(`Failed to fetch user ${id}`);
  }
};

/**
 * Fetches all albums from the API
 * @returns {Promise<Album[]>} Array of album objects
 * @throws {Error} If the API request fails
 */
export const fetchAlbums = async (): Promise<Album[]> => {
  try {
    const response = await api.get('/albums');
    return response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw new Error('Failed to fetch albums');
  }
};

export const fetchUserAlbums = async (userId: number): Promise<Album[]> => {
  try {
    const response = await api.get(`/users/${userId}/albums`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching albums for user ${userId}:`, error);
    throw new Error(`Failed to fetch albums for user ${userId}`);
  }
};

export const fetchAlbum = async (id: number): Promise<Album> => {
  try {
    const response = await api.get(`/albums/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching album ${id}:`, error);
    throw new Error(`Failed to fetch album ${id}`);
  }
};

export const fetchPhotos = async (): Promise<Photo[]> => {
  try {
    const response = await api.get('/photos');
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw new Error('Failed to fetch photos');
  }
};

export const fetchAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
  try {
    const response = await api.get(`/albums/${albumId}/photos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photos for album ${albumId}:`, error);
    throw new Error(`Failed to fetch photos for album ${albumId}`);
  }
};

export const fetchPhoto = async (id: number): Promise<Photo> => {
  try {
    const response = await api.get(`/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photo ${id}:`, error);
    throw new Error(`Failed to fetch photo ${id}`);
  }
};

export const updatePhoto = async (id: number, title: string): Promise<Photo> => {
  try {
    const response = await api.put(`/photos/${id}`, {
      title,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating photo ${id}:`, error);
    throw new Error(`Failed to update photo ${id}`);
  }
};

export default api;







