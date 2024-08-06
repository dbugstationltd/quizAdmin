import { Box, IconButton, MenuItem, Select, Stack } from "@mui/material";
import PageTitle from "../components/ui/shared/PageTitle";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { TUser } from "../types";
import { useState } from "react";
import { useGetLeaderboardQuery } from "../redux/features/leaderboard/leaderboardApi";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { VisibilityRounded } from "@mui/icons-material";
import ViewUserModal from "../components/ui/userManagement/ViewUserModal";

const Leaderboard = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [filter, setFilter] = useState("weekly");
  const { data, isLoading } = useGetLeaderboardQuery({ time: filter });
  const formattedData = data?.data.map((item: any, index) => ({
    ...item,
    id: item.id,
    position: index + 1,
    name: item.name,
    email: item.email,
    levelsPassedCount: item.levelsPassedCount,
    weekPatternCount: item.weekPatternCount,
    totalXp: item.totalXp,
  }));
  const rowsData: GridValidRowModel[] = formattedData || [];

  const columns: GridColDef<TUser>[] = [
    {
      field: "position",
      headerName: "Position",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "name",
      headerName: "User",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "levelsPassedCount",
      headerName: "Level Passed",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "weekPatternCount",
      headerName: "Quizz Completed",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "totalXp",
      headerName: "Earned XPs",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" height="100%">
          <IconButton onClick={() => handleViewModal(row)} aria-label="view">
            <VisibilityRounded color="primary" />
          </IconButton>
        </Stack>
      ),
      minWidth: 150,
      flex: 1,
    },
  ];

  const handleViewModal = (data: any) => {
    setModalData(data);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Reward & Leaderboard" />
      </Stack>
      <Stack mt={3} direction="row" alignItems="center" gap="12px">
        <CalendarMonthOutlinedIcon />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as string)}
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
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="allTime">All Time</MenuItem>
        </Select>
      </Stack>
      <Box
        mt="20px"
        sx={{ border: "1px solid #E0E2E7" }}
        borderRadius={2}
        bgcolor="white"
        overflow="hidden"
      >
        <MyDataGrid rows={rowsData} columns={columns} loading={isLoading} disableColumnSorting />
      </Box>
      {isViewModalOpen && (
        <ViewUserModal
          isOpen={isViewModalOpen}
          setIsOpen={setIsViewModalOpen}
          data={modalData as any}
        />
      )}
    </>
  );
};

export default Leaderboard;
