import type { Dict } from "./en";

export const sv: Dict = {
  meta: {
    title: "Curamet — Ledande DevOps-lösningar & molntjänster",
    description:
      "Curamet hjälper företag att bygga applikationer snabbare, driva dem stabilare och sänka infrastrukturkostnaderna.",
  },
  nav: {
    home: "Hem",
    services: "Våra tjänster",
    career: "Karriär",
    about: "Om oss",
    contact: "Kontakt",
    cta: "Kontakta oss",
    scroll: "Scrolla",
  },
  hero: {
    kicker: "$ curamet --redo · moln ok",
    line1: "Snabbare leveranser. Färre fel.",
    line2: "Lägre molnkostnader.",
    sub: "Hjälper företag att bygga applikationer snabbare, driva dem stabilare och minska infrastrukturkostnaderna",
    cta: "Kontakta oss",
    footLeft: "Malmö · sedan 2016",
    footRight: "Bygg · Leverera · Skala",
  },
  services: {
    label: "Det här gör vi",
    title: "Specialiserade tjänster för ditt företag",
    more: "Läs mer",
    items: [
      {
        slug: "devops",
        icon: "code",
        title: "Digital Product Engineering",
        desc: "Vi designar, bygger och levererar moderna appar (mobil, webb eller backend) som ersätter äldre system, kopplas till dina befintliga lösningar och utvecklas med ditt företag.",
      },
      {
        slug: "cloud-consulting",
        icon: "cloud",
        title: "Cloud & DevOps Transformation",
        desc: "Vi inför moderna leveransmetoder och molnplattformar som gör att du kan leverera kod dagligen, återhämta dig snabbt från incidenter och hålla kostnaderna under kontroll.",
      },
      {
        slug: "microservices",
        icon: "ai",
        title: "AI & Intelligent Automation",
        desc: "Vi inför praktisk AI och automatisering för att frigöra tid, snabba upp kundkontakter och omvandla data till snabbare, smartare beslut.",
      },
      {
        slug: "insights-monitoring",
        icon: "team",
        title: "Strategisk IT-rådgivning & dedikerade team",
        desc: "Vi tillhandahåller erfarna konsulter och dedikerade leveransteam som integreras direkt i er organisation, deltar i era standups och börjar skapa värde inom några dagar.",
      },
    ],
  },
  clients: { label: "Förtroende hos team på" },
  values: {
    label: "Branschens toppval",
    title: "Vi formar framtiden med syfte",
    items: [
      { title: "Affärsetik", desc: "Vi upprätthåller högsta standard för integritet i alla våra affärsrelationer." },
      { title: "Inkludering & mångfald", desc: "Vi främjar en arbetsplats som välkomnar mångfald och ger lika möjligheter för alla." },
      { title: "Teknisk innovation", desc: "Vi utforskar och inför ständigt den senaste tekniken för att ligga steget före." },
      { title: "Social påverkan", desc: "Vi engagerar oss aktivt i initiativ som gör positiv skillnad i våra lokala och globala samhällen." },
    ],
  },
  benefits: {
    label: "Därför Curamet",
    title: "Fördelarna med våra tjänster",
    items: [
      "Nya funktioner på veckor i stället för månader",
      "Appar med 99,9 % drifttid och en smidig upplevelse på alla enheter",
      "15–30 % lägre underhållskostnader genom att fasa ut äldre system och minska manuellt arbete",
      "Frigör ditt team – automatisering tar bort rutinarbete så att personalen kan fokusera på tillväxt",
    ],
  },
  cta: {
    title: "Låt oss bygga smartare lösningar tillsammans",
    button: "Kontakta oss",
  },
  detail: {
    what: "Det här gör vi",
    get: "Det här får du",
    how: "Så levererar vi",
    back: "Alla tjänster",
    pages: {
      devops: {
        intro: "Kunder förväntar sig smidiga digitala upplevelser, men äldre system är långsamma att uppdatera, dyra att underhålla och skalar inte med efterfrågan.",
        what: [
          { t: "Kundappar & portaler", d: "Webb- och mobilappar där kunder kan köpa, boka eller hantera sina konton." },
          { t: "Applikationsmodernisering", d: "Vi bygger om eller utökar äldre verktyg till moderna, underhållbara plattformar." },
          { t: "API- & plattformsutveckling", d: "Backend-plattformar och API:er som driver produkter, partnerintegrationer och affärsflöden." },
        ],
        get: [
          "Nya funktioner på veckor i stället för månader",
          "Appar med 99,9 % drifttid och en smidig upplevelse på alla enheter",
          "15–30 % lägre underhållskostnader genom att fasa ut äldre system och minska manuellt arbete",
        ],
        how: [
          { t: "Mobilisering", d: "Dedikerade team som täcker hela livscykeln, från idé till lansering." },
          { t: "Arbetssätt", d: "Agila metoder med tydliga milstolpar och regelbundna demos." },
          { t: "Integration", d: "Koppling till befintliga affärssystem som ERP, CRM och e-handel." },
        ],
      },
      "cloud-consulting": {
        intro: "Era leveranser tar för lång tid. Långsamma releaser, kostsamma driftstopp och stigande molnkostnader, med manuella överlämningar och silos mellan team, gör det svårt att röra sig snabbt utan att något går fel.",
        what: [
          { t: "Molnmigrering", d: "Utvärderingar (inklusive SWOT-analys och mognadsbedömning), övergångar mellan moln och optimering av arbetsbelastningar med minimal ominvestering." },
          { t: "Molnapplikationsutveckling", d: "Molnarkitektur, val av teknikstack och uppbyggnad av molnplattformar baserade på mikrotjänster." },
          { t: "Molnoptimering", d: "Djupgående arkitekturgranskningar, inbyggda optimeringsverktyg och multimolnstrategier för att ta bort slöseri." },
        ],
        get: [
          "Kodleveranser på minuter i stället för timmar",
          "Återhämtning från incidenter på under en timme (MTTR)",
          "10–25 % lägre molnkostnader genom automatisering anpassad efter dina behov",
          "Under 15 % misslyckade ändringar i produktion",
        ],
        how: [
          { t: "Utvärdering", d: "En grundlig SWOT-analys och molnbedömning." },
          { t: "Arkitektur & design", d: "Vi definierar infrastruktur som kod (IaC) så att miljöer blir konsekventa och spårbara." },
          { t: "Implementation", d: "Vi sätter upp CI/CD-pipelines och övervakning så att utveckling och drift delar ett automatiserat flöde." },
        ],
      },
      microservices: {
        intro: "Team lägger timmar på repetitiva uppgifter, kundärenden tar för lång tid och verksamheten får inte ut tillräckligt av sin befintliga data.",
        what: [
          { t: "Interaktionsautomatisering", d: "Chattbottar, virtuella assistenter och AI-drivna helpdesks som hanterar vanliga frågor och uppgifter från kunder eller användare." },
          { t: "Arbetsflödesautomatisering", d: "Automatisering av repetitivt back office-arbete som rapportering, godkännanden och innehållsskapande." },
          { t: "Datainsikter", d: "AI-drivna dashboards och analys som förvandlar rådata till affärsinsikter." },
        ],
        get: [
          "30–50 % kortare svarstider genom automatisk ärendesortering",
          "Flera timmar sparade varje vecka genom automatiskt genererad dokumentation och rapporter",
          "Snabbare och bättre beslut med stöd av AI-förstärkta live-dashboards",
          "Mer personliga kundupplevelser, med rekommendationer baserade på tidigare beteende och interaktioner",
        ],
        how: [
          { t: "Analys", d: "Vi identifierar de viktigaste testscenarierna för automatiseringarna tillsammans med ert team." },
          { t: "Prototyper", d: "Vi bygger AI-agenter som hanterar rutinuppgifter utan manuell hantering." },
          { t: "Implementation", d: "Vi skapar datapipelines som håller analysen uppdaterad." },
        ],
      },
      "insights-monitoring": {
        intro: "Ni behöver leverera kritiska projekt men saknar senior kompetens. Rekrytering tar för lång tid och konsulter passar inte alltid in i ert arbetssätt.",
        what: [
          { t: "Seniora experter vid behov", d: "Enskilda konsulter med djup expertis inom moln, DevOps, mjukvaruarkitektur eller projektledning." },
          { t: "Dedikerat leveransteam", d: "Kompletta agila/DevOps-team som driver ett projekt från planering till leverans." },
          { t: "Strategisk IT-rådgivning", d: "Vägledning inom teknik- och mjukvarustrategi, arkitektur och skalning av digitala plattformar." },
        ],
        get: [
          "Seniora ingenjörer på plats inom 1–2 veckor",
          "Flexibel bemanning, från en enskild specialist till ett komplett leveransteam",
          "Förutsägbara resultat genom tydliga milstolpar, veckovisa uppdateringar och delat ansvar",
          "Tillgång till ledarskapskompetens, som arkitekturgranskningar och interim CTO- eller Tech Lead-roller",
        ],
        how: [
          { t: "Specialistkompetens", d: "Enskilda konsultuppdrag för riktade kompetenser." },
          { t: "Team som tjänst", d: "Dedikerade leveransteam för hela projekt." },
          { t: "Ledarskap", d: "Tekniskt ledarskap för strategi och arkitektur." },
        ],
      },
    },
  },
  about: {
    label: "Om Curamet",
    title: "Levererar innovativa lösningar sedan 2016",
    story:
      "Curamet startade 2016 med ett sammansvetsat team av affärsutvecklare och IT-specialister. Från början har vi fokuserat på att leverera säkra, effektiva och skalbara lösningar till kunder inom bland annat telekom, vård och detaljhandel. Vi hjälper PaaS-, SaaS- och IaaS-företag att effektivisera sina processer med Agile, DevOps, GitOps och flexibla resursmodeller. Vårt team har djup erfarenhet av molntjänster och DevOps-principer. Vi guidar våra kunder genom en digital transformation som inte bara handlar om teknik, utan också om nya arbetssätt, kulturförändringar och verkligt affärsstöd. Genom starka partnerskap med ledande leverantörer hjälper vi dig att leverera framtiden redan idag.",
    cultureTitle: "Kultur & innovation för ett bättre samhälle",
    culture:
      "På Curamet syns vårt engagemang för innovation, samarbete och ständig förbättring i det dagliga arbetet. Här får du en inblick i hur vårt team formar framtidens IT-bransch.",
    valuesTitle: "Våra värderingar skapar värde",
    values: [
      { title: "Teamwork", desc: "Vi tror att samarbete driver innovation och framgång." },
      { title: "Tillväxt", desc: "Vi investerar i kontinuerlig utveckling så att vårt team kan växa och anpassa sig." },
      { title: "Passion", desc: "Vi älskar det vi gör, och vårt engagemang syns i varje projekt." },
    ],
    quoteTitle: "Ledarskap med passion & vision",
    quote:
      "Framgång tar tid, tålamod och uthållighet. Genom att omfamna kontinuerligt lärande och vara öppna för nya möjligheter skapar vi en stark grund för framtiden.",
    quoteBy: "Naser Khalil",
    quoteRole: "Grundare & VD",
  },
  contact: {
    label: "Kontakta oss",
    line1: "Låt oss bygga",
    line2: "smartare lösningar",
    line3: "tillsammans",
    formTitle: "Kontakta oss",
    name: "Fullständigt namn",
    email: "E-postadress",
    subject: "Ämne",
    message: "Meddelande",
    send: "Skicka meddelande",
    sent: "Tack — ditt meddelande är redo att skickas. Vi svarar så snart som möjligt.",
    required: "Fyll i alla fält.",
    find: "Hitta hit",
    address: ["Admiralsgatan 4", "211 55 Malmö", "Sverige"],
    call: "Ring oss",
    phone: "+46 (0)729 66 66 83",
    hours: "Tillgänglig mån–fre, 09:00–17:00",
    mail: "Mejla oss",
    mailAddr: "info@curamet.se",
    reply: "Vi svarar så snart som möjligt",
    feedback: "Lämna feedback",
    feedbackSub: "Hjälp oss att förbättra våra tjänster",
  },
  footer: {
    tagline: "Vi moderniserar företag genom innovativa teknikjänster",
    quick: "Snabblänkar",
    contact: "Kontakta oss",
    rights: "© 2025 Curamet. Alla rättigheter förbehållna.",
  },
};
