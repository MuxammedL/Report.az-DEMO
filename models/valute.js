import { Schema, model, models } from "mongoose";
const ValuteSchema = new Schema({
  valute: {
    type: String,
  },
});
const Valute = models?.Valute || model("Valute", ValuteSchema);
export default Valute;
