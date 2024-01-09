import axios from "axios";
import settings from './configurationSettings.json';

export default axios.create({
    baseURL: settings.apiUrl
});