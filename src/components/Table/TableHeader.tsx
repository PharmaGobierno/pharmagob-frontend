import { Box, TableCell, TableHead, TableRow, TableSortLabel, TableSortLabelProps } from "@mui/material"
import { ReactNode } from "react"

type TableHeaderCellProps = {
    sortable?: TableSortLabelProps,
    children: React.ReactNode,
    align?: 'center' | 'left' | 'right'
}

export const TableHeaderCell = ({
    sortable,
    children,
    align = 'left'
}: TableHeaderCellProps) => {
    return(
        <TableCell
            sx={{
                textAlign: align
            }}
        >
            {
                sortable && (
                    <TableSortLabel
                        {...sortable}
                        sx={{fontWeight: "bold"}}
                    
                    >
                        {
                            children
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
        <TableHead
        >
            <TableRow>
                {children}
            </TableRow>
        </TableHead>
    )
}