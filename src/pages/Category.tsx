import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
} from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { useState } from "react";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import AddCategoryModal from "../components/ui/category/AddCategoryModal";
import UpdateCategoryModal from "../components/ui/category/UpdateCategoryModal";
import PageTitle from "../components/ui/shared/PageTitle";
import { TCategory, TPermissions } from "../types";
import handleAsyncToast from "../utils/handleAsyncToast";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../redux/features/category/categoryApi";
import HeaderTitle from "../components/seo/HeaderTitle";
import GetPermission from "../utils/getPermission";
import { toast } from "sonner";

const Category = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TCategory>();
  const { data, isLoading } = useGetAllCategoryQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();
  const rowsData: GridValidRowModel[] = data?.data || [];
  const { delete: del, edit } = GetPermission("category") as TPermissions;

  const columns: GridColDef<TCategory>[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "img",
      headerName: "Icon",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <img
            src={`${import.meta.env.VITE_IMG_URL}/category/${row.img}`}
            alt="icon"
            width={44}
            height={44}
          />
        </Stack>
      ),
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
          <IconButton onClick={() => handleEditModal(row)} aria-label="edit">
            <DriveFileRenameOutlineRounded color="success" />
          </IconButton>

          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
            <DeleteRounded color="error" />
          </IconButton>
        </Stack>
      ),
      minWidth: 140,
      flex: 1,
    },
  ];

  const handleEditModal = (data: TCategory) => {
    if (!edit) {
      toast.error("You don't have permission");
    } else {
      setModalData(data);
      setIsEditModalOpen(true);
    }
  };
  const handleDelete = async (id: number) => {
    if (!del) {
      toast.error("You don't have permission");
    } else {
      handleAsyncToast({
        promise: deleteCategory(id).unwrap(),
        success: () => {
          return "Category deleted successfully!";
        },
      });
    }
  };

  return (
    <>
      <HeaderTitle title="Category" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Category" />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Category</Button>
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
      <AddCategoryModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {isEditModalOpen && (
        <UpdateCategoryModal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          data={modalData as TCategory}
        />
      )}
    </>
  );
};

export default Category;
