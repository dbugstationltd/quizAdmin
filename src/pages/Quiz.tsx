import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Stack } from "@mui/material";
import PageTitle from "../components/ui/shared/PageTitle";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { useState } from "react";
import { TQuiz } from "../types";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import handleAsyncToast from "../utils/handleAsyncToast";
import { useGetSingleSubCategoryQuery } from "../redux/features/subCategory/subCategoryApi";
import AddQuizModal from "../components/ui/quiz/AddQuizModal";
import UpdateQuizModal from "../components/ui/quiz/UpdateQuizModal";
import { useDeleteQuizMutation } from "../redux/features/quiz/quizApi";
import ViewQuizModal from "../components/ui/quiz/ViewQuizModal";

const Quiz = () => {
  const { id } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TQuiz>();
  const { data, isLoading } = useGetSingleSubCategoryQuery(id as string);
  const [deleteQuiz] = useDeleteQuizMutation();

  const rowsData: GridValidRowModel[] = data?.data.quizes || [];

  const columns: GridColDef<TQuiz>[] = [
    {
      field: "question",
      headerName: "Question",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "answer",
      headerName: "Answers",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "correctAnswer",
      headerName: "Correct Answers",
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

  const handleViewModal = (data: TQuiz) => {
    setModalData(data);
    setIsViewModalOpen(true);
  };
  const handleEditModal = (data: TQuiz) => {
    setModalData(data);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (qId: number) => {
    await handleAsyncToast({
      promise: deleteQuiz({ id: qId, SCId: id }).unwrap(),
      success: () => {
        return "Quiz deleted successfully!";
      },
    });
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title={data?.data.title as string} />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Quiz</Button>
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
      <AddQuizModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {isViewModalOpen && (
        <ViewQuizModal
          open={isViewModalOpen}
          setOpen={setIsViewModalOpen}
          data={modalData as TQuiz}
        />
      )}
      {isEditModalOpen && (
        <UpdateQuizModal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          data={modalData as TQuiz}
        />
      )}
    </>
  );
};

export default Quiz;
