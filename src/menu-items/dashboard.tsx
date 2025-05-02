// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
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
            title: "Médicos",
            type: "collapse",
            icon: icons.IconDeviceAnalytics,
            children: [
                {
                    id: 'listado-medicos',
                    title: "Listado de médicos",
                    type: 'item',
                    url: '/medicos',
                    breadcrumbs: false
                },
                {
                    id: 'alta-medicos',
                    title: "Alta de médico",
                    type: 'item',
                    url: '/medicos/alta-medico',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'pacientes',
            title: "Pacientes",
            type: "collapse",
            icon: icons.IconDeviceAnalytics,
            children: [
                {
                    id: 'listado-pacientes',
                    title: "Listado de pacientes",
                    type: 'item',
                    url: '/pacientes',
                    breadcrumbs: false
                },
                {
                    id: 'alta-paciente',
                    title: "Alta de paciente",
                    type: 'item',
                    url: '/pacientes/alta-paciente',
                    breadcrumbs: false
                }
            ]
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
