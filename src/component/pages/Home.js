import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Contact from "../contacts/Contact";
import ContactFilter from "../contacts/ContactFilter";
import ContactForm from "../contacts/ContactForm";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { LoadUser } = authContext;
  useEffect(() => {
    LoadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
