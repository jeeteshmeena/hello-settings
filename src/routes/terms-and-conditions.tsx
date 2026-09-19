import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({ meta: [
    { title: "Terms & Conditions | Arya Premium" },
    { name: "description", content: "Terms governing access to Arya Premium services." },
    { property: "og:title", content: "Terms & Conditions | Arya Premium" },
    { property: "og:description", content: "Terms governing access to Arya Premium services." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: TermsPage,
});

function TermsPage() {
  return <LegalPage title="Terms & Conditions" intro="By using Arya Premium, you agree to use the service responsibly and in accordance with these terms." sections={[
    { title: "Using the service", paragraphs: ["You are responsible for the activity on your account and for providing accurate information when making a request or purchase."] },
    { title: "Acceptable use", paragraphs: ["Do not misuse the service, interfere with its operation, attempt unauthorized access, or use content in a way that violates applicable law."] },
    { title: "Changes", paragraphs: ["Features and these terms may be updated when needed. Continued use after an update means you accept the revised terms."] },
  ]} />;
}