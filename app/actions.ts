"use server";
export async function SomethingAction(
  prevState: { success: boolean },
  formData: FormData
) {
  console.log("Something");
  return { success: true };
}
