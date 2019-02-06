import * as React from 'react';

export interface FeatureToggles {
    kontaktskjemaForPilotfylker: boolean;
}

const defaultFeatureToggles: FeatureToggles = {
    kontaktskjemaForPilotfylker: false,
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
        this.setState({ kontaktskjemaForPilotfylker: true });
        // TODO: Legg til Unleash
        // fetch(
        //     UNLEASH_URL +
        //         '?feature=veiviserarbeidsgiver-inkluderingsknapp' +
        //         '&feature=veiviserarbeidsgiver-kontaktskjema'
        // )
        //     .then(response => response.json())
        //     .then(value =>
        //         this.setState({
        //             kontaktskjemaForPilotfylker:
        //                 value['veiviserarbeidsgiver-kontaktskjema'],
        //         })
        //     );
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
