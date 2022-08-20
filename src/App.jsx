import { Switch, Route } from 'react-router-dom';
import Container from './components/Container';
import Navigation from './components/Navigation';
import UserView from './views/UserView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import UserDetailsView from './views/UserDetailsView';

function App() {
  return (
    <Container>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/login">
          <LoginView />
        </Route>
        <Route path="/users" exact>
          <UserView />
        </Route>
        <Route path="/users/:userId">
          <UserDetailsView />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
