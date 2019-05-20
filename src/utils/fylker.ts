export interface FylkeModell {
    nokkel: string;
    navn: string;
    hrefKontaktliste: string;
}

export interface KommuneModell {
    navn: string;
    nummer: string;
}

const pilotfylkerForKontaktskjema: string[] = [
    '1000', // Agder
    '0400', // Innlandet
    '1800', // Nordland
    '0200', // Øst-Viken
    '0800', // Vestfold og Telemark
    '1200', // Vestland
    '1900', // Troms og Finnmark
    '1500',
    '0300',
    '1100',
    '5700',
    '0600',
];

export const erPilotfylke = (fylke: string): boolean => {
    return pilotfylkerForKontaktskjema.some(pilot => pilot === fylke);
};

// tslint:disable max-line-length
export const fylker: FylkeModell[] = [
    {
        nokkel: '1000',
        navn: 'Agder (Aust- Agder og Vest-Agder)',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/agder/relatert-informasjon/Rekruttering+og+inkludering+i+Agder',
    },
    {
        nokkel: '0400',
        navn: 'Innlandet (Oppland og Hedmark)',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/innlandet/relatert-informasjon/Rekruttering+og+inkludering+i+Innlandet',
    },
    {
        nokkel: '1500',
        navn: 'Møre og Romsdal',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/More+og+Romsdal/Relatert+informasjon/marknadskontaktar-i-m%C3%B8re-og-romsdal',
    },
    {
        nokkel: '1800',
        navn: 'Nordland',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/Nordland/Relatert+innhold/Markedskontakter',
    },
    {
        nokkel: '0300',
        navn: 'Oslo',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/Oslo/Relatert+informasjon/markedskontakter-i-nav-oslo',
    },
    {
        nokkel: '1100',
        navn: 'Rogaland',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/Rogaland/Relatert+informasjon/rekrutteringskontaktar-i-rogaland',
    },
    {
        nokkel: '1900',
        navn: 'Troms og Finnmark',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/troms-og-finnmark/nyttig-%C3%A5-vite/Rekruttering+og+inkludering+i+Troms+og+Finnmark',
    },
    {
        nokkel: '5700',
        navn: 'Trøndelag',
        hrefKontaktliste:
            'https://www.nav.no/531486/Markedsr%C3%A5dgivere+i+S%C3%B8r-Tr%C3%B8ndelag%281%29',
    },
    {
        nokkel: '0800',
        navn: 'Vestfold og Telemark',
        hrefKontaktliste: 'https://www.nav.no/541871/rekrutteringskontakter',
    },
    {
        nokkel: '1200',
        navn: 'Vestland (Sogn og Fjordane og Hordaland)',
        hrefKontaktliste:
            'https://www.nav.no/544947/rekruttering-i-nav-vestland',
    },
    {
        nokkel: '0600',
        navn: 'Vest-Viken (Buskerud, Bærum og Asker)',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/Buskerud/Relatert+informasjon/rekruteringskontakter-i-nav-vest-viken',
    },
    {
        nokkel: '0200',
        navn: 'Øst-Viken (Østfold, Follo og Romerike)',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/ost-viken/relatert-informasjon/Rekruttering+og+inkludering+i+%C3%98st-Viken',
    },
]
    .map(fylke => ({
        ...fylke,
        hrefKontaktliste: fylke.hrefKontaktliste,
    }))
    .sort((a, b) => a.navn.localeCompare(b.navn, 'nb-NO'));

export const getHrefTilKontaktliste = (fylkeNokkel?: string): string => {
    const gjeldendeFylke = fylker.filter(
        fylke => fylke.nokkel === fylkeNokkel
    )[0];
    return gjeldendeFylke ? gjeldendeFylke.hrefKontaktliste : '#';
};

export const getAlfabetiserteKommuner = (
    fylkesinndeling: any,
    fylkeNr?: string
): KommuneModell[] => {
    if (!fylkeNr || !fylkesinndeling[fylkeNr]) {
        return [];
    } else {
        return (fylkesinndeling[fylkeNr] as KommuneModell[]).sort(
            (kommuneA, kommuneB) =>
                kommuneA.navn.localeCompare(kommuneB.navn, 'nb-NO')
        );
    }
};
