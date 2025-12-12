require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const connectDB = require("../utils/db");

// Path to your CSV file
const CSV_FILE_PATH = path.join(__dirname, "../dataset.csv");

const BATCH_SIZE = 5000; // Insert 5000 records at a time

const importData = async () => {
  await connectDB();

  console.log("Clearing old data...");
  await Sale.deleteMany({});
  console.log("Old data cleared. Starting stream import...");

  let batch = [];
  let totalInserted = 0;

  const stream = fs.createReadStream(CSV_FILE_PATH).pipe(csv());

  for await (const row of stream) {
    // 1. Map CSV Row to Schema
    const saleData = {
      customer: {
        id: row["Customer ID"],
        name: row["Customer Name"],
        phone: row["Phone Number"],
        gender: row["Gender"],
        age: parseInt(row["Age"]) || 0,
        region: row["Customer Region"],
        type: row["Customer Type"],
      },
      product: {
        id: row["Product ID"],
        name: row["Product Name"],
        brand: row["Brand"],
        category: row["Product Category"],
        tags: row["Tags"]
          ? row["Tags"].split(",").map((tag) => tag.trim())
          : [],
      },
      sale: {
        quantity: parseInt(row["Quantity"]) || 0,
        pricePerUnit: parseFloat(row["Price per Unit"]) || 0,
        discount: parseFloat(row["Discount Percentage"]) || 0,
        totalAmount: parseFloat(row["Total Amount"]) || 0,
        finalAmount: parseFloat(row["Final Amount"]) || 0,
      },
      operation: {
        date: new Date(row["Date"]),
        paymentMethod: row["Payment Method"],
        orderStatus: row["Order Status"],
        deliveryType: row["Delivery Type"],
        storeId: row["Store ID"],
        storeLocation: row["Store Location"],
        salesPersonId: row["Salesperson ID"],
        employeeName: row["Employee Name"],
      },
    };

    // 2. Add to batch
    batch.push(saleData);

    // 3. If batch is full, insert and clear memory
    if (batch.length >= BATCH_SIZE) {
      await Sale.insertMany(batch);
      totalInserted += batch.length;
      process.stdout.write(`\rInserted: ${totalInserted} records...`); // Update line
      batch = []; // Clear memory
    }
  }

  // 4. Insert any remaining records
  if (batch.length > 0) {
    await Sale.insertMany(batch);
    totalInserted += batch.length;
  }

  console.log(`\n\n✅ IMPORT COMPLETE! Total records: ${totalInserted}`);
  process.exit();
};

importData().catch((err) => {
  console.error("Import Failed:", err);
  process.exit(1);
});
