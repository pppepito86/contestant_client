import React from 'react';
import { Route } from 'react-router-dom';
import { EmptyLayout } from 'components/Layout';
import AuthPage from 'pages/AuthPage';

function layoutWithAuth(Component, Layout, rest) {
  if (!localStorage.getItem('token1')) { 
    Component=AuthPage;
    Layout=EmptyLayout;
  }
  return <Route {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
}

const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
  layoutWithAuth(Component, Layout, rest)
);

export default LayoutRoute;
