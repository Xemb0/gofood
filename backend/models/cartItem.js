const cartItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qut: {
        type: Number,
        default: 1,
    },
    size: {
        type: String,
        required: true,
    }
});
