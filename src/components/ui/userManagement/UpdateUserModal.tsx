import { FieldValues, SubmitHandler } from "react-hook-form";
import RCForm from "../../form/RCForm";
import RCInput from "../../form/RCInput";
import RCModal from "../../modal/RCModal";
import RCSelect from "../../form/RCSelect";
import { Button, Grid, Stack } from "@mui/material";
import RCFileUploader from "../../form/RCFileUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserValidation } from "../../../schemas";
import objectToFormData from "../../../utils/objectToFormData";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { TUser } from "../../../types";
import { useUpdateUserMutation } from "../../../redux/features/user/userApi";

type TProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TUser;
};

const UpdateUserModal = ({ isOpen, setIsOpen, data }: TProps) => {
  const [updateUser] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values);
    const body = { id: data.id, data: formData };

    await handleAsyncToast({
      promise: updateUser(body).unwrap(),
      success: () => {
        setIsOpen(false);
        return "Added Successfullyl!";
      },
    });
  };

  const defaultData = {
    name: data.name,
    email: data.email,
    password: "",
    gender: data.gender,
    country: data.country,
    code: data.phone?.split("-")[0],
    number: data.phone?.split("-")[1],
    nativeLanguage: data.nativeLanguage,
  };

  return (
    <RCModal open={isOpen} setOpen={setIsOpen} title="Update User">
      {data && (
        <RCForm
          onSubmit={onSubmit}
          defaultValues={defaultData}
          resolver={zodResolver(UpdateUserValidation)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RCInput name="name" label="Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RCInput name="email" label="Email" type="email" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RCInput name="password" label="Password" />
            </Grid>

            <Grid item xs={12} md={6}>
              <RCSelect
                name="gender"
                label="Gender"
                items={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RCInput name="nativeLanguage" label="Native Language" />
            </Grid>
            <Grid item xs={12}>
              <RCFileUploader name="photo" label="User Image" />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="end" spacing={2} mt={4}>
            <Button type="submit">Submit</Button>
          </Stack>
        </RCForm>
      )}
    </RCModal>
  );
};

export default UpdateUserModal;
