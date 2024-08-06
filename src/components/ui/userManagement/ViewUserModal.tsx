import { Box, Grid, Stack, Typography } from "@mui/material";
import { TUser } from "../../../types";
import RCModal from "../../modal/RCModal";
import icon1 from "../../../assets/icon/lessons_completed.svg";
import icon2 from "../../../assets/icon/challenges_completed.svg";
import icon3 from "../../../assets/icon/total_xps.svg";
import RCForm from "../../form/RCForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import RCInput from "../../form/RCInput";
import { countryOptions, phoneCodeOptions } from "../../../constants";
import RCSelect from "../../form/RCSelect";

type TProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TUser;
};

const ViewUserModal = ({ isOpen, setIsOpen, data }: TProps) => {
  const onSubmit: SubmitHandler<FieldValues> = async () => {};

  const defaultData = {
    name: data.name,
    email: data.email,
    gender: data.gender,
    country: data.country,
    code: data.phone?.split("-")[0],
    number: data.phone?.split("-")[1],
    nativeLanguage: data.nativeLanguage,
  };

  return (
    <RCModal
      open={isOpen}
      setOpen={setIsOpen}
      title="User Details"
      maxWidth="md"
    >
      <Typography fontWeight="700" fontSize="20px" color="#2E2F38">
        Progress & Activity
      </Typography>
      <Stack
        direction={{ md: "row" }}
        justifyContent="space-between"
        gap="24px"
        mt={3}
        mb={5}
      >
        <Card icon={icon1} title="Lessons Completed" value={29} />
        <Card icon={icon2} title="Challenges Completed" value={42} />
        <Card icon={icon3} title="Total Xps" value={34000} />
      </Stack>
      {data && (
        <RCForm onSubmit={onSubmit} defaultValues={defaultData}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img
                    src={
                      data.providerId
                        ? data.photo
                        : `${import.meta.env.VITE_IMG_URL}/users/${data.photo}`
                    }
                    alt="user image"
                    width={80}
                    height={83.5}
                    style={{ borderRadius: "8px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RCSelect
                    name="country"
                    label="Country"
                    items={countryOptions}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12}>
                  <RCSelect
                    name="gender"
                    label="Gender"
                    items={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                    readOnly
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <RCInput name="name" label="Name" readOnly />
                </Grid>
                <Grid item xs={12}>
                  <RCInput name="email" label="Email" type="email" readOnly />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" gap="12px">
                    <Box width="130px">
                      <RCSelect
                        name="code"
                        label="Country Code"
                        placeholder="+880"
                        items={phoneCodeOptions}
                        readOnly
                      />
                    </Box>
                    <Box flex={1}>
                      <RCInput
                        name="number"
                        label="Phone Number"
                        placeholder="12345678"
                        readOnly
                      />
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <RCInput
                    name="nativeLanguage"
                    label="Native Language"
                    readOnly
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </RCForm>
      )}
    </RCModal>
  );
};

export default ViewUserModal;

const Card = ({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: number;
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      border="1px solid #E0E2E7"
      borderRadius="10px"
      p="28px"
      gap="32px"
    >
      <img src={icon} alt="icon" width={60} height={60} />
      <Box color="#2E2F38">
        <Typography fontSize="22px" fontWeight="800">
          {value}
        </Typography>
        <Typography variant="body2">{title}</Typography>
      </Box>
    </Stack>
  );
};
