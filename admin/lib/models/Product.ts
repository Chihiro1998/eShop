import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        media: {
            type: [String],
            required: true,
        },
        category: {
            type: [String],
            required: true,
        },
        collections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Collection",
            },
        ],
        tags: {
            type: [String],
            default: [],
        },
        sizes: {
            type: [String],
            enum: ["XS", "S", "M", "L", "XL"],
            default: [],
        },
        price: {
            type: mongoose.Schema.Types.Decimal128,
            required: true,
            get: (v: mongoose.Schema.Types.Decimal128) => parseFloat(v.toString()),
        },
        expense: {
            type: mongoose.Schema.Types.Decimal128,
            required: true,
            get: (v: mongoose.Schema.Types.Decimal128) => parseFloat(v.toString()),
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: { getters: true, virtuals: true },
        toObject: { virtuals: true },
    }
);

ProductSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

const Product =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
