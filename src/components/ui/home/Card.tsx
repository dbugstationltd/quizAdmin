import { Stack, Typography } from "@mui/material";

type TProps = {
  title: string;
  count: number;
  icon: string;
};

const Card = ({count, icon, title}: TProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="24px"
      borderRadius="10px"
      height="116px"
      bgcolor="white"
      pl="30px"
    >
      <img src={icon} alt="" width={60} height={60} />
      <Stack>
        <Typography fontSize="22px" fontWeight={800} color="#585960">
          {count || 0}
        </Typography>
        <Typography fontSize="14px" color="#585960">
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Card;
