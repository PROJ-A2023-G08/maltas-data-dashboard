import React, { useState } from "react";

const ContactTab = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    <div className="container mx-auto p-4 w-1/2">
      <h1 className="text-4xl font-bold mb-4 text-start">Get in touch!</h1>
      <div className="flex flex-1">
        <form onSubmit={handleSubmit} className="w-2/3 pr-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Send Email
          </button>
        </form>
        <div className="w-1/3 bg-gray-600">
          <h1 className="text-2xl font-bold mb-4 text-white ">
            Lassi Vuorinen
          </h1>
          <div className="text-center text-white">
            <p>123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;
