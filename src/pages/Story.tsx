import { Box, Button, IconButton, Stack } from "@mui/material";
import PageTitle from "../components/ui/shared/PageTitle";
import {
  useDeleteStoryMutation,
  useGetStoryQuery,
} from "../redux/features/contentManagement/story/storyApi";
import { useState } from "react";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
} from "@mui/icons-material";
import handleAsyncToast from "../utils/handleAsyncToast";
import AddStoryModal from "../components/ui/contentManagement/story/AddStoryModal";
import UpdateStoryModal from "../components/ui/contentManagement/story/UpdateStoryModal";

const Story = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState();
  const { data, isLoading } = useGetStoryQuery(undefined);
  const [deleteStory] = useDeleteStoryMutation();
  const rowsData: GridValidRowModel[] = data?.data || [];

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "file",
      headerName: "Image/Video",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "right",
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          height="100%"
        >
          <IconButton onClick={() => handleEditModal(row)} aria-label="view">
            <DriveFileRenameOutlineRounded color="success" />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)} aria-label="view">
            <DeleteRounded color="error" />
          </IconButton>
        </Stack>
      ),
      minWidth: 140,
      flex: 1,
    },
  ];

  const handleEditModal = (data: any) => {
    setModalData(data);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    handleAsyncToast({
      promise: deleteStory(id).unwrap(),
      success: () => {
        return "Story deleted successfully!";
      },
    });
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Stories" />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Story</Button>
      </Stack>
      <Box
        mt="20px"
        sx={{ border: "1px solid #E0E2E7" }}
        borderRadius={2}
        bgcolor="white"
        overflow="hidden"
      >
        <MyDataGrid rows={rowsData} columns={columns} loading={isLoading} />
      </Box>
      <AddStoryModal
        open={isAddModalOpen}
        setOpen={setIsAddModalOpen}
      />
      {isEditModalOpen && (
        <UpdateStoryModal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          data={modalData}
        />
      )}
    </>
  );
};

export default Story;
