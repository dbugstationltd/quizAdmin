import { Box, Button, Grid, Stack } from "@mui/material";
import RCForm from "../components/form/RCForm";
import HeaderTitle from "../components/seo/HeaderTitle";
import PageTitle from "../components/ui/shared/PageTitle";
import RCInput from "../components/form/RCInput";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { useParams } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import handleAsyncToast from "../utils/handleAsyncToast";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { TPermissions } from "../types";
import {
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
} from "../redux/features/rolePermission/rolePermissionApi";
import RCCheck from "../components/form/RCCheck";
import { useMemo } from "react";

const generateDefaultValues = (data: any) => ({
  title: data?.data.title || "",
  ...data?.data.roles.reduce((acc: any, role: any) => {
    acc[role.name] = {
      view: role.view,
      edit: role.edit,
      delete: role.delete,
    };
    return acc;
  }, {}),
});

const EditRolePermission = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetSingleRoleQuery(id as string);
  const [updateRole] = useUpdateRoleMutation();
  const rowsData: GridValidRowModel[] = data?.data.roles || [
    {
      id: 1,
      name: "dashboard",
    },
    {
      id: 2,
      name: "user-management",
    },
    {
      id: 3,
      name: "category",
    },
    {
      id: 4,
      name: "sub-category",
    },
    {
      id: 5,
      name: "notification",
    },
    {
      id: 6,
      name: "role-permission",
    },
    {
      id: 7,
      name: "admins",
    },
    {
      id: 8,
      name: "settings",
    },
  ];

  const columns: GridColDef<TPermissions>[] = [
    {
      field: "name",
      headerName: "Route Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "view",
      headerName: "View",
      renderCell: ({ row }) => (
        <RCCheck name={`${row.name}.view`}  />
      ),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: ({ row }) => (
        <RCCheck name={`${row.name}.edit`}  />
      ),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: ({ row }) => (
        <RCCheck name={`${row.name}.delete`}  />
      ),
      minWidth: 200,
      flex: 1,
    },
  ];

  const defaultValues = useMemo(() => generateDefaultValues(data), [data]);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { title, ...rest } = values;
    const permissions = Object.entries(rest).map(
      ([name, { view, edit, delete: del }]) => ({
        name,
        view,
        edit,
        delete: del,
      })
    );
    await handleAsyncToast({
      promise: updateRole({ id, data: { title, permissions } }).unwrap(),
      success: () => {
        return "Role Permission update successfully!";
      },
    });
  };

  return (
    <>
      <HeaderTitle title="Edit Role/Permission" />
      <PageTitle title="Edit Role Permission" />
      {!isFetching && (
        <RCForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <RCInput name="title" label="Role Name" />
            </Grid>
          </Grid>
          <Box
            mt="20px"
            sx={{ border: "1px solid #E0E2E7" }}
            borderRadius={2}
            bgcolor="white"
            overflow="hidden"
          >
            <MyDataGrid rows={rowsData} columns={columns} loading={isFetching} />
          </Box>
          <Stack direction="row" justifyContent="end" mt={4}>
            <Button type="submit">Submit</Button>
          </Stack>
        </RCForm>
      )}
    </>
  );
};

export default EditRolePermission;
