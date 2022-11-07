import ENV_CONFIG_PROCESS from "../config";

const db_config = {
    mongodb: {
        URI: ENV_CONFIG_PROCESS.MONGO_URI
    },
    firebase: {
        credetentials: ENV_CONFIG_PROCESS.FIREBASE
    }
}

export default db_config;