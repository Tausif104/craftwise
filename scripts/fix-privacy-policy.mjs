import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/craftwise?schema=public";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const bodyHtml = `
<div class="legal-section">
  <h2>1. Controller</h2>
  <p>CraftWise GmbH, Ulmenweg 12, 64331 Weiterstadt, Germany. Email: support@craft-wise.de</p>
</div>
<div class="legal-section">
  <h2>2. General</h2>
  <p>CraftWise software is intended exclusively for business users. We process personal data only to provide and improve our software, to perform contracts, and to comply with legal requirements.</p>
</div>
<div class="legal-section">
  <h2>3. Categories of Data Processed</h2>
  <p>We process the following categories of personal data: master data (name, company name, address, contact details, date of birth if applicable), contract data (chosen plan, billing data, contract term), payment data (processed via Stripe Payments Europe Ltd., EU), usage data (logins, IP addresses, browser type, device information, error logs), communication data (support requests, chat messages within the software), and marketing data (email address when subscribing to newsletters or referral programs). When visiting our website, the following technical information is also automatically collected: IP address, date and time of access, browser type and version, operating system, and referrer URL. This technical data is necessary to display our website correctly, ensure stability, and maintain security.</p>
</div>
<div class="legal-section">
  <h2>4. Purposes and Legal Bases of Processing</h2>
  <p>We process personal data for the following purposes: providing access to our services and features, managing customer inquiries, demo bookings, and contracts, processing payments and accounting, ensuring IT security and preventing misuse, improving user experience and software performance, sending product information and newsletters (with consent), and fulfilling legal obligations. The processing is based on Art. 6(1)(b) GDPR (contract performance), Art. 6(1)(f) GDPR (legitimate interest such as service improvement and security), Art. 6(1)(a) GDPR (consent for marketing and integrations), and Art. 6(1)(c) GDPR (legal obligations).</p>
</div>
<div class="legal-section">
  <h2>5. Hosting and Infrastructure</h2>
  <p>Our hosting and infrastructure are located within the European Union. We cooperate with trusted service providers under Data Processing Agreements in accordance with Art. 28 GDPR, including Firebase (EU) for hosting and database, Vercel (EU) for website and frontend hosting, and Stripe Payments Europe Ltd. (EU) for payment processing. All systems are protected through encryption, access restrictions, and secure environments.</p>
</div>
<div class="legal-section">
  <h2>6. Cookies and Tracking</h2>
  <p>Our website uses cookies and similar technologies to ensure proper functionality and to analyze usage. We use necessary cookies (essential for site operation) and analytics cookies (for performance insights, e.g., Google Analytics with IP anonymization). A cookie banner appears upon your first visit to obtain consent. You can withdraw your consent at any time or configure your browser to block cookies. Disabling cookies may limit some website functions.</p>
</div>
<div class="legal-section">
  <h2>7. Newsletter and Marketing</h2>
  <p>We send newsletters and product updates only with your explicit consent (opt-in). You can unsubscribe at any time by using the link in the email or contacting us at support@craft-wise.de.</p>
</div>
<div class="legal-section">
  <h2>8. Referral Program</h2>
  <p>When participating in our referral program, we process contact data and referral links to operate the program. The legal basis is consent under Art. 6(1)(a) GDPR.</p>
</div>
<div class="legal-section">
  <h2>9. Integrations and Interfaces</h2>
  <p>CraftWise offers optional integrations and interfaces to third-party services, including Outlook Calendar, DATEV, Lexware, SevDesk, xRechnung, Stripe, and Calendly. These integrations are activated voluntarily by the user. Responsibility for data shared with third parties lies with the user. Legal basis: consent under Art. 6(1)(a) GDPR.</p>
</div>
<div class="legal-section">
  <h2>10. Social Media and Plugins</h2>
  <p>Our website may include links or plugins from third-party platforms such as LinkedIn, Facebook, Instagram, WhatsApp, YouTube, and TikTok. Using these services may result in the transfer of data (such as IP address or browser details) to the respective providers. Data transfers to the USA may occur under EU Standard Contractual Clauses. Legal basis: consent via the cookie banner.</p>
