import type { Locale } from "@/lib/i18n";

const en = {
  label: "Careers at Curamet",
  title: "We connect anything and change everything.",
  join: "Join the team",
  intro: [
    "Curamet is a Swedish-based leading IT services and solutions provider founded in 2016 by a professional team of technical and businessmen.",
    "We are a small team of engaged employees that bring experience from various industries such as Telecom, Healthcare, Retail, and IT services.",
    "Curamet offers its diverse set of solutions and services across the nation while ensuring required local and on-site support and services for sustaining successful implementations.",
  ],
  cultureTitle: "Workplace & Culture",
  culture: [
    "Our approach is a combination of resources with specific and cross skills, best practices and partnerships with enterprise-level software vendors.",
    "The company was founded on the principle of building and implementing great ideas in IT Solutions and customer management sector that drive progress for clients and enhance lives through enterprise solutions.",
  ],
  valuesTitle: "Company values",
  values: [
    { title: "Teamwork", desc: "Teamwork is not only a word at Curamet. We truly believe that a team should work together and strive for goals together, rather than individually." },
    { title: "Growth", desc: "For us, professional growth is super important. That's why we give all of our employees the possibility to develop their skills and offer a variety of different kinds of projects." },
    { title: "Passion", desc: "We are passionate about changing the industry and we'll work hard to reach that goal. At Curamet you'll be surrounded by talented and passionate people." },
  ],
  facts: [
    { n: "2016", t: "Founded" },
    { n: "15", t: "Co-workers" },
    { n: "Malmö", t: "Location" },
  ],
  industries: ["Telecom", "Healthcare", "Retail", "IT services"],
  referralTitle: "Already working at Curamet?",
  referral: "Let's recruit together and find your next colleague.",
  cta: "See open positions",
  contact: "Get in touch",
};

const sv: typeof en = {
  label: "Karriär hos Curamet",
  title: "Vi kopplar ihop allt och förändrar allt.",
  join: "Bli en del av teamet",
  intro: [
    "Curamet är en svensk, ledande leverantör av IT-tjänster och lösningar, grundad 2016 av ett professionellt team av tekniker och affärsmän.",
    "Vi är ett litet team av engagerade medarbetare med erfarenhet från olika branscher som telekom, hälso- och sjukvård, handel och IT-tjänster.",
    "Curamet erbjuder sina lösningar och tjänster över hela landet och säkerställer det lokala stöd och den support på plats som krävs för lyckade implementationer.",
  ],
  cultureTitle: "Arbetsplats & kultur",
  culture: [
    "Vårt arbetssätt är en kombination av resurser med specifika och breda kompetenser, beprövade metoder och partnerskap med mjukvaruleverantörer på företagsnivå.",
    "Bolaget grundades på principen att bygga och genomföra goda idéer inom IT-lösningar och kundhantering som driver framsteg för kunder och förbättrar liv genom företagslösningar.",
  ],
  valuesTitle: "Våra värderingar",
  values: [
    { title: "Teamwork", desc: "Teamwork är inte bara ett ord hos Curamet. Vi tror på att ett team ska arbeta och sträva mot målen tillsammans, inte var och en för sig." },
    { title: "Utveckling", desc: "Professionell utveckling är superviktigt för oss. Därför ger vi alla medarbetare möjlighet att utveckla sina färdigheter och erbjuder många olika typer av projekt." },
    { title: "Passion", desc: "Vi brinner för att förändra branschen och arbetar hårt för att nå dit. På Curamet omges du av begåvade och passionerade människor." },
  ],
  facts: [
    { n: "2016", t: "Grundat" },
    { n: "15", t: "Medarbetare" },
    { n: "Malmö", t: "Plats" },
  ],
  industries: ["Telekom", "Hälso- och sjukvård", "Handel", "IT-tjänster"],
  referralTitle: "Jobbar du redan på Curamet?",
  referral: "Låt oss rekrytera tillsammans och hitta din nästa kollega.",
  cta: "Se lediga tjänster",
  contact: "Kontakta oss",
};

export type Career = typeof en;
export const getCareer = (l: Locale): Career => (l === "sv" ? sv : en);
export const JOBS_URL = "https://career.curamet.se/";
