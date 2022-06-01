import { lazy, Suspense } from 'react';

import { BaseLayout } from 'core/layouts/Base';

const Login = lazy(() => import('./pages/login'));

import NoAuth from 'core/routes/guards/NoAuth';

export default [
  {
    path: '/',
    element: <NoAuth component={BaseLayout} />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<>...</>}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
];
