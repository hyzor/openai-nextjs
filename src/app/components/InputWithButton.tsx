"use client";

import React from "react";

import { Input, Button } from "../material-tailwind";

type ButtonProps = {
  onSubmit: (e: React.SyntheticEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
};

const InputWithButton = ({ onSubmit, onChange, input }: ButtonProps) => {
  return (
    <form
      className="relative mb-4 flex flex-wrap items-stretch"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        label="Prompt"
        value={input}
        onChange={onChange}
        className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
        crossOrigin={undefined}
      />
      <Button
        type="submit"
        size="sm"
        color={input ? "gray" : "blue-gray"}
        disabled={!input}
        className="!absolute right-1 top-1 rounded"
      >
        Send
      </Button>
    </form>
  );
};

export default InputWithButton;
