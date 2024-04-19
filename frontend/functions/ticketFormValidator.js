export default ticketFormValidator = (state) => {
  const fieldMappings = {
    description: "Description",
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name",
  };

  const missingValues = Object.keys(state)
    .filter((key) => key !== "imageUri" && key !== "imageBase64" && !state[key])
    .map((key) => fieldMappings[key] || key);
  return missingValues;
};
