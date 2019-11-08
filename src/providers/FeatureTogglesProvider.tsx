import * as React from 'react';
import { featureTogglePath } from '../utils/paths';

export enum FeatureToggle {
}
// f.eks. ForebyggeSykefraværFeature = 'kontakt-oss.forebygge-sykefravaer',

export interface FeatureToggles {
    // f.eks. [FeatureToggle.ForebyggeSykefraværFeature]: boolean;
}

const defaultFeatureToggles: FeatureToggles = {
    // f.eks. [FeatureToggle.ForebyggeSykefraværFeature]: false,
};

export const FeatureTogglesContext = React.createContext<FeatureToggles>(
    defaultFeatureToggles
);

export class FeatureTogglesProvider extends React.Component<
    {},
    FeatureToggles
> {
    constructor(props: {}) {
        super(props);
        this.state = defaultFeatureToggles;
    }

    componentDidMount() {
        const features = Object.values(FeatureToggle);
        if (features.length > 0) {
            fetch(featureTogglePath(features))
                .then(response => response.json())
                .then(toggles => this.setState(toggles as FeatureToggles));
        }
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
        <FeatureTogglesContext.Consumer>
            {(featureToggles: FeatureToggles) => {
                return <Component {...props} {...featureToggles} />;
            }}
        </FeatureTogglesContext.Consumer>
    );
}
