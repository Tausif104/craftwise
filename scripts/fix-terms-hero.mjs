import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/craftwise?schema=public";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const enBodyHtml = `
<div class="legal-section">
  <h2>1. Scope and Contracting Parties</h2>
  <p>These Terms apply to all agreements, services, and use of the CraftWise platform. CraftWise GmbH, Ulmenweg 12, 64331 Weiterstadt, Germany, provides its software and related services exclusively to business customers within the meaning of Sec. 14 BGB (German Civil Code). The inclusion of the customer's general terms and conditions is excluded. Deviating terms are valid only if expressly confirmed in writing. CraftWise may update these Terms periodically; Users will be notified of material changes.</p>
</div>
<div class="legal-section">
  <h2>2. Services Provided</h2>
  <p>CraftWise provides a cloud-based software-as-a-service (SaaS) solution ("CraftWise Software") for project management, planning, quoting, invoicing, document management, automation, time tracking, and communication tailored to craft and construction businesses. The software is available via web and mobile applications (iOS, Android). Individual customizations are provided only if expressly agreed. Access to the services requires an internet connection and compatible devices, which are the User's responsibility. CraftWise may further develop or modify the software, provided such changes are reasonable and maintain the core functionality.</p>
</div>
<div class="legal-section">
  <h2>3. Rights of Use</h2>
  <p>The User is granted a simple, non-exclusive, non-transferable right to use the CraftWise Software for the duration of the contract. Transfer or sublicensing to third parties is prohibited. Any reverse engineering, duplication, or modification of the software beyond permitted use is not allowed.</p>
</div>
<div class="legal-section">
  <h2>4. Registration and Account</h2>
  <p>To use CraftWise, Users must register with accurate and complete information. Accounts are personal and non-transferable; login credentials must be kept confidential. The User is responsible for all actions taken under their account.</p>
</div>
<div class="legal-section">
  <h2>5. Free Trial and Subscription</h2>
  <p>New Users may test the software free of charge for 14 days without providing payment details. After the trial period, continued use requires a paid subscription. Subscription fees depend on the selected plan and billing period. All prices are in EUR and include applicable taxes unless otherwise stated.</p>
</div>
<div class="legal-section">
  <h2>6. Prices, Payment, and Invoicing</h2>
  <p>Use of the software is subject to a fee, except during the free trial. Billing is monthly or annually in advance according to the chosen plan. Payments are processed securely via Stripe Payments Europe Ltd. using available payment methods. If payment fails, CraftWise may suspend access until settlement. Invoices are issued electronically and accessible in the User's account.</p>
</div>
<div class="legal-section">
  <h2>7. Term and Termination</h2>
  <p>The minimum contract term corresponds to the selected billing period (1 month or 12 months). The contract automatically renews for the same term unless terminated before the renewal date. Termination may be made until the day before renewal. CraftWise may terminate an account immediately in cases of breach, fraudulent activity, or misuse. Upon termination, access to the platform ends, and data may be deleted after statutory retention periods.</p>
</div>
<div class="legal-section">
  <h2>8. User Obligations</h2>
  <p>Users must use the platform lawfully and in compliance with applicable regulations. Uploading unlawful, harmful, or infringing content is prohibited. Users are responsible for ensuring the legality of their data and for performing regular backups. Misuse, attempted unauthorized access, or interference with the system may result in suspension or termination.</p>
</div>
<div class="legal-section">
  <h2>9. Data Protection and Customer Data</h2>
  <p>CraftWise processes personal data solely in accordance with its Privacy Policy and applicable data protection laws (GDPR). Users retain full ownership of their uploaded content. CraftWise processes customer data only as necessary to provide services and in accordance with a separate Data Processing Agreement (DPA). The platform is hosted in the EU and complies with GDPR standards.</p>
</div>
<div class="legal-section">
  <h2>10. Availability and Support</h2>
  <p>CraftWise aims to provide high service availability, but does not guarantee uninterrupted operation. Temporary downtime may occur due to maintenance or technical issues. Scheduled maintenance will be announced in advance when possible; urgent maintenance may occur without notice. Support is provided during regular business hours on weekdays via email or chat.</p>
