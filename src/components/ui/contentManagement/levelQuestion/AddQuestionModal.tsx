import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  chooseResponseValidation,
  fillTheBlankValidation,
  imageValidation,
  mcqValidation,
  pickRightOptionValidation,
  videoValidation,
} from "../../../../schemas";
import { useParams } from "react-router-dom";
import { useAddQuestionMutation } from "../../../../redux/features/contentManagement/levelQuestion/levelQuestionApi";
import objectToFormData from "../../../../utils/objectToFormData";
import handleAsyncToast from "../../../../utils/handleAsyncToast";
import RCModal from "../../../modal/RCModal";
import RCForm from "../../../form/RCForm";
import RCSelectWithWatch from "../../../form/RCSelectWithWatch";
import { questionTypeOptions } from "../../../../constants";
import RCInput from "../../../form/RCInput";
import RCAutocomplete from "../../../form/RCAutocomplete";
import RCFileUploader from "../../../form/RCFileUploader";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultData = {
  questionType: "fillTheBlank",
  question: "",
  fillBlank: "",
  answer: [],
  correctAnswer: [],
  file: undefined,
};

const AddQuestionModal = ({ open, setOpen }: TProps) => {
  const [qType, setQType] = useState<
    | "fillTheBlank"
    | "chooseResponse"
    | "pickRightOption"
    | "mcq"
    | "selectMultiple"
    | "image"
    | "video"
  >("fillTheBlank");
  const { id } = useParams();
  const [addQuestion] = useAddQuestionMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = objectToFormData(values);
    
    const submitData = { id, data: formData };
    await handleAsyncToast({
      promise: addQuestion(submitData).unwrap(),
      success: () => {
        setOpen(false);
        return "Question added successfully!";
      },
    });
  };
  return (
    <RCModal open={open} setOpen={setOpen} title="Add Question">
      <RCForm
        onSubmit={onSubmit}
        defaultValues={defaultData}
        resolver={zodResolver(
          qType === "fillTheBlank"
            ? fillTheBlankValidation
            : qType === "chooseResponse"
            ? chooseResponseValidation
            : qType === "pickRightOption"
            ? pickRightOptionValidation
            : qType === "mcq"
            ? mcqValidation
            : qType === "selectMultiple"
            ? mcqValidation
            : qType === "image"
            ? imageValidation
            : videoValidation
        )}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCSelectWithWatch
              name="questionType"
              label="Question Type"
              items={questionTypeOptions}
              onValueChange={setQType as any}
            />
          </Grid>
          {qType === "fillTheBlank" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" />
              </Grid>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" />
              </Grid>
            </>
          ) : qType === "chooseResponse" ? (
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
          ) : qType === "pickRightOption" ? (
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
          ) : qType === "mcq" ? (
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
          ) : qType === "selectMultiple" ? (
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
          ) : qType === "image" ? (
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
          ) : qType === "video" ? (
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

export default AddQuestionModal;
