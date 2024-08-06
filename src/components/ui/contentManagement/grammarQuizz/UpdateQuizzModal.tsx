import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Grid, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { TGrammarQuiz } from "../../../../types";
import { useUpdateGrammarQuizzMutation } from "../../../../redux/features/contentManagement/grammarQuizz/grammarQuizzApi";
import handleAsyncToast from "../../../../utils/handleAsyncToast";
import RCModal from "../../../modal/RCModal";
import RCForm from "../../../form/RCForm";
import { AddQuizzValidation } from "../../../../schemas";
import RCInput from "../../../form/RCInput";
import RCAutocomplete from "../../../form/RCAutocomplete";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TGrammarQuiz;
};

const UpdateQuizzModal = ({ open, setOpen, data }: TProps) => {
  const [updateQuizz] = useUpdateGrammarQuizzMutation();

  const defaultData = {
    question: data.question || "",
    options: data.options || [],
    rightAnswer: data.rightAnswer || "",
    tips: data.tips || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const submitData = { id: data.id, data: values };
    await handleAsyncToast({
      promise: updateQuizz(submitData).unwrap(),
      success: () => {
        setOpen(false);
        return "Quizz updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Question Details">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(AddQuizzValidation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="question" label="Question" />
          </Grid>
          <Grid item xs={12}>
            <RCAutocomplete
              name="options"
              label="Options"
              placeholder="Yes, it is"
            />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="rightAnswer" label="Right Answer" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="tips" label="Tips" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default UpdateQuizzModal;
