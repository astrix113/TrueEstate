const Sale = require("../models/Sale");
const QueryBuilder = require("../utils/queryBuilder");

// @desc    Get All Sales with Search, Filter, Sort, Pagination
// @route   GET /api/sales
// @access  Public
exports.getSales = async (req, res) => {
  try {
    // 1. Initialize Query Builder
    const features = new QueryBuilder(Sale.find(), req.query)
      .search()
      .filter()
      .sort()
      .paginate();

    // 2. Execute Query
    const sales = await features.query;

    // 3. Get total count for pagination (needs a separate query without pagination)
    // Note: For extreme performance on massive datasets, use estimatedDocumentCount,
    // but for filtered counts, we must re-run the filter logic.
    const countQuery = new QueryBuilder(Sale.find(), req.query)
      .search()
      .filter();
    const totalCount = await countQuery.query.countDocuments();

    res.status(200).json({
      status: "success",
      results: sales.length,
      total: totalCount,
      totalPages: Math.ceil(totalCount / (req.query.limit || 10)),
      currentPage: Number(req.query.page) || 1,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// @desc    Create a Sale (Use for seeding or manual entry)
// @route   POST /api/sales
exports.createSale = async (req, res) => {
  try {
    const newSale = await Sale.create(req.body);
    res.status(201).json({
      status: "success",
      data: newSale,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// @desc    Get Unique Filter Values (For Frontend Dropdowns)
// @route   GET /api/sales/filters
exports.getFilterValues = async (req, res) => {
  try {
    const regions = await Sale.distinct("customer.region");
    const categories = await Sale.distinct("product.category");
    const paymentMethods = await Sale.distinct("operation.paymentMethod");

    res.status(200).json({
      status: "success",
      data: {
        regions,
        categories,
        paymentMethods,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
