import * as React from 'react';
import { featureTogglePath } from '../utils/paths';

export enum FeatureToggle {
    ForebyggeSykefraværFeature = 'kontakt-oss.forebygge-sykefravaer',
    FjernValgfrittFraOrgnr = 'kontakt-oss.fjern-valgfritt-fra-orgnr',
}

export interface FeatureToggles {
    [FeatureToggle.ForebyggeSykefraværFeature]: boolean;
    [FeatureToggle.FjernValgfrittFraOrgnr]: boolean;
}

const defaultFeatureToggles: FeatureToggles = {
    [FeatureToggle.ForebyggeSykefraværFeature]: false,
    [FeatureToggle.FjernValgfrittFraOrgnr]: false,
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
        const features = Object.keys(FeatureToggle).map(
            key => FeatureToggle[key as any]
        );
        fetch(featureTogglePath(features))
            .then(response => response.json())
            .then(toggles => this.setState(toggles as FeatureToggles));
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
