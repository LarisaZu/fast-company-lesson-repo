import { useState, useEffect } from 'react';
import Card from '../Card';

const withFunctions = Component => props => {
  const [trigger, setTrigger] = useState(true);
  const [isAuth, setIsAuth] = useState(
    () => localStorage.getItem('auth') === 'token',
  );

  useEffect(() => {
    setIsAuth(localStorage.getItem('auth') === 'token');
  }, [trigger]);

  const handleLogin = () => {
    localStorage.setItem('auth', 'token');
    setTrigger(prev => !prev);
  };
  const handleLogOut = () => {
    localStorage.removeItem('auth');
    setTrigger(prev => !prev);
  };

  return (
    <Card styles="my-2">
      <Component
        isAuth={isAuth}
        onLogin={handleLogin}
        onLogOut={handleLogOut}
        {...props}
      />
    </Card>
  );
};
export default withFunctions;
