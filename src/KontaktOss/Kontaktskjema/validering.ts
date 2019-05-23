import { validerOrgnr } from '../../utils/orgnrUtils';
import { fjernWhitespace, inneholderKunSifre } from '../../utils/stringUtils';
import { Besvarelse } from './besvarelse';
import { Tema, TemaType } from '../../utils/kontaktskjemaApi';

const isFalsyOrEmpty = (str: string | undefined): boolean => {
    return !str || str === '';
};

interface ValideringResultat {
    ok: boolean;
    feilmelding?: string;
}

export const validerBesvarelse = (
    besvarelse: Besvarelse,
    tema: Tema
): ValideringResultat => {
    let feilmelding;
    if (!paakrevdeFelterErUtfylte(besvarelse, tema)) {
        feilmelding = 'Du må fylle ut alle feltene for å sende inn.';
    } else if (!felterErGyldige(besvarelse)) {
        feilmelding = 'Ett eller flere av feltene er ikke fylt ut riktig.';
    } else {
        return { ok: true };
    }

    return {
        ok: false,
        feilmelding,
    };
};

export const felterErGyldige = (besvarelse: Besvarelse) =>
    orgnrOk(besvarelse.orgnr) &&
    telefonnummerOk(besvarelse.telefonnr) &&
    epostOk(besvarelse.epost);

export const paakrevdeFelterErUtfylte = (
    besvarelse: Besvarelse,
    tema: Tema
): boolean => {
    if (
        tema.type === TemaType.ForebyggeSykefravær &&
        besvarelse.harSnakketMedAnsattrepresentant === undefined
    ) {
        return false;
    }
    const harTommeFelter: boolean =
        !besvarelse ||
        !besvarelse.kommune ||
        isFalsyOrEmpty(besvarelse.kommune.navn) ||
        isFalsyOrEmpty(besvarelse.kommune.nummer) ||
        isFalsyOrEmpty(besvarelse.bedriftsnavn) ||
        isFalsyOrEmpty(besvarelse.epost) ||
        isFalsyOrEmpty(besvarelse.etternavn) ||
        isFalsyOrEmpty(besvarelse.fornavn) ||
        isFalsyOrEmpty(besvarelse.telefonnr);
    return !harTommeFelter;
};

export const orgnrOk = (orgnr?: string): boolean => {
    if (!orgnr) {
        return true;
    }

    orgnr = fjernWhitespace(orgnr);
    if (orgnr.length == 0) {
        return true;
    }

    return validerOrgnr(orgnr);
};

export const telefonnummerOk = (telefonnummer: string = ''): boolean => {
    telefonnummer = fjernWhitespace(telefonnummer);

    if (telefonnummer.length === 0) {
        return false;
    }

    if (telefonnummer[0] === '+') {
        telefonnummer = telefonnummer.substring(1);
    }

    return inneholderKunSifre(telefonnummer);
};

export const epostOk = (epost: string = ''): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost);
