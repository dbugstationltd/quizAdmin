import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Stack } from "@mui/material";
import { useAddLevelMutation } from "../../../../redux/features/contentManagement/level/levelApi";
import objectToFormData from "../../../../utils/objectToFormData";
import handleAsyncToast from "../../../../utils/handleAsyncToast";
import RCModal from "../../../modal/RCModal";
import RCForm from "../../../form/RCForm";
import { AddLevelValidation } from "../../../../schemas";
import RCInput from "../../../form/RCInput";
import RCFileUploader from "../../../form/RCFileUploader";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultData = {
  title: "",
  coverImg: undefined,
  bgImg: undefined,
};

const AddLevelModal = ({ open, setOpen }: TProps) => {
  const [addLevel] = useAddLevelMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const data = objectToFormData(values);

    await handleAsyncToast({
      promise: addLevel(data).unwrap(),
      success: () => {
        setOpen(false);
        return "Level added successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Add New Level">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(AddLevelValidation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="title" label="Title" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RCFileUploader name="coverImg" label="Cover Image" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RCFileUploader name="bgImg" label="Background Image" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" spacing={2} mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default AddLevelModal;
