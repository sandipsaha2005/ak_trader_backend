import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true,
    },
    subDescription: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    shopCode: {
        type: String,
        required: true,
        unique: true,
    },
    open: {
        type: Boolean,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    }
})

export const Store = mongoose.model("Store", storeSchema)