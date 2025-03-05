import { MessageInstance } from 'antd/es/message/interface';
import { StoreContext } from 'contexts';
import { useContext, useState } from 'react';
import { userServices } from 'services';

const useLogin = (messageApi: MessageInstance) => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(StoreContext);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await userServices.login(email, password);
      if (res) {
        localStorage.setItem('token', res.accessToken);
        const user = await userServices.getMe();
        if (user) {
          setCurrentUser(user);
        }
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

const useUser = () => {
  const [loading, setLoading] = useState(false);

  const getMe = async () => {
    try {
      setLoading(true);
      const res = await userServices.getMe();
      if (res) {
        return res;
      }
    } catch (e) {
      userServices.logout();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getMe,
  };
};

export default {
  useLogin,
  useUser,
};
