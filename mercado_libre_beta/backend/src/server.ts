import app from './app'
import ENV_CONFIG_PROCESS from './config';
import MongoContainer from './model/containers/mongo.container';
import FirebaseContainer from './model/containers/firebase.container';

const PORT = ENV_CONFIG_PROCESS.PORT || 8080;

const DATASOURCE_BY_ENV:any= {
    mongo: MongoContainer,
    firebase: FirebaseContainer
};


const dataSource = DATASOURCE_BY_ENV[typeof ENV_CONFIG_PROCESS.DATASOURCE];


app.listen(PORT, () => {
    dataSource.connect().then(() => {
        console.log(`Server is up and running on port: `, PORT);
        console.log("Connected to " + ENV_CONFIG_PROCESS.DATASOURCE);
    })
});