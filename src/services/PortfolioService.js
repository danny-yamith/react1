import axios from 'axios'

const PORTFOLIOS_REST_API_URL = 'http://localhost:8080/api/v1/portfolio';

class PortfolioService {

    getPortfolios() {
        return axios.get(PORTFOLIOS_REST_API_URL);
    }

    createPortfolio(portfolio) {
        return axios.post(PORTFOLIOS_REST_API_URL, portfolio);
    }

    updatePortfolio(portfolio) {
        return axios.put(PORTFOLIOS_REST_API_URL, portfolio);
    }

    getTimesLines(userName) {
        return axios.get(PORTFOLIOS_REST_API_URL + "/getTimeLines?user=" + userName);
    }

}
export default new PortfolioService();