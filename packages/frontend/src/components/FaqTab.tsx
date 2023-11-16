import React, { useState } from "react";

const FaqTab = () => {
  const faqData = [
    {
      question: "What is the Maltas Dashboard service?",
      answer:
        "Maltas Dashboard service is a cloud-based analytics service that enables healthcare professionals to visualize and analyze data regarding hygiene compliance processes. It connects users to cloud-based and on-premises data through easy-to-use dashboards and interactive reports. For more information, see www…….",
    },
    {
      question: "How do I start using Maltas Dashboard",
      answer:
        "Maltas Dashboard User is always part of a specific healthcare organization. Organizations assign roles for Users and new User shall receive login details via email. If you wish to become Maltas Dashboard User, please contact your own organization to see whether Your organization is already aboard.  ",
    },
    {
      question: "What are different user roles?",
      answer:
        "The way you interact with Maltas Dashboard will depend on your job role. As a user, you're the person who receives content (dashboards, reports) from data sources. [Let’s expand on this]",
    },
    {
      question: "Where can I get a new password for Maltas Dashboard?",
      answer: "[Good question!]",
    },
    {
      question: "What data is presented in Maltas Dashboard?",
      answer:
        "In short, the data shown in Maltas Dashboard Service is data from different applications and devices monitoring hygiene and disinfection processes in a specific healthcare unit. For more information, please see www…",
    },
    {
      question: "Does Maltas Dashboard require installation of software?",
      answer:
        "No. Maltas Daahboard is a cloud-based webapp and there is no need for any software installation.  ",
    },
    {
      question: "Can I download data from Maltas Dashboard.",
      answer:
        "We are developing some predetermined reporting tools which allow Users to download data from Maltas Dashboard.",
    },
    {
      question: "Why do I have to sign up with my work email?",
      answer:
        "Maltas Dashboard Service is used by healthcare and other professionals that work with infection control. Maltas doesn't support email addresses provided by consumer email services or telecommunications providers. ",
    },
    {
      question: "Does Maltas support mobile devices?",
      answer:
        "Yes. Maltas Dashboard WebApp works also in mobile browsers. Maltas Dashboard does not however have native apps for Android, iOS or Windows devices.",
    },
    {
      question: "Where can I learn more about security?",
      answer:
        "Learn more about Maltas Dashboard Service security, privacy, and compliance here:",
    },
  ];

  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index: any) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4 w-1/2 pt-20">
      <h1 className="text-4xl font-bold mb-4 text-start ml-20">FAQ</h1>
      <ul>
        {faqData.map((faq, index) => (
          <ul key={index} className="mb-4">
            <button
              onClick={() => toggleQuestion(index)}
              className="flex items-center justify-between w-full bg-white p-2 rounded-md border border-gray-300 focus:outline-none"
            >
              <span className="text-lg font-bold">{faq.question}</span>
              <span className="ml-2">{openQuestion === index ? "▲" : "▼"}</span>
            </button>
            {openQuestion === index && (
              <div className="flex mt-2">
                <div className="w-full">
                  <p className="p-2 bg-gray-300 rounded-lg text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default FaqTab;
