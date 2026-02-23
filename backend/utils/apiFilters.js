class APIFilters {
    constructor(query, queryStr) {
        this.query = query;       // Product.find()
        this.queryStr = queryStr; // req.query
    }

    search() {
        if (this.queryStr.keyword) {
            this.query = this.query.find({
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                }
            });
        }

        return this;
    }

    filters() {
        const queryCopy = { ...this.queryStr };

        // Remove special fields
        const removeFields = ["keyword", "page"];
        removeFields.forEach(field => delete queryCopy[field]);

        // Convert query object to string
        let queryStr = JSON.stringify(queryCopy);

        // Replace operators (gte → $gte)
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            match => `$${match}`
        );

        // Convert back to object
        const parsedQuery = JSON.parse(queryStr);

        this.query = this.query.find(parsedQuery);

        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);

        return this;


    }
}

export default APIFilters;
