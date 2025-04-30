// material-ui
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Stack
} from '@mui/material';
import Chip from '../../ui-components/extended/Chip';

// project imports
import SubCard from '../../ui-components/cards/SubCard';
import { gridSpacing } from '../../store/constant';
import MainCard from '../../ui-components/cards/MainCard';
import axios from '../../utils/axios';
import { ShipmentDetails, Shipment } from '../../types/shipment';

const sxDivider = {
    borderColor: 'text.secondary'
};


const detallePedido = () => {
    const { idShipment = null } = useParams();
    const [shipment, setShipment] = useState<Shipment>();
    const [shipmentRows, setShipmentRows] = useState<ShipmentDetails[]>([])


    useEffect(() => {
        if ( idShipment ) {
            const fetchShipment = async () => {
                try {
                    const response = await axios.get(`/v1/shipments/${idShipment}`);
                    const { "shipment": shipmentresponse } = response.data.data
                    console.log({shipmentresponse})
                    setShipment(shipmentresponse)
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            }
            const fetchShipmentDetails = async () => {
                try {
                    const response = await axios.get(`/v1/shipments/${idShipment}/shipment-details`);
                    const { "shipment-details": shipmentDetails } = response.data.data
                    setShipmentRows(shipmentDetails)
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            }

            fetchShipment();
            fetchShipmentDetails();
        };
    }, [idShipment]);

    const reviewStatusTranslations = {
        NOT_EVALUATED: "No evaluado",
        REJECTED: "Rechazado",
        APPROVED: "Aprobado",
        PARTIAL_APPROVED: "Parcialmente aprobado"
    };
    const reviewStatusColors = {
        NOT_EVALUATED: "default",
        REJECTED: "error",
        APPROVED: "success",
        PARTIAL_APPROVED: "warning"
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
            <Grid size={{ xs: 12 }} >
                    <SubCard title={`Datos del pedido:`} >
                        <Grid size={{ xs: 12 }}>
                            <Divider sx={sxDivider} />
                        </Grid>
                        <Grid container spacing={gridSpacing} sx={{ p: 2.5 }}>
                            <Grid size={{ xs: 12 }}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Id embarque:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">{shipment?.load_id}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">No. de orden:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">{shipment?.order_number}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Tipo de envío:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">{shipment?.shipment_type}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2} >
                                            <Typography variant="h4">Estatus:</Typography>
                                            <Stack direction="row" spacing={1}>
                                                <Chip label={reviewStatusTranslations[shipment?.review_status] || "Estado desconocido"} variant="outlined" size="small" chipcolor={reviewStatusColors[shipment?.review_status] || "default"} />
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
