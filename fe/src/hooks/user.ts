import { useState } from 'react';
import { userServices } from 'services';

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await userServices.login(email, password);
      if (res) {
        localStorage.setItem('token', res.accessToken);
      }
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
