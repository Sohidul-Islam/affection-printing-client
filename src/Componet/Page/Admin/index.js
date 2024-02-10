import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { initialQueryParam } from "./../Customers/helpers";
import * as API_URL from "../../../network/api";
import AXIOS from "../../../network/axios";
import { successMsg } from "../../Shared/SuccessMsg";
import { Box, Drawer, Grid, Stack, Typography } from "@mui/material";
import SearchContainer from "../Customers/SearchContainer";
import UserCard from "../Customers/UserCard";
import { userCardSx } from "../Customers";
import UsersSkeleton from "../Customers/UsersSkeleton";
import StyledPagination from "../../Common/Component/Pagination";

import logoLeaf from "../../../../src/assets/Image/logo png sm.png";
import AddAdmin from "./AddAdmin";
import ConfirmModal from "../../Common/Component/ConfirmModal";
import useAuth from "../../../hooks/useAuth";

function Admin() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const queryClient = useQueryClient();

  const [totalPages, setTotalPages] = useState(1);

  const [queryParams, setQueryParams] = useState({ ...initialQueryParam });

  const [currentUser, setCurrentUser] = useState({});
  // get users query
  const getUsersQuery = useQuery(
    [API_URL.ADMIN, queryParams],
    () =>
      AXIOS.get(API_URL.ADMIN, {
        params: queryParams,
      }),
    {
      onSuccess: (data) => {
        console.log("data", data);
        if (data.status) {
          setTotalPages(data?.paginatedData?.totalPages || 1);
        }
      },
    }
  );

  const addUserQuery = useMutation((data) => AXIOS.post(API_URL.ADMIN, data), {
    onSuccess: (data) => {
      if (data?.status) {
        successMsg(data?.message, "success");
        setOpen(false);
        queryClient.invalidateQueries(API_URL.ADMIN);
      } else {
        successMsg(data?.message, "warn");
      }
    },
  });

  const deleteUserQuery = useMutation(
    () => AXIOS.delete(API_URL.ADMIN + `/${currentUser?._id}`),
    {
      onSuccess: (data) => {
        console.log("data", data);
        if (data?.status) {
          successMsg(data?.message, "success");
          setIsOpenConfirmModal(false);
          queryClient.invalidateQueries(API_URL.ADMIN);
        } else {
          successMsg(data?.message, "warn");
        }
      },
    }
  );

  const updateUserQuery = useMutation(
    (data) => AXIOS.put(API_URL.ADMIN + `/${currentUser?._id}`, data),
    {
      onSuccess: (data) => {
        console.log("data", data);
        if (data?.status) {
          successMsg(data?.message, "success");
          setOpen(false);
          setCurrentUser({});
          queryClient.invalidateQueries(API_URL.ADMIN);
        } else {
          successMsg(data?.message, "warn");
        }
      },
    }
  );

  const getCurrentUser = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const onClickDeleteButton = (user) => {
    setCurrentUser(user);
    setIsOpenConfirmModal(true);
  };

  return (
    <Stack>
      <SearchContainer
        setQueryParams={setQueryParams}
        onAdd={() => {
          setOpen(true);
        }}
      />

      <Grid container spacing={6} marginTop={5}>
        <Grid item sm={12} md={4} sx={{ width: { xs: "100%", lg: "auto" } }}>
          {!getUsersQuery?.isLoading ? (
            <Box sx={{ minHeight: "90%" }}>
              {getUsersQuery?.data?.admins?.length > 0 ? (
                <Stack gap={4} flex={1}>
                  {getUsersQuery?.data?.admins?.map((userData, i) => (
                    <UserCard
                      key={i}
                      isAdmin={true}
                      user={userData}
                      disableNavigate={true}
                      onClickDeleteButton={onClickDeleteButton}
                      getCurrentUser={getCurrentUser}
                      disabledDeleteBtn={user?._id === userData?._id}
                    />
                  ))}
                </Stack>
              ) : (
                <Stack marginTop={8} gap={4} flex={1}>
                  <Stack
                    justifyContent={"center"}
                    alignContent={"center"}
                    alignItems={"start"}
                    sx={userCardSx}
                  >
                    <Typography>No User Found</Typography>
                  </Stack>
                </Stack>
              )}
            </Box>
          ) : (
            <Box marginTop={8} sx={{ minHeight: "90%" }}>
              <UsersSkeleton />
            </Box>
          )}

          <Stack
            marginTop={8}
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={{ xs: "center", md: "start" }}
          >
            <StyledPagination
              totalPage={totalPages}
              page={queryParams?.page}
              onChange={(_, page) => {
                console.log("page", page);
                setQueryParams((prev) => ({ ...prev, page }));
              }}
            />
          </Stack>
        </Grid>
        <Grid item sm={12} md={8}>
          <Stack
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
            sx={{ height: "80vh", display: { xs: "none", md: "block" } }}
          >
            <img
              src={logoLeaf}
              alt="logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.2,
              }}
            ></img>
          </Stack>
        </Grid>
      </Grid>

      <Drawer open={open} anchor="right">
        <AddAdmin
          currentUser={currentUser}
          addUserQuery={currentUser?._id ? updateUserQuery : addUserQuery}
          onClose={() => {
            setOpen(false);
            setCurrentUser({});
          }}
        />
      </Drawer>

      <ConfirmModal
        sx={{ width: { xs: "96vw", md: "auto" } }}
        loading={deleteUserQuery?.isLoading}
        isOpen={isOpenConfirmModal}
        message="Are you sure you want to delete this user?"
        onCancel={() => setIsOpenConfirmModal(false)}
        onConfirm={() => deleteUserQuery.mutate()}
      />
    </Stack>
  );
}

export default Admin;
