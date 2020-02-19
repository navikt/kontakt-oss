import { Fylkesinndeling } from '../providers/FylkesinndelingProvider';

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
    fylkesinndeling: Fylkesinndeling
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
            'https://www.nav.no/no/lokalt/agder/relatert-informasjon/rekruttering-og-inkludering-i-agder',
    },
    {
        nokkel: '0400',
        navn: 'Innlandet (Oppland og Hedmark)',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/innlandet/nyheter/rekruttering-og-inkludering-i-innlandet',
    },
    {
        nokkel: '1500',
        navn: 'Møre og Romsdal',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/more-og-romsdal/relatert-informasjon/marknadskontaktar-i-more-og-romsdal',
    },
    {
        nokkel: '1800',
        navn: 'Nordland',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/nordland/relatert-innhold/markedskontakter',
    },
    {
        nokkel: '0300',
        navn: 'Oslo',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/oslo/relatert-informasjon/markedskontakter-i-nav-oslo',
    },
    {
        nokkel: '1100',
        navn: 'Rogaland',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/rogaland/relatert-informasjon/rekrutteringskontaktar-i-rogaland',
    },
    {
        nokkel: '1900',
        navn: 'Troms og Finnmark',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/troms-og-finnmark/nyttig-a%CC%8A-vite/rekruttering-og-inkludering-i-troms-og-finnmark',
    },
    {
        nokkel: '5700',
        navn: 'Trøndelag',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/trondelag/relatert-informasjon/markedsradgivere-i-sor-trondelag1',
    },
    {
        nokkel: '0800',
        navn: 'Vestfold og Telemark',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/vestfold-og-telemark/relatert-informasjon/markedskontakter',
    },
    {
        nokkel: '1200',
        navn: 'Vestland (Sogn og Fjordane og Hordaland)',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/vestland/relatert-informasjon/rekruttering-i-nav-vestland',
    },
    {
        nokkel: '0600',
        navn: 'Vest-Viken (Buskerud, Bærum og Asker)',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/vest-viken/relatert-informasjon/rekruteringskontakter-i-nav-vest-viken',
    },
    {
        nokkel: '0200',
        navn: 'Øst-Viken (Østfold, Follo og Romerike)',
        hrefKontaktliste:
            'https://www.nav.no/no/lokalt/ost-viken/relatert-informasjon/rekruttering-og-inkludering-i-ost-viken',
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
