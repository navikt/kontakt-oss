import { Besvarelse } from './besvarelse';
import { sendKontaktskjema, Tema } from '../../utils/kontaktskjemaApi';
import {
    besvarelseErGyldig,
    felterErGyldige,
    paakrevdeFelterErUtfylte,
} from './validering';
import { logFail, logSendInnKlikk, logSuccess } from '../../utils/metricsUtils';

export interface SendInnBesvarelseResultat {
    ok: boolean;
    feilmelding?: string;
}

export const validerBesvarelseOgSendInn = async (
    besvarelse: Besvarelse,
    tema: Tema
): Promise<SendInnBesvarelseResultat> => {
    if (besvarelseErGyldig(besvarelse)) {
        logSendInnKlikk();

        try {
            await sendKontaktskjema(besvarelse, tema);
            logSuccess(tema);
            return { ok: true };
        } catch (error) {
            logFail();
            return {
                ok: false,
                feilmelding:
                    'Noe gikk feil med innsendingen. Vennligst prøv igjen senere.',
            };
        }
    } else {
        let feilmelding;
        if (!paakrevdeFelterErUtfylte(besvarelse)) {
            feilmelding = 'Du må fylle ut alle feltene for å sende inn.';
        } else if (!felterErGyldige(besvarelse)) {
            feilmelding = 'Ett eller flere av feltene er ikke fylt ut riktig.';
        } else {
            feilmelding = 'Besvarelsen er ikke gyldig.';
        }
        return {
            ok: false,
            feilmelding,
        };
    }
};
