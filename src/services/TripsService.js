import axios from 'axios'

const TRIPS_REST_API_URL = 'http://localhost:8080/api/v1/trip';

class TripsService {

    getPromTrips() {
        return axios.get(TRIPS_REST_API_URL + "/getPromTrips");
    }

    getWeekly(year) {
        return axios.get(TRIPS_REST_API_URL + "/getWeekly?year=" + year);
    }

    processFile(data) {
        return axios.post(TRIPS_REST_API_URL + "/processTrips", data);
    }

}
export default new TripsService();