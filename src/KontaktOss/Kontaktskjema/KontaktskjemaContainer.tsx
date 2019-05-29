import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SkjemaFelt } from './FellesFelter/FellesFelter';
import { Tema, TemaType } from '../../utils/kontaktskjemaApi';
import './Kontaktskjema.less';
import { BEKREFTELSE_PATH } from '../../utils/paths';
import { Besvarelse, tomBesvarelse } from './besvarelse';
import { validerBesvarelseOgSendInn } from './kontaktskjemaUtils';
import KontaktskjemaSykefravær from './KontaktskjemaSykefravær/KontaktskjemaSykefravær';
import KontaktskjemaStandard from './KontaktskjemaStandard';
import {
    FeatureToggle,
    FeatureToggles,
    medFeatureToggles,
} from '../FeatureTogglesProvider';

export interface KontaktskjemaProps {
    oppdaterBesvarelse: (felt: SkjemaFelt, feltverdi: string | boolean) => void;
    besvarelse: Besvarelse;
    feilmelding?: string;
    sendInnOnClick: (event: any) => Promise<void>;
    tema: Tema;
}

interface State {
    besvarelse: Besvarelse;
    feilmelding?: string;
    senderInn: boolean;
}

interface OwnProps {
    tema: Tema;
}

type Props = RouteComponentProps & OwnProps;

class KontaktskjemaContainer extends React.Component<
    Props & FeatureToggles,
    State
> {
    state: State = {
        besvarelse: tomBesvarelse,
        senderInn: false,
    };

    oppdaterBesvarelse = (felt: SkjemaFelt, feltverdi: string | boolean) => {
        this.setState(
            {
                besvarelse: { ...this.state.besvarelse, [felt]: feltverdi },
            },
            this.fjernFeilmeldinger
        );
    };

    fjernFeilmeldinger = () => {
        this.setState({
            feilmelding: undefined,
        });
    };

    sendInnOnClick = async (event: any): Promise<void> => {
        event.preventDefault();

        if (this.state.senderInn) {
            return;
        } else {
            this.setState({ senderInn: true });
        }

        const sendInnResultat = await validerBesvarelseOgSendInn(
            this.state.besvarelse,
            this.props.tema,
            this.props[FeatureToggle.FjernValgfrittFraOrgnr]
        );

        if (sendInnResultat.ok) {
            this.props.history.push(BEKREFTELSE_PATH);
        } else {
            this.setState({
                feilmelding: sendInnResultat.feilmelding,
                senderInn: false,
            });
        }
    };

    render() {
        const kontaktskjemaProps: KontaktskjemaProps = {
            sendInnOnClick: this.sendInnOnClick,
            besvarelse: this.state.besvarelse,
            feilmelding: this.state.feilmelding,
            oppdaterBesvarelse: this.oppdaterBesvarelse,
            tema: this.props.tema,
        };

        if (this.props.tema.type === TemaType.ForebyggeSykefravær) {
            return <KontaktskjemaSykefravær {...kontaktskjemaProps} />;
        } else {
            return <KontaktskjemaStandard {...kontaktskjemaProps} />;
        }
    }
}

export default medFeatureToggles(KontaktskjemaContainer);
