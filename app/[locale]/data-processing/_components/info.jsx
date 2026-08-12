"use client";
import LegalPrintButton from "@/components/shared/legal-print-button";

const Info = ({ locale }) => {
    return (
        <section id="printable-content" className="sec-padding-top sec-padding-bottom">
            <div className="container">
                <div className="border border-[#C9D6F3] rounded-[30px] p-6 md:p-7 space-y-10 text-[#475467] leading-relaxed">



                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">1. Preamble</h2>
                        <p>
                            This Data Processing Agreement (“DPA”) governs the processing of personal data by CraftWise GmbH as processor on behalf of the respective customer as controller under the GDPR. This DPA forms part of the main agreement for the use of the CraftWise SaaS platform.
                        </p>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">2. Parties</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Controller: The respective customer (company) using the CraftWise software.</li>
                            <li>Processor: CraftWise GmbH, Ulmenweg 12, 64331 Weiterstadt, Germany (“CraftWise”).</li>
                        </ol>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">3. Subject, Term and Instruction</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Subject: Provision, operation, maintenance, support and security of the CraftWise platform (web and mobile apps) including project management, scheduling, time tracking, document management, chat and invoicing.</li>
                            <li>Term: Processing starts with the main agreement and ends upon its termination.</li>
                            <li>Instructions: CraftWise processes personal data only on documented instructions of the Controller. Configuration, administration and use of the software by the Controller constitute documented instructions. Instructions may be given in text form (e.g., email, ticket system).</li>
                            <li>Legal obligations: CraftWise may process personal data where required by Union or Member State law and will inform the Controller unless prohibited by law.</li>
                        </ol>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">4. Controller Obligations</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>The Controller remains responsible for the lawfulness of processing and for data subject rights.</li>
                            <li>The Controller ensures lawful purposes, data minimization and appropriate access governance for its users.</li>
                            <li>The Controller promptly informs CraftWise of any suspected non-compliance.</li>
                        </ol>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">5. Processor Obligations</h2>
                        <p>CraftWise undertakes the obligations set out in Art. 28 GDPR, in particular:</p>
                        <ul className="list-disc pl-5 space-y-2">
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


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">6. Confidentiality and Access Control</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Persons authorized to process personal data are bound by confidentiality.</li>
                            <li>Role-based access control and least privilege apply; administrative access is restricted.</li>
                            <li>Safeguards such as authentication and logging where appropriate are implemented (Annex 2).</li>
                        </ol>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">7. Technical and Organisational Measures (TOMs)</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>CraftWise implements appropriate TOMs under Art. 32 GDPR considering the state of the art, implementation costs, and the risk.</li>
                            <li>TOMs are described in Annex 2 and may be updated provided the overall security level is not reduced.</li>
                        </ol>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">8. Sub-processors</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>(1) The Controller grants general authorization to engage sub-processors.</li>
                            <li>Current sub-processors are listed in Annex 3.</li>
                            <li>CraftWise will inform the Controller at least 14 days in advance of material changes. The Controller may object on legitimate data protection grounds within that period.</li>
                            <li>If a justified objection cannot be resolved, the Controller may terminate the affected part of the services for cause.</li>
                            <li>CraftWise ensures sub-processors are bound by obligations no less protective than this DPA, in particular via an Art. 28 GDPR agreement.</li>
                        </ol>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">9. International Transfers</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>(1) The CraftWise application is designed for EU regions; however, certain scenarios may involve transfers/access from third countries.</li>
                            <li>Where required, transfers are safeguarded via appropriate safeguards under Art. 46 GDPR, in particular EU Standard Contractual Clauses (SCCs) and supplementary measures.</li>
                            <li>CraftWise supports the Controller with documentation of transfer mechanisms upon request.</li>
                        </ol>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">10. Personal Data Breaches</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>CraftWise notifies the Controller without undue delay, no later than 48 hours after becoming aware of a personal data breach.</li>
                            <li>Notifications include the nature of the breach, categories and approximate number of data subjects/records, likely consequences, and measures taken or proposed (where available).</li>
                            <li>CraftWise documents breaches internally and supports the Controller with further obligations.</li>
                        </ol>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">11. Assistance</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>CraftWise assists the Controller, where feasible, with data subject rights (Arts. 12–22 GDPR), DPIAs and prior consultations (Arts. 35–36 GDPR).</li>
                            <li>Requests received directly by CraftWise will be forwarded to the Controller where possible.</li>
                            <li>The Controller remains responsible for legal assessment and responses. Assistance may be subject to a fee unless statutory law requires otherwise.</li>
                        </ol>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">12. Audits and Evidence</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>The Controller may verify compliance. CraftWise provides reasonable documentation.</li>
                            <li>Audits require reasonable prior notice and must respect confidentiality and other customers’ security.</li>
                            <li>Remote audits or documentation reviews may be used as an alternative where appropriate.</li>
                            <li>Reasonable costs are borne by the Controller unless a material compliance breach is found.</li>
                        </ol>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">13. Return/Deletion at End of Contract</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>The Controller may export its data in a common format where features are provided.</li>
                            <li>Upon termination, CraftWise deletes or anonymises personal data within 30 days unless statutory retention applies.</li>
                            <li>Backup data is overwritten in regular cycles; immediate deletion from backups may not always be technically feasible, but backups are protected and not used for productive purposes.</li>
                            <li>The Controller may request a deletion confirmation in text form.</li>
                        </ol>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">14. Liability</h2>
                        <p>
                            Liability is governed by the main agreement and applicable law, including Art. 82 GDPR. The Controller shall indemnify CraftWise to the extent permissible by law where claims arise from the Controller’s unlawful instructions or processing.
                        </p>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">15. Final Provisions</h2>
                        <p>
                            Amendments require text form. In case of conflict, this DPA prevails regarding data protection obligations. German law applies.
                        </p>
                    </div>



                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-black">Annex 1 – Description of Processing</h2>
                        <div className="overflow-x-auto rounded-[20px] border border-[#C9D6F3] ">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className=" text-white">
                                    <tr>
                                        <th className="p-4 border-r border-white/20 bg-secondary">Criterion</th>
                                        <th className="p-4 bg-[#467293] ">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#C9D6F3]">
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Subject matter</td>
                                        <td className="p-4 bg-[#F8FBFF]">Subject matter Provision and operation of the CraftWise SaaS platform (project management, time tracking, documents, chat, invoicing).</td>
                                    </tr>
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Duration</td>
                                        <td className="p-4 bg-[#F5F9FF]">Term of the main agreement; deletion after termination per Clause 13.</td>
                                    </tr>
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Nature of processing</td>
                                        <td className="p-4 bg-[#F8FBFF]">Storage, organisation, retrieval, internal transmission within the platform, deletion/anonymisation.</td>
                                    </tr>
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Purposes</td>
                                        <td className="p-4 bg-[#F5F9FF]">Contract performance, support, security, troubleshooting, product improvement.</td>
                                    </tr>
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Data subjects</td>
                                        <td className="p-4 bg-[#F8FBFF]">Employees, project participants, subcontractors, customers/contacts of the Controller.</td>
                                    </tr>
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Data categories</td>
                                        <td className="p-4 bg-[#F5F9FF]">Master/contact data, working time/absence data (sick day indicators without diagnoses), project data, chat messages, documents, billing/usage logs.</td>
                                    </tr>
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Special categories (Art. 9)</td>
                                        <td className="p-4 bg-[#F8FBFF]">Not intended. Free text entered by users may contain sensitive information; the Controller controls content and minimisation.</td>
                                    </tr>
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Locations</td>
                                        <td className="p-4 bg-[#F5F9FF]">App: EU regions (Firebase/Google Cloud). Website: Vercel (global possible; no core app data).</td>
                                    </tr>
                                    <tr className="">
                                        <td className="p-4 font-semibold bg-[#D3EAFB] border-r border-[#C9D6F3]">Deletion/retention</td>
                                        <td className="p-4 bg-[#F8FBFF]">Active data: deletion within 30 days after termination; backups: overwrite cycle; legal retention remains unaffected.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-black">Annex 2 – Technical and Organisational Measures (TOMs)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Role-based access control (least privilege).</li>
                            <li>Restricted administrative access; strong authentication for admin accounts.</li>
                            <li>Logging of security-relevant events and administrative access where appropriate/available.</li>
                            <li>Protection against brute-force attacks (e.g., rate limiting).</li>
                        </ul>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-black">Annex 2.2 Encryption (in transit and at rest)</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>TLS encryption for data in transit between clients and servers.</li>
                                <li>Encryption at rest provided by the infrastructure provider (e.g., Firebase/Google Cloud) as part of standard security mechanisms.</li>
                                <li>Key management controlled and restricted per infrastructure provider capabilities.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-black">Annex 2.3 Availability, Backup and Recovery</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Backups/redundancy are performed using the standard features and configurations provided by the infrastructure provider (Firebase/Google Cloud). CraftWise uses these features in line with a reasonable standard, without guaranteeing a specific backup frequency or retention period unless expressly agreed in the main agreement.</li>
                                <li>Monitoring of availability and error rates; incident response process.</li>
                                <li>Recovery procedures for critical systems; periodic tests as appropriate (where applicable).</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-black">Annex 2.4 Separation and Tenant Isolation</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Logical separation of customer data (tenant isolation).</li>
                                <li>Separation of production and development/test environments; use of production data in test systems only where necessary and safeguarded.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-black">Annex 2.5 Integrity and Traceability</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Logging of relevant changes/transactions where required for security and traceability.</li>
                                <li>Time stamps and user attribution for relevant actions where implemented.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-black">Annex 2.6 Disclosure Control</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Secure interfaces when communicating with sub-processors.</li>
                                <li>Data sharing limited to what is necessary (data minimization).</li>
                                <li>Art. 28 GDPR agreements with sub-processors.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-black">Annex 2.7 Organisational Measures</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Confidentiality obligations for staff.</li>
                                <li>Awareness and security training.</li>
                                <li>Internal policies for access management, incident handling and change management.</li>
                                <li>Vulnerability and update management for components on an appropriate cycle.</li>
                            </ul>
                        </div>
                    </div>


                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-black">Annex 3 – Sub-processors / Recipients</h2>
                        <p>The list includes key sub-processors/recipients required to operate the platform. Some services (e.g., push services) may act as independent providers/recipients; CraftWise lists them transparently.</p>
                        <div className="overflow-x-auto rounded-[20px] border border-[#C9D6F3]">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className=" text-white">
                                    <tr>
                                        <th className="p-4 border-r border-white/20 bg-secondary min-w-[200px]">Service</th>
                                        <th className="p-4 border-r border-white/20  bg-[#467293]">Provider / Legal entity</th>
                                        <th className="p-4 border-r border-white/20 bg-[#467293]">Purpose</th>
                                        <th className="p-4 border-r border-white/20 bg-[#467293]">Location/Region</th>
                                        <th className="p-4 bg-[#467293]">Transfer mechanism (if third country)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#C9D6F3]">
                                    <tr className="bg-[#D9E6FF] text-[16px]">
                                        <td className="p-4 text-[16px] border-r border-[#C9D6F3] bg-[#D3EAFB]">App hosting / backend</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Google Ireland Limited (Firebase / Google Cloud)</td>
                                        <td className="p-4 border-r border-[#C9D6F3]  bg-[#F8FBFF]">Hosting, database, auth, storage for the app (EU region)</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">EU</td>
                                        <td className="p-4 text-[16px] bg-[#F8FBFF]">SCC + supplementary measures if required</td>
                                    </tr>
                                    <tr className="bg-white text-[16px]">
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#D3EAFB]">Website hosting</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Vercel Inc.</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Public website hosting (marketing/info)</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Global</td>
                                        <td className="p-4 text-[16px] bg-[#F8FBFF]">SCC + supplementary measures if required</td>
                                    </tr>
                                    <tr className="bg-[#D9E6FF] text-[16px]">
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#D3EAFB]">Payments</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">STRIPE PAYMENTS EUROPE, LIMITED</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Subscription payments, billing/payment events</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">EU/Ireland</td>
                                        <td className="p-4 text-[16px] bg-[#F8FBFF]">Generally EU; SCC if required</td>
                                    </tr>
                                    <tr className="bg-white text-[16px]">
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#D3EAFB]">Push notifications (iOS)</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Apple (APNs)</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Delivery of push notifications to iOS devices</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Global</td>
                                        <td className="p-4 text-[16px] bg-[#F8FBFF]">Appropriate safeguards if required</td>
                                    </tr>
                                    <tr className="bg-[#D9E6FF] text-[16px]">
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#D3EAFB]">Push notifications (Android)</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Google (FCM)</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Delivery of push notifications to Android devices</td>
                                        <td className="p-4 border-r border-[#C9D6F3] bg-[#F8FBFF]">Global</td>
                                        <td className="p-4 text-[16px] bg-[#F8FBFF]">SCC/appropriate safeguards if required</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <LegalPrintButton
                  title="Data Processing Agreement"
                  fileName="Data Processing Agreement"
                  downloadLabel={locale === "de" ? "Herunterladen" : "Download"}
                  loadingLabel={locale === "de" ? "Wird erstellt…" : "Generating…"}
                />
            </div>
        </section>
    );
};

export default Info;
