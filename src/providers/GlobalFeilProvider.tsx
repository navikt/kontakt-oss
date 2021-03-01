import React, {useState, useCallback, FunctionComponent} from 'react';
import * as Sentry from '@sentry/browser';

interface GlobalFeil {
    feilmelding: String,
    error?: Error,
}

export interface GlobalFeilProps {
    feil?: GlobalFeil,
    rapporterFeil: (feil: GlobalFeil) => void
    fjernFeil: () => void

}

export const GlobalFeilContext = React.createContext<GlobalFeilProps>({
    feil: undefined,
    rapporterFeil: (_: GlobalFeil) => {},
    fjernFeil: () => {}
});


export const GlobalFeilProvider: FunctionComponent = (props) => {
    const [feil, setFeil] = useState<GlobalFeil | undefined>(undefined);

    const fjernFeil = () => setFeil(undefined);

    const rapporterFeil = (feil: GlobalFeil) => {
        if (feil.error) {
            Sentry.captureException(feil.error);
        }

        setFeil(feil)
    };

    const contextValue = {
        feil,
        rapporterFeil: useCallback((feil) => rapporterFeil(feil), []),
        fjernFeil: useCallback(() => fjernFeil(), [])
    };

    return (
        <GlobalFeilContext.Provider value={contextValue}>
            {props.children}
        </GlobalFeilContext.Provider>
    );
}