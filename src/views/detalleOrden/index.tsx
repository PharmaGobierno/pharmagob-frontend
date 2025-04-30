// material-ui
import { useEffect, useState } from 'react';
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
import { ShipmentDetails, ShipmentValidate } from '../../types/shipment';

const sxDivider = {
    borderColor: 'text.secondary'
};


const detalleOrden = () => {

    const { idShipment } = useParams();
    const [shipmentRows, setShipmentRows] = useState<ShipmentDetails[]>([]);
    const [receivedData, setReceivedData] = useState<ShipmentValidate[]>([]);
    const [initialValues, setInitialValues] = useState<{ receivedQuantities: Record<string, number> }>({ receivedQuantities: {} });

    useEffect(()=>{
        if(receivedData.length > 0){
            console.log({receivedData})
            const validateShipment = async () => {
                try {
                    const payload = {
                        "shipment_details": receivedData
                    }
                    const response = await axios.post(`/v1/shipments/${idShipment}/validate`, payload);
                    console.log({response})
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            }
            validateShipment();
        }
    }
    ,[receivedData]);

    useEffect(() => {
        if ( idShipment ) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/v1/shipments/${idShipment}/shipment-details`);
                    const { "shipment-details": shipmentDetails } = response.data.data
                    console.log({shipmentDetails})
                    setShipmentRows(shipmentDetails)
                    setInitialValues({
                        receivedQuantities: shipmentDetails.reduce((acc: ShipmentValidate, row: ShipmentDetails ) => ({ ...acc, [row._id]: row.quantity || 0 }), {})
                    });
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            }
            fetchData();
        };
    }, [idShipment]);


    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid size={{ xs: 12 }} >
                    <SubCard title="Datos del pedido" >
                        <Grid size={{ xs: 12 }}>
                            <Divider sx={sxDivider} />
                        </Grid>
                        <Grid container spacing={gridSpacing} sx={{ p: 2.5 }}>
                            <Grid size={{ xs: 12 }}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid size={{ xs: 12, sm:6, md:4}} >
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Identificador:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">{shipmentRows[0]?.shipment.id}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Id embarque:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">{shipmentRows[0]?.shipment.load_id}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2} >
                                            <Typography variant="h4">Estatus:</Typography>
                                            <Stack direction="row" spacing={1}>
                                                <Chip label="Aceptado" variant="outlined" size="small" chipcolor="success" />
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">No. de orden:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">{shipmentRows[0]?.shipment.order_number}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Tipo de envío:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">{shipmentRows[0]?.shipment.shipment_type}</Typography>
                                                </Stack>
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
                                                    <TableCell align="center">Fecha de creación</TableCell>
                                                    <TableCell align="center">Fecha de caducidad</TableCell>
                                                    <TableCell align="center">Enviado</TableCell>
                                                    <TableCell align="left">Recibido</TableCell>
                                                    <TableCell align="left">Completo</TableCell>
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
                                                        <TableCell align="center">{new Date(row.created_at).toLocaleDateString()}</TableCell>
                                                        <TableCell align="center">{ row.expiration_date ? new Date(row.expiration_date).toLocaleDateString() : null }</TableCell>
                                                        <TableCell align="center">{row.quantity}</TableCell>
                                                        <TableCell align="left">
                                                        </TableCell>
                                                        <TableCell align="left">
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
