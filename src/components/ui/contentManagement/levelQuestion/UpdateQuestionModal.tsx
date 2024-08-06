import { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { TLevelQuestion } from "../../../../types";
import { useUpdateQuestionMutation } from "../../../../redux/features/contentManagement/levelQuestion/levelQuestionApi";
import objectToFormData from "../../../../utils/objectToFormData";
import handleAsyncToast from "../../../../utils/handleAsyncToast";
import RCModal from "../../../modal/RCModal";
import RCForm from "../../../form/RCForm";
import { Button, Grid, Stack } from "@mui/material";
import RCSelect from "../../../form/RCSelect";
import { questionTypeOptions } from "../../../../constants";
import RCInput from "../../../form/RCInput";
import RCAutocomplete from "../../../form/RCAutocomplete";
import RCFileUploader from "../../../form/RCFileUploader";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TLevelQuestion;
};

const UpdateQuestionModal = ({ open, setOpen, data }: TProps) => {
  const { id } = useParams();
  const [updateQuestion] = useUpdateQuestionMutation();
  const defaultData = {
    questionType: data.questionType || "",
    question: data.question || "",
    fillBlank: data.fillBlank || "",
    answer: data.answer || [],
    correctAnswer: data.correctAnswer || [],
    file: undefined,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values);

    const submitData = { id: data.id, data: formData, levelId: id };
    await handleAsyncToast({
      promise: updateQuestion(submitData).unwrap(),
      success: () => {
        setOpen(false);
        return "Question updated successfully!";
      },
    });
  };

  return (
    <RCModal open={open} setOpen={setOpen} title="Question Details">
      <RCForm onSubmit={onSubmit} defaultValues={defaultData}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCSelect
              name="questionType"
              label="Question Type"
              items={questionTypeOptions}
              readOnly
            />
          </Grid>
          {data.questionType === "fillTheBlank" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" />
              </Grid>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" />
              </Grid>
            </>
          ) : data.questionType === "chooseResponse" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="Yes, it is"
                />
              </Grid>
            </>
          ) : data.questionType === "pickRightOption" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                />
              </Grid>
            </>
          ) : data.questionType === "mcq" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" />
              </Grid>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                />
              </Grid>
            </>
          ) : data.questionType === "selectMultiple" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                />
              </Grid>
            </>
          ) : data.questionType === "image" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                />
              </Grid>
              <Grid item xs={12}>
                <RCFileUploader name="file" label="Image" />
              </Grid>
            </>
          ) : data.questionType === "video" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <RCFileUploader name="file" label="Video" />
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
        <Stack direction="row" justifyContent="end" mt={4}>
          <Button type="submit">Submit</Button>
        </Stack>
      </RCForm>
    </RCModal>
  );
};

export default UpdateQuestionModal;
