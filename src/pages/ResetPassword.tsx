import { Box, Button, Stack, Typography } from "@mui/material";
import RCForm from "../components/form/RCForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RCInput from "../components/form/RCInput";
import bg from "../assets/images/loginBg.svg";
import handleAsyncToast from "../utils/handleAsyncToast";
import { useResetPasswordMutation } from "../redux/features/auth/authApi";
import { resetPasswordValidation } from "../schemas";
import { useSearchParams } from "react-router-dom";
import { useGetWebSettingsQuery } from "../redux/features/webSettings/webSettingsApi";
import HeaderTitle from "../components/seo/HeaderTitle";

const ResetPassword = () => {
  const { data } = useGetWebSettingsQuery(undefined);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    values.token = searchParams.get("token");
    await handleAsyncToast({
      promise: resetPassword(values).unwrap(),
      success: () => {
        return "Password reset successfully";
      },
    });
  };

  return (
    <>
      <HeaderTitle title="Reset Password" />
      <Stack
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: `url(${bg}) center / cover no-repeat`,
        }}
      >
        <Box
          width="100%"
          maxWidth="400px"
          bgcolor="white"
          p="32px"
          pt="24px"
          border="1px solid #E0E2E7"
          borderRadius="10px"
          sx={{ boxShadow: "0px 20px 30px 0px #1018280F" }}
        >
          <Stack justifyContent="center" alignItems="center">
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${
                data?.data.login_reg_reset_page_logo
              }`}
              alt="logo"
              width={84}
              height={84}
            />
          </Stack>
          <Typography
            mt="15px"
            fontSize="20px"
            fontWeight="500"
            color="#030229"
            textAlign="center"
            mb="36px"
          >
            {data?.data.reset_password_page_title}
          </Typography>
          <RCForm
            onSubmit={onSubmit}
            resolver={zodResolver(resetPasswordValidation)}
            defaultValues={{ password_confirmation: "", password: "" }}
          >
            <RCInput
              name="password"
              type="password"
              label="Password"
              placeholder="********"
              sx={{ mb: "16px" }}
            />
            <RCInput
              name="password_confirmation"
              type="password"
              label="Confirm Password"
              placeholder="********"
            />
            <Button
              type="submit"
              sx={{ mt: "28px", width: "100%" }}
              disabled={isLoading}
            >
              RESET
            </Button>
          </RCForm>
        </Box>
      </Stack>
    </>
  );
};

export default ResetPassword;
