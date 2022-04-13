import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React, { useEffect, useState } from 'react';
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

const HomePage = React.lazy(() => import('pages/HomePage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};
console.warn = () => { }

function App() {

  const [isLoading, setLoading] = useState(true);
  const [datos, setDatos] = useState();

  useEffect(() => {
    getData();

  }, []);

  const getData = () => {
    try {
      httpClient.get("//localhost:5000/@me").then((response) => {
        const resp = response.data
        setDatos(resp)
        $('#nombre').attr("placeholder", resp["nombre"]);
        $('#email').attr("placeholder", resp["email"]);
        setLoading(false);
      });

      //window.location.href = "/"
    } catch (error) {

    }
  }
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
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
              <PerfilPage {...datos} />
            )}
          />
          <LayoutRoute
            exact
            path="/config"
            layout={EmptyLayout}
            component={props => (
              <ConfigPage {...datos} />
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
              <AddDataPage {...datos} />
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
            <MainLayout {...datos}>
              {<Route
                path="/home" component={props => <HomePage {...datos} />} />}

            </MainLayout>
          </React.Suspense>

        </Switch>
      </GAListener>
    </BrowserRouter>
  );
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
