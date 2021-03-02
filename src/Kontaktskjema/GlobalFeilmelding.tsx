import React, {FunctionComponent, useEffect, useRef} from "react";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {useGlobalFeil} from "../hooks/useGlobalFeil";

export const GlobalFeilmelding: FunctionComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    const {feil} = useGlobalFeil();

    useEffect(() => {
        if (feil !== undefined && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }
    }, [feil]);

    return (feil ? (
        <div ref={ref}>
            <AlertStripeFeil className="kontaktskjema__feilmelding">
                {feil.feilmelding}
            </AlertStripeFeil>
        </div>
    ) : null)
}