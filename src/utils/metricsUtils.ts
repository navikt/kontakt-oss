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
    if (!tema) {
        return 'default';
    }
    switch (tema.type) {
        case TemaType.REKRUTTERING:
            return 'rekruttering';
        case TemaType.REKRUTTERING_MED_TILRETTELEGGING:
            return 'rekruttering-med-tilrettelegging';
        case TemaType.ARBEIDSTRENING:
            return 'arbeidstrening';
        case TemaType.OPPFØLGING_AV_EN_ARBEIDSTAKER:
            return 'oppfolging-av-arbeidstaker';
        case TemaType.ANNET:
            return 'annet';
        default:
            return 'default';
    }
};
