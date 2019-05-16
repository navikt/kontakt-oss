import { KommuneModell } from '../../utils/fylker';

export interface Besvarelse {
    kommune: KommuneModell;
    bedriftsnavn: string;
    orgnr: string;
    fornavn: string;
    etternavn: string;
    epost: string;
    telefonnr: string;
    fylke: string;
    kontaktMedAnsattrepresentant?: boolean;
}

export const tomBesvarelse = {
    fylke: '',
    kommune: { navn: '', nummer: '' },
    bedriftsnavn: '',
    orgnr: '',
    fornavn: '',
    etternavn: '',
    epost: '',
    telefonnr: '',
};
