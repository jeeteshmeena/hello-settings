import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/read-me")({
  head: () => ({ meta: [
    { title: "Read Me | Arya Premium" },
    { name: "description", content: "Important information for using Arya Premium." },
    { property: "og:title", content: "Read Me | Arya Premium" },
    { property: "og:description", content: "Important information for using Arya Premium." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ReadMePage,
});

function ReadMePage() {
  return <LegalPage title="Read Me" intro="A few important notes to help you use Arya Premium safely and get support when needed." sections={[
    { title: "Keep details safe", paragraphs: ["Never share passwords, verification codes, or sensitive payment information in public chats or with unofficial accounts."] },
    { title: "Use official links", paragraphs: ["Use the Official Website, Parent Website, and Telegram links listed on the Community page to avoid impersonation."] },
    { title: "Before you order", paragraphs: ["Review the product information and delivery expectations carefully before confirming a purchase."] },
  ]} />;
}