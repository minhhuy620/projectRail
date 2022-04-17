import axios from'axios'

const MOVED_REST_API_URL='http://localhost:8080/api/move';
const MOVED2_REST_API_URL='http://localhost:8080/api/move2';
class movedService {
    getMoved(){
        return axios.get(MOVED_REST_API_URL);
        
    }
    getMoved2(){
        return axios.get(MOVED2_REST_API_URL);
        
    }
}

export default new movedService();