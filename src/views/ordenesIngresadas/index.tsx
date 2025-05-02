import {useEffect, useState} from 'react';

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import SearchOffIcon from '@mui/icons-material/SearchOff';

// material-ui
import { useDispatch, useSelector } from '../../store';
import Table from '../../components/Table/Table';
import { TableHeader, TableHeaderCell } from '../../components/Table/TableHeader';
import { Chip, ChipOwnProps, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { getShipments, setPagination } from '../../store/slices/shipment';
import { useNavigate } from 'react-router-dom';
import { ShipmentReviewStatus, ShipmentReviewStatusEnum, ShipmentStateProps, ShipmentTypeEnum } from '../../types/shipment';



const ReviewTag: ChipOwnProps[] = [
    {
        label: "Sin Validar",
        variant: "outlined"
    },
    {
        label: "Rechazado",
        color: "error"
    },
    {
        label: "Aprobado",
        color: "success"
    },
    {
        label: "Parcial",
        color: "warning"
    }
]

const TypeTag: ChipOwnProps[] = [
    {
        label: "Urgente",
        color: "error"
    },
    {
        label: "Estandar",
        color: "success"
    },
    {
        label: "Soporte Vital",
        color: "info"
    },
    {
        label: "Extraordinario",
        color: "warning"
    }
]

const OrdenesIngresadas = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState<Boolean>(false)
    const [dateSort, setDateSort] = useState<"asc" | "desc" >("desc")
    const {page, limit, count, records} = useSelector<ShipmentStateProps>(state => state.shipment)
        
    useEffect(() => {
        dispatch(getShipments({page, limit, sort: ["created_at", dateSort]}))
        setLoading(true)
    }, [page, limit, dateSort])

    useEffect(() => {
        if(records.length > 1 && loading) setLoading(false)
    }, [records])

   return ( 
    <Table
        loading={loading}
        header={
            <TableHeader>
                <TableHeaderCell>Orden</TableHeaderCell>
                <TableHeaderCell align='center'>Tipo</TableHeaderCell>
                <TableHeaderCell align='center'>Estatus</TableHeaderCell>
                <TableHeaderCell
                 align='center'
                 sortable={{
                    active: !!dateSort,
                    onClick: () => {
                        if(loading) return

                        setDateSort(prev => {
                            if(prev === "asc") return "desc"
                            return "asc"   
                        })
                    },
                    direction: dateSort || "asc",
                 }}
                >Registro</TableHeaderCell>
                <TableHeaderCell align='center'>Acciones</TableHeaderCell>
            </TableHeader>
        }
        pagination={{
            onPageChange: (_, _page) => {
                dispatch(setPagination({page: _page + 1}))
            },
            onRowsPerPageChange(e){
                dispatch(setPagination({limit: Number(e.target.value)}))
            },
            count: count,
            page: page,
            rowsPerPage: limit
        }}
    >
        {
            records?.length > 0 && records.map((shipment) => {
                let date = new Date(Number(shipment.created_at)).toLocaleDateString()

                return (
                    (
                        <TableRow
                            key={`${shipment.load_id}-${shipment.order_number}`}
                        >
                            <TableCell>{shipment.order_number}</TableCell>
                            <TableCell align='center'>
                                <Chip
                                    {
                                        ...TypeTag[ShipmentTypeEnum[shipment.shipment_type]]
                                    }
                                />
                            </TableCell>
                            <TableCell align='center'>
                                <Chip
                                    {
                                        ...ReviewTag[ShipmentReviewStatusEnum[shipment.review_status]]
                                    }
                                /> 
                            </TableCell>
                            <TableCell align='center'>{date}</TableCell>
                            <TableCell align='center'>
                                <IconButton size="large" onClick={() => navigate(`/pedidos-pendientes/${shipment._id}`)}>
                                    <VisibilityTwoToneIcon color='primary' sx={{ fontSize: '1.3rem' }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                )
            })
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

export default OrdenesIngresadas;
