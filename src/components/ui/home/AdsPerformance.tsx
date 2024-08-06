import { Box, Grid, Stack, Typography } from "@mui/material";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const AdsPerformance = () => {
  return (
    <Box
      flex={1}
      border="1px solid #E0E2E7"
      borderRadius={2}
      p="20px"
      bgcolor="white"
    >
      <Typography variant="subtitle1" fontWeight="500">
        Ads activity performance
      </Typography>
      <Grid container columnSpacing="20px" rowGap="16px" mt="16px">
        <Grid item xs={12} md={6}>
          <Card title="Est. earnings" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card title="Request" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card title="Impression" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card title="Match Rate" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card title="eCPM" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdsPerformance;

const Card = ({ title }: { title: string }) => {
  return (
    <>
      <Typography variant="body2" fontWeight="500" color="text.secondary">
        {title}
      </Typography>
      <Box
        mt="8px"
        border="1px solid #E0E2E7"
        borderRadius={2}
        p="16px"
        bgcolor="#F8F9FA"
        display="flex"
      >
        <Stack direction="column" gap="10px" mr={2}>
          <Typography fontSize="20px" fontWeight="500">
            $0.00
          </Typography>
          <Typography variant="body2" color="text.secondary">
            $0.00
          </Typography>
        </Stack>
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#18A563"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#2D2F30"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </>
  );
};
