import { FieldValues, SubmitHandler } from "react-hook-form";
import RCForm from "../components/form/RCForm";
import HeaderTitle from "../components/seo/HeaderTitle";
import PageTitle from "../components/ui/shared/PageTitle";
import handleAsyncToast from "../utils/handleAsyncToast";
import { useAddRoleMutation } from "../redux/features/rolePermission/rolePermissionApi";
import { Box, Button, Grid, Stack } from "@mui/material";
import RCInput from "../components/form/RCInput";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { TPermissions } from "../types";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import RCCheck from "../components/form/RCCheck";
import { useNavigate } from "react-router-dom";
import { paths } from "../constants";
import { useMemo } from "react";

const generateDefaultValues = () => ({
  title: "",
  ...paths.reduce<Record<string, unknown>>((acc, path) => {
    acc[path] = {
      view: true,
      edit: true,
      delete: true,
    };
    return acc;
  }, {}),
});

const CreateRolePermission = () => {
  const navigate = useNavigate();
  const [createRole] = useAddRoleMutation();
  const defaultValues = useMemo(() => generateDefaultValues(), []);
  const rowsData: GridValidRowModel[] = useMemo(
    () => paths.map((path, i) => ({ id: i, name: path })),
    []
  );

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
        <RCCheck name={`${row.name}.view`} />
      ),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: ({ row }) => (
        <RCCheck name={`${row.name}.edit`} />
      ),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: ({ row }) => (
        <RCCheck name={`${row.name}.delete`} />
      ),
      minWidth: 200,
      flex: 1,
    },
  ];

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
      promise: createRole({ title, permissions }).unwrap(),
      success: () => {
        navigate("/role-permission");
        return "Role Permission created successfully!";
      },
    });
  };

  return (
    <>
      <HeaderTitle title="Create Role/Permission" />
      <PageTitle title="Create Role Permission" />
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
          <MyDataGrid rows={rowsData} columns={columns} />
        </Box>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </>
  );
};

export default CreateRolePermission;
