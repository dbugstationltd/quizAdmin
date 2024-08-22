import { Button, Grid, Stack } from "@mui/material";
import { TAdmin } from "../../../types";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import RCSelect, { TItem } from "../../form/RCSelect";
import RCInput from "../../form/RCInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { useGetAllRoleQuery } from "../../../redux/features/rolePermission/rolePermissionApi";
import { useUpdateAdminMutation } from "../../../redux/features/admin/adminApi";
import { UpdateAdmin } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TAdmin;
};
const UpdateAdminModal = ({ data, open, setOpen }: TProps) => {
  const { data: roles } = useGetAllRoleQuery(undefined);
  const [EditAdmin] = useUpdateAdminMutation();

  const roleOptions = roles?.data.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const defaultValues = {
    name: data.name,
    email: data.email,
    password: "",
    adminTypeId: data.adminType.id,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleAsyncToast({
      promise: EditAdmin({ id: data.id, data: values }).unwrap(),
      success: () => {
        setOpen(false);
        return "Admin updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Update Admin">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(UpdateAdmin)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCSelect
              name="adminTypeId"
              label="Role"
              items={roleOptions as TItem[]}
            />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="name" label="Name" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="email" label="Email" type="email" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="password" label="Password" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default UpdateAdminModal;
