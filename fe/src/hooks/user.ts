import { useState } from 'react';
import { userServices } from 'services';

const useLogin = (messageApi: any) => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await userServices.login(email, password);
      if (res) {
        localStorage.setItem('token', res.accessToken);
      }
    } catch (e: any) {
      messageApi.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
  };
};

export default {
  useLogin,
};
