import ENV_CONFIG_PROCESS from "../config";
const firebaseConfig:any= require('./firebase/firebase.config.json')

const db_config = {
    mongodb: {
        URI: ENV_CONFIG_PROCESS.MONGO_URI
    },
    firebase: {
        credetentials: firebaseConfig
    }
}

export default db_config;