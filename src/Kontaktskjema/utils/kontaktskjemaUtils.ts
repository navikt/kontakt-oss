import { sendKontaktskjema, Tema } from '../../utils/kontaktskjemaApi';
import { validerBesvarelse } from './validering';
import { Kommune, tomKommune } from '../../utils/fylker';
import { sendEvent } from '../../amplitude/amplitude';

interface SendInnBesvarelseResultat {
    ok: boolean;
    feilmelding?: string;
}

export interface Besvarelse {
    kommune: Kommune;
    bedriftsnavn: string;
    orgnr: string;
    navn: string;
    epost: string;
    telefonnr: string;
    fylkesenhetsnr: string;
    harSnakketMedAnsattrepresentant?: boolean;
}

export const tomBesvarelse = {
    fylkesenhetsnr: '',
    kommune: tomKommune,
    bedriftsnavn: '',
    orgnr: '',
    navn: '',
    epost: '',
    telefonnr: '',
};
export const validerBesvarelseOgSendInn = async (
    besvarelse: Besvarelse,
    tema: Tema
): Promise<SendInnBesvarelseResultat> => {
    const validering = validerBesvarelse(besvarelse, tema);

    if (validering.ok) {
        const res = await sendKontaktskjema(besvarelse, tema);
        if (res.ok) {
            sendEvent('kontaktskjema', 'sendt inn', {
                tema: tema.type
            });
            return { ok: true };
        }

        sendEvent('kontaktskjema', 'innsendingsfeil', {
            tema: tema.type
        });
        return {
            ok: false,
            feilmelding: 'Noe gikk feil med innsendingen. Vennligst prøv igjen senere.',
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
    navn = 'navn',
    epost = 'epost',
    telefonnr = 'telefonnr',
    fylkesenhetsnr = 'fylkesenhetsnr',
    harSnakketMedAnsattrepresentant = 'harSnakketMedAnsattrepresentant',
}
