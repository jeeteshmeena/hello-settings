import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | Arya Premium" },
    { name: "description", content: "How Arya Premium handles account and service information." },
    { property: "og:title", content: "Privacy Policy | Arya Premium" },
    { property: "og:description", content: "How Arya Premium handles account and service information." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" intro="Your privacy matters to Arya Premium. This policy explains the information used to provide and improve the service." sections={[
    { title: "Information we use", paragraphs: ["We may process account details, preferences, and service activity needed to operate Arya Premium and respond to support requests."] },
    { title: "How it is used", paragraphs: ["Information is used to deliver requested features, maintain security, prevent misuse, and improve reliability."] },
    { title: "Your choices", paragraphs: ["You can adjust available preferences in Settings. You may also request help regarding your account or personal information through our official community channel."] },
  ]} />;
}