import { redirect } from "next/navigation";

export default function Contact() {
  // Redirect to the localized contact page
  redirect("/en/contact");
}
