import { Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  value: number;
};

const TotalEarningItem = ({ title, value }: Props) => {
  return (
    <Stack direction="column" gap={1}>
      <Typography variant="body2" component="p" color="#DDDCFF">
        {title}
      </Typography>
      <Typography variant="h5" component="p" color="white" fontWeight="medium">
        ${value}
      </Typography>
    </Stack>
  );
};

export default TotalEarningItem;
