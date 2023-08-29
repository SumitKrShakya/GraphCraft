export const createNumberStringNames = (
  data,
  customization,
  setCustomization
) => {
  console.log("data helper.js", data);
  if (!data) return;
  const dataNames = Object.keys(data[0]);
  console.log(dataNames);
  const isNumeric = (num) =>
    (typeof num === "number" ||
      (typeof num === "string" && num.trim() !== "")) &&
    !isNaN(num);
  const numberNames = dataNames.filter((e) => isNumeric(data[0][e]));
  const stringNames = dataNames.filter((e) => !isNumeric(data[0][e]));
  setCustomization((prevCustomization) => {
    return {
      ...prevCustomization,
      numberNames,
      stringNames,
      dataNames,
    };
  });
};
