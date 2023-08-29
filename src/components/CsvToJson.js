const convertCSVToJson = (csvData, setJsonData, setDataHeadings) => {
  console.log("convertCSVToJson*", csvData);
  const lines = csvData.split("\n");
  console.log("lines", lines);
  const headers = lines[0].split(",");
  console.log("headers", headers);
  setDataHeadings(headers);

  const result = [];

  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");
    console.log("currentLine", currentLine);

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]?.trim()] = currentLine[j]?.trim();
    }

    result.push(obj);
  }

  return result;
};

const handleCSVInputChange = (event, setJsonData, setDataHeadings) => {
  console.log(event);
  console.log("handleCSVInputChange*");
  const file = event.target.files[0];
  console.log("file ", file);
  const reader = new FileReader();

  reader.onload = (e) => {
    const csvData = e.target.result;
    console.log(csvData);
    const jsonData = convertCSVToJson(csvData, setJsonData, setDataHeadings);
    setJsonData(jsonData);
  };

  reader.readAsText(file);
};

export default handleCSVInputChange;
