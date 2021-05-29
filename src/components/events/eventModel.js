/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

const EventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  actor: { type: Object, required: true },
  repo: { type: Object, required: true },
  created_at: { type: Date, required: true },
});

EventSchema.methods.toJSON = function () {
  const obj = this.toObject()

  delete obj._id
  delete obj.version
  return obj
}

EventSchema.set('versionKey', 'version')
EventSchema.plugin(updateIfCurrentPlugin)

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
