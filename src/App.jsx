import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Navigation from './components/Navigation';
import UsersView from './views/UsersView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import HooksView from './views/HooksView';
import UserDetailsView from './views/UserDetailsView';
import UserEditView from './views/UserEditView';
import UserProvider from './context/users/UserProvider';
import ProfessionProvider from './context/profession/ProfessionProvider';
import QualityProvider from './context/quality/QualityProvider';

function App() {
  return (
    <Container>
      <Navigation />
      <ProfessionProvider>
        <QualityProvider>
          <UserProvider>
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
            </Switch>
          </UserProvider>
        </QualityProvider>
      </ProfessionProvider>
      <ToastContainer autoClose={3000} />
    </Container>
  );
}

export default App;
