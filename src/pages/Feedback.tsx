import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { useGetFeedbackQuery } from "../redux/features/supportFeedback/supportFeedbackApi";
import { TFeedback } from "../types";
import PageTitle from "../components/ui/shared/PageTitle";
import { Box } from "@mui/material";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import dayjs from "dayjs";

const Feedback = () => {
  const { data, isLoading } = useGetFeedbackQuery(undefined);
  const rowsData: GridValidRowModel[] = data?.data || [];

  const columns: GridColDef<TFeedback>[] = [
    {
      field: "message",
      headerName: "Message",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "suggestion",
      headerName: "Suggestion",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: ({ row }) => row.user.email,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "name",
      headerName: "User",
      renderCell: ({ row }) => row.user.name,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      renderCell: ({ row }) => dayjs(row.createdAt).format("DD-MMM-YYYY"),
      minWidth: 150,
      flex: 1,
    },
  ];

  return (
    <>
      <PageTitle title="View Feedback" />
      <Box
        mt="20px"
        sx={{ border: "1px solid #E0E2E7" }}
        borderRadius={2}
        bgcolor="white"
        overflow="hidden"
      >
        <MyDataGrid rows={rowsData} columns={columns} loading={isLoading} />
      </Box>
    </>
  );
};

export default Feedback;
