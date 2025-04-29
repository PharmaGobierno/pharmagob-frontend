import { JSX, lazy } from 'react';

// project imports
import Loadable from '../ui-components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// login option 1 routing
const AuthLogin = Loadable(lazy(() => import('../views/authentication/login/LoginForm') as Promise<{ default: () => JSX.Element }>));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        }
    ]
};

export default AuthenticationRoutes;
