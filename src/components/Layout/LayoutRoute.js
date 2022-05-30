import React from 'react';
import { Route } from 'react-router-dom';

const LayoutRoute = ({ props:Props,component: Component, layout: Layout, ...rest }) => (
  
  <Route
    {...rest}
    render={props => (
      <Layout {...Props}>
        <Component {...props} />
      </Layout>
    )}
  />
  
);

export default LayoutRoute;
