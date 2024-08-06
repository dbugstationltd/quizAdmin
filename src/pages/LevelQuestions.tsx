import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Stack } from "@mui/material";
import PageTitle from "../components/ui/shared/PageTitle";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { useState } from "react";
import { TLevelQuestion } from "../types";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import handleAsyncToast from "../utils/handleAsyncToast";
import { useGetSingleLevelQuery } from "../redux/features/contentManagement/level/levelApi";
import { useDeleteQuestionMutation } from "../redux/features/contentManagement/levelQuestion/levelQuestionApi";
import AddQuestionModal from "../components/ui/contentManagement/levelQuestion/AddQuestionModal";
import ViewQuestionModal from "../components/ui/contentManagement/levelQuestion/ViewQuestionModal";
import UpdateQuestionModal from "../components/ui/contentManagement/levelQuestion/UpdateQuestionModal";

const LevelQuestions = () => {
  const { id } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TLevelQuestion>();
  const { data, isLoading } = useGetSingleLevelQuery(id as string);
  const [deleteQuestion] = useDeleteQuestionMutation();

  const rowsData: GridValidRowModel[] = data?.data.levelQuestion || [];

  const columns: GridColDef<TLevelQuestion>[] = [
    {
      field: "question",
      headerName: "Question",
      renderCell: ({ row }) => row.question || row.fillBlank,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "questionType",
      headerName: "Question Type",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "right",
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          height="100%"
        >
          <IconButton onClick={() => handleViewModal(row)} aria-label="view">
            <VisibilityRounded color="primary" />
          </IconButton>
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

  const handleViewModal = (data: TLevelQuestion) => {
    setModalData(data);
    setIsViewModalOpen(true);
  };
  const handleEditModal = (data: TLevelQuestion) => {
    setModalData(data);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    await handleAsyncToast({
      promise: deleteQuestion(id).unwrap(),
      success: () => {
        return "Question deleted successfully!";
      },
    });
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title={data?.data.title as string} />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Question</Button>
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
      <AddQuestionModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {isViewModalOpen && (
        <ViewQuestionModal
          open={isViewModalOpen}
          setOpen={setIsViewModalOpen}
          data={modalData as TLevelQuestion}
        />
      )}
      {isEditModalOpen && (
        <UpdateQuestionModal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          data={modalData as TLevelQuestion}
        />
      )}
    </>
  );
};

export default LevelQuestions;