</div>
<div class="legal-section">
  <h2>11. Data Sharing</h2>
  <p>Personal data is shared only when necessary and legally permitted. Examples include service providers for hosting, analytics, and customer support; payment processors such as Stripe; accounting tools like DATEV, Lexoffice, and sevDesk; and public authorities if legally required. We never sell personal data or share it for advertising without consent.</p>
</div>
<div class="legal-section">
  <h2>12. Internal Access Rights</h2>
  <p>Access to personal data is limited to authorized employees who require it to perform their duties. Access is controlled through secure admin systems with individual authentication and limited permissions.</p>
</div>
<div class="legal-section">
  <h2>13. Storage and Deletion</h2>
  <p>Data is stored only as long as necessary for the specified purpose or as required by law. After contract termination, personal data is deleted or blocked according to applicable legal retention periods.</p>
</div>
<div class="legal-section">
  <h2>14. International Data Transfers</h2>
  <p>If data is transferred to third countries (e.g., Google, Stripe), such transfers are based on EU Standard Contractual Clauses in accordance with Art. 46 GDPR to ensure an adequate level of protection.</p>
</div>
<div class="legal-section">
  <h2>15. Your Rights</h2>
  <p>Under the GDPR, you have the right to access (Art. 15), rectify (Art. 16), erase (Art. 17), restrict processing (Art. 18), data portability (Art. 20), and object (Art. 21). You may also withdraw consent at any time (Art. 7). To exercise your rights, please contact us at support@craft-wise.de.</p>
</div>
<div class="legal-section">
  <h2>16. Data Security</h2>
  <p>We implement strong technical and organizational security measures, including encryption, access restrictions, and backups, to protect your data from loss, misuse, or unauthorized access. All systems are regularly audited for compliance and security.</p>
</div>
<div class="legal-section">
  <h2>17. Data Processing Agreement (DPA)</h2>
  <p>CraftWise provides customers with a Data Processing Agreement (DPA) under Art. 28 GDPR, governing the processing of personal data by CraftWise on behalf of the customer.</p>
</div>
<div class="legal-section">
  <h2>18. Supervisory Authority</h2>
  <p>You have the right to lodge a complaint with the competent supervisory authority: Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI), Postfach 3163, 65021 Wiesbaden, Germany. Website: https://datenschutz.hessen.de.</p>
</div>
<div class="legal-section">
  <h2>19. Updates to This Policy</h2>
  <p>We may update this Privacy Policy to reflect changes in legal requirements, technology, or our services. The latest version is always available on our website.</p>
</div>
<div class="legal-section">
  <h2>20. Contact</h2>
  <p>For all questions regarding data protection, please contact: CraftWise GmbH, Ulmenweg 12, 64331 Weiterstadt, Germany. Email: support@craft-wise.de.</p>
</div>
`;

const updates = [
  {
    documentKey: "PRIVACY_POLICY",
    locale: "en",
    title: "Privacy Policy",
    heroTitle: "Privacy Policy",
    heroSemiTitle: null,
    heroDescription:
      "Protecting your personal data is very important to us. This Privacy Policy explains how CraftWise GmbH collects, uses, and protects your information when you visit our website or use our software and services. We comply with the General Data Protection Regulation (GDPR) and all applicable German and EU data protection laws.",
    bodyHtml,
  },
  {
    documentKey: "PRIVACY_POLICY",
    locale: "de",
    title: "Datenschutzerklärung",
    heroTitle: "Datenschutzerklärung",
    heroSemiTitle: null,
    heroDescription:
      "Der Schutz deiner Daten ist uns wichtig. In dieser Datenschutzerklärung erklären wir, wie die CraftWise GmbH deine Daten erhebt, nutzt und schützt, wenn du unsere Website besuchst oder unsere Software und Services nutzt. Wir halten uns an die Datenschutz-Grundverordnung (DSGVO) sowie an alle geltenden deutschen und EU-Datenschutzgesetze.",
    bodyHtml,
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
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
