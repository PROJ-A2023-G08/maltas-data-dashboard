import React, { useState } from "react";

const FaqTab = () => {
  const faqData = [
    {
      question: "What is Lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "What is Lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "What is Lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "What is Lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "What is Lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "What is Lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "What is Lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
              <span className="text-lg">{faq.question}</span>
              <span className="ml-2">{openQuestion === index ? "▲" : "▼"}</span>
            </button>
            {openQuestion === index && (
              <div className="flex mt-2">
                <div className="w-full">
                  <p className="p-2 bg-gray-100 rounded-md">{faq.answer}</p>
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
