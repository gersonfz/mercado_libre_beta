import ENV_CONFIG_PROCESS from "../config";
const serviceAccount:any = require('./firebase/firebase.config.json')

const db_config:any = {
    mongodb: {
        URI: ENV_CONFIG_PROCESS.MONGO_URI
    },
    firebase: {
        credetentials: serviceAccount 
    }
}

export default db_config;