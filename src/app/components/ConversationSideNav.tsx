"use client";

import React from "react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  IconButton,
  Spinner,
} from "../material-tailwind";
import { Conversation } from "../types";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

type ConversationSideNavProps = {
  conversations: Conversation[];
  curConversationId: number | undefined;
  isLoading: boolean;
  onClick: (conversationId: number) => void;
  onClickNew: () => void;
  onClickDel: (conversationId: number) => void;
};

const ConversationSideNav = ({
  onClick,
  onClickNew,
  onClickDel,
  conversations,
  curConversationId,
  isLoading,
}: ConversationSideNavProps) => {
  return (
    <Card className="fixed z-10 left-0 top-0 h-screen w-full max-w-[20rem] p-4 shadow-xl">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Conversations
        </Typography>
      </div>
      <List>
        <ListItem onClick={onClickNew}>
          <ListItemPrefix>
            <PlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          New
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        {isLoading && (
          <div className="flex flex-col items-center mt-4">
            <Spinner className="h-6 w-6" />
          </div>
        )}
        {conversations
          .sort((a, b) =>
            a.lastMessageDate > b.lastMessageDate
              ? -1
              : a.lastMessageDate < b.lastMessageDate
              ? 1
              : 0
          )
          .map((conversation, i) => (
            <ListItem
              selected={curConversationId === conversation.id}
              key={i}
              onClick={() => onClick(conversation.id)}
            >
              {conversation.messages[0].prompt}
              <ListItemSuffix>
                <IconButton
                  onClick={() => onClickDel(conversation.id)}
                  variant="text"
                  color="blue-gray"
                >
                  <TrashIcon className="h-5 w-5" />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))}
      </List>
    </Card>
  );
};

export default ConversationSideNav;
