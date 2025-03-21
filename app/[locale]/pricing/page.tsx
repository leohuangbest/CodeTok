"use client";

import { useTranslations } from "@/i18n/client";

export default function PricingPage() {
  const navT = useTranslations("nav");
  const pagesT = useTranslations("pages");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">{navT("pricing")}</h1>
      <p className="text-lg">{pagesT("pricing.content")}</p>
    </div>
  );
}
