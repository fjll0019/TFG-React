import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import Delete from './components/Delete';
import PerfilPage from '../src/pages/PerfilPage';
import ConfigPage from '../src/pages/ConfigPage';
import PasswordPage from './pages/PasswordPage';
import httpClient from './httpClient';
import $ from 'jquery'
import AddDataPage from './pages/AddDataPage';
import UsersListPage from './pages/UsersListPage';




const DashboardPage = React.lazy(() => import('pages/DashboardPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};
console.warn = () => { }

class App extends React.Component {

  async checkLoginStatus() {
    try {

      const resp = await httpClient.get("//localhost:5000/@me")
      sessionStorage.setItem("UserName", resp.data["nombre"])
      sessionStorage.setItem("avatar", resp.data["avatar"])
      sessionStorage.setItem("rol", resp.data["rol"])
      sessionStorage.setItem("Email", resp.data["email"])
      $('#UserName').text(resp.data["nombre"]);
      $('#nombre').attr("placeholder", resp.data["nombre"]);
      $('#email').attr("placeholder", resp.data["email"]);

      //window.location.href = "/"
    } catch (error) {

    }
  }

  UNSAFE_componentWillMount() {
    this.checkLoginStatus();
  }
  render() {

    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/perfil"
              layout={EmptyLayout}
              component={props => (
                <PerfilPage />
              )}
            />
            <LayoutRoute
              exact
              path="/config"
              layout={EmptyLayout}
              component={props => (
                <ConfigPage />
              )}
            />
            <LayoutRoute
              exact
              path="/delete"
              layout={EmptyLayout}
              component={props => (
                <Delete />
              )}
            />
            <LayoutRoute
              exact
              path="/password"
              layout={EmptyLayout}
              component={props => (
                <PasswordPage />
              )}
            />
            <LayoutRoute
              exact
              path="/addData"
              layout={EmptyLayout}
              component={props => (
                <AddDataPage />
              )}
            />
            <LayoutRoute
              exact
              path="/userList"
              layout={EmptyLayout}
              component={props => (
                <UsersListPage />
              )}
            />             
             <React.Suspense fallback={<PageSpinner />}>
              <MainLayout breakpoint={this.props.breakpoint}>
                {<Route
                  path="/home" component={props => <DashboardPage {...props} />} />}

              </MainLayout>
            </React.Suspense>

          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
