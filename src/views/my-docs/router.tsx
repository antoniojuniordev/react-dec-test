import { lazy, Suspense } from 'react';

import { DashboardLayout } from 'core/layouts/Dashboard';
import NoAuth from 'core/routes/guards/NoAuth';

const ListDoc = lazy(() => import('./pages/list'));
const MyDoc = lazy(() => import('./pages/myDoc'));
const ViewDoc = lazy(() => import('./pages/viewDoc'));

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
            <MyDoc />
          </Suspense>
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <Suspense fallback={<>...</>}>
            <MyDoc />
          </Suspense>
        ),
      },
      {
        path: 'view/:id',
        element: (
          <Suspense fallback={<>...</>}>
            <ViewDoc />
          </Suspense>
        ),
      },
    ],
  },
];
