"use client";

import React from "react";

import { OpenAiResponse } from "./AppContainer";

type ResponseContainerProps = {
  responses: OpenAiResponse[];
};

const ResponseContainer = ({ responses }: ResponseContainerProps) => {
  return (
    <>
      {responses.map((response, i) => (
        <div
          key={`${response.message}_${i}`}
          className="mb-4 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
        >
          <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
            {response.prompt}
          </div>
          <div className="p-6">
            <p className="text-base text-neutral-600 dark:text-neutral-200">
              {response.message}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ResponseContainer;
