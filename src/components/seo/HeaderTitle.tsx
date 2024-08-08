import { Helmet } from "react-helmet-async";
import { useGetWebSettingsQuery } from "../../redux/features/webSettings/webSettingsApi";

const HeaderTitle = ({ title }: { title: string }) => {
  const { data } = useGetWebSettingsQuery(undefined);
  return (
    <Helmet>
      <title>{`${data?.data.headerTitle} | ${title}`}</title>
    </Helmet>
  );
};

export default HeaderTitle;
