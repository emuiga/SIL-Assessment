import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Types
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
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const fetchUser = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw new Error(`Failed to fetch user ${id}`);
  }
};

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






