const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	items: [{ product: { type: Object, ref: "Product", required: true }, quantity: { type: Number, required: true } }],
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Order", orderSchema);
