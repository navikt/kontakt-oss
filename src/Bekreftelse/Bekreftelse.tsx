import React, {FunctionComponent, useEffect} from 'react';
import {useQueryState} from 'react-router-use-location-state';
import Bekreftelseboks from './Bekreftelseboks/Bekreftelseboks';
import {scrollToBanner} from '../utils/scrollUtils';
import Banner from '../Banner/Banner';
import {HvaSkjerVidere} from '../Kontaktskjema/HvaSkjerVidere/HvaSkjerVidere';
import {getTema, TemaType} from '../utils/kontaktskjemaApi';
import Brodsmulesti from '../Brodsmulesti/Brodsmulesti';
import './Bekreftelse.less';

const Bekreftelse: FunctionComponent = () => {
    useEffect(() => {
        scrollToBanner();
    }, []);

    const [valgtTemaType] = useQueryState<TemaType>('tema', TemaType.Rekruttering);

    return (
        <>
            <Brodsmulesti brodsmuler={[{url: '/kontaktskjema', title: 'Kontaktskjema', handleInApp: true}]} />
            <Banner tekst="Kontaktskjema – arbeidsgiver" />
            <div className="kontaktskjema-bekreftelse" data-testid="bekreftelse">
                <div className="kontaktskjema-bekreftelse__innhold">
                    <Bekreftelseboks />
                    <HvaSkjerVidere tema={getTema(valgtTemaType)} />
                </div>
            </div>
        </>
    );
};

export default Bekreftelse;
