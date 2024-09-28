"use client";

import { useFormStatus } from "react-dom";

const AddpostButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className=" disabled:bg-blue-300 disabled:cursor-not-allowed w-28 flex justify-center items-center text-base p-1 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white "
      disabled={pending}
    >
      {pending ? "sending" : "send"}
    </button>
  );
};

export default AddpostButton;
