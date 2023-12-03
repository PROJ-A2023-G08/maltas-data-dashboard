import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | undefined | null>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // If accessToken and refreshToken are not provided as props, try to get them from localStorage
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        setIsLoggedIn(true);
    }
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedRefreshToken) {
        setRefreshToken(storedRefreshToken);
    }

    // Check if the page requires authentication
    const exemptPaths = ['/login', '/register','/about','/contact','/home'];
    const requiresAuth = !exemptPaths.includes(router.pathname);

    if (requiresAuth && !storedAccessToken) {
      // Redirect to home page if not authenticated
      router.push('/home');
    }
  }, [accessToken, refreshToken, router]);

  const logout = () => {
    // Clear tokens from storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    
    // Redirect to the home page after logout
  
    router.push('/home');
  };

  return { isLoggedIn, accessToken, refreshToken, logout };
};

export default useAuth;
