import { CardContent, Grid, InputAdornment, Stack, TableContainer, TextField, Table as MUITable, TableBody, TablePagination, TablePaginationProps } from "@mui/material"
import MainCard from "../../ui-components/cards/MainCard"

import SearchIcon from '@mui/icons-material/Search';
import React, { ReactNode } from "react";

interface TableProps {
    actions?: ReactNode,
    header: ReactNode,
    children: ReactNode,
    pagination: TablePaginationProps
}

const Table = ({
    actions,
    header,
    children,
    pagination
}: TableProps) => {
    return (
        <MainCard>
            <CardContent>
                <Grid 
                    container
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Grid size={"grow"}>
                        <TextField
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Grid>
                    <Grid size="auto">
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                        >
                            {actions}
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
            <TableContainer>
                <MUITable sx={{minWidth: 800}}>
                    {header}
                    <TableBody>
                         {children}
                    </TableBody>
                </MUITable>
            </TableContainer>
            <TablePagination
                {...pagination}
                labelRowsPerPage= "Resultados por pagina"
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
            />
        </MainCard>
    )
}

export default Table