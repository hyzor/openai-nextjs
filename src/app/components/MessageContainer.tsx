"use client";

import React from "react";

import { Message } from "../types";

import { Card, CardBody, Spinner, Typography } from "../material-tailwind";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type ResponseContainerProps = {
  responses: Message[] | undefined;
  isLoading: boolean;
};

const MessageContainer = ({ responses, isLoading }: ResponseContainerProps) => {
  return (
    <>
      {responses?.map((response, i) => (
        <Card className="mt-6 overflow-x-auto" key={`${response.message}_${i}`}>
          <CardBody>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              {response.prompt}
            </Typography>
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
                li({ children }) {
                  return <li className="mb-2 last:mb-0">{children}</li>;
                },
                code({ className, children, ...props }) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {response.message}
            </Markdown>
          </CardBody>
        </Card>
      ))}
      {isLoading && (
        <div className="flex flex-col items-center">
          <Spinner className="h-8 w-8 mt-6 mb-6" color="blue" />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
