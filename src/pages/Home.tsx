import { Grid, Typography } from "@mui/material";
import HeaderTitle from "../components/seo/HeaderTitle";
import { useGetMetaDataQuery } from "../redux/features/home/homeApi";
import totalQuizIcon from "../assets/icon/total-quiz.svg";
import totalUserIcon from "../assets/icon/total-user.svg";
import totalAdminIcon from "../assets/icon/total-admin.svg";
import totalCategoryIcon from "../assets/icon/total-category.svg";
import totalSubcategoryIcon from "../assets/icon/total-subcategory.svg";
import totalNotificationIcon from "../assets/icon/total-notification.svg";
import Card from "../components/ui/home/Card";

const Home = () => {
  const { data } = useGetMetaDataQuery(undefined);

  return (
    <>
      <HeaderTitle title="Dashboard" />
      <Typography variant="h5" fontWeight="medium" component="h1">
        Home
      </Typography>
      <Grid container mt={2} spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          <Card
            count={data?.data?.totalQuizes as number}
            icon={totalQuizIcon}
            title="Total Quiz"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card
            count={data?.data?.totalUsers as number}
            icon={totalUserIcon}
            title="Total Users"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card
            count={data?.data?.totalAdmins as number}
            icon={totalAdminIcon}
            title="Total Admin"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card
            count={data?.data?.totalCategories as number}
            icon={totalCategoryIcon}
            title="Total Category"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card
            count={data?.data?.totalSubCategories as number}
            icon={totalSubcategoryIcon}
            title="Total Sub Category"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card
            count={data?.data?.totalNotifications as number}
            icon={totalNotificationIcon}
            title="Total Notification"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
