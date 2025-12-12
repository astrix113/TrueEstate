class QueryBuilder {
  constructor(query, queryString) {
    this.query = query; // The Mongoose Query object
    this.queryString = queryString; // The req.query object from Express
  }

  search() {
    const keyword = this.queryString.search
      ? {
          $or: [
            {
              "customer.name": {
                $regex: this.queryString.search,
                $options: "i",
              },
            },
            {
              "customer.phone": {
                $regex: this.queryString.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced Filtering Logic
    let filterQuery = {};

    // 1. Filter by Region (Multi-select support: ?region=North,West)
    if (queryObj.region) {
      const regions = queryObj.region.split(",");
      filterQuery["customer.region"] = { $in: regions };
    }

    // 2. Filter by Gender
    if (queryObj.gender) {
      filterQuery["customer.gender"] = queryObj.gender;
    }

    // 3. Filter by Product Category (Multi-select)
    if (queryObj.category) {
      const categories = queryObj.category.split(",");
      filterQuery["product.category"] = { $in: categories };
    }

    // 4. Filter by Payment Method
    if (queryObj.paymentMethod) {
      const methods = queryObj.paymentMethod.split(",");
      filterQuery["operation.paymentMethod"] = { $in: methods };
    }

    // 5. Filter by Date Range (?startDate=2023-01-01&endDate=2023-12-31)
    if (queryObj.startDate || queryObj.endDate) {
      filterQuery["operation.date"] = {};
      if (queryObj.startDate)
        filterQuery["operation.date"].$gte = new Date(queryObj.startDate);
      if (queryObj.endDate)
        filterQuery["operation.date"].$lte = new Date(queryObj.endDate);
    }

    // 6. Filter by Tags (if a product has ANY of the provided tags)
    if (queryObj.tags) {
      const tags = queryObj.tags.split(",");
      filterQuery["product.tags"] = { $in: tags };
    }

    this.query = this.query.find(filterQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // expected formats: date_desc, quantity_asc, name_asc
      const sortBy = this.queryString.sort.split(",").join(" ");

      let sortStr = "-createdAt"; // default

      if (this.queryString.sort === "date_desc") sortStr = "-operation.date";
      if (this.queryString.sort === "date_asc") sortStr = "operation.date";
      if (this.queryString.sort === "quantity_desc") sortStr = "-sale.quantity";
      if (this.queryString.sort === "quantity_asc") sortStr = "sale.quantity";
      if (this.queryString.sort === "name_asc") sortStr = "customer.name";
      if (this.queryString.sort === "name_desc") sortStr = "-customer.name";

      this.query = this.query.sort(sortStr);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10; // Default 10 items
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = QueryBuilder;
