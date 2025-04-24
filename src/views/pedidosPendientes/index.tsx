import {useEffect, useState} from 'react';

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import SearchOffIcon from '@mui/icons-material/SearchOff';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useDispatch } from '../../store';
import Table from '../../components/Table/Table';
import { TableHeader, TableHeaderCell } from '../../components/Table/TableHeader';
import { IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import axios from 'axios';

interface Shipment {
    umu_id: string,
    _id: string,
    order_number: string,
    load_id: string,
    order_id: string,
    status:  ShipmentStatus,
    review_status: ShipmentReviewStatus,
    shipment_type: string,
    application_date: Date,
    user?: null,
    updated_at: Date,
    created_at: Date,
    version: string
}

enum ShipmentStatus {
    DISPATCHED
}

enum ShipmentReviewStatus {
    NOT_EVALUATED,
    REJECTED,
    APPROVED,
    PARTIAL_APPROVED
}

interface Pagination {
    count: number,
    page: number,
    rows: number
}


const PedidosPendientes = () => {
    const dispatch = useDispatch();
    const [shipments, setShipments] = useState<Shipment[]>([])
    const [pagination, setPagination] = useState<Pagination>({
        count: 0,
        page: 0,
        rows: 20
    })

    useEffect(() => {
        getShipments()
    }, [])

    const getShipments = async () => {
        try{
            const response = await axios.get("https://pharma-gateway-682pqs65.uc.gateway.dev/v1/shipments")
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

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
            onPageChange: () => {},
            count: pagination.count,
            page: pagination.page,
            rowsPerPage: pagination.rows
        }}
    >
        {
            shipments?.length > 0 && shipments.map((shipment) => (
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
            shipments?.length < 1 && (
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
