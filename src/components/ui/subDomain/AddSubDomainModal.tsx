import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddSubDomainMutation } from "../../../redux/features/subDomain/subDomainApi";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import RCInput from "../../form/RCInput";
import { Button, Grid, Stack } from "@mui/material";
import handleAsyncToast from "../../../utils/handleAsyncToast";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues = {
  name: "",
  url: "",
  port: "",
  directory: "",
  gaCode: "",
  addLimit: "",
};

const AddSubDomainModal = ({ open, setOpen }: TProps) => {
  const [addSubDomain] = useAddSubDomainMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    values.addSecurity = 1
    await handleAsyncToast({
      promise: addSubDomain(values).unwrap(),
      success: () => {
        setOpen(false);
        return "Sub Domain added successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Add Sub-Domain">
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

export default AddSubDomainModal;
