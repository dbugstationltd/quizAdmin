import { FieldValues, SubmitHandler } from "react-hook-form";
import RCModal from "../../modal/RCModal";
import RCForm from "../../form/RCForm";
import { Button, Stack, Typography } from "@mui/material";
import RCInput from "../../form/RCInput";
import { useEffect, useRef } from "react";
import {
  useGetSingleSupportTicketQuery,
  useReplayTicketMutation,
} from "../../../redux/features/supportFeedback/supportFeedbackApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: number;
    title: string;
  };
};

const ViewMessageModal = ({ open, setOpen, data }: TProps) => {
  const { data: ticket } = useGetSingleSupportTicketQuery(data.id, {
    pollingInterval: 5000,
  });
  const [replayMessage] = useReplayTicketMutation();
  const replies = ticket?.data.TicketMessage;
  const stackRef = useRef<HTMLDivElement | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    values.ticketId = data.id;
    await replayMessage(values).unwrap();
  };

  useEffect(() => {
    if (stackRef.current) {
      stackRef.current.scrollTop = stackRef.current.scrollHeight;
    }
  }, [replies]);

  return (
    <RCModal open={open} setOpen={setOpen} title={data.title}>
      <Stack
        ref={stackRef}
        direction="column"
        spacing={1}
        width="100%"
        maxHeight={400}
        overflow="auto"
        pb={1}
        sx={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#eaeaea",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {replies?.map((item) => (
          <Stack
            key={item.message}
            direction="row"
            justifyContent={item.userId ? "flex-start" : "flex-end"}
            pr={1}
          >
            <Typography
              bgcolor={item.userId ? "warning.light" : "primary.light"}
              maxWidth="75%"
              py={0.5}
              px={2}
              borderRadius={5}
              variant="body2"
            >
              {item.message}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <RCForm onSubmit={onSubmit} defaultValues={{ message: "" }}>
        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
          <RCInput name="message" label="Message" sx={{ width: "100%" }} />
          <Button type="submit" sx={{ py: "6.5px" }}>
            Send
          </Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default ViewMessageModal;
