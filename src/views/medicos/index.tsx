import {useEffect, useState} from 'react';
import { MedicSpecialty, MedicStateProps } from '../../types/medic';


import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import SearchOffIcon from '@mui/icons-material/SearchOff';

// material-ui
import { useDispatch, useSelector } from '../../store';
import Table from '../../components/Table/Table';
import { TableHeader, TableHeaderCell } from '../../components/Table/TableHeader';
import { Chip, ChipOwnProps, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { getMedics, setPagination } from '../../store/slices/medic';
import { useNavigate } from 'react-router-dom';

const StatusTag: ChipOwnProps[] = [
    {
        label: "Despachado"
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

const Medicos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState<Boolean>(false)
    const [dateSort, setDateSort] = useState<"asc" | "desc" >("desc")
    const {page, limit, count, records} = useSelector<MedicStateProps>(state => state.medic)
    
    useEffect(() => {
        dispatch(getMedics({page, limit, sort: ["created_at", dateSort]}))
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
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell align='center'>No. Empleado</TableHeaderCell>
                <TableHeaderCell align='center'>Cedula</TableHeaderCell>
                <TableHeaderCell align='center'>Especialidad</TableHeaderCell>
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
            records?.length > 0 && records.map((medic) => {
                let date = new Date(Number(medic.created_at)).toLocaleDateString()

                let name = []
                if(medic.name) name.push(medic.name)
                if(medic.last_name_1) name.push(medic.last_name_1)
                if(medic.last_name_2) name.push(medic.last_name_2)

                return (
                    (
                        <TableRow
                            key={`${medic._id}`}
                        >
                            <TableCell>{name.join(" ")}</TableCell>
                            <TableCell align='center'>{medic.employee_number}</TableCell>
                            <TableCell align='center'>{medic.profesional_licence}</TableCell>
                            <TableCell align='center'>{MedicSpecialty[medic.specialty]}</TableCell>
                            <TableCell align='center'>{}</TableCell>
                            <TableCell align='center'>{date}</TableCell>
                            <TableCell align='center'>
                                <IconButton size="large" onClick={() => navigate(`/medicos/${medic._id}`)}>
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

export default Medicos;
