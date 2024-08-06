import { Box, Button, IconButton, Stack } from "@mui/material";
import PageTitle from "../components/ui/shared/PageTitle";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { useState } from "react";
import { TSubCategory } from "../types";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import handleAsyncToast from "../utils/handleAsyncToast";
import AddSubCategoryModal from "../components/ui/subCategory/AddSubCategoryModal";
import UpdateSubCategoryModal from "../components/ui/subCategory/UpdateSubCategoryModal";
import {
  useDeleteSubCategoryMutation,
  useGetAllSubCategoryQuery,
} from "../redux/features/subCategory/subCategoryApi";
import { Navigate } from "react-router-dom";

const SubCategory = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TSubCategory>();
  const { data, isLoading } = useGetAllSubCategoryQuery(undefined);
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const rowsData: GridValidRowModel[] = data?.data || [];

  const columns: GridColDef<TSubCategory>[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "icon",
      headerName: "Icon",
      renderCell: ({ row }) => (
        <Stack justifyContent="center" height="100%">
          <img
            src={`${import.meta.env.VITE_IMG_URL}/category/${row.img}`}
            alt="icon"
            width={30}
            height={30}
            style={{ borderRadius: "4px" }}
          />
        </Stack>
      ),
      minWidth: 50,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
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
          <IconButton
            onClick={() => <Navigate to={`/sub-category/${row.id}`} />}
            aria-label="view"
          >
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

  const handleEditModal = (data: TSubCategory) => {
    setModalData(data);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    handleAsyncToast({
      promise: deleteSubCategory(id).unwrap(),
      success: () => {
        return "Sub category deleted successfully!";
      },
    });
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Sub Category" />
        <Button onClick={() => setIsAddModalOpen(true)}>
          Add Sub-Category
        </Button>
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
      <AddSubCategoryModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {isEditModalOpen && (
        <UpdateSubCategoryModal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          data={modalData as TSubCategory}
        />
      )}
    </>
  );
};

export default SubCategory;
