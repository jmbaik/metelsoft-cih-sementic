import apiFetch from '../bundle/axios';

export const loginApi = async (userData) => {
  const response = await apiFetch.post('/admin-user/login', userData);
  return response.data;
};
