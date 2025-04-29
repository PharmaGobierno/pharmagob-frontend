// material-ui
import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
    Divider,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Switch
} from '@mui/material';

// project imports

import axios from '../../utils/axios';
import { gridSpacing } from '../../store/constant';
import Chip from '../../ui-components/extended/Chip';
import SubCard from '../../ui-components/cards/SubCard';
import MainCard from '../../ui-components/cards/MainCard';
import { ShipmentDetails } from '../../types/shipment';



const sxDivider = {
    borderColor: 'text.secondary'
};


const detalleOrden = () => {
    const { idShipment } = useParams();
    const [shipmentRows, setShipmentRows] = React.useState<ShipmentDetails[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v1/shipments/${idShipment}/shipment-details`);
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
                    <SubCard title="Datos del pedido" >
                        <Grid container spacing={gridSpacing} sx={{ p: 2.5 }}>
                            <Grid size={{ xs: 12 }}>
                                <Divider sx={sxDivider} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid size={{ xs: 12, sm:6, md:4}} >
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Identificador:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">INV-f1a19506-ebdf-4832-9bee-ebb243adaef8</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Fecha de creación:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">12/08/2025</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={0} sx={{ mt: { xs: 0, md: 3 } }}>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Estatus:</Typography>
                                                <Chip label="Aceptado" variant="outlined" size="small" chipcolor="success" />
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
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
                                                <TableCell align="center">Fecha de caducidad</TableCell>
                                                <TableCell align="center">Enviado</TableCell>
                                                <TableCell align="center">Recibido</TableCell>
                                                <TableCell align="center">Completo</TableCell>
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
                                                    <TableCell align="left">
                                                        <TextField
                                                            id="recibido"
                                                            name="recibido"
                                                            value={row.quantity}
                                                            placeholder="Invoice #"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Switch
                                                        />
                                                    </TableCell>
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

export default detalleOrden;
