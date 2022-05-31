import { lazy, Suspense } from 'react';

import { DashboardLayout } from 'layouts/Dashboard';
import NoAuth from 'routes/guards/NoAuth';

const ListDoc = lazy(() => import('./pages/list'));
const CreateDoc = lazy(() => import('./pages/createDoc'));

export default [
  {
    path: '/my-docs',
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
      {
        path: 'new',
        element: (
          <Suspense fallback={<>...</>}>
            <CreateDoc />
          </Suspense>
        ),
      },
    ],
  },
];
