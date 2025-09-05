# Boka aktivitet: NextJS + Cypress

I denna uppgift har jag byggt en enkel app för att boka en aktivitet. Jag har utgått från de två användarflödena nedan för att utforma appen och skriva testerna i Cypress.

## Användarflöden för e2e testning

1. "Lisa letar efter den perfekta presenten, en upplevelse, till sin flickväns födelsedag. Hon väljer en kort kurs inom nattfotografering, för det är något hon tror blir bra. Hon klickar på boka, men hon inser snabbt att man måste ange datum och hon vet inte när det passar . Hon ser en länk med “inte bestämt datum? Köp presentkort istället!” Och tänker att det låter ju perfekt så hon klickar och kommer till ett formulär där hon kan fylla i sina uppgifter, en hälsning till flickvännen och fortsätta till betalning. När betalning är genomförd kommer hon till en bekräftelsesida där hon kan se koden /ladda ner sitt presentkort.​"

2. "Kalle har nyligen blivit singel och letar efter roliga aktiviteter att fylla den nyfunna fritiden med. Han hittar olika nattaktiviteter och tänker att det säkert finns roliga människor som väljer att gå på ett rejv i skogen så han väljer att boka det. Han klickar på boka och kommer till ett formulär för att välja datum, fylla ut sina uppgifter och fortsätta till betalning. När han betalat får han en peppande bekräftelse som hälsar honom välkommen till aktiviteten."

## Köra projektet

Kör `npm install` för att installera dependencies

Publicera databasen med `npm run push`

Seeda sedan databasen med `npm run seed`

Starta utvecklingsservern med `npm run dev`

Öppna en ny terminal och kör `npm test` så startas Cypresstesterna.
