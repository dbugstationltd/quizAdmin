import { Box, Button, IconButton, Stack } from "@mui/material";
import PageTitle from "../components/ui/shared/PageTitle";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { useState } from "react";
import { TPermissions, TSubCategory } from "../types";
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
import { Link } from "react-router-dom";
import RCSelectWithWatchExtra from "../components/form/RCSelectWithWatchExtra";
import { useGetAllCategoryQuery } from "../redux/features/category/categoryApi";
import HeaderTitle from "../components/seo/HeaderTitle";
import GetPermission from "../utils/getPermission";
import { toast } from "sonner";

const SubCategory = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TSubCategory>();
  const [category, setCategory] = useState("");
  const { data: categoryData, isLoading: catIsLoading } =
    useGetAllCategoryQuery(undefined);
  const { data, isLoading } = useGetAllSubCategoryQuery({ category });
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const { delete: del, edit } = GetPermission("sub-category") as TPermissions;

  const categoryOptions =
    (!catIsLoading &&
      categoryData?.data.map((item) => ({
        label: item.title,
        value: item.title,
      }))) ||
    [];

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
            width={44}
            height={44}
          />
        </Stack>
      ),
      minWidth: 50,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      renderCell: ({ row }) => row.category.title,
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
          <Link to={`/sub-category/${row.id}`}>
            <IconButton aria-label="view">
              <VisibilityRounded color="primary" />
            </IconButton>
          </Link>
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

  const handleEditModal = (data: TSubCategory) => {
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
        promise: deleteSubCategory(id).unwrap(),
        success: () => {
          return "Sub category deleted successfully!";
        },
      });
    }
  };

  return (
    <>
      <HeaderTitle title="Sub category" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Sub Category" />
        <Button onClick={() => setIsAddModalOpen(true)}>
          Add Sub-Category
        </Button>
      </Stack>
      <RCSelectWithWatchExtra
        name="category"
        label="Category"
        items={categoryOptions}
        onValueChange={(value) => setCategory(value.toLowerCase())}
        value={""}
        sx={{ maxWidth: "150px", mt: 3 }}
      />
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
