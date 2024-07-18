import mongoose, { ConnectOptions } from 'mongoose';

//our current IP address (2.84.0.227)
//dimitrisafendras
//fJOqt51hi3rzuKAX

const uri =
  'mongodb+srv://dimitrisafendras:fJOqt51hi3rzuKAX@fullstackcluster0.n6gzocf.mongodb.net/?retryWrites=true&w=majority&appName=FullStackCluster0';

export const connectToDatabase = async () => {
  try {
    const options: ConnectOptions = {
      dbName: 'sample_mflix',
    };

    await mongoose.connect(uri, options);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
