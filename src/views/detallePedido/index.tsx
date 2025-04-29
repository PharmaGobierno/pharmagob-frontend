// material-ui
import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
    Divider,
    Stack,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

// project imports
import SubCard from '../../ui-components/cards/SubCard';
import { gridSpacing } from '../../store/constant';
import MainCard from '../../ui-components/cards/MainCard';
import axios from '../../utils/axios';
import { ShipmentDetails } from '../../types/shipment';

const sxDivider = {
    borderColor: 'text.secondary'
};


const detallePedido = () => {
    const { idOrder } = useParams();
    const [shipmentRows, setShipmentRows] = React.useState<ShipmentDetails[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v1/shipments/${idOrder}/shipment-details`);
                const { "shipment-details": shipmentDetails } = response.data.data
                console.log({shipmentDetails})
                setShipmentRows(shipmentDetails)
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
            <Grid size={{ xs: 12 }} >
                    <SubCard title={`Datos del pedido:`} >
                        <Grid container spacing={gridSpacing} sx={{ p: 2.5 }}>
                            <Typography variant="subtitle1">{idOrder}</Typography>
                            <Grid size={{ xs: 12 }}>
                                <Divider sx={sxDivider} />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <SubCard content={false}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ pl: 3 }}>Identificador</TableCell>
                                                <TableCell align="left">Lote</TableCell>
                                                <TableCell align="left">Marca</TableCell>
                                                <TableCell align="left">Id. embarque</TableCell>
                                                <TableCell align="left">Tipo de envío</TableCell>
                                                <TableCell align="left">No. de orden</TableCell>
                                                <TableCell align="center">Fecha de creación</TableCell>
                                                <TableCell align="center">Fecha de expiración</TableCell>
                                                <TableCell align="center">Cantidad</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {shipmentRows?.map((row: ShipmentDetails, index: number) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ pl: 3 }}>
                                                        <Typography align="left" variant="subtitle1">
                                                            {row.item.id}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">{row.lot}</TableCell>
                                                    <TableCell align="left">{row.brand}</TableCell>
                                                    <TableCell align="left">{row.shipment.load_id}</TableCell>
                                                    <TableCell align="left">{row.shipment.shipment_type}</TableCell>
                                                    <TableCell align="left">{row.shipment.order_number}</TableCell>
                                                    <TableCell align="center">{new Date(row.created_at).toLocaleDateString()}</TableCell>
                                                    <TableCell align="center">{ row.expiration_date ? new Date(row.expiration_date).toLocaleDateString() : null }</TableCell>
                                                    <TableCell align="center">{row.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default detallePedido;
