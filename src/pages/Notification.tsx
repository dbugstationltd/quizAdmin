import { Box, Button, Stack } from "@mui/material";
import HeaderTitle from "../components/seo/HeaderTitle";
import PageTitle from "../components/ui/shared/PageTitle";
import { useState } from "react";
import AddNotificationModal from "../components/ui/notification/AddNotificationModal";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { TNotification, TPermissions } from "../types";
import { useGetAllNotificationQuery } from "../redux/features/notification/notificationApi";
import GetPermission from "../utils/getPermission";
import { toast } from "sonner";

const Notification = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const { data, isFetching } = useGetAllNotificationQuery(undefined);
  const rowsData: GridValidRowModel[] = data?.data || [];
  const { edit } = GetPermission("notification") as TPermissions;

  const columns: GridColDef<TNotification>[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "body",
      headerName: "Body",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "topic",
      headerName: "Topic",
      minWidth: 200,
      flex: 1,
    },
  ];

  return (
    <>
      <HeaderTitle title="Notification" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Notification" />
        <Button
          onClick={() => {
            if (!edit) {
              toast.error("You don't have permission");
            } else {
              setIsAddModalOpen(true);
            }
          }}
        >
          Send Notification
        </Button>
      </Stack>
      <Box
        mt="20px"
        sx={{ border: "1px solid #E0E2E7" }}
        borderRadius={2}
        bgcolor="white"
        overflow="hidden"
      >
        <MyDataGrid rows={rowsData} columns={columns} loading={isFetching} />
      </Box>
      <AddNotificationModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
    </>
  );
};

export default Notification;
