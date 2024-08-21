import { Box, Button, IconButton, Stack } from "@mui/material";
import HeaderTitle from "../components/seo/HeaderTitle";
import PageTitle from "../components/ui/shared/PageTitle";
import {
  useDeleteRoleMutation,
  useGetAllRoleQuery,
} from "../redux/features/rolePermission/rolePermissionApi";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { TRole } from "../types";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
} from "@mui/icons-material";
import handleAsyncToast from "../utils/handleAsyncToast";
import { Link } from "react-router-dom";

const RolePermission = () => {
  const { data, isFetching } = useGetAllRoleQuery(undefined);
  const [deleteRole] = useDeleteRoleMutation();
  const rowsData: GridValidRowModel[] = data?.data || [];

  const columns: GridColDef<TRole>[] = [
    {
      field: "title",
      headerName: "Role Name",
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
          <Link to={`/role-permission/${row.id}`}>
            <IconButton aria-label="view">
              <DriveFileRenameOutlineRounded color="success" />
            </IconButton>
          </Link>
          <IconButton onClick={() => handleDelete(row.id)} aria-label="view">
            <DeleteRounded color="error" />
          </IconButton>
        </Stack>
      ),
      minWidth: 140,
      flex: 1,
    },
  ];

  const handleDelete = async (id: number) => {
    handleAsyncToast({
      promise: deleteRole(id).unwrap(),
      success: () => {
        return "Role deleted successfully!";
      },
    });
  };

  return (
    <>
      <HeaderTitle title="Role Permission" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Role & Permission" />
        <Link to="/role-permission/create">
          <Button>Add Role</Button>
        </Link>
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
    </>
  );
};

export default RolePermission;
