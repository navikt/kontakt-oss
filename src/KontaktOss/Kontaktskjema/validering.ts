import { Besvarelse } from './Kontaktskjema';
import { fjernWhitespace } from '../../utils/stringUtils';

const isFalsyOrEmpty = (str: string | undefined): boolean => {
    return !str || str === '';
};

export const besvarelseErGyldig = (besvarelse: Besvarelse): boolean => {
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
    return !harTommeFelter && orgnrOk(besvarelse.orgnr);
};

export const orgnrOk = (orgnr: string): boolean => {
    orgnr = fjernWhitespace(orgnr);
    if (orgnr.length === 0) {
        return true;
    }
    return /^\d{9}$/.test(orgnr);
};
