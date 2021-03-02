import { useContext } from 'react';
import {GlobalFeilContext, GlobalFeilProps} from '../providers/GlobalFeilProvider';

export const useGlobalFeil = (): GlobalFeilProps => {
    const { feil, rapporterFeil, fjernFeil } = useContext(GlobalFeilContext);
    return { feil, rapporterFeil, fjernFeil };
}