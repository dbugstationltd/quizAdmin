import {
  DataGrid,
  GridColDef,
  GridRowClassNameParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";

type GridProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
  disableColumnSorting?: boolean;
  disableColumnFilter?: boolean;
  disableColumnMenu?: boolean;
  hideFooter?: boolean;
  loading?: boolean;
  apiRef?: React.MutableRefObject<GridApiCommunity>;
  getRowClassName?:
    | ((params: GridRowClassNameParams<any>) => string)
    | undefined;
};

const MyDataGrid = ({
  rows,
  columns,
  disableColumnSorting,
  disableColumnFilter,
  disableColumnMenu,
  getRowClassName,
  loading,
  apiRef,
  hideFooter,
}: GridProps) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sx={{
        border: 0,
        fontWeight: "500",
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 600,
          fontSize: "15px",
        },
        "& .MuiDataGrid-cell": {
          fontSize: "13px",
          color: "#030229",
        },
      }}
      rowHeight={56}
      disableRowSelectionOnClick
      disableColumnSorting={disableColumnSorting}
      disableColumnFilter={disableColumnFilter}
      disableColumnMenu={disableColumnMenu}
      getRowClassName={getRowClassName}
      pageSizeOptions={[10, 20, 50]}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      hideFooter={hideFooter}
      loading={loading}
      autoHeight
      apiRef={apiRef}
    />
  );
};

export default MyDataGrid;
