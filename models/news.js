import { Schema, model, models } from "mongoose";

const NewsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: [true, "Category is required."],
  },
  sub_category: {
    type: String,
    required: [true, "Sub Category is required."],
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  text: {
    type: String,
    required: [true, "Text is required."],
  },
  important: {
    type: Boolean,
    required: [true, "Important is required."],
  },
  image: {
    type: String,
    required: [true, "Image is required."],
  },
  slug: {
    type: String,
  },
});

const News = models?.News || model("News", NewsSchema);

export default News;
