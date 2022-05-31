import NoFound from 'layouts/NoFound';

import DashboardRouter from '../views/dashboard/router';
import MyDocsRouter from '../views/my-docs/router';
import InforRouter from '../views/infor/router';

export default [
  ...DashboardRouter,
  ...MyDocsRouter,
  ...InforRouter,
  {
    path: '*',
    element: <NoFound />,
  },
];
