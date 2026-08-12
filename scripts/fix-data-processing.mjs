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
  <h2>1. Preamble</h2>
  <p>This Data Processing Agreement ("DPA") governs the processing of personal data by CraftWise GmbH as processor on behalf of the respective customer as controller under the GDPR. This DPA forms part of the main agreement for the use of the CraftWise SaaS platform.</p>
</div>
<div class="legal-section">
  <h2>2. Parties</h2>
  <ol>
    <li>Controller: The respective customer (company) using the CraftWise software.</li>
    <li>Processor: CraftWise GmbH, Ulmenweg 12, 64331 Weiterstadt, Germany ("CraftWise").</li>
  </ol>
</div>
<div class="legal-section">
  <h2>3. Subject, Term and Instruction</h2>
  <ol>
    <li>Subject: Provision, operation, maintenance, support and security of the CraftWise platform (web and mobile apps) including project management, scheduling, time tracking, document management, chat and invoicing.</li>
    <li>Term: Processing starts with the main agreement and ends upon its termination.</li>
    <li>Instructions: CraftWise processes personal data only on documented instructions of the Controller. Configuration, administration and use of the software by the Controller constitute documented instructions. Instructions may be given in text form (e.g., email, ticket system).</li>
    <li>Legal obligations: CraftWise may process personal data where required by Union or Member State law and will inform the Controller unless prohibited by law.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>4. Controller Obligations</h2>
  <ol>
    <li>The Controller remains responsible for the lawfulness of processing and for data subject rights.</li>
    <li>The Controller ensures lawful purposes, data minimization and appropriate access governance for its users.</li>
    <li>The Controller promptly informs CraftWise of any suspected non-compliance.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>5. Processor Obligations</h2>
  <p>CraftWise undertakes the obligations set out in Art. 28 GDPR, in particular:</p>
  <ul>
    <li>Process data only on documented instructions.</li>
    <li>Ensure confidentiality of authorized persons.</li>
    <li>Implement appropriate technical and organizational measures (Annex 2).</li>
    <li>Meet conditions for engaging sub-processors (Clause 8; Annex 3).</li>
    <li>Assist with data subject rights and compliance obligations.</li>
    <li>Notify personal data breaches (Clause 10).</li>
    <li>Delete/return data upon termination (Clause 13).</li>
    <li>Make information available and allow audits (Clause 12).</li>
  </ul>
</div>
<div class="legal-section">
  <h2>6. Confidentiality and Access Control</h2>
  <ol>
    <li>Persons authorized to process personal data are bound by confidentiality.</li>
    <li>Role-based access control and least privilege apply; administrative access is restricted.</li>
    <li>Safeguards such as authentication and logging where appropriate are implemented (Annex 2).</li>
  </ol>
