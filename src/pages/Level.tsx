import { Button, Stack } from "@mui/material";
import PageTitle from "../components/ui/shared/PageTitle";
import React, { useState } from "react";
import { TLevel } from "../types";
import { useNavigate } from "react-router-dom";
import { useGetLevelQuery } from "../redux/features/contentManagement/level/levelApi";
import LevelCard from "../components/ui/contentManagement/level/LevelCard";
import AddLevelModal from "../components/ui/contentManagement/level/AddLevelModal";
import UpdateLevelModal from "../components/ui/contentManagement/level/UpdateLevelModal";

const Level = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TLevel | undefined>();
  const navigate = useNavigate();

  const { data } = useGetLevelQuery(undefined);

  const handleUpdate = (data: TLevel) => {
    setModalData(data);
    setIsUpdateModalOpen(true);
  };
  const handleClick = (id: number) => {
    navigate(`/content-management/level/${id}`);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageTitle title="Levels" />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Level</Button>
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={4} mt={3}>
        {data?.data?.map((item, index) => (
          <React.Fragment key={index}>
            <LevelCard
              key={index}
              title={item.title}
              bg={item.bgImg}
              cover={item.coverImg}
              index={index}
              handleUpdate={() => handleUpdate(item)}
              handleClick={() => handleClick(item.id)}
            />
          </React.Fragment>
        ))}
      </Stack>
      <AddLevelModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      {isUpdateModalOpen && (
        <UpdateLevelModal
          open={isUpdateModalOpen}
          setOpen={setIsUpdateModalOpen}
          data={modalData as TLevel}
        />
      )}
    </>
  );
};

export default Level;
