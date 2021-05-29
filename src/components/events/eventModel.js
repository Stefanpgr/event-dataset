/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

const actorSchema = mongoose.Schema({
  id: { type: Number, required: '{PATH} is required' },
  login: { type: String, required: '{PATH} is required' },
  avatar_url: { type: String },
}, { _id: false })

const repoSchema = mongoose.Schema({
  id: { type: Number, required: '{PATH} is required' },
  name: { type: String, required: '{PATH} is required' },
  url: { type: String, required: '{PATH} is required' },
}, { _id: false })

const EventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: '{PATH} is required',
  },
  type: {
    type: String,
    required: '{PATH} is required',
  },
  actor: actorSchema,
  repo: repoSchema,
  created_at: { type: Date, required: '{PATH} is required' },
});

EventSchema.methods.toJSON = function () {
  const obj = this.toObject()

  delete obj._id
  delete obj.version
  return obj
}

EventSchema.set('versionKey', 'version')
EventSchema.plugin(updateIfCurrentPlugin) // trows error when a field is being updated concurrently

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
