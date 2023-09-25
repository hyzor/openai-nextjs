"use client";

import React from "react";
import dynamic from "next/dynamic";
import ConversationSideNav from "./ConversationSideNav";

const InputWithButton = dynamic(() => import("./InputWithButton"), {
  ssr: false,
});

const ResponseContainer = dynamic(() => import("./ResponseContainer"), {
  ssr: false,
});

export type OpenAiResponse = {
  prompt: string;
  message: string;
};

export type Conversation = {
  id: number;
  messages: string[];
};

const AppContainer = () => {
  const [input, setInput] = React.useState("");
  const [responses, setResponses] = React.useState([] as OpenAiResponse[]);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const response = await fetch(`/api/openai_2?prompt=${input}`);
    const body = await response.json();

    const newResponse: OpenAiResponse = {
      prompt: input,
      message: body.message,
    };

    setResponses((responses) => [...responses, newResponse]);
  }

  const onChange = ({ target }) => {
    setInput(target.value);
  };

  return (
    <>
      <ConversationSideNav conversations={[]} />
      <div className="relative h-10 w-full min-w-[200px] max-w-[36rem]">
        <InputWithButton
          onSubmit={onSubmit}
          onChange={onChange}
          input={input}
        />
        <ResponseContainer responses={responses} />
      </div>
    </>
  );
};

export default AppContainer;
