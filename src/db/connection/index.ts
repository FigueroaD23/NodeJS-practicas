import mongoose from 'mongoose';

export const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI || '')
    }
    catch (error) {
        console.log(error);
    }
}

export const mongoDisconnection = async () => {
    try {
        const mongoDisconnectResponse = await mongoose.connection.close()
        console.log('MongoDB Disconnected', mongoDisconnectResponse);
    }
    catch (error) {
        console.log(error);
    }
}
