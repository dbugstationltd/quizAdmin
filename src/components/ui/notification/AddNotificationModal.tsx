import { FieldValues, SubmitHandler } from "react-hook-form";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { useAddNotificationMutation } from "../../../redux/features/notification/notificationApi";
import { Button, Grid, Stack } from "@mui/material";
import RCInput from "../../form/RCInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNotification } from "../../../schemas";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNotificationModal = ({ open, setOpen }: TProps) => {
  const [sendNotification] = useAddNotificationMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleAsyncToast({
      promise: sendNotification(values).unwrap(),
      success: () => {
        setOpen(false);
        return "Notification sended successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Send Notification">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={{ title: "", body: "" }}
        resolver={zodResolver(addNotification)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="title" label="Title" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="body" label="Body" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Send</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default AddNotificationModal;
