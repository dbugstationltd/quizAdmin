import { Button, Grid, Stack } from "@mui/material";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import { zodResolver } from "@hookform/resolvers/zod";
import RCInput from "../../form/RCInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllRoleQuery } from "../../../redux/features/rolePermission/rolePermissionApi";
import { useAddAdminMutation } from "../../../redux/features/admin/adminApi";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { AddAdmin } from "../../../schemas";
import RCSelect, { TItem } from "../../form/RCSelect";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues = {
  name: "",
  email: "",
  password: "",
  adminTypeId: undefined,
};

const AddAdminModal = ({ open, setOpen }: TProps) => {
  const { data } = useGetAllRoleQuery(undefined);
  const [addAdmin] = useAddAdminMutation();

  const roleOptions = data?.data.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleAsyncToast({
      promise: addAdmin(values).unwrap(),
      success: () => {
        setOpen(false);
        return "Admin added successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Add Admin">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(AddAdmin)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCSelect name="adminTypeId" label="Role" items={roleOptions as TItem[]} />
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

export default AddAdminModal;
