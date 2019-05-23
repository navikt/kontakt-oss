import fetchMock from 'fetch-mock';
import {
    FOREBYGGE_SYKEFRAVÆR_TOGGLE_PATH,
    FYLKER_OG_KOMMUNER_PATH,
    SEND_KONTAKTSKJEMA_PATH,
} from '../utils/paths';
import fylkesinndeling from './fylkesinndeling.json';

fetchMock.get(FYLKER_OG_KOMMUNER_PATH, fylkesinndeling);

fetchMock.get(FOREBYGGE_SYKEFRAVÆR_TOGGLE_PATH, {
    enabled: true,
});

fetchMock.post(SEND_KONTAKTSKJEMA_PATH, { status: 200, body: {} });
