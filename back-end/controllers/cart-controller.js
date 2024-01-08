import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/HATID')

const Cart = mongoose.model('cartdata', {
    email: String,
    products: [
        {
            name: String,
            type: String,
            imgSrc: String,
            price: Number,
            units: String,
            qty: Number,
        }
    ]
});

const getCarts = async (req, res) => {
	const carts = await Cart.find({});
	res.send(carts)
}

const addCartItem = async (req, res) => {
    const { name, type, imgSrc, price, units, qty } = req.body
    
	const newProduct = new Product({ name, type, imgSrc, price, units, qty })

	const result = await newProduct.save()

	if (result._id) {
		res.send({ success: true })
	} else {
		res.send({ success: false })
	}
}

export { getCarts, addCartItem }