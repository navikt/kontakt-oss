import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerelleHenvendelser } from './GenerelleHenvendelser/GenerelleHenvendelser';
import './Forside.less';
import { AndreKontaktpunkter } from './AndreKontaktpunkter/AndreKontaktpunkter';
import Banner from '../Banner/Banner';
import Chatlenke from './Chatlenke/Chatlenke';

export const Forside: FunctionComponent = () => (
    <>
        <Banner tekst="Kontakt NAV – arbeidsgiver" />
        <div className="forside">
            <Chatlenke />
            <GenerelleHenvendelser />
            <AndreKontaktpunkter />
        </div>
    </>
);

export default Forside;
