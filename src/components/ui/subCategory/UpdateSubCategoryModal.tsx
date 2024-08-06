import { Button, Grid, Stack } from "@mui/material";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import RCInput from "../../form/RCInput";
import { AddSubCategoryValidation } from "../../../schemas";
import { TSubCategory } from "../../../types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { zodResolver } from "@hookform/resolvers/zod";
import RCSelect from "../../form/RCSelect";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import { useUpdateSubCategoryMutation } from "../../../redux/features/subCategory/subCategoryApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TSubCategory;
};

const UpdateSubCategoryModal = ({ open, setOpen, data }: TProps) => {
  const { data: category, isLoading } = useGetAllCategoryQuery(undefined);
  const [updateSubCategory] = useUpdateSubCategoryMutation();

  const categoryOptions =
    (!isLoading &&
      category?.data.map((item) => ({
        label: item.title,
        value: item.id,
      }))) ||
    [];

  const defaultData = {
    title: data.title || "",
    categoryId: data.categoryId || null,
    totalPoints: data.totalPoints || 10000,
    entryFee: data.entryFee || 100,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleAsyncToast({
      promise: updateSubCategory({ id: data.id, data: values }).unwrap(),
      success: () => {
        setOpen(false);
        return "Sub category updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Update Sub category">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(AddSubCategoryValidation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCSelect
              name="categoryId"
              label="Category ID"
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

export default UpdateSubCategoryModal;
