import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: [true, "Session ID is required"]
  },
  question: {
    type: String,
    required: [true, "Question text is required"],
    trim: true
  },
  answer: {
    type: String,
    required: [true, "Answer text is required"],
    trim: true
  },
  note: {
    type: String,
    default: ""
  },
  isPinned: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

questionSchema.index({ session: 1 });

export default mongoose.model("Question", questionSchema);
