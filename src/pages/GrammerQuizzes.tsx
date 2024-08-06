import { useState } from "react";
import { TGrammarQuiz } from "../types";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { Box, Button, IconButton, Stack } from "@mui/material";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import handleAsyncToast from "../utils/handleAsyncToast";
import PageTitle from "../components/ui/shared/PageTitle";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { useDeleteGrammarQuizzMutation, useGetGrammarQuizzQuery } from "../redux/features/contentManagement/grammarQuizz/grammarQuizzApi";
import AddQuizzModal from "../components/ui/contentManagement/grammarQuizz/AddQuizzModal";
import UpdateQuizzModal from "../components/ui/contentManagement/grammarQuizz/UpdateQuizzModal";
import ViewQuizzModal from "../components/ui/contentManagement/grammarQuizz/ViewQuizzModal";

const GrammerQuizzes = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TGrammarQuiz>();

  const { data, isLoading } = useGetGrammarQuizzQuery(undefined);
  const [deleteGrammarQuizz] = useDeleteGrammarQuizzMutation();

  const columns: GridColDef<TGrammarQuiz>[] = [
    {
      field: "question",
      headerName: "Question",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "rightAnswer",
      headerName: "Right Answer",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "tips",
      headerName: "Tips",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: 'right',
      renderCell: ({ row }) => (
        <Stack direction="row" justifyContent='end' alignItems="center" height="100%">
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

  const handleViewModal = (data: TGrammarQuiz) => {
    setModalData(data);
    setIsViewModalOpen(true);
  };
  const handleEditModal = (data: TGrammarQuiz) => {
    setModalData(data);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    handleAsyncToast({
      promise: deleteGrammarQuizz(id).unwrap(),
      success: () => {
        return "Grammar quizz deleted successfully!";
      },
    });
  };

  const rowsData: GridValidRowModel[] = data?.data || [];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Grammar Quizz" />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Quizz</Button>
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
      <AddQuizzModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {isEditModalOpen && (
        <UpdateQuizzModal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          data={modalData as TGrammarQuiz}
        />
      )}
      {isViewModalOpen && (
        <ViewQuizzModal
          open={isViewModalOpen}
          setOpen={setIsViewModalOpen}
          data={modalData as TGrammarQuiz}
        />
      )}
    </>
  );
};

export default GrammerQuizzes;
