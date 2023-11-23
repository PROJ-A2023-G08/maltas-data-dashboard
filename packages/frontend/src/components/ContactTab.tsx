import React, { FormEvent, useRef, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTranslation } from "next-i18next";
import emailjs from "@emailjs/browser";

const ContactTab = () => {
  //email utilizes emailjs.
  //https://dashboard.emailjs.com/admin

  const { t } = useTranslation("common");
  const form = useRef<HTMLFormElement | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      // Validate form fields
      const formData = new FormData(form.current);
      let isValid = true;

      formData.forEach((value, key) => {
        if (!value) {
          isValid = false;
        }
      });

      if (!isValid) {
        alert(`Please fill in all of the fields`);
        return;
      }

      emailjs
        .sendForm(
          "service_xs3y2nj",
          "template_fgdehpc",
          form.current,
          "nwkaHg97wzPvMT9dz",
        )
        .then(
          (result) => {
            console.log(result.text);
            setIsEmailSent(true);
            resetForm();
            alert(`Message sent successfully`);
          },
          (error) => {
            console.log(error.text);
          },
        );
    }
  };

  const resetForm = () => {
    if (form.current) {
      form.current.reset();
    }
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
        <form ref={form} onSubmit={sendEmail} className="w-2/3 pr-4">
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              {t("contact.SenderName")}
            </label>
            <input
              type="text"
              name="user_name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-900 dark:text-black">
              {t("contact.SenderEmail")}
            </label>
            <input
              type="email"
              name="user_email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              {t("contact.SenderMessage")}
            </label>
            <textarea
              name="message"
              rows={7}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            />
          </div>
          <button
            type="submit"
            value="Send"
            className="w-1/4 h-1/8 text-indigo-100 transition-colors duration-150 border-hidden bg-indigo-600 rounded-lg focus:shadow-outline hover:bg-blue-800"
          >
            <p className="text-xl">{t("contact.Send")}</p>
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
