import { MongoClient, ServerApiVersion } from 'mongodb';

//our current IP address (2.84.0.227)
//dimitrisafendras
//fJOqt51hi3rzuKAX

const uri =
  'mongodb+srv://dimitrisafendras:fJOqt51hi3rzuKAX@fullstackcluster0.n6gzocf.mongodb.net/?retryWrites=true&w=majority&appName=FullStackCluster0';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export { connectToDatabase, client };
