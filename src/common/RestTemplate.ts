import axios from 'axios';

const RestTemplate=  axios.create(
                    {
                        baseURL: "http://138.2.95.114:8080",
                        headers: {
                        "Content-type": "application/json"
                        }
                    });
   

export default RestTemplate;
