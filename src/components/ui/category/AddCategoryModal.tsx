import { FieldValues, SubmitHandler } from "react-hook-form";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import { AddCategoryValidation } from "../../../schemas";
import { Button, Grid, Stack } from "@mui/material";
import RCInput from "../../form/RCInput";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCategoryMutation } from "../../../redux/features/category/categoryApi";
import RCFileUploader from "../../form/RCFileUploader";
import objectToFormData from "../../../utils/objectToFormData";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategoryModal = ({ open, setOpen }: TProps) => {
  const [addCategory] = useAddCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values);
    await handleAsyncToast({
      promise: addCategory(formData).unwrap(),
      success: () => {
        setOpen(false);
        return "Category added successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Add Category">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={{ title: "", img: undefined }}
        resolver={zodResolver(AddCategoryValidation)}
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

export default AddCategoryModal;
