import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import PageTitle from "../components/ui/shared/PageTitle";
import { useGetSupportTicketQuery } from "../redux/features/supportFeedback/supportFeedbackApi";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { TTicket } from "../types";
import dayjs from "dayjs";
import { VisibilityRounded } from "@mui/icons-material";
import { useState } from "react";
import ViewMessageModal from "../components/ui/supportTicket/ViewMessageModal";

const SupportTicket = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState({ id: 0, title: "" });
  const { data, isLoading } = useGetSupportTicketQuery(undefined);
  const rowsData: GridValidRowModel[] = data?.data || [];

  const columns: GridColDef<TTicket>[] = [
    {
      field: "subject",
      headerName: "Subject",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center" height="100%">
          <Typography
            fontSize={10}
            fontWeight={600}
            width="65px"
            textAlign="center"
            textTransform="capitalize"
            sx={{
              py: "6px",
              borderRadius: "4px",
              bgcolor:
                row.priority === "high"
                  ? "error.light"
                  : row.priority === "medium"
                  ? "warning.light"
                  : "success.light",
              color:
                row.priority === "high"
                  ? "error.main"
                  : row.priority === "medium"
                  ? "warning.main"
                  : "success.main",
            }}
          >
            {row.priority}
          </Typography>
        </Box>
      ),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: ({ row }) => row.user.email,
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "User",
      renderCell: ({ row }) => row.user.name,
      minWidth: 200,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      renderCell: ({ row }) => dayjs(row.created_at).format("DD-MMM-YYYY"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          alignItems="center"
          height="100%"
        >
          <IconButton
            onClick={() => handleModal(row.id, row.subject)}
            aria-label="view"
          >
            <VisibilityRounded color="primary" />
          </IconButton>
        </Stack>
      ),
      minWidth: 200,
      flex: 1,
    },
  ];

  const handleModal = (id: number, title: string) => {
    setModalData({ id, title });
    setIsMessageModalOpen(true);
  };

  return (
    <>
      <PageTitle title="Support Ticket" />
      <Box
        mt="20px"
        sx={{ border: "1px solid #E0E2E7" }}
        borderRadius={2}
        bgcolor="white"
        overflow="hidden"
      >
        <MyDataGrid rows={rowsData} columns={columns} loading={isLoading} />
      </Box>
      {isMessageModalOpen && (
        <ViewMessageModal
          open={isMessageModalOpen}
          setOpen={setIsMessageModalOpen}
          data={modalData}
        />
      )}
    </>
  );
};

export default SupportTicket;
