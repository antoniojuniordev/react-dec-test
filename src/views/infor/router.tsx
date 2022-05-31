import { lazy, Suspense } from 'react';

import { DashboardLayout } from 'layouts/Dashboard';
import NoAuth from 'routes/guards/NoAuth';

const MyInfor = lazy(() => import('./pages/myInfor'));

export default [
  {
    path: '/infor',
    element: <NoAuth component={DashboardLayout} />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<>...</>}>
            <MyInfor />
          </Suspense>
        ),
      },
    ],
  },
];
