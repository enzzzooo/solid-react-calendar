"use client";
import { useActionState } from "react";
import DatePicker from "../../dist";
import { SomethingAction } from "./actions";
export default function DateForm() {
  const [formState, formAction] = useActionState(SomethingAction, {
    success: false,
  });

  return (
    <form action={formAction}>
      <input type="text" name="stringInput" required />
      <DatePicker />
      <button>Submit</button>
      <p>{formState.success ? "Success" : "Failure"}</p>
    </form>
  );
}
