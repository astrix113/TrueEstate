const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    // Customer Fields
    customer: {
      id: { type: String, required: true },
      name: { type: String, required: true, index: true }, // Indexed for search
      phone: { type: String, required: true },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      age: { type: Number },
      region: { type: String, index: true },
      type: { type: String, default: "Regular" }, // e.g. Premium, Regular
    },

    // Product Fields
    product: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      brand: { type: String },
      category: { type: String, index: true },
      tags: [{ type: String }], // Array of strings for tags
    },

    // Sales Fields
    sale: {
      quantity: { type: Number, required: true },
      pricePerUnit: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      totalAmount: { type: Number, required: true },
      finalAmount: { type: Number, required: true },
    },

    // Operational Fields
    operation: {
      date: { type: Date, required: true, index: true },
      paymentMethod: { type: String, index: true },
      orderStatus: { type: String, default: "Completed" },
      deliveryType: { type: String },
      storeId: { type: String },
      storeLocation: { type: String },
      salesPersonId: { type: String },
      employeeName: { type: String },
    },
  },
  { timestamps: true }
);

// Create text index for full-text search optimization (optional but recommended)
saleSchema.index({ "customer.name": "text", "customer.phone": "text" });

module.exports = mongoose.model("Sale", saleSchema);
