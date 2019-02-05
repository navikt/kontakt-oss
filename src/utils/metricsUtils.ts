interface Logger {
    event: (navn: string, fields: {}, tags: {}) => void;
    error: (melding: string) => void;
}

export function logEvent(eventNavn: string, felter?: {}, tags?: {}) {
    const logger: Logger = (window as any).frontendlogger;
    if (logger) {
        logger.event(eventNavn, felter || {}, tags || {});
    }
}

export function logError(melding: string) {
    const logger: Logger = (window as any).frontendlogger;
    if (logger) {
        logger.error(melding);
    }
}
