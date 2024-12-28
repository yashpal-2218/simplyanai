import React from "react";

type Input = {
  type: string;
  name: string;
  placeholder: string;
};

export default function Input({ type, name, placeholder }: Input) {
  return (
    <div>
      <input type={type} name={name} placeholder={placeholder} />
    </div>
  );
}
