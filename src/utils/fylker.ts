import { kommuner } from './kommuner';
import { BASE_PATH } from './paths';

export interface FylkeModell {
    nokkel: string;
    navn: string;
    hrefKontaktliste: string;
    hrefKontaktskjema: string;
}

export interface KommuneModell {
    navn: string;
    nummer: string;
}

export const pilotfylkerForKontaktskjema: string[] = [
    'nordland',
    'agder',
    'ost-viken',
    'vestfold-og-telemark',
];

// tslint:disable max-line-length
export const fylker: FylkeModell[] = [
    {
        nokkel: 'agder',
        navn: 'Agder (Aust- Agder og Vest-Agder)',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/agder/relatert-informasjon/Rekruttering+og+inkludering+i+Agder',
    },
    {
        nokkel: 'innlandet',
        navn: 'Innlandet (Oppland og Hedmark)',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/innlandet/relatert-informasjon/Rekruttering+og+inkludering+i+Innlandet',
    },
    {
        nokkel: 'more-og-romsdal',
        navn: 'Møre og Romsdal',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/More+og+Romsdal/Relatert+informasjon/marknadskontaktar-i-m%C3%B8re-og-romsdal',
    },
    {
        nokkel: 'nordland',
        navn: 'Nordland',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/Nordland/Relatert+innhold/Markedskontakter',
    },
    {
        nokkel: 'oslo',
        navn: 'Oslo',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/Oslo/Relatert+informasjon/markedskontakter-i-nav-oslo',
    },
    {
        nokkel: 'rogaland',
        navn: 'Rogaland',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/Rogaland/Relatert+informasjon/rekrutteringskontaktar-i-rogaland',
    },
    {
        nokkel: 'troms-og-finnmark',
        navn: 'Troms og Finnmark',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/troms-og-finnmark/nyttig-%C3%A5-vite/Rekruttering+og+inkludering+i+Troms+og+Finnmark',
    },
    {
        nokkel: 'trondelag',
        navn: 'Trøndelag',
        hrefKontaktliste:
            'https://www.nav.no/531486/Markedsr%C3%A5dgivere+i+S%C3%B8r-Tr%C3%B8ndelag%281%29',
    },
    {
        nokkel: 'vestfold-og-telemark',
        navn: 'Vestfold og Telemark',
        hrefKontaktliste: 'https://www.nav.no/541871/rekrutteringskontakter',
    },
    {
        nokkel: 'vestland',
        navn: 'Vestland (Sogn og Fjordane og Hordaland)',
        hrefKontaktliste:
            'https://www.nav.no/544947/rekruttering-i-nav-vestland',
    },
    {
        nokkel: 'vest-viken',
        navn: 'Vest-Viken (Buskerud, Bærum og Asker)',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/Buskerud/Relatert+informasjon/rekruteringskontakter-i-nav-vest-viken',
    },
    {
        nokkel: 'ost-viken',
        navn: 'Øst-Viken (Østfold, Follo og Romerike)',
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/ost-viken/relatert-informasjon/Rekruttering+og+inkludering+i+%C3%98st-Viken',
    },
]
    .map(fylke => ({
        ...fylke,
        hrefKontaktliste: fylke.hrefKontaktliste,
        hrefKontaktskjema: `${BASE_PATH}/${fylke.nokkel}`,
    }))
    .sort((a, b) => a.navn.localeCompare(b.navn, 'nb-NO'));

export const getHrefTilKontaktliste = (fylkeNokkel?: string): string => {
    const gjeldendeFylke = fylker.filter(
        fylke => fylke.nokkel === fylkeNokkel
    )[0];
    return gjeldendeFylke ? gjeldendeFylke.hrefKontaktliste : '#';
};

export const getAlfabetiserteKommuner = (
    fylkeNokkel?: string
): KommuneModell[] => {
    if (!fylkeNokkel || !kommuner[fylkeNokkel]) {
        return [];
    } else {
        return (kommuner[fylkeNokkel] as KommuneModell[]).sort(
            (kommuneA, kommuneB) =>
                kommuneA.navn.localeCompare(kommuneB.navn, 'nb-NO')
        );
    }
};
