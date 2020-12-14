Frontend for "Kontakt oss"-siden til arbeidsgivere
================

Appen gir arbeidsgivere en oversikt over hvordan de kan komme i kontakt med NAV. 
Hoveddelen av appen består av én av disse mulighetene, nemlig kontaktskjema for arbeidsgivere.
Her kan arbeidsgivere si at de vil at NAV skal kontakte dem om et gitt tema.

# Komme i gang

- Installere avhengigheter: `yarn`
- Kjøre applikasjon med mock: `yarn mock`
- Kjøre applikasjonen normalt: `yarn start` (NB! Krever at appen `kontakt-oss-api` kjører på port 8080)
- Bygge applikasjonen: `yarn build`
- Kjøre applikasjonen med Node-backend:
    1. `yarn install && yarn build`
    2. `yarn install-server`
    3. `yarn serve`
- Kjøre applikasjonen med Docker:
    1. `yarn install && yarn build`
    2. `docker build -t kontakt-oss .`
    3. `docker run -d -p 3000:3000 kontakt-oss`
    4. For å stoppe, kjør `docker stop <id>` med id-en fra forrige kommando

---

### Lenker til applikasjon 

- https://arbeidsgiver.nav.no/kontakt-oss 
- fra `utviklerImage` https://arbeidsgiver-q.nav.no/kontakt-oss  

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

* Thomas Dufourd, thomas.dufourd@nav.no
* Lars Andreas Tveiten, lars.andreas.van.woensel.kooy.tveiten@nav.no
* Malaz Alkoj, malaz.alkoj@nav.no

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #arbeidsgiver-teamia.
