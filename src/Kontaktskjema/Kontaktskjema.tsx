import * as React from 'react';
import { FunctionComponent } from 'react';
import { RadioPanel } from 'nav-frontend-skjema';

// TODO TAG.826 Fjern "nytt" i navnet
const NyttKontaktskjema: FunctionComponent = () => {
    return (
        <>
            <div> kontaktksjema </div>
            <RadioPanel
                checked={false}
                name="alternativ"
                onChange={() => {}}
                label="en knapp"
                value="en knapp"
            />
            <RadioPanel
                checked={false}
                name="alternativ"
                onChange={() => {}}
                label="en knapp"
                value="en knapp"
            />
        </>
    );
};

export default NyttKontaktskjema;
