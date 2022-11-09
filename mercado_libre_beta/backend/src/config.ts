import dotenv from 'dotenv';

dotenv.config();

const ENV_CONFIG_PROCESS:any = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    DATASOURCE: process.env.DATASOURCE
};

export default ENV_CONFIG_PROCESS;