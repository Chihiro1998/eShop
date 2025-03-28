import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema(
    {
        productID: {
            type: String,
            required: true,
        },

        quantity:{
            type: Number,
            default: 1,

        },

        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
);

const CartSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        products: [CartProductSchema]


    },
);

CartSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

const Cart =
    mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
