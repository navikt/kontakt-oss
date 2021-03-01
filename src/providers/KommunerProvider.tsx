import * as React from 'react';
import { KOMMUNER_PATH } from '../utils/paths';
import { Kommune } from '../utils/fylker';
import {FunctionComponent, useEffect, useState} from "react";
import {useGlobalFeil} from "../hooks/useGlobalFeil";

export type Kommuner = Kommune[];

export type KommunerProps = {
    kommuner: Kommuner;
};

const defaultKommunerProps: KommunerProps = {
    kommuner: [],
};

export const KommunerContext = React.createContext<KommunerProps>(defaultKommunerProps);
const KommunerConsumer = KommunerContext.Consumer;

export const KommunerProvider: FunctionComponent = (props) => {
    const [kommuner, setKommuner] = useState(defaultKommunerProps);
    const {rapporterFeil} = useGlobalFeil();

    useEffect(() => {
        fetch(KOMMUNER_PATH)
            .then((response) => {
                if (response.ok) {
                    return response;
                } else {
                    rapporterFeil({
                        feilmelding: "Henting av kommuner feilet",
                        error: new Error(response.statusText),
                    })
                }
            })
            .then((response) => response?.json() as Promise<Kommuner> || [])
            .then(kommuner =>
                kommuner.sort((kommuneA, kommuneB) =>
                    kommuneA.navn.localeCompare(kommuneB.navn, 'nb-NO')
                ))
            .then((kommuner) => setKommuner({kommuner}));
    }, [rapporterFeil]);

    return (
        <KommunerContext.Provider value={kommuner}>
            {props.children}
        </KommunerContext.Provider>
    )
}

export function medFylkesinndeling<PROPS>(
    Component: React.ComponentType<KommunerProps & PROPS>
): React.ComponentType<PROPS> {
    return (props: PROPS) => (
        <KommunerConsumer>
            {(kommunerProps: KommunerProps) => (
                <Component {...props} {...kommunerProps} />
            )}
        </KommunerConsumer>
    );
}
