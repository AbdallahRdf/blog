import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingPage from '../components/commun/LoadingPage';
import useCustomAxios from '../hooks/useCustomAxios';

function AccountActivation() {

  const navigator = useNavigate();

  const { token } = useParams();

  const cusomAxios = useCustomAxios();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await cusomAxios.get(`/auth/account-activation/${token}`);
        navigator('/auth/login');
      } catch (error) {
        navigator(`/${error.response.data.message.split(' ').join('-')}`, {
          state: {
            statusCode: error.response.status,
            message: (error.response.status < 500) ? error.response.data.message : "Server Error"
          }
        });
      }
    }

    activateAccount();
  }, []);

  return (
    <LoadingPage />
  )
}

export default AccountActivation