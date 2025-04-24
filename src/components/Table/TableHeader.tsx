import { Box, TableCell, TableHead, TableRow, TableSortLabel, TableSortLabelProps } from "@mui/material"
import { ReactNode } from "react"

type TableHeaderCellProps = {
    sortable?: TableSortLabelProps,
    order: 'asc' | 'desc' | undefined,
    children: React.ReactNode
}

export const TableHeaderCell = ({
    sortable,
    order,
    children
}: TableHeaderCellProps) => {
    return(
        <TableCell>
            {
                sortable && (
                    <TableSortLabel
                        {...sortable}
                    >
                        {
                            children
                        }
                        {
                            order && (
                                <Box component="span">
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                            )
                        }
                    </TableSortLabel>
                )
            }

            {
                !sortable && (
                    <Box sx={{ fontWeight: "bold" }}>{children}</Box>
                )
            }
        </TableCell>
    )
}

export const TableHeader = ({children}: {children: ReactNode}) => {
    return(
        <TableHead>
            <TableRow>
                {children}
            </TableRow>
        </TableHead>
    )
}