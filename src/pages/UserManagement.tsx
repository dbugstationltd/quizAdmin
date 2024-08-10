import { Box, Stack, Switch } from "@mui/material";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import PageTitle from "../components/ui/shared/PageTitle";
import { TUser } from "../types";
import {
  useChangeUserStatusMutation,
  useGetUserQuery,
} from "../redux/features/user/userApi";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import handleAsyncToast from "../utils/handleAsyncToast";
import HeaderTitle from "../components/seo/HeaderTitle";

const UserManagement = () => {
  const { data, isLoading } = useGetUserQuery(undefined);
  const [changeStatus] = useChangeUserStatusMutation();

  const columns: GridColDef<TUser>[] = [
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "totalCoins",
      headerName: "Total Coins",
      minWidth: 150,
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
  ];

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
      <HeaderTitle title="User management" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Users" />
        {/* <Button onClick={() => setIsAddModalOpen(true)}>Add Users</Button> */}
      </Stack>
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

export default UserManagement;
