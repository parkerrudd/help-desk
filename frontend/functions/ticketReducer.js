export const initialTicketState = {
  firstName: "",
  lastName: "",
  email: "",
  imageUri: "",
  imageBase64: "",
  description: "",
};

export const updateTicketState = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FIELDS":
      return { ...initialTicketState };
    default:
      return state;
  }
};
