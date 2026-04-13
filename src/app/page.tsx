import { redirect } from "next/navigation";

export default function Root() {
  // Redirect to the default locale
  redirect("/en");
}
