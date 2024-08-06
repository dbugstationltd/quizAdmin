import { zodResolver } from "@hookform/resolvers/zod";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import RCInput from "../../form/RCInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { forgotPasswordValidation } from "../../../schemas";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import { Box, Button } from "@mui/material";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPasswordModal = ({ open, setOpen }: TProps) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleAsyncToast({
      promise: forgotPassword(values).unwrap(),
      success: (res) => {
        setOpen(false)
        return res.message;
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Reset Password">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={{ email: "" }}
        resolver={zodResolver(forgotPasswordValidation)}
      >
        <Box p={2}>
          <RCInput name="email" label="Email" type="email" sx={{ mb: 2 }} />
          <Button type="submit" disabled={isLoading} size="small" fullWidth>
            Submit
          </Button>
        </Box>
      </RCForm>
    </RCModal>
  );
};

export default ForgotPasswordModal;
