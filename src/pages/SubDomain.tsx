import { useState } from "react";
import {
  useDeleteSubDomainMutation,
  useGetAllSubDomainQuery,
} from "../redux/features/subDomain/subDomainApi";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import HeaderTitle from "../components/seo/HeaderTitle";
import { Box, Button, IconButton, Stack } from "@mui/material";
import PageTitle from "../components/ui/shared/PageTitle";
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { TSubDomain } from "../types";
import {
  DeleteRounded,
  DriveFileRenameOutlineRounded,
} from "@mui/icons-material";
import AddSubDomainModal from "../components/ui/subDomain/AddSubDomainModal";
import UpdateSubDomainModal from "../components/ui/subDomain/UpdateSubDomainModal";
import handleAsyncToast from "../utils/handleAsyncToast";

const SubDomain = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState<TSubDomain>();
  const { data, isFetching } = useGetAllSubDomainQuery(undefined);
  const [deleteSubDomain] = useDeleteSubDomainMutation();

  const rowsData: GridValidRowModel[] = data?.data || [];

  const columns: GridColDef<TSubDomain>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "url",
      headerName: "URL",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "port",
      headerName: "Port",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "directory",
      headerName: "Directory",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "gaCode",
      headerName: "GA Code",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "showAdv",
      headerName: "Show Ad",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "addLimit",
      headerName: "Ad Limit",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "addSecurity",
      headerName: "Ad Security",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "isArticle",
      headerName: "Is Article",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" height="100%">
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

  const handleEditModal = (data: TSubDomain) => {
    setModalData(data);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (id: number) => {
    handleAsyncToast({
      promise: deleteSubDomain(id).unwrap(),
      success: () => {
        return "Deleted successfully!";
      },
    });
  };

  return (
    <>
      <HeaderTitle title="Sub Domain" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Sub Domain" />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Sub-Domain</Button>
      </Stack>
      <Box
        mt="20px"
        sx={{ border: "1px solid #E0E2E7" }}
        borderRadius={2}
        bgcolor="white"
        overflow="hidden"
      >
        <MyDataGrid rows={rowsData} columns={columns} loading={isFetching} />
      </Box>
      <AddSubDomainModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {isEditModalOpen && (
        <UpdateSubDomainModal
          data={modalData as TSubDomain}
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
        />
      )}
    </>
  );
};

export default SubDomain;
