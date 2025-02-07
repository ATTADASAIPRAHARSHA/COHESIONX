import { MongoClient } from 'mongodb';

let client;
let db;

const connectToDatabase = async () => {
  if (client) return { client, db }; 

  // Connect to MongoDB
  client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  db = client.db('COHESIONX');  
  return { client, db };
};

export { connectToDatabase };
