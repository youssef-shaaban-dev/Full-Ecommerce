import PathLinks from "@/components/common/PathLinks";
import React from "react";
import ContactSidebar from "./ContactSidebar";
import ContactField from "./ContactField";

const ContactPage = () => {
  return (
    <div className="my-12 mx-auto lg:w-[80%] md:w-[95%] sm:w-[100%] ">
      <PathLinks titles={["Contact"]} />
      <div className="my-10 px-4 flex flex-col lg:flex-row justify-between gap-8">
        <ContactSidebar />
        <ContactField />
      </div>
    </div>
  );
};

export default ContactPage;