</div>
<div class="legal-section">
  <h2>11. Changes to Services</h2>
  <p>CraftWise continuously improves and develops its software. Adjustments that are reasonable for the User may be implemented without prior notice. Substantial changes affecting core functions will be communicated in advance.</p>
</div>
<div class="legal-section">
  <h2>12. Liability</h2>
  <p>CraftWise is liable only in cases of intent or gross negligence and for breaches of essential contractual obligations. In cases of slight negligence, liability is limited to foreseeable damages typical of this type of contract. Liability for indirect or consequential damages, such as loss of profits or data loss, is excluded except in cases of mandatory statutory liability (e.g., product liability or injury to life, body, or health). The User's responsibility to maintain regular data backups remains unaffected.</p>
</div>
<div class="legal-section">
  <h2>13. Referral Program and Discounts</h2>
  <p>Customers may participate in the CraftWise referral program. Invited new customers receive a 20% discount for one month, and the referring customer also receives a 20% discount. The maximum annual discount per customer is EUR 1,000. Discounts are not payable in cash and apply only to active subscriptions. CraftWise reserves the right to modify or terminate the program at any time. Customers are responsible for the proper tax handling of received discounts.</p>
</div>
<div class="legal-section">
  <h2>14. Third-Party Services and Integrations</h2>
  <p>CraftWise may integrate third-party tools or interfaces (e.g., DATEV, Lexoffice, sevDesk, Outlook Calendar, xRechnung, Stripe, Calendly). Use of these integrations is optional and subject to the respective providers' terms. Data exchange occurs only with User's consent.</p>
</div>
<div class="legal-section">
  <h2>15. Intellectual Property</h2>
  <p>All intellectual property rights to the CraftWise Software, including designs, source code, and trademarks, remain the property of CraftWise GmbH or its licensors. The User receives only a limited right of use during the subscription term. Unauthorized reproduction, distribution, modification, or reverse engineering is prohibited.</p>
</div>
<div class="legal-section">
  <h2>16. Final Provisions</h2>
  <p>These Terms are governed exclusively by German law, excluding the conflict-of-law rules and the UN Convention on Contracts for the International Sale of Goods (CISG). The place of jurisdiction for all disputes arising from or related to these Terms is the registered office of CraftWise GmbH in Weiterstadt, Germany, provided the User is a merchant as defined by German law. If any provision of these Terms is or becomes invalid, the remaining provisions shall remain effective.</p>
</div>
`;

const updates = [
  {
    documentKey: "TERMS_CONDITIONS",
    locale: "en",
    title: "Terms & Conditions",
    heroTitle: "Terms & Conditions (AGB)",
    heroSemiTitle: "Last updated: 01.11.2025",
    heroDescription:
      'These Terms and Conditions ("Terms") govern the contractual relationship between CraftWise GmbH ("CraftWise," "we," or "us") and our customers ("User," "you"). By accessing or using the CraftWise platform, you agree to these Terms.',
    bodyHtml: enBodyHtml,
  },
  {
    documentKey: "TERMS_CONDITIONS",
    locale: "de",
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    heroTitle: "Allgemeine Geschäftsbedingungen (AGB)",
    heroSemiTitle: "Stand: 01.11.2025",
    heroDescription:
      'Diese Allgemeinen Geschäftsbedingungen ("AGB") regeln das Vertragsverhältnis zwischen der CraftWise GmbH ("CraftWise", "wir", "uns") und unseren Kunden ("Nutzer", "du"). Mit dem Zugriff auf die CraftWise Plattform und ihrer Nutzung stimmst du diesen AGB zu.',
    bodyHtml: enBodyHtml,
  },
];

async function main() {
  for (const { documentKey, locale, title, heroTitle, heroSemiTitle, heroDescription, bodyHtml } of updates) {
    const doc = await prisma.legalDocument.findUnique({
      where: { documentKey_locale: { documentKey, locale } },
      select: { currentPublishedVersionId: true },
    });

    if (!doc?.currentPublishedVersionId) {
      console.log(`No published version for ${documentKey}:${locale} — skipping`);
      continue;
    }

    await prisma.legalDocumentVersion.update({
      where: { id: doc.currentPublishedVersionId },
      data: { title, heroTitle, heroSemiTitle, heroDescription, bodyHtml },
    });

    console.log(`Updated ${documentKey}:${locale}`);
  }
}

await main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
