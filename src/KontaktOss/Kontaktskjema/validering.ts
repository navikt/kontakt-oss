import { Besvarelse } from './Kontaktskjema';

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
    orgnr = orgnr.replace(/ /g, '');
    console.log('orgnr', orgnr); // tslint:disable-line no-console

    if (orgnr.length === 0) {
        return true;
    }

    const inneholderBareTall = RegExp(/^[0-9]+$/).test(orgnr);
    const inneholderNiTegn = orgnr.length <= 9;

    return inneholderBareTall && inneholderNiTegn;
};
