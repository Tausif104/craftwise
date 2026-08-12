export const pricingLabels = {
    en: {
        title: "Pricing by Role – Flexible & Fair",
        subtitle: "Choose the right license for each role and mix them as needed.",
        vatInfo: "All prices are per user and exclude VAT.",
        monthly: "Monthly",
        annually: "Annually",
        save20: "Save 20%",
        perMonth: "/ Month",
        mostPopular: "Popular",
        getStarted: "Get Started Today",
    },
    de: {
        title: "Preise nach Rolle – flexibel & fair",
        subtitle: "Wähle die passende Lizenz pro Rolle und kombiniere sie flexibel.",
        vatInfo: "Alle Preise gelten pro Nutzer und zzgl. MwSt.",
        monthly: "Monatlich",
        annually: "Jährlich",
        save20: "20% sparen",
        perMonth: "/ Monat",
        mostPopular: "Beliebt",
        getStarted: "Heute starten",
    },
};

export const pricingPlans = [
    {
        id: "on-site",
        name: {
            en: "On-Site",
            de: "Baustelle",
        },
        description: {
            en: "Field workers, technicians, apprentices",
            de: "Monteure, Baustellen-Team, Azubis",
        },
        monthlyPrice: 24.9,
        annualPrice: 19.9,
        features: [
            { en: "Work directly on site", de: "Direkt auf der Baustelle arbeiten" },
            { en: "Access assigned projects", de: "Zugriff auf zugewiesene Projekte" },
            { en: "Handle simple tasks", de: "Einfache Aufgaben erledigen" },
            { en: "No financial topics", de: "Keine Finanzthemen" },
        ],
        buttonText: {
            en: "Get Started Today",
            de: "Heute starten",
        },
    },
    {
        id: "office",
        name: {
            en: "Office",
            de: "Büro",
        },
        description: {
            en: "Project leads, office staff",
            de: "Projektleitung, Büro-Team",
        },
        monthlyPrice: 49.9,
        annualPrice: 39.9,
        popular: true,
        features: [
            { en: "Manage own projects", de: "Eigene Projekte verwalten" },
            { en: "Documents", de: "Dokumente" },
            { en: "Communication and scheduling board", de: "Kommunikation und Planungstafel" },
            { en: "Full planning within own projects", de: "Komplette Planung in eigenen Projekten" },
        ],
        buttonText: {
            en: "Get Started Today",
            de: "Heute starten",
        },
    },
    {
        id: "management",
        name: {
            en: "Management",
            de: "Management",
        },
        description: {
            en: "Managers, coordinators, planners",
            de: "Koordination, Disposition, Planung",
        },
        monthlyPrice: 49.9,
        annualPrice: 39.9,
        features: [
            { en: "Access all company projects", de: "Zugriff auf alle Projekte im Betrieb" },
            { en: "Plan resources and schedules across projects", de: "Ressourcen und Termine projektübergreifend planen" },
            { en: "Run daily operations", de: "Tagesgeschäft steuern" },
        ],
        buttonText: {
            en: "Get Started Today",
            de: "Heute starten",
        },
    },
    {
        id: "owner",
        name: {
            en: "Owner",
            de: "Inhaber",
        },
        description: {
            en: "Business owners, company leaders",
            de: "Geschäftsführung, Betriebsleitung",
        },
        monthlyPrice: 59.9,
        annualPrice: 47.9,
        features: [
            { en: "Full rights", de: "Volle Rechte" },
            { en: "Including company and user settings", de: "inkl. Firmen- und Nutzer-Einstellungen" },
            { en: "Insights and finances", de: "Auswertungen und Finanzen" },
            { en: "Complete control", de: "Komplette Kontrolle" },
        ],
        buttonText: {
            en: "Get Started Today",
            de: "Heute starten",
        },
    },
];
