export function getTotalCharacterCount(data) {
  let totalCharacterCount = 0;

  for (let i = 0; i < data.length; i++) {
    totalCharacterCount += data[i].desc.length;
  }

  return totalCharacterCount;
}
export function getTotalCharacterCountForEach(data) {
  let totalCharacterCount = 0;

  totalCharacterCount += data.length;

  return totalCharacterCount;
}

export const getHeight = (data, length) => {
  if (length === 3) {
    return "100%";
  }
  if (length > 3) {
    if (data < 68) {
      return 30;
    }
    if (data > 68) {
      const res = data / 68;
      return res * 30;
    }
  }
};

export const viewDuesOrNot = (data) => {
  const isAddedDues = data?.dues?.length > 0;
  const isExistDues =
    data?.dues?.reduce((prev, item) => prev + item?.due, 0) > 0;

  return isAddedDues && isExistDues;
};
