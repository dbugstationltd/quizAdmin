import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import RCForm from "../components/form/RCForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RCInput from "../components/form/RCInput";
import bg from "../assets/images/loginBg.svg";
import { Link } from "react-router-dom";
import RCSelect from "../components/form/RCSelect";
import { RegistrationValidation } from "../schemas";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import handleAsyncToast from "../utils/handleAsyncToast";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/features/auth/authSlice";
import { useGetWebSettingsQuery } from "../redux/features/webSettings/webSettingsApi";
import HeaderTitle from "../components/seo/HeaderTitle";

const defaultData = {
  name: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
  country: "",
  number: "",
  additional_contact_type: "",
  additional_contact_value: "",
  code: "",
};

const Register = () => {
  const { data } = useGetWebSettingsQuery(undefined);
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    delete values.code;
    delete values.number;
    await handleAsyncToast({
      promise: register(values).unwrap(),
      success: (res) => {
        dispatch(login({ token: res.data.access_token, user: res.data.user }));
        return "Registered successfully";
      },
    });
  };
  return (
    <>
      <HeaderTitle title="Register" />
      <Stack
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        p={1}
        sx={{
          background: `url(${bg}) center / cover no-repeat`,
        }}
      >
        <Box
          width="100%"
          maxWidth="600px"
          bgcolor="white"
          p="28px"
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
            {data?.data.reg_page_title}
          </Typography>
          <RCForm
            onSubmit={onSubmit}
            resolver={zodResolver(RegistrationValidation)}
            defaultValues={defaultData}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <RCInput name="name" label="Name" placeholder="John Doe" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="johndoe@gmail.com"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput
                  name="username"
                  label="User Name"
                  placeholder="john_doe"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="********"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput
                  name="password_confirmation"
                  type="password"
                  label="Confirm Password"
                  placeholder="********"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <RCSelect
                  name="additional_contact_type"
                  label="Contact Type"
                  items={[
                    { label: "Whatsapp", value: "whatsapp" },
                    { label: "Telegram", value: "telegram" },
                    { label: "Skype", value: "skype" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput
                  name="additional_contact_value"
                  label="Contact Value"
                  placeholder="12345678"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  sx={{ mt: "28px", width: "100%" }}
                  disabled={isLoading}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </RCForm>
          <Typography
            fontSize="12px"
            fontWeight="600"
            textAlign="center"
            color="#030229"
            mt="30px"
          >
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Register;
