import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { HeadCell } from '../../types';
import { useDispatch } from '../../store';

// table header options
const headCells: HeadCell[] = [
    {
        id: 'order_number',
        numeric: false,
        label: 'Orden',
        align: 'left'
    },
    {
        id: 'shipment_type',
        numeric: true,
        label: 'Tipo',
        align: 'center'
    },
    {
        id: 'status',
        numeric: true,
        label: 'Estatus',
        align: 'center'
    },
    {
        id: 'created_at',
        numeric: true,
        label: 'Registered',
        align: 'center'
    }
];
const PedidosPendientes = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

   
};

export default PedidosPendientes;
