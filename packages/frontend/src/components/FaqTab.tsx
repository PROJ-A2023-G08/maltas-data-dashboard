import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FaqTab = () => {
  const { t } = useTranslation("common");

  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index: any) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const numberOfQuestions = 10;

  const faqItems = [];
  for (let index = 0; index < numberOfQuestions; index++) {
    faqItems.push(
      <ul key={index} className="mb-4">
        <button
          onClick={() => toggleQuestion(index)}
          className="flex items-center justify-between w-full bg-white p-2 rounded-md border border-gray-300 focus:outline-none"
        >
          <span className="text-lg font-bold">
            {t(`FAQquestions.Q${index + 1}`)}
          </span>
          <span className="ml-2">{openQuestion === index ? "▲" : "▼"}</span>
        </button>
        {openQuestion === index && (
          <div className="flex mt-2">
            <div className="w-full">
              <p className="p-2 bg-gray-300 rounded-lg text-lg">
                {t(`FAQanswers.A${index + 1}`)}
              </p>
            </div>
          </div>
        )}
      </ul>,
    );
  }

  return (
    <div className="container mx-auto p-4 w-1/2 pt-20">
      <h1 className="text-4xl font-bold mb-4 text-start ml-20">
        {t("uiElements.FAQ")}
      </h1>
      <ul>{faqItems}</ul>
    </div>
  );
};

export default FaqTab;
