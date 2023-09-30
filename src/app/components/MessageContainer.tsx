"use client";

import React from "react";

import { Message } from "../types";

import { Card, CardBody, Typography } from "../material-tailwind";

type ResponseContainerProps = {
  responses: Message[] | undefined;
};

const MessageContainer = ({ responses }: ResponseContainerProps) => {
  return (
    <>
      {responses?.map((response, i) => (
        <Card className="mt-6" key={`${response.message}_${i}`}>
          <CardBody>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              {response.prompt}
            </Typography>
            <Typography>{response.message}</Typography>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default MessageContainer;
