import React, { useReducer } from "react";
import uuid, { v4 } from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../type";
const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Yekini",
        email: "yekini@gmail.com",
        phone: "111-222-333",
        type: "personal",
      },
      {
        id: 2,
        name: "Buraji",
        email: "buraji@gmail.com",
        phone: "222-222-333",
        type: "personal",
      },
      {
        id: 3,
        name: "maraji",
        email: "maraji@gmail.com",
        phone: "444-222-333",
        type: "professional",
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add Contact
  const AddContact = (contact) => {
    contact.id = v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };
  //Update Contact
const UpdateContact = contact => {
  dispatch({
    type: UPDATE_CONTACT,
    payload: contact
  })
}
  //Delete Contact
  const DeleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };
  //Set Current
  const SetCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  //Clear Current Contact
  const ClearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  //Filter Contact

  //Clear Filter
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        AddContact,
        DeleteContact,
        SetCurrent,
        ClearCurrent,
        UpdateContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
