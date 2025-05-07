import {useEffect, useState} from 'react';
import { PatientStateProps } from '../../types/patient';


import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import SearchOffIcon from '@mui/icons-material/SearchOff';

// material-ui
import { useDispatch, useSelector } from '../../store';
import Table from '../../components/Table/Table';
import { TableHeader, TableHeaderCell } from '../../components/Table/TableHeader';
import { Chip, ChipOwnProps, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { getPatients, setPagination } from '../../store/slices/patient';
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

const Pacientes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState<Boolean>(false)
    const [dateSort, setDateSort] = useState<"asc" | "desc" >("desc")
    const {page, limit, count, records, search} = useSelector<PatientStateProps>(state => state.patient)
    
    useEffect(() => {
            dispatch(getPatients({page, limit, sort: ["created_at", dateSort], search}))
            setLoading(true)
    }, [page, limit, dateSort, search])

    useEffect(() => {
        if(records.length > 1 && loading) setLoading(false)
    }, [records])

   return ( 
    <Table
        loading={loading}
        onSearch={(value: string) => {
            if(value.length > 2) dispatch(setPagination({search: value}))
            if(value.length < 1) dispatch(setPagination({search: ""}))
        }}
        header={
            <TableHeader>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell align='center'>Ubicación</TableHeaderCell>
                <TableHeaderCell align='center'>CURP</TableHeaderCell>
                <TableHeaderCell align='center'>Teléfono</TableHeaderCell>
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
            records?.length > 0 && records.map((patient) => {
                let date = new Date(Number(patient.created_at)).toLocaleDateString()
                
                let name = [patient.name, patient.last_name_1]
                if(patient.last_name_2) name.push(patient.last_name_2)

                return (
                    (
                        <TableRow
                            key={`${patient._id}`}
                        >
                            <TableCell>{name.join(" ")}</TableCell>
                            <TableCell align='center'>{`${patient.municipality} (${patient.postal_code}), ${patient.state}`}</TableCell>
                            <TableCell align='center'>{patient.curp}</TableCell>
                            <TableCell align='center'>{patient.phone_number}</TableCell>
                            <TableCell align='center'>{date}</TableCell>
                            <TableCell align='center'>
                                <IconButton size="large" onClick={() => navigate(`/pacientes/${patient._id}`)}>
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
                    <TableCell align='center' colSpan={6}>
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

export default Pacientes;
