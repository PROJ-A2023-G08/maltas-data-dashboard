import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTranslation } from "next-i18next";

const ContactTab = () => {
  const { t } = useTranslation("common");
  const [formData, setFormData] = useState({
    //name: "", Use if needed
    //email: "", Use if needed
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Sending email:", formData);
  };

  return (
    <div className="container mx-auto p-4 w-1/2 pt-20">
      <h1 className="text-4xl font-bold mb-4 text-start">
        {t("contact.Header")}
      </h1>
      <h1 className="text-xl font-bold mb-4 text-start text-gray-600">
        {t("contact.Subtext")}
      </h1>
      <div className="flex">
        <form onSubmit={handleSubmit} className="w-2/3 pr-4">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              {t("contact.Message")}
            </label>
            <textarea
              id="large-input"
              className="block w-full p-4 rounded-lg border bg-gray-200 text-gray-900"
              rows={11}
            />
          </div>
          <button
            type="submit"
            className="w-1/4 h-12 px-6 text-indigo-100 transition-colors duration-150 border-hidden	 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-800"
          >
            {t("contact.Send")}
          </button>
        </form>

        <div className="w-1/3 ml-20">
          <div className="flex items-center text-black">
            <PersonIcon style={{ fontSize: 40 }} />
            <h1 className="text-xl font-bold ml-4">Lassi Vuorinen</h1>
          </div>
          <div className="flex items-center text-black">
            <EmailIcon style={{ fontSize: 40 }} />
            <h1 className="text-xl font-bold ml-4">lassi@maltastech.com</h1>
          </div>
          <div className="flex items-center text-black">
            <PhoneInTalkIcon style={{ fontSize: 40 }} />
            <h1 className="text-xl font-bold ml-4">050 514 2624</h1>
          </div>
          <div className="flex items-center text-black">
            <HomeIcon style={{ fontSize: 40 }} />
            <h1 className="text-xl font-bold ml-4">Tampere</h1>
          </div>
          <div className="flex items-center text-black gap-4 mt-4">
            <LinkedInIcon style={{ fontSize: 40 }} />
            <FacebookIcon style={{ fontSize: 40 }} />
            <InstagramIcon style={{ fontSize: 40 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;
