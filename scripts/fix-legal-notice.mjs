import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/craftwise?schema=public";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const bodyHtmlEn = `
<div class="legal-grid legal-grid--3">
  <div class="legal-card">
    <h4>Contact</h4>
    <ul>
      <li><strong>Phone:</strong> +49 69 58003098</li>
      <li><strong>E-Mail:</strong> support@craft-wise.de</li>
    </ul>
  </div>
  <div class="legal-card">
    <h4>Commercial Register</h4>
    <ul>
      <li>Registered in the Commercial Register</li>
      <li>Register Court: Local Court of Darmstadt</li>
      <li>Commercial Register Number: HRB 108362</li>
    </ul>
  </div>
  <div class="legal-card">
    <h4>VAT Information</h4>
    <p>VAT Identification Number according to §27a Umsatzsteuergesetz (German VAT Act): DE458627363</p>
  </div>
  <div class="legal-card">
    <h4>Responsible for content pursuant to Section 18(2) MStV</h4>
    <ul>
      <li>Felix Pritzsche</li>
      <li>CraftWise GmbH</li>
      <li>Ulmenweg 12</li>
      <li>64331 Weiterstadt</li>
      <li>Germany</li>
    </ul>
  </div>
</div>

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

const bodyHtmlDe = `
<div class="legal-grid legal-grid--3">
  <div class="legal-card">
    <h4>Kontakt</h4>
    <ul>
      <li><strong>Telefon:</strong> +49 69 58003098</li>
      <li><strong>E-Mail:</strong> support@craft-wise.de</li>
    </ul>
  </div>
  <div class="legal-card">
    <h4>Handelsregister</h4>
    <ul>
      <li>Eingetragen im Handelsregister</li>
      <li>Registergericht: Amtsgericht Darmstadt</li>
      <li>Handelsregisternummer: HRB 108362</li>
    </ul>
  </div>
  <div class="legal-card">
    <h4>Umsatzsteuer</h4>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE458627363</p>
  </div>
  <div class="legal-card">
    <h4>Inhaltlich verantwortlich gemäß § 55 Abs. 2 RStV</h4>
    <ul>
      <li>Felix Pritzsche</li>
      <li>CraftWise GmbH</li>
      <li>Ulmenweg 12</li>
      <li>64331 Weiterstadt</li>
      <li>Deutschland</li>
    </ul>
  </div>
</div>

<div class="legal-section">
  <h2>1. Geltungsbereich und Vertragsparteien</h2>
  <p>Diese Bedingungen gelten für alle Vereinbarungen, Leistungen und die Nutzung der CraftWise-Plattform. Die CraftWise GmbH, Ulmenweg 12, 64331 Weiterstadt, Deutschland, erbringt ihre Software und zugehörigen Dienstleistungen ausschließlich für Unternehmer im Sinne des § 14 BGB. Die Einbeziehung von Allgemeinen Geschäftsbedingungen des Kunden ist ausgeschlossen. Abweichende Bedingungen gelten nur, wenn sie schriftlich ausdrücklich bestätigt wurden. CraftWise kann diese Bedingungen regelmäßig aktualisieren; Nutzer werden über wesentliche Änderungen informiert.</p>
</div>
<div class="legal-section">
  <h2>2. Leistungsumfang</h2>
  <p>CraftWise stellt eine cloudbasierte Software-as-a-Service (SaaS)-Lösung ("CraftWise Software") für Projektmanagement, Planung, Angebotserstellung, Rechnungsstellung, Dokumentenmanagement, Automatisierung, Zeiterfassung und Kommunikation bereit, die auf Handwerks- und Baubetriebe zugeschnitten ist. Die Software ist über Web- und mobile Anwendungen (iOS, Android) verfügbar. Individuelle Anpassungen werden nur bei ausdrücklicher Vereinbarung erbracht. Der Zugang zu den Diensten erfordert eine Internetverbindung und kompatible Geräte, die der Nutzer selbst bereitzustellen hat. CraftWise kann die Software weiterentwickeln oder anpassen, sofern solche Änderungen zumutbar sind und die Kernfunktionalität erhalten bleibt.</p>
</div>
<div class="legal-section">
  <h2>3. Nutzungsrechte</h2>
  <p>Dem Nutzer wird für die Dauer des Vertrages ein einfaches, nicht ausschließliches, nicht übertragbares Recht zur Nutzung der CraftWise Software eingeräumt. Eine Weitergabe oder Unterlizenzierung an Dritte ist untersagt. Jegliches Reverse Engineering, Vervielfältigung oder Modifikation der Software über den erlaubten Nutzungsrahmen hinaus ist nicht gestattet.</p>
</div>
<div class="legal-section">
  <h2>4. Registrierung und Konto</h2>
  <p>Zur Nutzung von CraftWise müssen sich Nutzer mit vollständigen und korrekten Angaben registrieren. Konten sind persönlich und nicht übertragbar; Zugangsdaten sind vertraulich zu behandeln. Der Nutzer ist für alle Handlungen verantwortlich, die über sein Konto vorgenommen werden.</p>
</div>
<div class="legal-section">
  <h2>5. Kostenlose Testphase und Abonnement</h2>
  <p>Neue Nutzer können die Software 14 Tage kostenlos und ohne Angabe von Zahlungsdaten testen. Nach Ablauf der Testphase ist für die weitere Nutzung ein kostenpflichtiges Abonnement erforderlich. Die Abonnementgebühren richten sich nach dem gewählten Plan und dem Abrechnungszeitraum. Alle Preise sind in EUR angegeben und enthalten die anfallenden Steuern, sofern nicht anders angegeben.</p>
</div>
<div class="legal-section">
  <h2>6. Preise, Zahlung und Rechnungsstellung</h2>
  <p>Die Nutzung der Software ist kostenpflichtig, außer während der kostenlosen Testphase. Die Abrechnung erfolgt monatlich oder jährlich im Voraus gemäß dem gewählten Plan. Zahlungen werden sicher über Stripe Payments Europe Ltd. mit den verfügbaren Zahlungsmethoden abgewickelt. Bei Zahlungsverzug kann CraftWise den Zugang bis zur Begleichung sperren. Rechnungen werden elektronisch ausgestellt und sind im Nutzerkonto abrufbar.</p>
</div>
<div class="legal-section">
  <h2>7. Laufzeit und Kündigung</h2>
  <p>Die Mindestvertragslaufzeit entspricht dem gewählten Abrechnungszeitraum (1 Monat oder 12 Monate). Der Vertrag verlängert sich automatisch um die gleiche Laufzeit, sofern er nicht vor dem Verlängerungsdatum gekündigt wird. Eine Kündigung ist bis zum Tag vor der Verlängerung möglich. CraftWise kann ein Konto bei Verstößen, betrügerischen Aktivitäten oder Missbrauch fristlos kündigen. Nach Vertragsende endet der Zugang zur Plattform, und Daten können nach Ablauf gesetzlicher Aufbewahrungsfristen gelöscht werden.</p>
</div>
<div class="legal-section">
  <h2>8. Nutzerpflichten</h2>
  <p>Nutzer müssen die Plattform rechtmäßig und in Übereinstimmung mit den geltenden Vorschriften verwenden. Das Hochladen rechtswidriger, schädlicher oder rechtsverletzender Inhalte ist untersagt. Nutzer sind für die Rechtmäßigkeit ihrer Daten und die regelmäßige Datensicherung verantwortlich. Missbrauch, unberechtigte Zugriffsversuche oder Systemstörungen können zur Sperrung oder Kündigung führen.</p>
</div>
<div class="legal-section">
  <h2>9. Datenschutz und Kundendaten</h2>
  <p>CraftWise verarbeitet personenbezogene Daten ausschließlich gemäß seiner Datenschutzerklärung und den geltenden Datenschutzgesetzen (DSGVO). Nutzer behalten das vollständige Eigentum an ihren hochgeladenen Inhalten. CraftWise verarbeitet Kundendaten nur soweit zur Leistungserbringung erforderlich und gemäß einem separaten Auftragsverarbeitungsvertrag (AVV). Die Plattform wird in der EU gehostet und erfüllt die DSGVO-Anforderungen.</p>
</div>
<div class="legal-section">
  <h2>10. Verfügbarkeit und Support</h2>
  <p>CraftWise strebt eine hohe Dienstverfügbarkeit an, garantiert jedoch keinen unterbrechungsfreien Betrieb. Temporäre Ausfallzeiten können durch Wartungsarbeiten oder technische Probleme entstehen. Geplante Wartungen werden nach Möglichkeit im Voraus angekündigt; dringende Wartungen können ohne Vorankündigung erfolgen. Der Support wird an Werktagen zu regulären Geschäftszeiten per E-Mail oder Chat angeboten.</p>
</div>
<div class="legal-section">
  <h2>11. Änderungen der Leistungen</h2>
  <p>CraftWise verbessert und entwickelt seine Software kontinuierlich weiter. Anpassungen, die für den Nutzer zumutbar sind, können ohne vorherige Ankündigung umgesetzt werden. Wesentliche Änderungen, die Kernfunktionen betreffen, werden im Voraus kommuniziert.</p>
</div>
<div class="legal-section">
  <h2>12. Haftung</h2>
  <p>CraftWise haftet nur bei Vorsatz oder grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten. Bei leichter Fahrlässigkeit ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt. Die Haftung für mittelbare oder Folgeschäden, wie entgangenen Gewinn oder Datenverlust, ist ausgeschlossen, soweit keine zwingende gesetzliche Haftung besteht (z. B. Produkthaftung oder Verletzung von Leben, Körper oder Gesundheit). Die Pflicht des Nutzers zur regelmäßigen Datensicherung bleibt unberührt.</p>
</div>
<div class="legal-section">
  <h2>13. Empfehlungsprogramm und Rabatte</h2>
  <p>Kunden können am CraftWise-Empfehlungsprogramm teilnehmen. Eingeladene Neukunden erhalten einen Rabatt von 20 % für einen Monat, und der empfehlende Kunde erhält ebenfalls 20 % Rabatt. Der maximale Jahresrabatt pro Kunde beträgt 1.000 EUR. Rabatte sind nicht auszahlbar und gelten nur für aktive Abonnements. CraftWise behält sich das Recht vor, das Programm jederzeit zu ändern oder zu beenden. Kunden sind für die ordnungsgemäße steuerliche Behandlung erhaltener Rabatte verantwortlich.</p>
</div>
<div class="legal-section">
  <h2>14. Drittanbieter-Dienste und Integrationen</h2>
  <p>CraftWise kann Drittanbieter-Tools oder Schnittstellen integrieren (z. B. DATEV, Lexoffice, sevDesk, Outlook Kalender, xRechnung, Stripe, Calendly). Die Nutzung dieser Integrationen ist freiwillig und unterliegt den jeweiligen Nutzungsbedingungen der Anbieter. Ein Datenaustausch erfolgt nur mit Zustimmung des Nutzers.</p>
</div>
<div class="legal-section">
  <h2>15. Geistiges Eigentum</h2>
  <p>Alle Rechte des geistigen Eigentums an der CraftWise Software, einschließlich Designs, Quellcode und Marken, verbleiben beim CraftWise GmbH oder ihren Lizenzgebern. Der Nutzer erhält nur ein eingeschränktes Nutzungsrecht für die Dauer des Abonnements. Unbefugte Vervielfältigung, Verbreitung, Modifikation oder Reverse Engineering ist untersagt.</p>
</div>
<div class="legal-section">
  <h2>16. Schlussbestimmungen</h2>
  <p>Diese Bedingungen unterliegen ausschließlich deutschem Recht unter Ausschluss der Kollisionsnormen und des UN-Kaufrechts (CISG). Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesen Bedingungen ist der Sitz der CraftWise GmbH in Weiterstadt, sofern der Nutzer Kaufmann im Sinne des deutschen Rechts ist. Sollte eine Bestimmung dieser Bedingungen unwirksam sein oder werden, bleiben die übrigen Bestimmungen wirksam.</p>
</div>
`;

const updates = [
  {
    documentKey: "LEGAL_NOTICE",
    locale: "en",
    title: "Legal Notice",
    heroTitle: "Legal Notice",
    heroSemiTitle: "Information according to §5 TMG (German Telemedia Act)",
    heroDescription:
      "<strong>CraftWise GmbH</strong> <br/> Ulmenweg 12 <br/> 64331 Weiterstadt <br/> Germany <br/> <br/> <strong>Represented by the Managing Director:</strong> <br/> Felix Pritzsche",
    bodyHtml: bodyHtmlEn,
  },
  {
    documentKey: "LEGAL_NOTICE",
    locale: "de",
    title: "Impressum",
    heroTitle: "Impressum",
    heroSemiTitle: "Angaben gemäß § 5 TMG",
    heroDescription:
      "<strong>CraftWise GmbH</strong> <br/> Ulmenweg 12 <br/> 64331 Weiterstadt <br/> Deutschland <br/> <br/> <strong>Vertreten durch den Geschäftsführer:</strong> <br/> Felix Pritzsche",
    bodyHtml: bodyHtmlDe,
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
