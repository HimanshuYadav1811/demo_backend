import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    duration: {
      type: String, // e.g. "6 Months", "40 Hours"
      default: ""
    },

    ageLimit: {
      type: String, // e.g. "18+"
      default: ""
    },

    certificate: {
      type: Boolean,
      default: false
    },

    requirements: {
      type: [String],
      default: []
    },

    courseFeatures: {
      type: [String],
      default: []
    },

    isFeature: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
