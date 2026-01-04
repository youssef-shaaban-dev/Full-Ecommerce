import PathLinks from "@/components/common/PathLinks";
import React from "react";
import ContactSidebar from "./ContactSidebar";
import ContactField from "./ContactField";
import "@/styles/contact/contact.scss";
const ContactPage = () => {
  return (
    <div className="my-12 mx-auto lg:w-[80%] md:w-[95%] sm:w-[100%] ">
      <PathLinks titles={["Contact"]} />
      <div className="my-10 ml-5 flex justify-between gap-3 contactBody">
        <ContactSidebar />
        <ContactField />
      </div>
    </div>
  );
};

export default ContactPage;
