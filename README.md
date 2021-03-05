# Frontend for "Kontakt oss"-siden til arbeidsgivere

Appen gir arbeidsgivere en oversikt over hvordan de kan komme i kontakt med NAV. 
Hoveddelen av appen består av én av disse mulighetene, nemlig kontaktskjema for arbeidsgivere.
Her kan arbeidsgivere si at de vil at NAV skal kontakte dem om et gitt tema.

## Komme i gang

- Installere avhengigheter: `yarn`
- Kjøre applikasjonen normalt: `yarn start` (NB! Krever at backend kjører på port 8080)
- Kjøre applikasjon med mock: `yarn start:mock` eller `yarn start:mock:win` på windows
- Bygge applikasjonen: `yarn build`
- Kjøre applikasjonen med Node-backend:
    1. `yarn install && yarn build`
    2. `cd server`
    3. `npm i && npm start`
- Kjøre applikasjonen med Docker:
    1. `yarn && yarn build`
    2. `yarn docker:build`
    3. `yarn docker:start`
    4. For å stoppe, kjør `docker stop <id>` med id-en fra forrige kommando

---

## Henvendelser
Spørsmål knyttet til koden eller prosjektet kan opprettes som github issues.
Eller for genereller spørsmål sjekk commit log for personer som aktivt jobber med koden.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #arbeidsgiver-min-side-arbeidsgiver.

### Lenker til applikasjon

dev: https://arbeidsgiver-q.nav.no/kontakt-oss (i vdi, eller over vpn)
prod: https://arbeidsgiver.nav.no/kontakt-oss
logs: https://logs.adeo.no/app/dashboards#/view/754c72d0-76d8-11eb-90cb-7315dfb7dea6
