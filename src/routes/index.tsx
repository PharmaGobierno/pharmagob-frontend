import { JSX, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
// routes

/* import LoginRoutes from './LoginRoutes'; */
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from '../ui-components/Loadable';

const MainLayout = Loadable(lazy(() => import('../layout/MainLayout') as Promise<{ default: () => JSX.Element }>));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([{ path: '/', element: <MainLayout /> }, /* AuthenticationRoutes, LoginRoutes, */ MainRoutes, AuthenticationRoutes]);
}
