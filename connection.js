import { connect } from 'mongoose';

const connectToDb = async (URL) => {
  try {
    await connect(URL);
  } catch (error) {
    throw new Error(`Error while connecting to db ${error.message}`);
  }
};

export default connectToDb;
