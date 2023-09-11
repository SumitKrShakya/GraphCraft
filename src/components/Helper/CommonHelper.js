import axios from "axios";

export const createNumberStringNames = (data, graph, setGraph) => {
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
  console.log("numberNames", numberNames);
  console.log("stringNames", stringNames);
  setGraph((prev) => {
    return {
      ...prev,
      numberNames,
      stringNames,
      dataNames,
    };
  });
  // setCustomization((prevCustomization) => {
  //   return {
  //     ...prevCustomization,
  //     numberNames,
  //     stringNames,
  //     dataNames,
  //   };
  // });
  return {
    numberNames,
    stringNames,
  };
};

export const update = async (graph, setUpdating) => {
  try {
    setUpdating((prev) => prev + 1);
    console.log({
      token: localStorage.getItem("jwt"),
      graph,
    });
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/chart/update`,
      { graph },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    setUpdating((prev) => prev - 1);
    console.log(
      "...................customization changed...............",
      response
    );
  } catch (error) {
    console.log(error);
    setUpdating((prev) => prev + 1);
  }
};
