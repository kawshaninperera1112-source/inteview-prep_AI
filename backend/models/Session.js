import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  // මේ Session එක අයිති User ව අනිවාර්යයෙන්ම අවශ්‍යයි
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  // Job Role එක (e.g., Node.js Developer)
  role: {
    type: String,
    required: [true, "Role is required"],
    trim: true
  },
  // අත්දැකීම් මට්ටම
  experience: {
    type: String,
    required: [true, "Experience level is required"],
    // enum: ["Intern", "Junior", "Mid-Level", "Senior"] // අවශ්‍ය නම්
  },
  // සාකච්ඡා කළ යුතු මාතෘකා
  topicsToFocus: {
    type: String,
    required: [true, "Topics are required"]
  },
  // කෙටි හැඳින්වීමක්
  description: {
    type: String,
    default: ""
  },
  // මේ Session එකට අදාළ ප්‍රශ්න වල IDs ලැයිස්තුව
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }],
}, { timestamps: true });

// User කෙනෙක්ගේ Sessions ඉක්මනින් සොයා ගැනීමට Index එකක්
sessionSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Session", sessionSchema);
