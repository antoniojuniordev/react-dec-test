import { lazy, Suspense } from 'react';

import { DashboardLayout } from 'layouts/Dashboard';
import NoAuth from 'routes/guards/NoAuth';

const ListDoc = lazy(() => import('./pages/listDoc'));

export default [
  {
    path: '/list-my-doc',
    element: <NoAuth component={DashboardLayout} />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<>...</>}>
            <ListDoc />
          </Suspense>
        ),
      },
    ],
  },
];
