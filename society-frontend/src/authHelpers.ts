export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken'); // the token you save after login
};
