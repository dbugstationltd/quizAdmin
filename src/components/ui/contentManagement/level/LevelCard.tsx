import { DriveFileRenameOutlineRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

type TProps = {
  title: string;
  bg: string;
  cover: string;
  index: number;
  handleUpdate: () => void;
  handleClick: () => void;
};

const LevelCard = ({
  title,
  bg,
  cover,
  index,
  handleUpdate,
  handleClick,
}: TProps) => {
  return (
    <Box
      borderRadius="24px"
      p="24px"
      height={285}
      width={268}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      overflow="hidden"
      position="relative"
      sx={{cursor: 'pointer'}}
      onClick={handleClick}
    >
      <Stack direction="row" justifyContent="space-between" zIndex={2}>
        <Stack
          justifyContent="center"
          alignItems="center"
          width={48}
          height={48}
          borderRadius="100%"
          bgcolor="white"
        >
          <Typography fontSize="22px" fontWeight="700" color="text.primary">
            {index + 1}
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          width={48}
          height={48}
          borderRadius="100%"
          bgcolor="white"
          sx={{cursor: 'default'}}
          onClick={(e) => {
            e.stopPropagation();
            handleUpdate();
          }}
        >
          <DriveFileRenameOutlineRounded />
        </Stack>
      </Stack>
      <Typography fontSize="20px" fontWeight="700" color="white" zIndex={2}>
        {title}
      </Typography>
      <Box
        position="absolute"
        sx={{ inset: 0, zIndex: 1 }}
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={`${import.meta.env.VITE_IMG_URL}/levels/${bg}`}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Box
        position="absolute"
        sx={{ inset: 0, zIndex: 1 }}
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={`${import.meta.env.VITE_IMG_URL}/levels/${cover}`}
          style={{ maxWidth: "200px" }}
        />
      </Box>
    </Box>
  );
};

export default LevelCard;
