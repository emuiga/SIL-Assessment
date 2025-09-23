const avatars = ['happy.png', 'playful.png', 'wink.png'];

export const getRandomAvatar = (): string => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return `/${avatars[randomIndex]}`;
};

export const getAvatarForUser = (userId: string): string => {
  // Use user ID to consistently get the same avatar for the same user
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % avatars.length;
  return `/${avatars[index]}`;
};