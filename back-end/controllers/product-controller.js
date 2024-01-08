import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/HATID')

const Product = mongoose.model('Product', {
	name: String,
	type: String,
	imgSrc: String,
	price: Number,
    units: String,
	qty: Number,
});

const getProducts = async (req, res) => {
	const products = await Product.find({});
	res.send(products)
}

const addProduct = async (req, res) => {
    const { name, type, imgSrc, price, units, qty } = req.body
    
	const newProduct = new Product({ name, type, imgSrc, price, units, qty })

	const result = await newProduct.save()

	if (result._id) {
		res.send({ success: true })
	} else {
		res.send({ success: false })
	}
}

const findProduct = async (req, res) => {

    const temp = await Product.find({ name: req.body.name });
    res.json(temp);
}

export { getProducts, addProduct, findProduct }