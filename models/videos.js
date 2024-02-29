import { Schema, model, models } from "mongoose";

const VideoSchema = new Schema({
  src: {
    type: String,
  },
});

const Video = models?.Video || model("Video", VideoSchema);

export default Video;
