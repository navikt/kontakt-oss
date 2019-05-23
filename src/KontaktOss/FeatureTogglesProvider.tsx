import * as React from 'react';
import { FOREBYGGE_SYKEFRAVÆR_TOGGLE_PATH } from '../utils/paths';

export interface FeatureToggles {
    forebyggeSykefraværFeature: boolean;
}

const defaultFeatureToggles: FeatureToggles = {
    forebyggeSykefraværFeature: false,
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
        fetch(FOREBYGGE_SYKEFRAVÆR_TOGGLE_PATH)
            .then(response => response.json())
            .then(json => json['enabled'])
            .then(toggle =>
                this.setState({
                    forebyggeSykefraværFeature: toggle,
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
