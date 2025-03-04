import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Enable cookies for cross-site requests
  // headers: {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token to headers
  // },
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log('error interceptor', error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          // if unauthorized or forbidden, remove token and navigate to login
          logOut();
          navigate('/login', { replace: true }); // Replace current route with login page
        }
      },
    );
  }, [logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
