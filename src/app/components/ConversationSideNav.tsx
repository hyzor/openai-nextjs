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
} from "../material-tailwind";
import { Conversation } from "../types";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

type ConversationSideNavProps = {
  conversations: Conversation[];
  curConversationId: number | undefined;
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
}: ConversationSideNavProps) => {
  return (
    <Card className="fixed left-0 top-0 h-screen w-full max-w-[20rem] p-4 shadow-xl">
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
              Conversation {conversation.id}
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
