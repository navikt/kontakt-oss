import React, { FunctionComponent, ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Panel from 'nav-frontend-paneler';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Element, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';

import Banner from '../Banner/Banner';
import { FeatureToggles, medFeatureToggles } from '../providers/FeatureTogglesProvider';
import { sendEvent } from '../amplitude/amplitude';
import Brodsmulesti from '../Brodsmulesti/Brodsmulesti';
import { FYLKESVELGER_PATH, KONTAKTSKJEMA_PATH } from '../utils/paths';

import { ReactComponent as SnakkeboblerIllustrasjon } from './Illustrasjoner/snakkebobler.svg';
import { ReactComponent as SkjemaIllustrasjon } from './Illustrasjoner/utklippstavlen.svg';
import { ReactComponent as TelefonIllustrasjon } from './Illustrasjoner/telefon.svg';
import { ReactComponent as Person1Illustrasjon } from './Illustrasjoner/person1.svg';
import { ReactComponent as Person2Illustrasjon } from './Illustrasjoner/person2.svg';
import { ReactComponent as Person3Illustrasjon } from './Illustrasjoner/person3.svg';

import './Forside.less';

const ARBEIDSGIVER_TLF = "55 55 33 36"
const ARBEIDSGIVER_TLF_URL = `tlf:+47${ARBEIDSGIVER_TLF.replace(/ /g, "")}`

export const Forside: FunctionComponent<FeatureToggles> = () => {
    useEffect(() => {
        sendEvent('forside', 'vist');
    });

    return (
        <>
            <Brodsmulesti brodsmuler={[]} />
            <Banner tekst="Kontakt NAV – arbeidsgiver" />

            <div className="forside">
                <LenkepanelBase href="https://www.nav.no/person/kontakt-oss/chat/arbeidsgiver" border>
                    <Panelinnhold
                        illustrasjon={SnakkeboblerIllustrasjon}
                        overskrift="Spørsmål om permittering i forbindelse med koronaviruset?"
                        beskrivelse="Chat med NAV"
                    />
                </LenkepanelBase>

                <LenkepanelBase href="kontaktskjema" border>
                    <Panelinnhold
                        illustrasjon={SkjemaIllustrasjon}
                        overskrift="Få hjelp fra NAV med rekruttering eller inkludering"
                        beskrivelse="Send en henvendelse"
                    />
                </LenkepanelBase>

                <Panel border>
                    <Panelinnhold
                        illustrasjon={TelefonIllustrasjon}
                        overskrift="Ring arbeidsgivertelefonen"
                        beskrivelse="Generell informasjon, status i en sak og veiledning i selvbetjente løsninger."
                        ekstra={<>
                            <a
                                href={ARBEIDSGIVER_TLF_URL}
                                className="typo-innholdstittel arbeidsgivertelefonen__tlf"
                            >
                                {ARBEIDSGIVER_TLF}
                            </a>
                            <Normaltekst>Kl. 09.00–15.00 (hverdager)</Normaltekst>
                        </>}
                    />
                </Panel>

                <div className="andre-kontaktpunkter">
                    <Kort
                        illustrasjon={Person1Illustrasjon}
                        overskrift="Rekruttere og inkludere"
                        beskrivelse={`
                            Vurderer du å rekruttere og inkludere nye medarbeidere? Har du spørsmål om tiltak og
                            tilrettelegging? Ta kontakt med oss for en uforpliktende prat.
                    `}>
                        <ReactLenke to={KONTAKTSKJEMA_PATH}> Send en henvendelse </ReactLenke>
                        <ReactLenke to={FYLKESVELGER_PATH}> Ring en markedskontakt </ReactLenke>
                        <RingArbeidsgiverLenke/>
                    </Kort>

                    <Kort
                        illustrasjon={Person2Illustrasjon}
                        overskrift="Følge opp en medarbeider"
                        beskrivelse="Gjelder henvendelsen din en medarbeider? Arbeidsgivertelefonen kan hjelpe deg videre."
                    >
                        <RingArbeidsgiverLenke />
                    </Kort>

                    <Kort
                        illustrasjon={Person3Illustrasjon}
                        overskrift="Forebygge sykefravær"
                        beskrivelse={`
                            Trenger du hjelp til å forebygge sykefravær eller frafall i virksomheten din?
                            Arbeidslivssentrene gir råd og samarbeider om inkludering på arbeidsplassen.
                        `}
                    >
                        <ReactLenke to={KONTAKTSKJEMA_PATH + '?tema=FOREBYGGE_SYKEFRAVÆR'}>
                            Send en henvendelse
                        </ReactLenke>
                        <RingArbeidsgiverLenke />
                    </Kort>
                </div>
            </div>
        </>
    );
};

interface PanelinnholdProps {
    illustrasjon: FunctionComponent;
    overskrift: string;
    beskrivelse: string;
    ekstra?: ReactNode;
}

const Panelinnhold: FunctionComponent<PanelinnholdProps> = props => {
    return <div className="kontakt-oss-panel">
        <div className="kontakt-oss-panel__ikon">
            <props.illustrasjon />
        </div>
        <div className="kontakt-oss-panel__middle">
            <Systemtittel className="kontakt-oss-panel__tittel" tag="h2">
                {props.overskrift}
            </Systemtittel>
            <Normaltekst>
                {props.beskrivelse}
            </Normaltekst>
        </div>
        <div className="kontakt-oss-panel__right">
            {props.ekstra}
        </div>
    </div>
};

interface KortProps {
    illustrasjon: FunctionComponent;
    overskrift: string;
    beskrivelse: string;
}

const Kort: FunctionComponent<KortProps> = props => {
    return <div className="kontaktpunkt-tema">
        <div className="kontaktpunkt-tema__illustrasjon">
            <props.illustrasjon />
        </div>
        <Undertittel tag="h2" className="blokk-xs kontaktpunkt-tema__tittel">
            {props.overskrift}
        </Undertittel>
        <Normaltekst className="blokk-xs">
            {props.beskrivelse}
        </Normaltekst>
        <Element tag="p" className="blokk-xs">Kontakt oss:</Element>
        {props.children}
    </div>
};

const ReactLenke: FunctionComponent<{to: string}> = ({to, children}) =>
    <Link to={to} className="kontaktpunkt-tema__lenke">
        {children}
    </Link>;

const RingArbeidsgiverLenke = () =>
    <a href={ARBEIDSGIVER_TLF_URL} className="kontaktpunkt-tema__lenke">
        Ring arbeidsgivertelefonen
    </a>;

export default medFeatureToggles(Forside);
