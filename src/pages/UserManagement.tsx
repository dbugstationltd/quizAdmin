import { Box, Button, IconButton, Stack, Switch } from "@mui/material";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { useState } from "react";
import PageTitle from "../components/ui/shared/PageTitle";
import AddUserModal from "../components/ui/userManagement/AddUserModal";
import UpdateUserModal from "../components/ui/userManagement/UpdateUserModal";
import { TUser } from "../types";
import ViewUserModal from "../components/ui/userManagement/ViewUserModal";
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} from "../redux/features/user/userApi";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import handleAsyncToast from "../utils/handleAsyncToast";

const UserManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TUser>();

  const { data, isLoading } = useGetUserQuery(undefined);
  const [changeStatus] = useChangeUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const columns: GridColDef<TUser>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "photo",
      headerName: "Photo",
      renderCell: ({ row }) => (
        <Stack justifyContent="center" height="100%">
          <img
            src={
              row.providerId
                ? row.photo
                : `${import.meta.env.VITE_IMG_URL}/users/${row.photo}`
            }
            alt="user image"
            width={30}
            height={30}
            style={{ borderRadius: "4px" }}
          />
        </Stack>
      ),
      minWidth: 50,
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "nativeLanguage",
      headerName: "Native Language",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      renderCell: ({ row }) => (
        <Stack textTransform="capitalize">{row.gender}</Stack>
      ),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row }) => (
        <Switch
          checked={row.active}
          onChange={(e) => handleChange(e, row.id)}
          size="small"
        />
      ),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" height="100%">
          <IconButton onClick={() => handleViewModal(row)} aria-label="view">
            <VisibilityRounded color="primary" />
          </IconButton>
          <IconButton onClick={() => handleEditModal(row)} aria-label="view">
            <DriveFileRenameOutlineRounded color="success" />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)} aria-label="view">
            <DeleteRounded color="error" />
          </IconButton>
        </Stack>
      ),
      minWidth: 140,
      flex: 1,
    },
  ];

  const handleViewModal = (data: TUser) => {
    setModalData(data);
    setIsViewModalOpen(true);
  };
  const handleEditModal = (data: TUser) => {
    setModalData(data);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    handleAsyncToast({
      promise: deleteUser(id).unwrap(),
      success: () => {
        return "User deleted successfully!";
      },
    });
  };
  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const body = {
      id,
      data: {
        active: event.target.checked,
      },
    };
    handleAsyncToast({
      promise: changeStatus(body).unwrap(),
      success: () => {
        return "Status changed!";
      },
    });
  };

  const rowsData: GridValidRowModel[] = data?.data || [];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Users" />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Users</Button>
      </Stack>
      <Box
        mt="20px"
        sx={{ border: "1px solid #E0E2E7" }}
        borderRadius={2}
        bgcolor="white"
        overflow="hidden"
      >
        <MyDataGrid rows={rowsData} columns={columns} loading={isLoading} />
        {/* {!isLoading && (
        )} */}
      </Box>
      <AddUserModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      {isEditModalOpen && (
        <UpdateUserModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          data={modalData as TUser}
        />
      )}
      {isViewModalOpen && (
        <ViewUserModal
          isOpen={isViewModalOpen}
          setIsOpen={setIsViewModalOpen}
          data={modalData as TUser}
        />
      )}
    </>
  );
};

export default UserManagement;
