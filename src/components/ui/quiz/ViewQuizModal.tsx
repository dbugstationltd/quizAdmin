import { FieldValues, SubmitHandler } from "react-hook-form";
import { TQuiz } from "../../../types";
import RCForm from "../../form/RCForm";
import RCModal from "../../modal/RCModal";
import handleAsyncToast from "../../../utils/handleAsyncToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddQuizValidation } from "../../../schemas";
import { useUpdateQuizMutation } from "../../../redux/features/quiz/quizApi";
import { Grid } from "@mui/material";
import RCInput from "../../form/RCInput";
import RCAutocomplete from "../../form/RCAutocomplete";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TQuiz;
};

const ViewQuizModal = ({ data, open, setOpen }: TProps) => {
  const [updateQuiz] = useUpdateQuizMutation();

  const defaultData = {
    question: data.question || "",
    answer: data.answer || [],
    correctAnswer: data.correctAnswer || "",
    coins: data.coins || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    values.subCategoryId = data.subCategoryId;
    await handleAsyncToast({
      promise: updateQuiz({
        id: data.id,
        data: values,
        SCId: data.subCategoryId,
      }).unwrap(),
      success: () => {
        setOpen(false);
        return "Quiz updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Quiz Details">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(AddQuizValidation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="question" label="Question" readOnly />
          </Grid>
          <Grid item xs={12}>
            <RCAutocomplete name="answer" label="Answer" readOnly />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="correctAnswer" label="Correct Answer" readOnly />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="coins" label="Coins" type="number" readOnly />
          </Grid>
        </Grid>
      </RCForm>
    </RCModal>
  );
};

export default ViewQuizModal;
