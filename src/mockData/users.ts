import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'admin',
    role: 'admin',
    email: 'admin@footballnews.com',
    profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 'user2',
    username: 'user',
    role: 'user',
    email: 'user@example.com',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 'user3',
    username: 'johndoe',
    role: 'user',
    email: 'john@example.com',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];