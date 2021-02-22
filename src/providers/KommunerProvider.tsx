import * as React from 'react';
import { FYLKER_OG_KOMMUNER_PATH } from '../utils/paths';
import { Kommune } from '../utils/fylker';

export type Kommuner = Kommune[];

export type KommunerProps = {
    kommuner: Kommuner;
};

const defaultKommunerProps: KommunerProps = {
    kommuner: [],
};

export const KommunerContext = React.createContext<KommunerProps>(defaultKommunerProps);
const KommunerConsumer = KommunerContext.Consumer;

export class KommunerProvider extends React.Component<{}, KommunerProps> {
    constructor(props: {}) {
        super(props);
        this.state = defaultKommunerProps;
    }

    componentDidMount(): void {
        fetch(FYLKER_OG_KOMMUNER_PATH)
            .then((response) => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((response) => response.json() as Promise<Kommuner>)
            .then(kommuner =>
                    kommuner.sort((kommuneA, kommuneB) =>
                    kommuneA.navn.localeCompare(kommuneB.navn, 'nb-NO')
            ))
            .then((kommuner) => this.setState({ kommuner }));
    }

    render() {
        return (
            <KommunerContext.Provider value={this.state}>
                {this.props.children}
            </KommunerContext.Provider>
        );
    }
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
