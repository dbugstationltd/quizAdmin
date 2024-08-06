import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TotalEarningItem from "../components/ui/home/TotalEarningItem";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useState } from "react";
import AppPerformance from "../components/ui/home/AppPerformance";
import AdsPerformance from "../components/ui/home/AdsPerformance";
import HeaderTitle from "../components/seo/HeaderTitle";

const Home = () => {
  const [activity, setActivity] = useState(10);

  return (
    <>
      <HeaderTitle title="Dashboard" />
      <Typography variant="h5" fontWeight="medium" component="h1">
        Home
      </Typography>
      <Box mt={3} bgcolor="primary.main" borderRadius={2} p="20px">
        <Typography
          fontSize="18px"
          fontWeight="medium"
          component="p"
          color="white"
        >
          Total estimated earnings
        </Typography>
        <Grid container width="100%" mt={2} spacing={1}>
          <Grid item xs={6} md={3}>
            <TotalEarningItem title="Today so far" value={0.0} />
          </Grid>
          <Grid item xs={6} md={3}>
            <TotalEarningItem title="Yesterday" value={0.0} />
          </Grid>
          <Grid item xs={6} md={3}>
            <TotalEarningItem title="This month so far" value={0.0} />
          </Grid>
          <Grid item xs={6} md={3}>
            <TotalEarningItem title="Last month" value={0.0} />
          </Grid>
        </Grid>
      </Box>
      <Stack mt={3} direction="row" alignItems="center" gap="12px">
        <CalendarMonthOutlinedIcon />
        <Select
          value={activity}
          onChange={(e) => setActivity(e.target.value as number)}
          size="small"
          sx={{
            minWidth: 150,
            fontSize: "14px",
            fontWeight: "500",
            // '& .MuiOutlinedInput-notchedOutline': {
            //   border: 'none'
            // },
          }}
          IconComponent={ArrowDropDownOutlinedIcon}
        >
          <MenuItem value={10}>Last 7 days vs previous 7 days</MenuItem>
          <MenuItem value={20}>Last 1 month vs previous 1 month</MenuItem>
          <MenuItem value={30}>Last 7 days vs previous 7 days</MenuItem>
        </Select>
      </Stack>
      <Stack direction={{ xs: "column", lg: "row" }} mt={3} gap={3}>
        <AdsPerformance />
        <AppPerformance />
      </Stack>
    </>
  );
};

export default Home;
