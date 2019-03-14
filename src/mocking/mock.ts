import fetchMock from 'fetch-mock';
import { FYLKER_OG_KOMMUNER_PATH, PILOTFYLKER_TOGGLE_PATH } from '../utils/paths';
import fylkesinndeling from './fylkesinndeling.json';

fetchMock.get(FYLKER_OG_KOMMUNER_PATH, fylkesinndeling);

fetchMock.get(PILOTFYLKER_TOGGLE_PATH, {
    enabled: false
});