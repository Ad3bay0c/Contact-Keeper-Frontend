import React from "react";
import Contact from "../contacts/Contact";
import ContactFilter from "../contacts/ContactFilter";
import ContactForm from "../contacts/ContactForm";

const Home = () => {
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
