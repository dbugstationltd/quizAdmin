import { FieldValues, SubmitHandler } from "react-hook-form";
import { Grid } from "@mui/material";
import { TGrammarQuiz } from "../../../../types";
import RCModal from "../../../modal/RCModal";
import RCForm from "../../../form/RCForm";
import RCInput from "../../../form/RCInput";
import RCAutocomplete from "../../../form/RCAutocomplete";


type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TGrammarQuiz;
};

const ViewQuizzModal = ({ open, setOpen, data }: TProps) => {
  const defaultData = {
    question: data.question || "",
    options: data.options || [],
    rightAnswer: data.rightAnswer || "",
    tips: data.tips || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async () => {};

  return (
    <RCModal open={open} setOpen={setOpen} title="Question Details">
      <RCForm onSubmit={onSubmit} defaultValues={defaultData}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RCInput name="question" label="Question" readOnly />
          </Grid>
          <Grid item xs={12}>
            <RCAutocomplete
              name="options"
              label="Options"
              placeholder="Yes, it is"
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="rightAnswer" label="Right Answer" readOnly />
          </Grid>
          <Grid item xs={12}>
            <RCInput name="tips" label="Tips" readOnly />
          </Grid>
        </Grid>
      </RCForm>
    </RCModal>
  );
};

export default ViewQuizzModal;
