import React, {FunctionComponent, useEffect, useRef} from "react";
import {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import {useGlobalFeil} from "../hooks/useGlobalFeil";

export const GlobalFeilmelding: FunctionComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    const {feil} = useGlobalFeil();

    useEffect(() => {
        if (feil !== undefined && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [feil]);

    return (feil ? (
        <div ref={ref}>
            <AlertStripeAdvarsel className="kontaktskjema__feilmelding">
                {feil.feilmelding}
            </AlertStripeAdvarsel>
        </div>
    ) : null)
}