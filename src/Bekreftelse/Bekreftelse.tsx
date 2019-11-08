import * as React from 'react';
import { FunctionComponent, useEffect } from 'react';
import Bekreftelseboks from './Bekreftelseboks/Bekreftelseboks';
import './Bekreftelse.less';
import { scrollToBanner } from '../utils/scrollUtils';
import Banner from '../Banner/Banner';
import { HvaSkjerVidere } from '../Kontaktskjema/HvaSkjerVidere/HvaSkjerVidere';
import { getTema, TemaType } from '../utils/kontaktskjemaApi';
import { useQueryState } from 'react-router-use-location-state';

const Bekreftelse: FunctionComponent = () => {
    useEffect(() => {
        scrollToBanner();
    });

    const [valgtTemaType] = useQueryState<TemaType | ''>('tema', '');

    return (
        <>
            <Banner tekst="Kontaktskjema – arbeidsgiver" />
            <div
                className="kontaktskjema-bekreftelse"
                data-testid="bekreftelse"
            >
                <div className="kontaktskjema-bekreftelse__innhold">
                    <Bekreftelseboks />
                    <HvaSkjerVidere tema={getTema(valgtTemaType)} />
                </div>
            </div>
        </>
    );
};

export default Bekreftelse;
