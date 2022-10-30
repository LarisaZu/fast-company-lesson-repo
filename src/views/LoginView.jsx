import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const LoginView = () => {
  const { pathname } = useLocation();
  const isLogin = pathname.includes('login');
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 shadow p-4">
        <h3 className="mb-4">{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
        {isLogin ? (
          <>
            <LoginForm />
            <p className="mb-0 mt-2">
              {' '}
              Еще нет аккаунта? <Link to="signup">Зарегистрироваться</Link>
            </p>
          </>
        ) : (
          <>
            <SignupForm />
            <p className="mb-0 mt-2">
              {' '}
              Уже есть аккаунт? <Link to="login">Войти</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginView;
