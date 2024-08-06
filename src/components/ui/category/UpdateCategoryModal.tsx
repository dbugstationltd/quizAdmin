import { Button, Grid, Stack } from "@mui/material";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import RCInput from "../../form/RCInput";
import { UpdateCategoryValidation } from "../../../schemas";
import { TCategory } from "../../../types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import RCFileUploader from "../../form/RCFileUploader";
import objectToFormData from "../../../utils/objectToFormData";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TCategory;
};

const UpdateCategoryModal = ({ open, setOpen, data }: TProps) => {
  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values);
    await handleAsyncToast({
      promise: updateCategory({ id: data.id, data: formData }).unwrap(),
      success: () => {
        setOpen(false);
        return "Category updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Update Assistant Category">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={{ title: data.title }}
        resolver={zodResolver(UpdateCategoryValidation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="title" label="Title" />
          </Grid>
          <Grid item xs={12}>
            <RCFileUploader name="img" label="Icon" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default UpdateCategoryModal;
