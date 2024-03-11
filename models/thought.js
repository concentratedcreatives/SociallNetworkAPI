const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, get: timestamp => new Date(timestamp).toLocaleString() }
});

const thoughtSchema = new Schema({
  thoughtText: { 
    type: String, 
    required: true,
    minlength: [1, 'Thought must be at least 1 character long'],
    maxlength: [280, 'Thought cannot exceed 280 characters']
  },
  createdAt: { type: Date, default: Date.now, get: timestamp => new Date(timestamp).toLocaleString() },
  username: { type: String, required: true },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
