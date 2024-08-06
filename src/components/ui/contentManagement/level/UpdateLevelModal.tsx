import { zodResolver } from "@hookform/resolvers/zod";
import { TLevel } from "../../../../types";
import { useUpdateLevelMutation } from "../../../../redux/features/contentManagement/level/levelApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import objectToFormData from "../../../../utils/objectToFormData";
import handleAsyncToast from "../../../../utils/handleAsyncToast";
import RCModal from "../../../modal/RCModal";
import RCForm from "../../../form/RCForm";
import { UpdateLevelValidation } from "../../../../schemas";
import { Button, Grid, Stack } from "@mui/material";
import RCInput from "../../../form/RCInput";
import RCFileUploader from "../../../form/RCFileUploader";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TLevel;
};

const UpdateLevelModal = ({ open, setOpen, data }: TProps) => {
  const [updateLevel] = useUpdateLevelMutation();

  const defaultData = {
    title: data.title,
    coverImg: undefined,
    bgImg: undefined,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values);
    const submitData = { id: data.id, data: formData };
    
    await handleAsyncToast({
      promise: updateLevel(submitData).unwrap(),
      success: () => {
        setOpen(false);
        return "Level updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Add New Level">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(UpdateLevelValidation)}
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

export default UpdateLevelModal;
