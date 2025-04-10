/* import { lazy } from 'react'; */
// project imports
import MainLayout from '../layout/MainLayout';
/* import Loadable from '../ui-components/Loadable'; */

/* const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
 */

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <MainLayout />
    ),
    children: [
        /* {
            path: '/dashboard/default',
            element: <DashboardDefault />
        } */
    ]
};

export default MainRoutes;
