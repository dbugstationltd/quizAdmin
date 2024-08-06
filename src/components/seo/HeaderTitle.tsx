import { Helmet } from "react-helmet-async";
import { useGetWebSettingsQuery } from "../../redux/features/webSettings/webSettingsApi";

const HeaderTitle = ({ title }: { title: string }) => {
  const { data } = useGetWebSettingsQuery(undefined);
  return (
    <Helmet>
      <title>{`${data?.data.login_page_title} | ${title}`}</title>
    </Helmet>
  );
};

export default HeaderTitle;
