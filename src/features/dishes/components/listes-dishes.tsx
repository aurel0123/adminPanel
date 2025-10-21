import { cn } from "@/lib/utils";
import { DishColumns as columns } from "@/features/dishes/components/dishes-columns";
import React from "react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useDishes } from "./dishes-provider";
import { Input } from "@/components/ui/input";
import DropDown from "@/features/categories/components/drop-down";
import {DataTablePagination} from "@/components/data-table/pagination.tsx";
import { DataTableBulkActions } from "./data-table-bulk-actions";
import { ButtonAddPrimary } from "./button-add-primary";

const ListesDishes = () => {
    const {dishes} = useDishes();
     const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data: dishes,
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
    });
  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
        "flex flex-1 flex-col gap-4"
      )}
    >
        <div className={"mt-2 flex justify-between items-center"}>
            <Input
                placeholder="Rechercher le nom d'un plats..."
                value={(table.getColumn("nameDish")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("nameDish")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <div className="flex gap-2 items-center">
                <DropDown table={table} />
                <ButtonAddPrimary/>
            </div>
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
  );
};

export default ListesDishes;
