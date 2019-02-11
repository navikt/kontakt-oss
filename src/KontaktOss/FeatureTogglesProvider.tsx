import * as React from 'react';
import { PILOTFYLKER_TOGGLE_URL } from '../utils/konstanter';

export interface FeatureToggles {
    pilotfylkerFeature: boolean;
}

const defaultFeatureToggles: FeatureToggles = {
    pilotfylkerFeature: false,
};

const FeatureTogglesContext = React.createContext(defaultFeatureToggles);
const FeatureTogglesConsumer = FeatureTogglesContext.Consumer;

export class FeatureTogglesProvider extends React.Component<
    {},
    FeatureToggles
> {
    constructor(props: {}) {
        super(props);
        this.state = defaultFeatureToggles;
    }

    componentDidMount() {
        // Bryr seg ikke om miljø, bare om feature er globalt av eller på
        fetch(PILOTFYLKER_TOGGLE_URL)
            .then(response => {
                console.log('Response', response.json()); // tslint:disable-line no-console
                return response.json();
            })
            .then(json => json['enabled'])
            .then(toggle =>
                this.setState({
                    pilotfylkerFeature: toggle,
                })
            );
    }

    render() {
        return (
            <FeatureTogglesContext.Provider value={this.state}>
                {this.props.children}
            </FeatureTogglesContext.Provider>
        );
    }
}

export function medFeatureToggles<PROPS>(
    Component: React.ComponentType<FeatureToggles & PROPS>
): React.ComponentType<PROPS> {
    return (props: PROPS) => (
        <FeatureTogglesConsumer>
            {(featureToggles: FeatureToggles) => {
                return <Component {...props} {...featureToggles} />;
            }}
        </FeatureTogglesConsumer>
    );
}
