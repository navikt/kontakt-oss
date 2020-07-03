import * as React from 'react';
import { FYLKER_OG_KOMMUNER_PATH } from '../utils/paths';
import { Kommune } from '../utils/fylker';

export type Fylkesinndeling = { [fylkenr: string]: Kommune[] };

export type FylkesinndelingProps = {
    fylkesinndeling: Fylkesinndeling;
};

const defaultFylkesinndeling: FylkesinndelingProps = {
    fylkesinndeling: {},
};
const FylkesinndelingContext = React.createContext<FylkesinndelingProps>(defaultFylkesinndeling);
const FylkesinndelingConsumer = FylkesinndelingContext.Consumer;

export class FylkesinndelingProvider extends React.Component<{}, FylkesinndelingProps> {
    constructor(props: {}) {
        super(props);
        this.state = defaultFylkesinndeling;
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
            .then((response) => response.json())
            .then((json) => this.setState({ fylkesinndeling: json }));
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
    Component: React.ComponentType<FylkesinndelingProps & PROPS>
): React.ComponentType<PROPS> {
    return (props: PROPS) => (
        <FylkesinndelingConsumer>
            {(fylkesinndeling: FylkesinndelingProps) => (
                <Component {...props} {...fylkesinndeling} />
            )}
        </FylkesinndelingConsumer>
    );
}
