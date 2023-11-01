import React, { useState } from "react";
import FaqTab from "./FaqTab";
import ContactTab from "./ContactTab";

const Help = () => {
  const [activeTab, setActiveTab] = useState("faq");

  const toggleTab = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center mb-4 mt-20">
        <button
          onClick={() => toggleTab("faq")}
          className={`mr-2 pt-2 pb-2 pl-20 pr-20 ${
            activeTab === "faq" ? "bg-black text-white" : "bg-white"
          } rounded-md hover:bg-gray-600 focus:outline-none`}
        >
          FAQ
        </button>
        <button
          onClick={() => toggleTab("contact")}
          className={`mr-2 pt-2 pb-2 pl-20 pr-20 ${
            activeTab === "contact" ? "bg-black text-white" : "bg-white"
          } rounded-md hover:bg-gray-600 focus:outline-none`}
        >
          Contact
        </button>
      </div>
      {activeTab === "faq" ? <FaqTab /> : null}
      {activeTab === "contact" ? <ContactTab /> : null}
    </div>
  );
};

export default Help;
