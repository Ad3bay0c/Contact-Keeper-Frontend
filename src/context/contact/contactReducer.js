import {
  ADD_CONTACT,
  CLEAR_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
} from "../type";

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts:
          state.contacts === null
            ? [action.payload]
            : [action.payload, ...state.contacts],
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        contacts: null,
        error: null,
        current: null,
        filtered: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        current: null,
        loading: false,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regexp = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regexp) || contact.email.match(regexp);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
