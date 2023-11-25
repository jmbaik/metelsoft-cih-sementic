export const addUserToSessionStorage = (user) => {
  sessionStorage.setItem('cih-admin-user', JSON.stringify(user));
};

export const removeUserFromSessionStorage = () => {
  sessionStorage.removeItem('cih-admin-user');
};

export const getUserFromSessionStorage = () => {
  const result = sessionStorage.getItem('cih-admin-user');
  const user = result ? JSON.parse(result) : null;
  return user;
};
