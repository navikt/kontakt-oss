import { Besvarelse } from './Kontaktskjema';
import { validerOrgnr } from '../../utils/orgnrUtils';

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
    return !harTommeFelter && validerOrgnr(besvarelse.orgnr);
};