</div>
<div class="legal-section">
  <h2>7. Technical and Organisational Measures (TOMs)</h2>
  <ol>
    <li>CraftWise implements appropriate TOMs under Art. 32 GDPR considering the state of the art, implementation costs, and the risk.</li>
    <li>TOMs are described in Annex 2 and may be updated provided the overall security level is not reduced.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>8. Sub-processors</h2>
  <ol>
    <li>The Controller grants general authorization to engage sub-processors.</li>
    <li>Current sub-processors are listed in Annex 3.</li>
    <li>CraftWise will inform the Controller at least 14 days in advance of material changes. The Controller may object on legitimate data protection grounds within that period.</li>
    <li>If a justified objection cannot be resolved, the Controller may terminate the affected part of the services for cause.</li>
    <li>CraftWise ensures sub-processors are bound by obligations no less protective than this DPA, in particular via an Art. 28 GDPR agreement.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>9. International Transfers</h2>
  <ol>
    <li>The CraftWise application is designed for EU regions; however, certain scenarios may involve transfers/access from third countries.</li>
    <li>Where required, transfers are safeguarded via appropriate safeguards under Art. 46 GDPR, in particular EU Standard Contractual Clauses (SCCs) and supplementary measures.</li>
    <li>CraftWise supports the Controller with documentation of transfer mechanisms upon request.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>10. Personal Data Breaches</h2>
  <ol>
    <li>CraftWise notifies the Controller without undue delay, no later than 48 hours after becoming aware of a personal data breach.</li>
    <li>Notifications include the nature of the breach, categories and approximate number of data subjects/records, likely consequences, and measures taken or proposed (where available).</li>
    <li>CraftWise documents breaches internally and supports the Controller with further obligations.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>11. Assistance</h2>
  <ol>
    <li>CraftWise assists the Controller, where feasible, with data subject rights (Arts. 12–22 GDPR), DPIAs and prior consultations (Arts. 35–36 GDPR).</li>
    <li>Requests received directly by CraftWise will be forwarded to the Controller where possible.</li>
    <li>The Controller remains responsible for legal assessment and responses. Assistance may be subject to a fee unless statutory law requires otherwise.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>12. Audits and Evidence</h2>
  <ol>
    <li>The Controller may verify compliance. CraftWise provides reasonable documentation.</li>
    <li>Audits require reasonable prior notice and must respect confidentiality and other customers' security.</li>
    <li>Remote audits or documentation reviews may be used as an alternative where appropriate.</li>
    <li>Reasonable costs are borne by the Controller unless a material compliance breach is found.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>13. Return/Deletion at End of Contract</h2>
  <ol>
    <li>The Controller may export its data in a common format where features are provided.</li>
    <li>Upon termination, CraftWise deletes or anonymises personal data within 30 days unless statutory retention applies.</li>
    <li>Backup data is overwritten in regular cycles; immediate deletion from backups may not always be technically feasible, but backups are protected and not used for productive purposes.</li>
    <li>The Controller may request a deletion confirmation in text form.</li>
  </ol>
</div>
<div class="legal-section">
  <h2>14. Liability</h2>
  <p>Liability is governed by the main agreement and applicable law, including Art. 82 GDPR. The Controller shall indemnify CraftWise to the extent permissible by law where claims arise from the Controller's unlawful instructions or processing.</p>
</div>
<div class="legal-section">
  <h2>15. Final Provisions</h2>
  <p>Amendments require text form. In case of conflict, this DPA prevails regarding data protection obligations. German law applies.</p>
</div>
<div class="legal-section">
  <h2>Annex 1 – Description of Processing</h2>
  <div class="legal-table">
    <table>
      <thead>
        <tr><th>Criterion</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Subject matter</td><td>Provision and operation of the CraftWise SaaS platform (project management, time tracking, documents, chat, invoicing).</td></tr>
        <tr><td>Duration</td><td>Term of the main agreement; deletion after termination per Clause 13.</td></tr>
        <tr><td>Nature of processing</td><td>Storage, organisation, retrieval, internal transmission within the platform, deletion/anonymisation.</td></tr>
        <tr><td>Purposes</td><td>Contract performance, support, security, troubleshooting, product improvement.</td></tr>
        <tr><td>Data subjects</td><td>Employees, project participants, subcontractors, customers/contacts of the Controller.</td></tr>
        <tr><td>Data categories</td><td>Master/contact data, working time/absence data, project data, chat messages, documents, billing/usage logs.</td></tr>
        <tr><td>Special categories (Art. 9)</td><td>Not intended. Free text may contain sensitive information; the Controller controls content and minimisation.</td></tr>
        <tr><td>Locations</td><td>App: EU regions (Firebase/Google Cloud). Website: Vercel (global possible; no core app data).</td></tr>
        <tr><td>Deletion/retention</td><td>Active data: deletion within 30 days after termination; backups: overwrite cycle; legal retention remains unaffected.</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="legal-section">
  <h2>Annex 2 – Technical and Organisational Measures (TOMs)</h2>
  <ul>
    <li>Role-based access control (least privilege).</li>
    <li>Restricted administrative access; strong authentication for admin accounts.</li>
    <li>Logging of security-relevant events and administrative access where appropriate/available.</li>
    <li>Protection against brute-force attacks (e.g., rate limiting).</li>
  </ul>
  <h3>Annex 2.2 Encryption (in transit and at rest)</h3>
  <ul>
    <li>TLS encryption for data in transit between clients and servers.</li>
    <li>Encryption at rest provided by the infrastructure provider (e.g., Firebase/Google Cloud).</li>
    <li>Key management controlled and restricted per infrastructure provider capabilities.</li>
  </ul>
  <h3>Annex 2.3 Availability, Backup and Recovery</h3>
  <ul>
    <li>Backups/redundancy performed using standard features of Firebase/Google Cloud.</li>
    <li>Monitoring of availability and error rates; incident response process.</li>
    <li>Recovery procedures for critical systems; periodic tests as appropriate.</li>
  </ul>
  <h3>Annex 2.4 Separation and Tenant Isolation</h3>
  <ul>
    <li>Logical separation of customer data (tenant isolation).</li>
    <li>Separation of production and development/test environments.</li>
  </ul>
  <h3>Annex 2.5 Integrity and Traceability</h3>
  <ul>
    <li>Logging of relevant changes/transactions where required for security and traceability.</li>
    <li>Time stamps and user attribution for relevant actions where implemented.</li>
  </ul>
  <h3>Annex 2.6 Disclosure Control</h3>
  <ul>
    <li>Secure interfaces when communicating with sub-processors.</li>
    <li>Data sharing limited to what is necessary (data minimization).</li>
    <li>Art. 28 GDPR agreements with sub-processors.</li>
  </ul>
  <h3>Annex 2.7 Organisational Measures</h3>
  <ul>
    <li>Confidentiality obligations for staff.</li>
    <li>Awareness and security training.</li>
    <li>Internal policies for access management, incident handling and change management.</li>
    <li>Vulnerability and update management for components on an appropriate cycle.</li>
  </ul>
