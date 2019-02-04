interface Logger {
    event: (navn: string, fields: {}, tags: {}) => void;
}

export function log(eventNavn: string, felter?: {}, tags?: {}) {
    const logger: Logger = (window as any) /*tslint:disable-line:no-any*/
        .frontendlogger;
    if (logger) {
        logger.event(eventNavn, felter || {}, tags || {});
    }
}
