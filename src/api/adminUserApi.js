import apiFetch from '../bundle/axios';

export const loginApi = async (userData) => {
  let response = [];
  try {
    response = await apiFetch.post('/admin-user/login', userData);
  } catch (e) {
    if (e.code === 'ERR_NETWORK') {
      alert(
        '서버 Network가 정상작동하지 않습니다. 네트워크 관리자에게 문의하세요'
      );
      return;
    }
    alert(e.message);
  }
  return response.data;
};