</div>
<div class="legal-section">
  <h2>Annex 3 – Sub-processors / Recipients</h2>
  <p>The list includes key sub-processors/recipients required to operate the platform.</p>
  <div class="legal-table">
    <table>
      <thead>
        <tr><th>Service</th><th>Provider / Legal entity</th><th>Purpose</th><th>Location/Region</th><th>Transfer mechanism</th></tr>
      </thead>
      <tbody>
        <tr><td>App hosting / backend</td><td>Google Ireland Limited (Firebase / Google Cloud)</td><td>Hosting, database, auth, storage (EU region)</td><td>EU</td><td>SCC + supplementary measures if required</td></tr>
        <tr><td>Website hosting</td><td>Vercel Inc.</td><td>Public website hosting (marketing/info)</td><td>Global</td><td>SCC + supplementary measures if required</td></tr>
        <tr><td>Payments</td><td>STRIPE PAYMENTS EUROPE, LIMITED</td><td>Subscription payments, billing/payment events</td><td>EU/Ireland</td><td>Generally EU; SCC if required</td></tr>
        <tr><td>Push notifications (iOS)</td><td>Apple (APNs)</td><td>Delivery of push notifications to iOS devices</td><td>Global</td><td>Appropriate safeguards if required</td></tr>
        <tr><td>Push notifications (Android)</td><td>Google (FCM)</td><td>Delivery of push notifications to Android devices</td><td>Global</td><td>SCC/appropriate safeguards if required</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

const updates = [
  {
    documentKey: "DATA_PROCESSING",
    locale: "en",
    title: "Data Processing Agreement",
    heroTitle: "Data Processing Agreement (DPA)",
    heroSemiTitle: "Last updated: 01.11.2025",
    heroDescription:
      'This Data Processing Agreement ("DPA") governs the relationship between CraftWise GmbH ("CraftWise", "we", "us") and our customers ("you") regarding processing of personal data when using the CraftWise platform. By using the platform, you agree to this DPA.',
    bodyHtml,
  },
  {
    documentKey: "DATA_PROCESSING",
    locale: "de",
    title: "Auftragsverarbeitung (AVV)",
    heroTitle: "Auftragsverarbeitung (AVV)",
    heroSemiTitle: "Stand: 01.11.2025",
    heroDescription:
      'Diese Vereinbarung zur Auftragsverarbeitung ("AVV") regelt das Verhältnis zwischen der CraftWise GmbH ("CraftWise", "wir", "uns") und unseren Kunden ("du") zur Verarbeitung personenbezogener Daten bei der Nutzung der CraftWise Plattform. Mit der Nutzung der Plattform stimmst du dieser AVV zu.',
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
