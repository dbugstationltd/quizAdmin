import { Box, Button, IconButton, Stack } from "@mui/material";
import HeaderTitle from "../components/seo/HeaderTitle";
import PageTitle from "../components/ui/shared/PageTitle";
import { useState } from "react";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "../redux/features/admin/adminApi";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { TAdmin, TPermissions } from "../types";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
} from "@mui/icons-material";
import handleAsyncToast from "../utils/handleAsyncToast";
import AddAdminModal from "../components/ui/admin/AddAdminModal";
import UpdateAdminModal from "../components/ui/admin/UpdateAdminModal";
import GetPermission from "../utils/getPermission";
import { toast } from "sonner";

const Admins = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState<TAdmin>();
  const { data, isFetching } = useGetAllAdminQuery(undefined);
  const [deleteAdmin] = useDeleteAdminMutation();
  const { delete: del, edit } = GetPermission("admins") as TPermissions;

  const rowsData: GridValidRowModel[] = data?.data || [];

  const columns: GridColDef<TAdmin>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      renderCell: ({ row }) => row.adminType.title,
      minWidth: 200,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "right",
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          height="100%"
        >
          <IconButton onClick={() => handleEditModal(row)} aria-label="edit">
            <DriveFileRenameOutlineRounded color="success" />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
            <DeleteRounded color="error" />
          </IconButton>
        </Stack>
      ),
      minWidth: 140,
      flex: 1,
    },
  ];

  const handleEditModal = (data: TAdmin) => {
    if (!edit) {
      toast.error("You don't have permission");
    } else {
      setModalData(data);
      setIsEditModalOpen(true);
    }
  };
  const handleDelete = async (id: number) => {
    if (!del) {
      toast.error("You don't have permission");
    } else {
      handleAsyncToast({
        promise: deleteAdmin(id).unwrap(),
        success: () => {
          return "Admin deleted successfully!";
        },
      });
    }
  };

  return (
    <>
      <HeaderTitle title="Admins" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Admins" />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Admin</Button>
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
      <AddAdminModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {isEditModalOpen && (
        <UpdateAdminModal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          data={modalData as TAdmin}
        />
      )}
    </>
  );
};

export default Admins;
