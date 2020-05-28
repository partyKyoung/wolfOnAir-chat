import mongoose from 'mongoose';

const { Schema } = mongoose;
const roomSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  maxCount: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true
  },
});

export default roomSchema;