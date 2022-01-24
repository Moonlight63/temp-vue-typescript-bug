type DataTableRow = Record<string, unknown>
type DataTableRows = Array<DataTableRow>

type DataTableColumn =
  | string
  | {
      key?: string
      label?: string
      sortable?: boolean
      idx?: string
    }

type DataTableColumns = Array<DataTableColumn>

export {
  DataTableRow,
  DataTableRows,
  DataTableColumns,
  DataTableColumn,
}
