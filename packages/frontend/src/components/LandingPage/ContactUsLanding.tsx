import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Typography, Box, Button } from "@mui/material";

function ContactUsLanding() {
  return (
    <div>
      <Grid
        sx={{
          padding: (theme) => theme.spacing(8),
          backgroundColor: "primary.contrastText",
        }}
        container
      >
        <Grid
          sx={{
            padding: (theme) => theme.spacing(3),
          }}
          xs={12}
          sm={12}
          md={6}
          item
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography className="mb-4" variant="h3">
              Contact Us Today
            </Typography>
            <Typography>
              Fill out the form below to get in touch with us. We are here to
              answer any questions you may have and provide you with the best
              solutions for your health needs.
            </Typography>
          </Box>
        </Grid>
        <Grid
          sx={{
            padding: (theme) => theme.spacing(3),
          }}
          xs={12}
          sm={12}
          md={6}
          item
        >
          <ContactForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactUsLanding;

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    e,
  ) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
        name: "",
        email: "",
        message: "",
      })
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="landing_page_contact_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            value={formData.name}
            onChange={handleChange}
            name="name"
            type="text"
            id="landing_page_contact_name"
            className="bg-gray-50 border h-12 text-sm rounded-md   block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  focus:outline-none border border-slate-200"
            required
          />
        </div>
        <div>
          <label
            htmlFor="landing_page_contact_email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            E-mail
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="text"
            id="landing_page_contact_email"
            className="bg-gray-50 h-12 text-gray-900 text-sm rounded-md  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white  focus:outline-none border border-slate-200"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="landing_page_contact_message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Message
        </label>
        <textarea
          id="landing_page_contact_message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-200 focus:border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-200 dark:focus:border-gray-200 focus:outline-none"
        ></textarea>
      </div>

      <div className="flex justify-end pt-5">
        <button
          type="submit"
          className="text-white bg-primary hover:bg-blue-400 focus:ring-4 focus:outline-none font-medium rounded-md text-sm w-full sm:w-36 px-5 py-3 text-center   border-none"
        >
          Send
        </button>
      </div>
    </form>
  );
};
