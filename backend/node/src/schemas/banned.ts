import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BannedSchema = new Schema({
    ip: { type: String, index: true, required: true }
});

const Banned = mongoose.model("Banned", BannedSchema);

export default Banned;