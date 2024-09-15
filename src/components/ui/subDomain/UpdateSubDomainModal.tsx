import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateSubDomainMutation } from "../../../redux/features/subDomain/subDomainApi";
import { TSubDomain } from "../../../types";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { Button, Grid, Stack } from "@mui/material";
import RCInput from "../../form/RCInput";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TSubDomain;
};
const UpdateSubDomainModal = ({ data, open, setOpen }: TProps) => {
  const [updateSubDomain] = useUpdateSubDomainMutation();
  const defaultValues = {
    name: data.name || "",
    url: data.url || "",
    port: data.port || "",
    directory: data.directory || "",
    gaCode: data.gaCode || "",
    addLimit: data.addLimit || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleAsyncToast({
      promise: updateSubDomain({ id: data.id, data: values }).unwrap(),
      success: () => {
        setOpen(false);
        return "Updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Update Sub-Domain">
      <RCForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="name" label="Name" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="url" label="URL" type="url" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="port" label="Port" type="number" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="directory" label="Directory" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="gaCode" label="GA Code" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="addLimit" label="Ad Limit" type="number" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default UpdateSubDomainModal;
