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
    Switch,
    Button,
    CircularProgress
} from '@mui/material';

// project imports
import axios from '../../utils/axios';
import { useDispatch } from '../../store';
import { openSnackbar } from '../../store/slices/snackbar';
import { gridSpacing } from '../../store/constant';
import Chip from '../../ui-components/extended/Chip';
import SubCard from '../../ui-components/cards/SubCard';
import MainCard from '../../ui-components/cards/MainCard';
import { ShipmentDetails, ShipmentValidate, Shipment } from '../../types/shipment';

import { useFormik } from "formik";


const sxDivider = {
    borderColor: 'text.secondary'
};


const detalleOrden = () => {
    const dispatch = useDispatch();
    const { idShipment } = useParams();
    const [shipment, setShipment] = useState<Shipment>();
    const [loading, setLoading] = useState<Boolean>(false)
    const [shipmentRows, setShipmentRows] = useState<ShipmentDetails[]>([]);
    const [receivedData, setReceivedData] = useState<ShipmentValidate[]>([]);
    const [initialValues, setInitialValues] = useState<{ receivedQuantities: Record<string, number> }>({ receivedQuantities: {} });

    useEffect(() => {
        if ( idShipment ) {
            const fetchShipment = async () => {
                try {
                    const response = await axios.get(`/v1/shipments/${idShipment}`);
                    const { "shipment": shipmentresponse } = response.data.data
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
                    setInitialValues({
                        receivedQuantities: shipmentDetails.reduce((acc: ShipmentValidate, row: ShipmentDetails ) => ({ ...acc, [row._id]: row.quantity || 0 }), {})
                    });
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            }
            
            setLoading(true);
            fetchShipment();
            fetchShipmentDetails();
        };
    }, [idShipment]);

    useEffect(()=>{
        if(receivedData.length > 0){
            const validateShipment = async () => {
                try {
                    const payload = {
                        "shipment_details": receivedData
                    }
                    const response = await axios.post(`/v1/shipments/${idShipment}/validate`, payload);
                    if ( response?.status === 200){
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Pedido Validado',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: false
                            })
                        );
                    } else {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: `Error: ${response?.data.status} /n ${response?.data?.errors[0]?.message}`,
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: false
                            })
                        );
                    }
                } catch (error) {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: `Error: ${error}`,
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: false
                        })
                    );
                }
            }
            validateShipment();
        }
    }
    ,[receivedData]);

    useEffect(() => {
        if(shipmentRows.length > 1 && shipment && loading) setLoading(false)
    }, [shipmentRows, shipment])

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,  // Permite reinicializar valores cuando cambian
        onSubmit: values => {
            const formattedData = shipmentRows.map(row => ({
                shipment_detail_id: row._id,
                accepted_quantity: values.receivedQuantities[row._id]
            }));
            setReceivedData(formattedData);
        }
    });

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
            { loading ? (
                <Stack alignItems={"center"} spacing={2}>
                    <CircularProgress/>
                </Stack>
            ) : (
            <Grid container spacing={gridSpacing}>
                <Grid size={{ xs: 12 }} >
                    <SubCard title="Datos del pedido" >
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
                                    <Grid size={{ xs: 12, sm:6, md:4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Fecha de creación:</Typography>
                                            <Stack spacing={0}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">{ shipment?.created_at ? new Date(shipment?.created_at).toLocaleDateString() : null }</Typography>
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
                                <form onSubmit={formik.handleSubmit}>
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
                                                            <TextField
                                                               id={`recibido-${row._id}`}
                                                               name={`receivedQuantities.${row._id}`}
                                                               value={formik.values.receivedQuantities[row._id]}
                                                               onChange={formik.handleChange}
                                                               type="number"
                                                               InputProps={{ inputProps: { min: 0, max: row.quantity } }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                        <Switch
                                                           checked={formik.values.receivedQuantities[row._id] === row.quantity}
                                                        />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Grid  size={{ xs: 12 }} spacing={gridSpacing} sx={{ p: 2.5 }}>
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <Button variant="contained" type="submit">
                                                    Guardar
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
            )}
        </MainCard>
    );
};

export default detalleOrden;
