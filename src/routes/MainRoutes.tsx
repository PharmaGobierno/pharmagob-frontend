import { lazy } from 'react';
// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-components/Loadable';
import AuthGuard from '../utils/route-guard/AuthGuard';
import Medicos from '../views/medicos';
import AltaMedicos from '../views/medicos/altaMedico';

const DashboardDefault = Loadable(lazy(() => import('../views/pedidosPendientes')));
const Shipments = Loadable(lazy(() => import('../views/ordenesIngresadas')));
const DetallePedido = Loadable(lazy(() => import('../views/detallePedido')));
const DetalleOrden = Loadable(lazy(() => import('../views/detalleOrden')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/pedidos-pendientes',
            element: <DashboardDefault />
        },
        {
            path: '/ordenes-ingresadas',
            element: <Shipments />
        },
        {
            path: '/pedidos-pendientes/:idShipment',
            element: <DetallePedido />
        },
        {
            path: '/ordenes-ingresadas/:idShipment',
            element: <DetalleOrden />
        },
        {
            path: '/medicos',
            element: <Medicos/>
        },
        {
            path: '/medicos/alta-medico',
            element: <AltaMedicos/>
        },
        {
            path: '/pacientes',
            element: <></>
        }
    ]
};

export default MainRoutes;
