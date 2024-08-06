import { Button, Grid, Stack } from "@mui/material";
import RCForm from "../../../form/RCForm";
import RCModal from "../../../modal/RCModal";
import RCInput from "../../../form/RCInput";
import { UpdateStoryValidation } from "../../../../schemas";
import { FieldValues, SubmitHandler } from "react-hook-form";
import handleAsyncToast from "../../../../utils/handleAsyncToast";
import { zodResolver } from "@hookform/resolvers/zod";
import RCFileUploader from "../../../form/RCFileUploader";
import objectToFormData from "../../../../utils/objectToFormData";
import { useUpdateStoryMutation } from "../../../../redux/features/contentManagement/story/storyApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

const UpdateStoryModal = ({ open, setOpen, data }: TProps) => {
  const [updateStory] = useUpdateStoryMutation();

  const defaultData = {
    title: data.title || "",
    file: undefined,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values)
    await handleAsyncToast({
      promise: updateStory({ id: data.id, data: formData }).unwrap(),
      success: () => {
        setOpen(false);
        return "Story updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Update Assistant">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(UpdateStoryValidation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="title" label="Title" />
          </Grid>
          <Grid item xs={12}>
            <RCFileUploader name="file" label="Image/Video" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default UpdateStoryModal;
