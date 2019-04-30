import { validerOrgnr } from '../../utils/orgnrUtils';
import { fjernWhitespace, inneholderKunSifre } from '../../utils/stringUtils';
import { Besvarelse } from './besvarelse';

const isFalsyOrEmpty = (str: string | undefined): boolean => {
    return !str || str === '';
};

export const besvarelseErGyldig = (besvarelse: Besvarelse) => {
    return orgnrOk(besvarelse.orgnr) && paakrevdeFelterErUtfylte(besvarelse);
};

export const paakrevdeFelterErUtfylte = (besvarelse: Besvarelse): boolean => {
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
