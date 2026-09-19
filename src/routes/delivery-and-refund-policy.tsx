import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/delivery-and-refund-policy")({
  head: () => ({ meta: [
    { title: "Delivery and Refund Policy | Arya Premium" },
    { name: "description", content: "Delivery timing and refund guidance for Arya Premium orders." },
    { property: "og:title", content: "Delivery and Refund Policy | Arya Premium" },
    { property: "og:description", content: "Delivery timing and refund guidance for Arya Premium orders." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: DeliveryRefundPage,
});

function DeliveryRefundPage() {
  return <LegalPage title="Delivery and Refund Policy" intro="This policy explains how digital delivery and refund requests are handled by Arya Premium." sections={[
    { title: "Digital delivery", paragraphs: ["Digital items and access details are delivered using the contact or account information supplied with the order. Delivery time can vary by product and availability."] },
    { title: "Refund requests", paragraphs: ["If an order cannot be fulfilled or the delivered item has a verified issue, contact our official support channel with the relevant order details for review."] },
    { title: "Review process", paragraphs: ["Each eligible request is reviewed individually. Any approved refund is returned through the available original payment method where possible."] },
  ]} />;
}