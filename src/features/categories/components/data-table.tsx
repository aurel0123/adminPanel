import {cn} from "@/lib/utils.ts";
import {CategoriesColumns as columns} from "@/features/categories/components/categorie-columns.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type {Categorie} from "@/features/categories/data/schema.ts";
import {
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import {useState} from "react";
import {DataTablePagination} from "@/components/data-table/pagination.tsx";
import {DataTableBulkActions} from "@/features/categories/components/data-table-bulk-actions.tsx";
import {Input} from "@/components/ui/input.tsx";
import DropDown from "@/features/categories/components/drop-down.tsx";
interface  DataTableProps {
    count?: number,
    next?: () => void | null ,
    prev?: () => void | null ,
    results : Categorie[]
}

export default function DataTable({results }: DataTableProps) {
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data:results,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    return (
        <div
            className={cn(
                'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
                'flex flex-1 flex-col gap-4'
            )}
        >
            <div className={"mt-2 flex justify-between items-center"}>
                <Input
                    placeholder="Filter nom de catégorie..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropDown table={table} />
            </div>
            <div className='overflow-hidden rounded-md border mt-4'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => {
                                        return(
                                            <TableHead
                                                key={header.id}
                                                colSpan={header.colSpan}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {
                                            row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className='h-24 text-center'
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} className='mt-auto' />
            <DataTableBulkActions table={table}/>
        </div>
    )
}