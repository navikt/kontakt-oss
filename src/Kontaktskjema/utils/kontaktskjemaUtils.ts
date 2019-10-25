import { sendKontaktskjema, Tema } from '../../utils/kontaktskjemaApi';
import { validerBesvarelse } from './validering';
import { logFail, logSendInnKlikk, logSuccess } from '../../utils/metricsUtils';
import { Kommune, tomKommune } from '../../utils/fylker';

interface SendInnBesvarelseResultat {
    ok: boolean;
    feilmelding?: string;
}

export interface Besvarelse {
    kommune: Kommune;
    bedriftsnavn: string;
    orgnr: string;
    fornavn: string;
    etternavn: string;
    epost: string;
    telefonnr: string;
    fylke: string;
    harSnakketMedAnsattrepresentant?: boolean;
}

export const tomBesvarelse = {
    fylke: '',
    kommune: tomKommune,
    bedriftsnavn: '',
    orgnr: '',
    fornavn: '',
    etternavn: '',
    epost: '',
    telefonnr: '',
};
export const validerBesvarelseOgSendInn = async (
    besvarelse: Besvarelse,
    tema: Tema
): Promise<SendInnBesvarelseResultat> => {
    const validering = validerBesvarelse(besvarelse, tema);

    if (validering.ok) {
        logSendInnKlikk();

        const res = await sendKontaktskjema(besvarelse, tema);
        if (res.ok) {
            logSuccess(tema);
            return { ok: true };
        }

        logFail();
        return {
            ok: false,
            feilmelding:
                'Noe gikk feil med innsendingen. Vennligst prøv igjen senere.',
        };
    } else {
        return {
            ok: false,
            feilmelding: validering.feilmelding,
        };
    }
};

export enum SkjemaFelt {
    kommune = 'kommune',
    bedriftsnavn = 'bedriftsnavn',
    orgnr = 'orgnr',
    fornavn = 'fornavn',
    etternavn = 'etternavn',
    epost = 'epost',
    telefonnr = 'telefonnr',
    fylke = 'fylke',
    harSnakketMedAnsattrepresentant = 'harSnakketMedAnsattrepresentant',
}