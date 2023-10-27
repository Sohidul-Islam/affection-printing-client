/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import { Add } from "@mui/icons-material";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import SideBarContainer from "../../../Common/SidebarContainer";

import StyledInputForm from "../../../Common/Shared/StyledInputForm";
import PriceListContainer from "./PriceListContainer";
import TopicsContainer from "./TopicsContainer";
import { validatePrice, validatePriceList, validateTopics } from "./helpers";
import { successMsg } from "../../../Shared/SuccessMsg";

const getInitialDataForQuotation = (data, type) => {
  const initialQuotation = {
    id: 1,
    title: "",
    topics: [],
    priceList: [],
  };

  const initialPriceList = [
    {
      id: 1,
      quantity: "",
      unitPrice: "",
      totalPrice: "",
    },
  ];

  const initialTopics = [
    {
      id: 1,
      title: "page",
      desc: "",
    },
    {
      id: 2,
      title: "Size",
      desc: "",
    },
    {
      id: 3,
      title: "Packet",
      desc: "",
    },
  ];

  if (type === "quotation") {
    return data || initialQuotation;
  }

  if (type === "topics") {
    return data ? [...data?.topics] : initialTopics;
  }

  if (type === "priceList") {
    return data ? [...data?.priceList] : initialPriceList;
  }
};

function AddQuotation({ onClose, quotation, addQuotaionHandler }) {
  const theme = useTheme();
  const [topics, setTopics] = useState(
    getInitialDataForQuotation(quotation, "topics")
  );
  const [priceList, setPriceList] = useState(
    getInitialDataForQuotation(quotation, "priceList")
  );

  const [newQuotation, setNewQuotation] = useState(
    getInitialDataForQuotation(quotation, "quotation")
  );

  const onSubmitQuotation = () => {
    const validateTopicsList = validateTopics(topics);
    const validatePriceList = validatePrice(priceList);

    console.log({ validateTopicsList, validatePriceList });

    if (!newQuotation?.title) {
      successMsg("Please Write quotation Title");
      return;
    }

    if (validatePriceList && validateTopicsList && newQuotation?.title)
      setNewQuotation((prev) => {
        const updatedQuotation = {
          ...prev,
          topics: [...topics],
          priceList: [...priceList],
        };

        console.log({ updatedQuotation });

        addQuotaionHandler(updatedQuotation);
        onClose();
        return updatedQuotation;
      });
  };

  // set topics here by index
  const onChangeTopcisHandler = (e, topic) => {
    const { name, value } = e.target;

    setTopics((prev) => {
      const isExist = prev?.findIndex((item) => item?.id === topic?.id);

      if (isExist > -1) {
        console.log(prev[isExist][name]);
        prev[isExist][name] = value;
      }

      return [...prev];
    });
  };

  // set topics here by index
  const onChangePriceHandler = (e, topic) => {
    const { name, value } = e.target;

    setPriceList((prev) => {
      const isExist = prev?.findIndex((item) => item?.id === topic?.id);

      if (isExist > -1) {
        console.log(prev[isExist][name]);
        prev[isExist][name] = value;
        if (name === "quantity") {
          prev[isExist].totalPrice =
            Number(value) * Number(prev[isExist].unitPrice);
        }
        if (name === "unitPrice") {
          prev[isExist].totalPrice =
            Number(value) * Number(prev[isExist].quantity);
        }
      }

      return [...prev];
    });
  };

  // set new qutation here by index
  const onChangeQutationHandler = (e, topic) => {
    const { name, value } = e.target;
    setNewQuotation((prev) => ({ ...prev, [name]: value }));
  };

  // delete topics
  const onDelete = (topic) => {
    setTopics((prev) =>
      prev
        ?.filter((item) => item?.id !== topic?.id)
        .map((item, i) => ({ ...item, id: i + 1 }))
    );
  };

  // delete topics
  const onDeletePrice = (topic) => {
    setPriceList((prev) =>
      prev
        ?.filter((item) => item?.id !== topic?.id)
        .map((item, i) => ({ ...item, id: i + 1 }))
    );
  };

  // add new topic
  const onAdd = () => {
    const countTopics = topics?.length;
    const template = {
      id: countTopics + 1,
      title: "",
      desc: "",
    };

    setTopics((prev) => [...prev, template]);
  };

  // add new delete
  const onAddPrice = () => {
    const countTopics = priceList?.length;

    const template = {
      id: countTopics + 1,
      quantity: "0",
      unitPrice: "0",
      totalPrice: "0",
    };

    setPriceList((prev) => [...prev, template]);
  };

  return (
    <SideBarContainer title={"Add Qutation"} onClose={onClose}>
      <Stack gap={2} mb={4}>
        <Box
          mt={4}
          sx={{
            border: `1px solid ${theme.palette.custom.border}`,
            borderRadius: "7px",
            padding: "8px",
          }}
        >
          <StyledInputForm
            label={"Title"}
            type="normal"
            size="small"
            inputProps={{
              name: "title",
              placeholder: "Write title here...",
              multiline: true,
              maxRow: 4,
              value: newQuotation?.title,
              onChange: onChangeQutationHandler,
              // onChange: quatation,
            }}
          />
        </Box>
        {topics?.length > 0 && <Typography variant="h6">Topics</Typography>}
        {topics?.map((topic, i) => (
          <TopicsContainer
            key={i}
            topic={topic}
            onChangeTopcisHandler={onChangeTopcisHandler}
            onDelete={onDelete}
          />
        ))}
      </Stack>

      <Button
        disableRipple
        variant="text"
        color="primary"
        startIcon={<Add />}
        sx={{ display: "flex", justifyContent: "start" }}
        onClick={onAdd}
      >
        Add Topics
      </Button>

      <Stack gap={2.5} mt={4}>
        {priceList?.length > 0 && (
          <Typography variant="h6">Price List</Typography>
        )}
        {priceList?.map((price, i) => (
          <PriceListContainer
            key={i}
            price={price}
            onChangePriceHandler={onChangePriceHandler}
            onDelete={onDeletePrice}
          />
        ))}
      </Stack>

      <Box mt={priceList?.length > 0 ? 4 : 0}>
        <Button
          disableRipple
          variant="text"
          color="primary"
          startIcon={<Add />}
          sx={{ display: "flex", justifyContent: "start" }}
          onClick={onAddPrice}
        >
          Add Price
        </Button>
      </Box>

      <Stack direction={"row"} my={7}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={onSubmitQuotation}
        >
          Save
        </Button>
      </Stack>
    </SideBarContainer>
  );
}

export default AddQuotation;
