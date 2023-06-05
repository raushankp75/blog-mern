const mongoose = require('mongoose');
require('dotenv').config();

// const cloud_db_url = `mongodb://raushan:raushan@ac-6ufkbyz-shard-00-00.dtsdp7n.mongodb.net:27017,ac-6ufkbyz-shard-00-01.dtsdp7n.mongodb.net:27017,ac-6ufkbyz-shard-00-02.dtsdp7n.mongodb.net:27017/?ssl=true&replicaSet=atlas-o8plw3-shard-0&authSource=admin&retryWrites=true&w=majority`
// const local_db_url = 'mongodb://127.0.0.1:27017/blog'

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database Not Connected : ', err))





    // const Connection = async (username, password) => {
//     const URL = `mongodb://${username}:${password}@ac-6ufkbyz-shard-00-00.dtsdp7n.mongodb.net:27017,ac-6ufkbyz-shard-00-01.dtsdp7n.mongodb.net:27017,ac-6ufkbyz-shard-00-02.dtsdp7n.mongodb.net:27017/?ssl=true&replicaSet=atlas-o8plw3-shard-0&authSource=admin&retryWrites=true&w=majority`;
//     try {
//        await mongoose.connect(URL, { useNewUrlParser: true });
//        console.log('Databse Connected');
//     } catch (error) {
//         console.log('Not Connected to Databse', error);
//     }
// }

// module.exports = Connection;
