import { NyFylkesinndelingType } from '../KontaktOss/FylkesinndelingProvider';

export interface Fylke {
    nokkel: string;
    navn: string;
    hrefKontaktliste: string;
}

export interface Kommune {
    navn: string;
    nummer: string;
}

export const tomKommune = {
    navn: '',
    nummer: '',
};

export const getKommune = (
    kommunenr: string,
    fylkesinndeling: NyFylkesinndelingType
): Kommune => {
    const kommunerMedRiktigNummer = Object.values(fylkesinndeling)
        .flat()
        .filter((kommune: Kommune) => kommune.nummer === kommunenr);
    if (kommunerMedRiktigNummer.length === 1) {
        return kommunerMedRiktigNummer[0];
    } else {
        return tomKommune;
    }
};

// tslint:disable max-line-length
export const fylker: Fylke[] = [
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
        hrefKontaktliste:
            'https://www.nav.no/no/Lokalt/vestfold-og-telemark/relatert-informasjon/markedskontakter',
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
): Kommune[] => {
    if (!fylkeNr || !fylkesinndeling || !fylkesinndeling[fylkeNr]) {
        return [];
    } else {
        return (fylkesinndeling[fylkeNr] as Kommune[]).sort(
            (kommuneA, kommuneB) =>
                kommuneA.navn.localeCompare(kommuneB.navn, 'nb-NO')
        );
    }
};
