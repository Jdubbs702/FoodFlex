const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    collation: { locale: "en_US", strength: 1 },
  },
  order: { type: mongoose.Schema.Types.Mixed, required: true },
});


module.exports = mongoose.connection
  .useDb("food_flex", { useCache: true })
  .model("Order", orderSchema);