import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Navigation from './components/Navigation';
import UsersView from './views/UsersView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import HooksView from './views/HooksView';
import MockDataView from './views/MockDataView';
import UserDetailsView from './views/UserDetailsView';
import UserEditView from './views/UserEditView';
import { ProfessionProvider } from './hooks/useProfession';
import { UsersProvider } from './hooks/useUsers';
// import UserProvider from './context/users/UserProvider';
// import ProfessionProvider from './context/profession/ProfessionProvider';
// import QualityProvider from './context/quality/QualityProvider';
import { QualityProvider } from './hooks/useQualities';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <Container>
      <AuthProvider>
        <Navigation />
        <ProfessionProvider>
          <QualityProvider>
            <UsersProvider>
              <Switch>
                <Route path="/" exact>
                  <HomeView />
                </Route>
                <Route path="/login">
                  <LoginView />
                </Route>
                <Route path="/signup">
                  <LoginView />
                </Route>
                <Route path="/users" exact>
                  <UsersView />
                </Route>
                <Route path="/users/:userId" exact>
                  <UserDetailsView />
                </Route>
                <Route path="/users/:userId/edit">
                  <UserEditView />
                </Route>
                <Route path="/hooks">
                  <HooksView />
                </Route>
                <Route path="/mock-data">
                  <MockDataView />
                </Route>
              </Switch>
            </UsersProvider>
          </QualityProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer autoClose={3000} />
    </Container>
  );
}

export default App;
