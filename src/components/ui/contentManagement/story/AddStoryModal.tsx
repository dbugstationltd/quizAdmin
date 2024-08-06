import { FieldValues, SubmitHandler } from "react-hook-form";
import RCForm from "../../../form/RCForm";
import RCModal from "../../../modal/RCModal";
import { AddStoryValidation } from "../../../../schemas";
import { Button, Grid, Stack } from "@mui/material";
import RCInput from "../../../form/RCInput";
import handleAsyncToast from "../../../../utils/handleAsyncToast";
import { zodResolver } from "@hookform/resolvers/zod";
import RCFileUploader from "../../../form/RCFileUploader";
import objectToFormData from "../../../../utils/objectToFormData";
import { useAddStoryMutation } from "../../../../redux/features/contentManagement/story/storyApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultData = {
  title: "",
  file: undefined,
};

const AddStoryModal = ({ open, setOpen }: TProps) => {
  const [addStory] = useAddStoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values)
    await handleAsyncToast({
      promise: addStory(formData).unwrap(),
      success: () => {
        setOpen(false);
        return "Story added successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Add Assistant">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(AddStoryValidation)}
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

export default AddStoryModal;
