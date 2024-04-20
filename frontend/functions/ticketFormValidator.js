export default ticketFormValidator = (state) => {
  const fieldMappings = {
    description: "Description",
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name",
  };

  const missingValues = Object.keys(state)
    .filter(
      (key) =>
        key !== "imageUri" &&
        key !== "imageBase64" &&
        (!state[key] || !state[key].trim())
    )
    .map((key) => fieldMappings[key] || key);
  return missingValues;
};
