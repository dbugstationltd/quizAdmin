import { zodResolver } from "@hookform/resolvers/zod";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import { AddQuizValidation } from "../../../schemas";
import { Button, Grid, Stack } from "@mui/material";
import RCInput from "../../form/RCInput";
import RCAutocomplete from "../../form/RCAutocomplete";
import { useParams } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { useAddQuizMutation } from "../../../redux/features/quiz/quizApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddQuizModal: React.FC<TProps> = ({ open, setOpen }) => {
  const { id } = useParams();
  const [addQuiz] = useAddQuizMutation();

  const defaultData = {
    question: "",
    answer: [],
    correctAnswer: "",
    coins: 100,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    values.subCategoryId = Number(id);
    await handleAsyncToast({
      promise: addQuiz({ id, data: values }).unwrap(),
      success: () => {
        setOpen(false);
        return "Quiz added successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Add Quiz">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(AddQuizValidation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="question" label="Question" />
          </Grid>
          <Grid item xs={12}>
            <RCAutocomplete name="answer" label="Answer" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="correctAnswer" label="Correct Answer" />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="coins" label="Coins" type="number" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default AddQuizModal;
