// material-ui
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
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
    InputAdornment,
    Switch
} from '@mui/material';

// project imports
import SubCard from '../../ui-components/cards/SubCard';
import Chip from '../../ui-components/extended/Chip';
import { gridSpacing } from '../../store/constant';
import MainCard from '../../ui-components/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';


const sxDivider = {
    borderColor: 'text.secondary'
};

// table data
function createData(id: string, lote: string, nombre: string, tipo: string, enviados: number, recibidos: number, completo: boolean) {
    return { id, lote, nombre, tipo, enviados, recibidos, completo };
}

const rowsData = [
    createData('#790955', '3845648', 'METAFORMINA', 'Medicamento', 20, 20, true),
    createData('#790956', '3855648', 'ASPIRINA', 'Medicamento', 30, 20, false),
    createData('#790958', '3845236', 'IBOPRUFENO', 'Medicamento', 50, 50, true)
];

const detalleOrden = () => {
    const theme = useTheme();
    const [search, setSearch] = React.useState<string>('');
    const [rows, setRows] = React.useState<Customer[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['name', 'email', 'location', 'orders'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(/* detalle del pedido*/ null);
        }
    };

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
                            <Grid size={{ xs: 12 }}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid size={{ sm: 6, md: 4 }}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Origen:</Typography>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Nombre :</Typography>
                                                    <Typography variant="body2">Tamara</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Apellidos :</Typography>
                                                    <Typography variant="body2">Méndez Flores</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="h4">Dirección:</Typography>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Calle:</Typography>
                                                    <Typography variant="body2">Joanne Lane street</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Numero:</Typography>
                                                    <Typography variant="body2">4898</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Estado:</Typography>
                                                    <Typography variant="body2">Estado de México</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Municipio:</Typography>
                                                    <Typography variant="body2">Toluca</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Código Postal:</Typography>
                                                    <Typography variant="body2">02110</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Teléfono :</Typography>
                                                    <Typography variant="body2">+52 (55) 4123-4567</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ sm: 6, md: 4 }}>
                                    <Stack spacing={2}>
                                            <Typography variant="h4">Destino:</Typography>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Nombre :</Typography>
                                                    <Typography variant="body2">Tamara</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Apellidos :</Typography>
                                                    <Typography variant="body2">Méndez Flores</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="h4">Dirección:</Typography>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Calle:</Typography>
                                                    <Typography variant="body2">Joanne Lane street</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Numero:</Typography>
                                                    <Typography variant="body2">4898</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Estado:</Typography>
                                                    <Typography variant="body2">Estado de México</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Municipio:</Typography>
                                                    <Typography variant="body2">Toluca</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Código Postal:</Typography>
                                                    <Typography variant="body2">02110</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Teléfono :</Typography>
                                                    <Typography variant="body2">+52 (55) 4123-4567</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <SubCard content={false}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" color={theme.palette.grey[500]}>
                                            <SearchIcon fontSize="small" sx={{ color: theme.palette.grey[500]}}/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleSearch}
                                placeholder="Buscar"
                                value={search}
                                size="small"
                                sx={{ width: '100%', p: 2 }}
                            />
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ pl: 3 }}>Identificador</TableCell>
                                                <TableCell align="left">Lote</TableCell>
                                                <TableCell align="left">Nombre</TableCell>
                                                <TableCell align="left">Tipo</TableCell>
                                                <TableCell align="left">Enviados</TableCell>
                                                <TableCell align="left">Recibidos</TableCell>
                                                <TableCell align="left">Completo</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rowsData.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ pl: 3 }}>
                                                        <Typography align="left" variant="subtitle1">
                                                            {row.id}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">{row.lote}</TableCell>
                                                    <TableCell align="left">{row.nombre}</TableCell>
                                                    <TableCell align="left">{row.tipo}</TableCell>
                                                    <TableCell align="left">{row.enviados}</TableCell>
                                                    <TableCell align="left">
                                                        <TextField
                                                            id="recibido"
                                                            name="recibido"
                                                            value={row.recibidos}
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
                            <Grid size={{ xs: 12 }}>
                                <SubCard
                                    sx={{
                                        mx: 3,
                                        mb: 3,
                                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
                                    }}
                                >
                                    <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                                        <Grid size={{ sm: 6, md: 4 }}>
                                            <Grid container spacing={2} sx={{ p: 2}}>
                                                <Grid size={{ xs: 12 }}>
                                                    <Grid container spacing={1}>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography align="right" variant="subtitle1">
                                                                Total Enviados :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography align="right" variant="body2">
                                                                100
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography align="right" variant="subtitle1">
                                                                Total Recibidos :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography align="right" variant="body2">
                                                                90
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography align="right" variant="subtitle1">
                                                                Total completados :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography align="right" variant="body2">
                                                                2/3
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <Divider sx={{ bgcolor: 'dark.main' }} />
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <Grid container spacing={1}>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography align="right" color="primary" variant="subtitle1">
                                                                Total :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography align="right" color="primary" variant="subtitle1">
                                                                $4827.00
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default detalleOrden;
