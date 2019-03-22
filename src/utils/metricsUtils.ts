import { Tema } from './kontaktskjemaApi';

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
export const logSuccess = (tema: Tema) =>
    logEvent('kontakt-oss.success', { tema: mapTilTemaEvent(tema) });
export const logFail = () => logEvent('kontakt-oss.fail');

export const logError = (melding: string) => {
    const logger: Logger = (window as any).frontendlogger;
    if (logger) {
        logger.error(melding);
    }
};

export const mapTilTemaEvent = (tema?: Tema): string => {
    switch (tema) {
        case 'Rekruttering':
            return 'rekruttering';
        case 'Rekruttering med tilrettelegging':
            return 'rekruttering-med-tilrettelegging';
        case 'Arbeidstrening':
            return 'arbeidstrening';
        case 'Oppfølging av en arbeidstaker':
            return 'oppfolging-av-arbeidstaker';
        case 'Annet':
            return 'annet';
        default:
            return 'default';
    }
};
