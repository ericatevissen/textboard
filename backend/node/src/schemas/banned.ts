import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BannedSchema = new Schema(
    {
        ip: String
    }
);

const Banned = mongoose.model("Banned", BannedSchema);

export default Banned;