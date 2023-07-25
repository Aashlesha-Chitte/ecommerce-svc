import * as mongoose from 'mongoose';

export interface IDatabaseConfig {
  mongoUri: string;
  testEnv: boolean;
}

export default class Database {
  public static open({ mongoUri, testEnv }: IDatabaseConfig) {
    // Mock the mongoose for testing purpose using Mockgoose
    // connect to mongo db
    return mongoose.connect(mongoUri)
      .catch((err) => {
       console.error(`Error connecting to database: ${mongoUri} ${JSON.stringify(err)}`);
        throw new Error(`Unable to connect to database: ${mongoUri}`);
      });
  }

  public static close() {
    mongoose.disconnect();
  }
}