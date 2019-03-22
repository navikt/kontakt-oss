import * as React from 'react';
import { FYLKER_OG_KOMMUNER_PATH } from '../utils/paths';

export type Fylkesinndeling = {
    fylkesinndeling: any;
};
const defaultKommuner: Fylkesinndeling = {
    fylkesinndeling: undefined,
};
const FylkesinndelingContext = React.createContext(defaultKommuner);
const FylkesinndelingConsumer = FylkesinndelingContext.Consumer;

export class FylkesinndelingProvider extends React.Component<
    {},
    Fylkesinndeling
> {
    constructor(props: {}) {
        super(props);
        this.state = defaultKommuner;
    }

    componentDidMount(): void {
        fetch(FYLKER_OG_KOMMUNER_PATH)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(response => response.json())
            .then(json => this.setState({ fylkesinndeling: json }));
    }

    render() {
        return (
            <FylkesinndelingContext.Provider value={this.state}>
                {this.props.children}
            </FylkesinndelingContext.Provider>
        );
    }
}

export function medFylkesinndeling<PROPS>(
    Component: React.ComponentType<Fylkesinndeling & PROPS>
): React.ComponentType<PROPS> {
    return (props: PROPS) => (
        <FylkesinndelingConsumer>
            {(fylkesinndeling: Fylkesinndeling) => (
                <Component {...props} {...fylkesinndeling} />
            )}
        </FylkesinndelingConsumer>
    );
}
