import mongoose from 'mongoose';
import { env } from '../config/env';

export async function connectToMongo() {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(env.urlConnect || "")
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error)
    }
}