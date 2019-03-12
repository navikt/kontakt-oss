import * as React from 'react';
import { FYLKER_OG_KOMMUNER_PATH } from '../utils/paths';

export type Kommuner = {
    fylkesinndeling: any
};
const defaultKommuner: Kommuner = {
    fylkesinndeling: {}
};
const KommuneContext = React.createContext(defaultKommuner);
const KommuneConsumer = KommuneContext.Consumer;

export class KommuneProvider extends React.Component<{}, Kommuner> {
    constructor(props: {}) {
        super(props);
        this.state = defaultKommuner;
    }

    componentDidMount(): void {
        fetch(FYLKER_OG_KOMMUNER_PATH)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState(json);
            });
    }

    render() {
        return (
            <KommuneContext.Provider value={this.state}>
                {this.props.children}
            </KommuneContext.Provider>
        );
    }
}


export function medFeatureToggles<PROPS>(
    Component: React.ComponentType<Kommuner & PROPS>
): React.ComponentType<PROPS> {
    return (props: PROPS) => (
        <KommuneConsumer>
            {(kommuner: Kommuner) => {
                return <Component {...props} {...kommuner} />;
            }}
        </KommuneConsumer>
    );
}
