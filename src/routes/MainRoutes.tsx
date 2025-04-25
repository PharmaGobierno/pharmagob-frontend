import { lazy } from 'react';
// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-components/Loadable';

const DashboardDefault = Loadable(lazy(() => import('../views/pedidosPendientes')));
const Shipments = Loadable(lazy(() => import('../views/ordenesIngresadas')));
const DetallePedido = Loadable(lazy(() => import('../views/detallePedido')));
const DetalleOrden = Loadable(lazy(() => import('../views/detalleOrden')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <MainLayout />
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
            path: '/medicos',
            element: <DetallePedido />
        },
        {
            path: '/pacientes',
            element: <DetalleOrden />
        }
    ]
};

export default MainRoutes;
