import { SEND_KONTAKTSKJEMA_PATH } from './paths';
import { fjernWhitespace } from './stringUtils';
import { Besvarelse } from '../KontaktOss/Kontaktskjema/besvarelse';

export type Tema =
    | 'Rekruttering'
    | 'Rekruttering med tilrettelegging'
    | 'Arbeidstrening'
    | 'Oppfølging av en arbeidstaker'
    | 'Annet';

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
    tema: Tema;
};

const oversettTilJson = (
    besvarelse: Besvarelse,
    tema: Tema
) => {
    const besvarelseBackend: BesvarelseBackend = {
        ...besvarelse,
        orgnr: fjernWhitespace(besvarelse.orgnr),
        kommune: besvarelse.kommune.navn,
        kommunenr: besvarelse.kommune.nummer,
        tema: tema,
    };
    return JSON.stringify(besvarelseBackend);
};

export const sendKontaktskjema = async (
    besvarelse: Besvarelse,
    tema: Tema
) => {
    const response = await fetch(SEND_KONTAKTSKJEMA_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (oversettTilJson(besvarelse, tema)),
    });
    return await response.json();
};
