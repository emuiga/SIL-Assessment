/**
 * Available avatar images
 */
const avatars = ['happy.png', 'playful.png', 'wink.png'];

/**
 * Gets a random avatar image path
 * @returns {string} Path to a random avatar image
 */
export const getRandomAvatar = (): string => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return `/${avatars[randomIndex]}`;
};

/**
 * Gets a consistent avatar for a specific user based on their ID
 * @param {string} userId - The user's unique identifier
 * @returns {string} Path to the user's assigned avatar image
 */
export const getAvatarForUser = (userId: string): string => {
  // Use user ID to consistently get the same avatar for the same user
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % avatars.length;
  return `/${avatars[index]}`;
};