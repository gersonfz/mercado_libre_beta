import dotenv from 'dotenv';

dotenv.config();

const ENV_CONFIG_PROCESS = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    FIREBASE: process.env.FIREBASE,
    DATASOURCE: process.env.DATASOURCE
};

export default ENV_CONFIG_PROCESS;