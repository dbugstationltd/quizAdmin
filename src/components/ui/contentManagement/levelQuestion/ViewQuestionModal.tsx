import { FieldValues, SubmitHandler } from "react-hook-form";
import { TLevelQuestion } from "../../../../types";
import RCModal from "../../../modal/RCModal";
import RCForm from "../../../form/RCForm";
import { Grid } from "@mui/material";
import RCSelect from "../../../form/RCSelect";
import { questionTypeOptions } from "../../../../constants";
import RCInput from "../../../form/RCInput";
import RCAutocomplete from "../../../form/RCAutocomplete";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TLevelQuestion;
};

const ViewQuestionModal = ({ open, setOpen, data }: TProps) => {
  const defaultData = {
    questionType: data.questionType || "",
    question: data.question || "",
    fillBlank: data.fillBlank || "",
    answer: data.answer || [],
    correctAnswer: data.correctAnswer || [],
    file: undefined,
  };

  const onSubmit: SubmitHandler<FieldValues> = async () => {};

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
                <RCInput name="question" label="Question" readOnly />
              </Grid>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" readOnly />
              </Grid>
            </>
          ) : data.questionType === "chooseResponse" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" readOnly />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="Yes, it is"
                  readOnly
                />
              </Grid>
            </>
          ) : data.questionType === "pickRightOption" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" readOnly />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
            </>
          ) : data.questionType === "mcq" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" readOnly />
              </Grid>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" readOnly />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
            </>
          ) : data.questionType === "selectMultiple" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="question" label="Question" readOnly />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
            </>
          ) : data.questionType === "image" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" readOnly />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <img
                  src={`${import.meta.env.VITE_IMG_URL}/levelImageVideo/${
                    data.file
                  }`}
                  width={250}
                />
              </Grid>
            </>
          ) : data.questionType === "video" ? (
            <>
              <Grid item xs={12}>
                <RCInput name="fillBlank" label="Fill Blank" readOnly />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="answer"
                  label="Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <RCAutocomplete
                  name="correctAnswer"
                  label="Correct Answer"
                  placeholder="dominos"
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <video
                  src={`${import.meta.env.VITE_IMG_URL}/levelImageVideo/${
                    data.file
                  }`}
                  width={300}
                  controls
                />
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
      </RCForm>
    </RCModal>
  );
};

export default ViewQuestionModal;
