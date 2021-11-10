import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import axios from "axios";
import {
  GET_CONTACT,
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../type";
const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get Contacts
  const GetContacts = async (contact) => {
    try {
      const res = await axios.get("http://localhost:2500/api/user/contacts");
      dispatch({
        type: GET_CONTACT,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Add Contact
  const AddContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:2500/api/user/contacts",
        contact,
        config
      );
      dispatch({
        type: ADD_CONTACT,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      });
    }
  };
  //Update Contact
  const UpdateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };
  //Delete Contact
  const DeleteContact = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:2500/api/user/contact/${id}`
      );
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      });
    }
  };
  //Clear Contacts
  const ClearContacts = () => {
    dispatch({
      type: CLEAR_CONTACT,
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
  const FilterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };
  //Clear Filter
  const ClearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        AddContact,
        DeleteContact,
        SetCurrent,
        ClearCurrent,
        UpdateContact,
        ClearFilter,
        FilterContacts,
        GetContacts,
        ClearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
