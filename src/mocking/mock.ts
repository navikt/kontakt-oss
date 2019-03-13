import fetchMock from 'fetch-mock';
import { FYLKER_OG_KOMMUNER_PATH } from '../utils/paths';
import fylkesinndeling from './fylkesinndeling.json';

fetchMock.get(FYLKER_OG_KOMMUNER_PATH, fylkesinndeling);