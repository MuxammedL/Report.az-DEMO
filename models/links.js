import { Schema, model, models } from "mongoose";

const LinkSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  sub_categories: {
    type: Array,
  },
});

const Link = models?.Link || model("Link", LinkSchema);

export default Link;
