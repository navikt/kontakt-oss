import { SEND_KONTAKTSKJEMA_PATH } from './paths';
import { fjernWhitespace } from './stringUtils';
import { Besvarelse } from '../Kontaktskjema/utils/kontaktskjemaUtils';

export enum TemaType {
    Rekruttering = 'REKRUTTERING',
    ForebyggeSykefravær = 'FOREBYGGE_SYKEFRAVÆR',
}

export interface Tema {
    type: TemaType;
    tekst: string;
}

export const temaer: Tema[] = [
    {
        type: TemaType.Rekruttering,
        tekst: 'Jeg vil ha hjelp til å finne ny medarbeider (rekruttering og inkludering)',
    },
    {
        type: TemaType.ForebyggeSykefravær,
        tekst: 'Forebygge sykefravær',
    },
];

export const getTema = (temaType: TemaType): Tema =>
    temaer.find((tema) => tema.type === temaType)!!;

export type BesvarelseBackend = {
    fylkesenhetsnr: string;
    kommune: string;
    kommunenr: string;
    bedriftsnavn: string;
    orgnr: string;
    navn: string;
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
