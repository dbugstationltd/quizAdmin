import { Box, Button, Grid, Stack } from "@mui/material";
import HeaderTitle from "../components/seo/HeaderTitle";
import {
  useGetWebSettingsQuery,
  useUpdateWebSettingsMutation,
} from "../redux/features/webSettings/webSettingsApi";
import RCForm from "../components/form/RCForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import objectToFormData from "../utils/objectToFormData";
import handleAsyncToast from "../utils/handleAsyncToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateWebSettingsValidation } from "../schemas";
import RCInput from "../components/form/RCInput";
import RCFileUploader from "../components/form/RCFileUploader";
import PageTitle from "../components/ui/shared/PageTitle";

const Settings = () => {
  const { data, isFetching } = useGetWebSettingsQuery(undefined);
  const [update] = useUpdateWebSettingsMutation();

  const defaultData = {
    loginPageTitle: data?.data.loginPageTitle || "",
    headerTitle: data?.data.headerTitle || "",
    webAppLogo: undefined,
    googleAnalyticsId: data?.data.googleAnalyticsId || "",
    pixelId: data?.data.pixelId || "",
    perQuestionCoin: data?.data.perQuestionCoin || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values);
    await handleAsyncToast({
      promise: update(formData).unwrap(),
      success: () => {
        return "Settings updated successfully!";
      },
    });
  };

  return (
    <div>
      <HeaderTitle title="Settings" />
      <PageTitle title="Settings" />
      <Box
        p={3}
        bgcolor="white"
        mt={3}
        borderRadius="8px"
        border="1px solid #E0E2E7"
      >
        {!isFetching && (
          <RCForm
            onSubmit={onSubmit}
            defaultValues={defaultData}
            resolver={zodResolver(updateWebSettingsValidation)}
          >
            <img
              src={`${import.meta.env.VITE_IMG_URL}/setting/${
                data?.data.webAppLogo
              }`}
              alt="logo"
              width={80}
            />
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <RCFileUploader name="webAppLogo" label="Web App Logo" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput name="loginPageTitle" label="Login Page Title" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput name="headerTitle" label="Header Title" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput name="googleAnalyticsId" label="Google Analytics Id" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput name="pixelId" label="Pixel Id" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RCInput
                  name="perQuestionCoin"
                  label="Per Question Coin"
                  type="number"
                />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="end" mt={4}>
              <Button type="submit">Save Changes</Button>
            </Stack>
          </RCForm>
        )}
      </Box>
    </div>
  );
};

export default Settings;
