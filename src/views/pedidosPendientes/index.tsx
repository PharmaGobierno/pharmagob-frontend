import {useEffect, useState} from 'react';

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import SearchOffIcon from '@mui/icons-material/SearchOff';

// material-ui
import { useDispatch, useSelector } from '../../store';
import Table from '../../components/Table/Table';
import { TableHeader, TableHeaderCell } from '../../components/Table/TableHeader';
import { IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { getShipments, setPagination } from '../../store/slices/shipment';


const PedidosPendientes = () => {
    const dispatch = useDispatch();
    const {page, limit, records} = useSelector(state => state.shipment)
    
    useEffect(() => {
        dispatch(getShipments({page, limit}))
    }, [page, limit])

   return ( 
    <Table
        header={
            <TableHeader>
                <TableHeaderCell>Orden</TableHeaderCell>
                <TableHeaderCell align='center'>Tipo</TableHeaderCell>
                <TableHeaderCell align='center'>Estatus</TableHeaderCell>
                <TableHeaderCell align='center'>Registro</TableHeaderCell>
                <TableHeaderCell align='center'>Acciones</TableHeaderCell>
            </TableHeader>
        }
        pagination={{
            onPageChange: (_, _page) => {
                
            },
            count: 20,
            page: page,
            rowsPerPage: limit
        }}
    >
        {
            records?.length > 0 && records.map((shipment) => (
                <TableRow
                    key={shipment.order_number}
                >
                    <TableCell>{shipment.order_number}</TableCell>
                    <TableCell>{shipment.shipment_type}</TableCell>
                    <TableCell>{shipment.status}</TableCell>
                    <TableCell>{shipment.created_at.toDateString()}</TableCell>
                    <TableCell>
                        <IconButton size="large">
                            <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))
        }
        {
            records?.length < 1 && (
                <TableRow>
                    <TableCell align='center' colSpan={5}>
                        <Stack alignItems={"center"} spacing={2}>
                            <SearchOffIcon fontSize='large'/>
                            <Typography variant='caption'>
                                No se encontraron resultados.
                            </Typography>
                        </Stack>
                    </TableCell>
                </TableRow>
            )
        }
    </Table>
   )
};

export default PedidosPendientes;
