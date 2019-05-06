import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AuthPage from 'pages/AuthPage';
// pages
import TaskPage from 'pages/TaskPage';
import SolutionPage from 'pages/SolutionPage';
import DashboardPage from 'pages/DashboardPage';
import AuthProvider from 'AuthProvider';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <AuthProvider>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage/>
              )}
            />
            <LayoutRoute
              exact
              path="/task/:taskId/solution/:solutionId"
              layout={MainLayout}
              component={SolutionPage}
            />
            <LayoutRoute
              exact
              path="/task/:taskId"
              layout={MainLayout}
              component={TaskPage}
            />
            <LayoutRoute
              exact
              path="/"
              layout={MainLayout}
              component={TaskPage}
            />
            <LayoutRoute
              exact
              path="/solution"
              layout={MainLayout}
              component={SolutionPage}
            />
            <LayoutRoute
              exact
              path="/dash"
              layout={MainLayout}
              component={DashboardPage}
            />
            <Redirect to="/" />
          </Switch>
        </AuthProvider>
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
