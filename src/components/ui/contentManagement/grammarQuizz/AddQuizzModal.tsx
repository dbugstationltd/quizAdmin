import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Grid, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddGrammarQuizzMutation } from "../../../../redux/features/contentManagement/grammarQuizz/grammarQuizzApi";
import handleAsyncToast from "../../../../utils/handleAsyncToast";
import RCModal from "../../../modal/RCModal";
import RCForm from "../../../form/RCForm";
import { AddQuizzValidation } from "../../../../schemas";
import RCInput from "../../../form/RCInput";
import RCAutocomplete from "../../../form/RCAutocomplete";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultData = {
  question: "",
  options: [],
  rightAnswer: "",
  tips: "",
};

const AddQuizzModal = ({ open, setOpen }: TProps) => {
  const [addQuizz] = useAddGrammarQuizzMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log(values)
    await handleAsyncToast({
      promise: addQuizz(values).unwrap(),
      success: () => {
        setOpen(false);
        return "Quizz added successfully!";
      },
    });
  };
  return (
    <RCModal open={open} setOpen={setOpen} title="Add Question">
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
              placeholder="type and enter"
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

export default AddQuizzModal;
