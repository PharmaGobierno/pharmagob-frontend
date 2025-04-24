import { Box, TableCell, TableHead, TableRow, TableSortLabel, TableSortLabelProps } from "@mui/material"
import { ReactNode } from "react"

type TableHeaderCellProps = {
    sortable?: TableSortLabelProps,
    order?: 'asc' | 'desc' | undefined,
    children: React.ReactNode,
    align?: 'center' | 'left' | 'right'
}

export const TableHeaderCell = ({
    sortable,
    order = undefined,
    children,
    align = 'left'
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
                    <Box sx={{ fontWeight: "bold" }} textAlign={align}>{children}</Box>
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