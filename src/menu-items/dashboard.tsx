// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';
import { OverrideIcon } from '../types';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface DashboardMenuProps {
    id: string;
    title: React.ReactNode | string;
    type: string;
    children: {
        id: string;
        title: React.ReactNode | string;
        type: string;
        url: string;
        icon: OverrideIcon;
        breadcrumbs: boolean;
    }[];
}

const dashboard: DashboardMenuProps = {
    id: 'inicio',
    title: '',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Pedidos Pendientes',
            type: 'item',
            url: '/pedidos-pendientes',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'ordenes-ingresadas',
            title: 'Ordenes Ingresadas',
            type: 'item',
            url: '/ordenes-ingresadas',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'medicos',
            title: 'Médicos',
            type: 'item',
            url: '/medicos',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'pacientes',
            title: 'Pacientes',
            type: 'item',
            url: '/pacientes',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'recetas',
            title: 'Recetas',
            type: 'item',
            url: '/recetas',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'inventario',
            title: 'Inventario',
            type: 'item',
            url: '/inventario',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
