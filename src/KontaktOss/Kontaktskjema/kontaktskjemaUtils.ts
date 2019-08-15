import { Besvarelse } from './besvarelse';
import { sendKontaktskjema, Tema } from '../../utils/kontaktskjemaApi';
import { validerBesvarelse } from './validering';
import { logFail, logSendInnKlikk, logSuccess } from '../../utils/metricsUtils';

interface SendInnBesvarelseResultat {
    ok: boolean;
    feilmelding?: string;
}

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
