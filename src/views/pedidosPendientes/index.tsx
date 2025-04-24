import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import Chip from '../../ui-components/extended/Chip';
import MainCard from '../../ui-components/cards/MainCard';
import { Customer } from '../../types/customer';
import { useDispatch, useSelector } from '../../store';
import { getCustomers } from '../../store/slices/customer';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { GetComparator, EnhancedTableHeadProps, HeadCell, ArrangementOrder, KeyedObject } from '../../types';

// table sort
function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator: GetComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array: Customer[], comparator: (a: Customer, b: Customer) => number) {
    const stabilizedThis = array?.map((el: Customer, index: number) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0] as Customer, b[0] as Customer);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis?.map((el) => el[0]);
}

// table header options
const headCells: HeadCell[] = [
    {
        id: 'order_number',
        numeric: false,
        label: 'Orden',
        align: 'left'
    },
    {
        id: 'shipment_type',
        numeric: true,
        label: 'Tipo',
        align: 'center'
    },
    {
        id: 'status',
        numeric: true,
        label: 'Estatus',
        align: 'center'
    },
    {
        id: 'created_at',
        numeric: true,
        label: 'Registered',
        align: 'center'
    }
];

// ==============================|| TABLE HEADER ||============================== //

interface CustomerListEnhancedTableHeadProps extends EnhancedTableHeadProps {
    selected?: string[];
}

function EnhancedTableHead({
    order,
    orderBy,
    numSelected,
    onRequestSort,
}: CustomerListEnhancedTableHeadProps) {
    const theme = useTheme();
    const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                sx={{ color:theme.palette.text.secondary, fontWeight: "bold" }}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }} color='secondary'>
                        <Box sx={{ color:theme.palette.text.secondary, fontWeight: "bold" }}>Acciones</Box>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

// ==============================|| TABLE HEADER TOOLBAR ||============================== //



// ==============================|| CUSTOMER LIST ||============================== //

const PedidosPendientes = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(20);
    const [search, setSearch] = React.useState<string>('');
    const [rows, setRows] = React.useState<Customer[]>([]);
    const { customers } = useSelector((state) => state.customer);
    
    React.useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);
    React.useEffect(() => {
        console.log("customers", customers)
        setRows(customers);
    }, [customers]);

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
            setRows(customers);
        }
    };

    const handleRequestSort = (event: React.SyntheticEvent<Element, Event>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    
    return (
        <MainCard content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" color={theme.palette.grey[500]}>
                                            <SearchIcon fontSize="small" sx={{ color: theme.palette.grey[500]}}/>
                                        </InputAdornment>
                                    )
                                }
                            }}
                            onChange={handleSearch}
                            placeholder="Buscar"
                            value={search}
                            size="small"
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}} sx={{ textAlign: 'right' }}>
                        <Tooltip title="Copy">
                            <IconButton size="large">
                                <FileCopyIcon sx={{ color: theme.palette.grey[500]}}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                            <IconButton size="large">
                                <PrintIcon  sx={{ color: theme.palette.grey[500]}}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton size="large">
                                <FilterListIcon  sx={{ color: theme.palette.grey[500]}}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected?.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows?.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const labelId = `enhanced-table-${index}`;

                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <TableCell
                                            id={labelId}
                                            scope="row"
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.500' : 'grey.900' }}
                                            >
                                                {row.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.status === 1 && <Chip label="Complete" size="small" chipcolor="success" />}
                                            {row.status === 2 && <Chip label="Processing" size="small" chipcolor="orange" />}
                                            {row.status === 3 && <Chip label="Confirm" size="small" chipcolor="primary" />}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.status === 1 && <Chip label="Complete" size="small" chipcolor="success" />}
                                            {row.status === 2 && <Chip label="Processing" size="small" chipcolor="orange" />}
                                            {row.status === 3 && <Chip label="Confirm" size="small" chipcolor="primary" />}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: theme.palette.text.secondary }}>{row.date}</TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <IconButton color="secondary" size="large">
                                                <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <IconButton color="secondary" size="large">
                                                <EditTwoToneIcon sx={{ fontSize: '1.3rem', color: theme.palette.text.secondary }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* table pagination */}
            <TablePagination
                labelRowsPerPage= "Filas por páginas"
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                color={ theme.palette.text.secondary}
                sx={ { color: theme.palette.text.secondary } }
            />
        </MainCard>
    );
};

export default PedidosPendientes;
