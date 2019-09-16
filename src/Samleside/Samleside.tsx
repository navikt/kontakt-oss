import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerelleHenvendelser } from './GenerelleHenvendelser/GenerelleHenvendelser';
import './Samleside.less';

export const Samleside: FunctionComponent = props => {
    return (
        <div className="samleside">
            <GenerelleHenvendelser />
        </div>
    );
};
