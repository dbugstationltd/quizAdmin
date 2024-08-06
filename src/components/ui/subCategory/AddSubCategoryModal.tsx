import { FieldValues, SubmitHandler } from "react-hook-form";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import { AddSubCategoryValidation } from "../../../schemas";
import { Button, Grid, Stack } from "@mui/material";
import RCInput from "../../form/RCInput";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { zodResolver } from "@hookform/resolvers/zod";
import RCSelect from "../../form/RCSelect";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import { useAddSubCategoryMutation } from "../../../redux/features/subCategory/subCategoryApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultData = {
  title: "",
  categoryId: "",
  totalPoints: 10000,
  entryFee: 100,
};

const AddSubCategoryModal = ({ open, setOpen }: TProps) => {
  const { data, isLoading } = useGetAllCategoryQuery(undefined);
  const [addSubCategory] = useAddSubCategoryMutation();
  const categoryOptions =
    (!isLoading &&
      data?.data.map((item) => ({
        label: item.title,
        value: item.id,
      }))) ||
    [];

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleAsyncToast({
      promise: addSubCategory(values).unwrap(),
      success: () => {
        setOpen(false);
        return "Sub category added successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Add Sub Category">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(AddSubCategoryValidation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCSelect
              name="categoryId"
              label="Category"
              items={categoryOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="title" label="Title" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="totalPoints" label="Total Points" type="number" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="entryFee" label="Entry Fee" type="number" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default AddSubCategoryModal;
