import { JSX, lazy } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';

// routes
/* import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes'; */
import Loadable from '../ui-components/Loadable';

const PagesLanding = Loadable(lazy(() => import('../pages/landing') as Promise<{ default: () => JSX.Element }>));

// ==============================|| ROUTING RENDER ||============================== //

const AppRoutes: React.FC = () => {
  const routes = useRoutes([{ path: '/', element: <PagesLanding /> } /* AuthenticationRoutes, LoginRoutes, MainRoutes */] as RouteObject[]);
  return routes;
};

export default AppRoutes;