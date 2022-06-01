import NoFound from 'core/layouts/NoFound';

import DashboardRouter from 'views/dashboard/router';
import MyDocsRouter from 'views/my-docs/router';

export default [
  ...DashboardRouter,
  ...MyDocsRouter,
  {
    path: '*',
    element: <NoFound />,
  },
];
