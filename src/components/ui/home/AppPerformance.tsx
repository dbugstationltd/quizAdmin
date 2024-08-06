import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import MyDataGrid from "../../dataGrid/MyDataGrid";

const rows = [
  {
    id: 1,
    app: "Live tv",
    estimatedEarning: 256,
    impression: 6005005,
  },
  {
    id: 2,
    app: "Connect Vpn app",
    estimatedEarning: 111,
    impression: 940007,
  },
  {
    id: 3,
    app: "Newspaper",
    estimatedEarning: 86,
    impression: 540002,
  },
  {
    id: 4,
    app: "Calculator",
    estimatedEarning: 39,
    impression: 200600,
  },
];

const AppPerformance = () => {
  const columns: GridColDef[] = [
    { field: "app", headerName: "App", minWidth: 120, flex: 1 },
    {
      field: "estimatedEarning",
      headerName: "Est. earning",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "impression",
      headerName: "Impression",
      minWidth: 120,
      flex: 1,
    },
  ];

  return (
    <Box
      flex={1}
      border="1px solid #E0E2E7"
      borderRadius={2}
      p="20px"
      bgcolor="white"
    >
      <Typography variant="subtitle1" fontWeight="500" mb={3}>
        App performance
      </Typography>
      <Box>
        <MyDataGrid rows={rows} columns={columns} hideFooter />
      </Box>
    </Box>
  );
};

export default AppPerformance;
