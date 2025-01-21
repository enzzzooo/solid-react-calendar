"use client";
import { useActionState } from "react";
import { DatePicker } from "solid-react-calendar";
import { SomethingAction } from "./actions";
export default function DateForm() {
  const [formState, formAction] = useActionState(SomethingAction, {
    success: false,
  });

  return (
    <form
      action={formAction}
      className="flex flex-col items-center justify-center h-[50vh] space-y-4"
    >
      <input
        className="
          text-sm p-2 text-blue-300 bg-gray-600 
          focus:outline outline-2 outline-blue-500 
          outline-offset-0 rounded-md 
          focus:outline-offset-4
        "
        type="text"
        name="stringInput"
        required
      />
      <DatePicker />
      <button className="px-4 py-2 [drop-shadow(2px 2px 0px rgba(var(--pink-800)))] text-white rounded hover:bg-gray-600 transition duration-100">
        Submit
      </button>
      <p className="text-lg font-semibold text-green-300 ">
        {/* [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1px_black] */}
        {formState.success && "Success"}
      </p>
    </form>
  );
}
