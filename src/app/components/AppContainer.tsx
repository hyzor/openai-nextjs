"use client";

import React from "react";
import ConversationSideNav from "./ConversationSideNav";
import { deleteConversation, getConversationsForUser } from "../actions";

import InputWithButton from "./InputWithButton";
import MessageContainer from "./MessageContainer";
import { Conversation } from "../types";

const AppContainer = () => {
  const [input, setInput] = React.useState("");
  const [curConversationId, setCurConversationId] = React.useState<
    number | undefined
  >(undefined);
  const [conversations, setConversations] = React.useState(
    [] as Conversation[]
  );

  React.useEffect(() => {
    async function getConversations() {
      const conversations = await getConversationsForUser(1);
      if (conversations) setConversations(conversations);
    }

    getConversations();
  }, []);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (curConversationId) {
      const conversation = findConversation(curConversationId);

      const response = await fetch(`/api/openai_2?prompt=${input}`, {
        method: "POST",
        body: JSON.stringify(conversation),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newConversation = (await response.json()) as Conversation;

      const idx = conversations.findIndex(
        (conv) => conv.id === curConversationId
      );

      const newConversations = [...conversations];
      newConversations[idx] = newConversation;

      setConversations(newConversations);
    } else {
      const response = await fetch(`/api/openai_2?userId=1&prompt=${input}`);
      const body = (await response.json()) as Conversation;

      setConversations([...conversations, body]);
      setCurConversationId(body.id);
    }

    setInput("");
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInput(target.value);
  };

  const onClick = (conversationId: number) => {
    setCurConversationId(conversationId);
  };

  async function onClickNewConversation() {
    setCurConversationId(undefined);
  }

  async function onClickDelConversation(conversationId: number) {
    deleteConversation(1, conversationId).then(() => {
      const filtered = conversations.filter(
        (conv) => conv.id !== conversationId
      );

      setConversations(filtered);
    });
  }

  const findConversation = (
    conversationId: number
  ): Conversation | undefined => {
    return conversations.find((conv) => conv.id == conversationId);
  };

  return (
    <>
      <ConversationSideNav
        onClick={onClick}
        onClickNew={onClickNewConversation}
        onClickDel={onClickDelConversation}
        curConversationId={curConversationId}
        conversations={conversations}
      />
      <div className="relative h-10 w-full min-w-[200px] max-w-[36rem]">
        <InputWithButton
          onSubmit={onSubmit}
          onChange={onChange}
          input={input}
        />
        <MessageContainer
          responses={
            curConversationId
              ? findConversation(curConversationId)?.messages
              : undefined
          }
        />
      </div>
    </>
  );
};

export default AppContainer;
