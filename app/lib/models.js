import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const valuteSchema = new mongoose.Schema(
  {
    valute: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    important: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const News = mongoose.models?.News || mongoose.model("News", newsSchema);
export const Valute =
  mongoose.models?.Valute || mongoose.model("Valute", valuteSchema);
