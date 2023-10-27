import { successMsg } from "../../../Shared/SuccessMsg";

const getPositions = (position) => {
  if (position === 1 || position === "1") return "1st";
  if (position === 2 || position === "2") return "2nd";
  if (position === 3 || position === "3") return "3rd";

  return `${position}th`;
};

export const validateTopics = (topics = []) => {
  let status = true;
  topics?.forEach((topic) => {
    let message = `You missed in ${getPositions(topic?.id)} position's`;
    if (!topic?.title && !topic?.desc) {
      message += " title & description";
      successMsg(message);
      status = false;
    } else if (topic?.title && !topic?.desc) {
      message += " description";
      successMsg(message);
      status = false;
    } else if (!topic?.title && topic?.desc) {
      message += " title";
      successMsg(message);
      status = false;
    }
  });

  return status;
};

/*
quantity
unitPrice
totalPrice
*/

export const validatePrice = (priceList = []) => {
  let status = true;
  priceList?.forEach((price) => {
    const keys = Object.keys(price);
    const message = {
      msg: `You missed in ${getPositions(price?.id)} position's`,
      shouldWarn: false,
    };

    if (keys?.length > 0) {
      keys?.forEach((key) => {
        if (!price[key]) {
          message.msg += ` ${key}, `;
          status = false;
          message.shouldWarn = true;
        }
      });

      if (message?.shouldWarn) successMsg(message?.msg);
    }
  });

  return status;
};
