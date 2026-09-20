// /mock/users.ts

export interface MockUser {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  isBlocked: boolean;
  password: string;
}

export const mockUsers: MockUser[] = [
  // Customer Users - IDs match customer profiles
  {
    id: '1',
    fullName: 'Alice Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    email: 'example@gmail.com',
    isBlocked: false,
    password: '123456',
  },
  {
    id: '3',
    email: 'bad.actor@spam.net',
    password: '123456',
    isBlocked: true,
    fullName: 'Derek Vandal',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: '5',
    email: 'olivia.m@lifestyle.com',
    password: '123456',
    isBlocked: false,
    fullName: 'Olivia Martinez',
    avatarUrl: 'https://i.pravatar.cc/150?img=22',
  },
  {
    id: '7',
    email: 'unverified.user@pending.io',
    password: '123456',
    isBlocked: false,
    fullName: 'Liam O’Connor',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  },

  // Provider Users - IDs match provider profiles (p1-p8)
  {
    id: 'p1',
    email: 'john@example.com',
    password: '123456',
    isBlocked: false,
    fullName: 'John Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'p2',
    email: 'emma@example.com',
    password: '123456',
    isBlocked: false,
    fullName: 'Emma Smith',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 'p3',
    email: 'michael@example.com',
    password: '123456',
    isBlocked: false,
    fullName: 'Michael Brown',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'p4',
    email: 'sarah@example.com',
    password: '123456',
    isBlocked: false,
    fullName: 'Sarah Wilson',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 'p5',
    email: 'david@example.com',
    password: '123456',
    isBlocked: false,
    fullName: 'David Lee',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'p6',
    email: 'lisa@example.com',
    password: '123456',
    isBlocked: false,
    fullName: 'Lisa Anderson',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 'p7',
    email: 'robert@example.com',
    password: '123456',
    isBlocked: false,
    fullName: 'Robert Taylor',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: 'p8',
    email: 'jennifer@example.com',
    password: '123456',
    isBlocked: false,
    fullName: 'Jennifer Martinez',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
  },
];
