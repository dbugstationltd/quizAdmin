import { FieldValues, SubmitHandler } from "react-hook-form";
import RCForm from "../../form/RCForm";
import RCInput from "../../form/RCInput";
import RCModal from "../../modal/RCModal";
import RCSelect from "../../form/RCSelect";
import { Box, Button, Grid, Stack } from "@mui/material";
import RCFileUploader from "../../form/RCFileUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { countryOptions, phoneCodeOptions } from "../../../constants";
import { useAddUserMutation } from "../../../redux/features/user/userApi";
import objectToFormData from "../../../utils/objectToFormData";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { AddUserValidation } from "../../../schemas";

type TProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultData = {
  name: "",
  email: "",
  password: "",
  country: "",
  gender: "",
  nativeLanguage: "",
  photo: undefined,
  code: "",
  number: "",
};

const AddUserModal = ({ isOpen, setIsOpen }: TProps) => {
  const [addUser] = useAddUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const data = objectToFormData(values);
    await handleAsyncToast({
      promise: addUser(data).unwrap(),
      success: () => {
        setIsOpen(false);
        return "Added Successfullyl!";
      },
    });
  };

  return (
    <RCModal open={isOpen} setOpen={setIsOpen} title="Add New User">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(AddUserValidation)}
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
            <RCSelect name="country" label="Country" items={countryOptions} />
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
            <Stack direction="row" gap="12px">
              <Box width="130px">
                <RCSelect
                  name="code"
                  label="Country Code"
                  placeholder="+880"
                  items={phoneCodeOptions}
                />
              </Box>
              <Box flex={1}>
                <RCInput
                  name="number"
                  label="Phone Number"
                  placeholder="12345678"
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <RCFileUploader name="photo" label="User Image" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" spacing={2} mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default AddUserModal;
