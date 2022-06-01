import NoFound from 'core/layouts/NoFound';

import DashboardRouter from 'views/dashboard/router';
import MyDocsRouter from 'views/my-docs/router';
import Auth from 'views/auth/router';

export default [
  ...DashboardRouter,
  ...MyDocsRouter,
  ...Auth,
  {
    path: '*',
    element: <NoFound />,
  },
];
