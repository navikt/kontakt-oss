import { SEND_KONTAKTSKJEMA_PATH } from './paths';
import { fjernWhitespace } from './stringUtils';
import { Besvarelse } from '../KontaktOss/Kontaktskjema/besvarelse';

export enum TemaType {
    Rekruttering = 'REKRUTTERING',
    RekrutteringMedTilrettelegging = 'REKRUTTERING_MED_TILRETTELEGGING',
    Arbeidstrening = 'ARBEIDSTRENING',
    OppfølgingAvEnArbeidstaker = 'OPPFØLGING_AV_EN_ARBEIDSTAKER',
    Annet = 'ANNET',
    ForebyggeSykefravær = 'FOREBYGGE_SYKEFRAVÆR',
}

export interface Tema {
    type: TemaType;
    tekst: string;
}

export const temaer: Tema[] = [
    {
        type: TemaType.Rekruttering,
        tekst: 'Rekruttering',
    },
    {
        type: TemaType.ForebyggeSykefravær,
        tekst: 'Forebygge sykefravær',
    },
    {
        type: TemaType.RekrutteringMedTilrettelegging,
        tekst: 'Rekruttering med tilrettelegging',
    },
    {
        type: TemaType.OppfølgingAvEnArbeidstaker,
        tekst: 'Oppfølging av en arbeidstaker',
    },
    {
        type: TemaType.Arbeidstrening,
        tekst: 'Arbeidstrening',
    },
    {
        type: TemaType.Annet,
        tekst: 'Annet',
    },
];

export const getTema = (temaType: TemaType): Tema => {
    const temaMedRiktigType = temaer.filter(tema => tema.type === temaType);
    if (temaMedRiktigType.length === 1) {
        return temaMedRiktigType[0];
    } else {
        throw "fant ingen tema for type " + temaType;
    }
};

export const erTemaType = (temaType: string) => {
    return Object.values(TemaType).includes(temaType)
};

export type BesvarelseBackend = {
    fylke: string;
    kommune: string;
    kommunenr: string;
    bedriftsnavn: string;
    orgnr: string;
    fornavn: string;
    etternavn: string;
    epost: string;
    telefonnr: string;
    tema: string;
    temaType: TemaType;
};

const oversettTilJson = (besvarelse: Besvarelse, tema: Tema) => {
    const besvarelseBackend: BesvarelseBackend = {
        ...besvarelse,
        orgnr: fjernWhitespace(besvarelse.orgnr),
        kommune: besvarelse.kommune.navn,
        kommunenr: besvarelse.kommune.nummer,
        tema: tema.tekst,
        temaType: tema.type,
    };
    return JSON.stringify(besvarelseBackend);
};

export const sendKontaktskjema = async (besvarelse: Besvarelse, tema: Tema) => {
    return await fetch(SEND_KONTAKTSKJEMA_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: oversettTilJson(besvarelse, tema),
    });
};
