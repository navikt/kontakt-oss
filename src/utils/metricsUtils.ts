import { Tema, TemaType } from './kontaktskjemaApi';

interface Logger {
    event: (navn: string, fields: {}, tags: {}) => void;
    error: (melding: string) => void;
}

export const logEvent = (eventNavn: string, felter?: {}, tags?: {}) => {
    const logger: Logger = (window as any).frontendlogger;
    if (logger) {
        logger.event(eventNavn, felter || {}, tags || {});
    }
};

export const logSendInnKlikk = () => logEvent('kontakt-oss.send-inn-klikk');
export const logSuccess = (tema: Tema, fjernValgfrittFraOrgnrToggle: boolean) => {
    logEvent('kontakt-oss.success', {
        tema: mapTilTemaEvent(tema),
        fjernValgfrittFraOrgnrToggle,
    });
};
export const logFail = () => logEvent('kontakt-oss.fail');

export const logError = (melding: string) => {
    const logger: Logger = (window as any).frontendlogger;
    if (logger) {
        logger.error(melding);
    }
};

export const mapTilTemaEvent = (tema?: Tema): string => {
    if (!tema) {
        return 'default';
    }
    switch (tema.type) {
        case TemaType.Rekruttering:
            return 'rekruttering';
        case TemaType.RekrutteringMedTilrettelegging:
            return 'rekruttering-med-tilrettelegging';
        case TemaType.Arbeidstrening:
            return 'arbeidstrening';
        case TemaType.OppfølgingAvEnArbeidstaker:
            return 'oppfolging-av-arbeidstaker';
        case TemaType.Annet:
            return 'annet';
        default:
            return 'default';
    }
};
