const data = [
    {
        name: "Ampalaya",
        type: "crops",
        imgSrc: require('./images/crops/ampalaya.jpg'),
        price: "₱115.00 / kg",
        qty: 15,
        description: "Bitter, nutritious veggie."
    },
    {
        name: "Apple",
        type: "crops",
        imgSrc: require('./images/crops/apple.jpg'),
        price: "₱120.00 / kg",
        qty: 20,
        description: "Sweet, crisp fruit."
    },
    {
        name: "Avocado",
        type: "crops",
        imgSrc: require('./images/crops/avocado.jpg'),
        price: "₱150.00 / kg",
        qty: 20,
        description: "Creamy, nutritious fruit."
    },
    {
        name: "Broccoli",
        type: "crops",
        imgSrc: require('./images/crops/broccoli.png'),
        price: "₱85.00 / kg",
        qty: 20,
        description: "Nutrient-rich green veggie."
    },
    {
        name: "Cabbage",
        type: "crops",
        imgSrc: require('./images/crops/cabbage.jpg'),
        price: "₱60.00 / kg",
        qty: 30,
        description: "Crisp, leafy vegetable."
    },
    {
        name: "Cantaloupe",
        type: "crops",
        imgSrc: require('./images/crops/cantaloupe.jpg'),
        price: "₱130.00 / kg",
        qty: 10,
        description: "Sweet melon fruit."
    },
    {
        name: "Carrot",
        type: "crops",
        imgSrc: require('./images/crops/carrot.jpg'),
        price: "₱85.00 / kg",
        qty: 25,
        description: "Sweet, crunchy root."
    },
    {
        name: "Celery",
        type: "crops",
        imgSrc: require('./images/crops/celery.jpg'),
        price: "₱100.00 / kg",
        qty: 30,
        description: "Crisp, green vegetable."
    },
    {
        name: "Corn",
        type: "crops",
        imgSrc: require('./images/crops/corn.jpg'),
        price: "₱80.00 / kg",
        qty: 20,
        description: "Sweet, golden kernels."
    },
    {
        name: "Cucumber",
        type: "crops",
        imgSrc: require('./images/crops/cucumber.jpg'),
        price: "₱120.00 / kg",
        qty: 20,
        description: "Crisp, refreshing veggie."
    },
    {
        name: "Eggplant",
        type: "crops",
        imgSrc: require('./images/crops/eggplant.jpg'),
        price: "₱110.00 / kg",
        qty: 25,
        description: "Mild, fleshy vegetable."
    },
    {
        name: "Garlic",
        type: "crops",
        imgSrc: require('./images/crops/garlic.jpg'),
        price: "₱380.00 / kg",
        qty: 30,
        description: "Aromatic culinary staple."
    },
    {
        name: "Ginger",
        type: "crops",
        imgSrc: require('./images/crops/ginger.jpg'),
        price: "₱135.00 / kg",
        qty: 25,
        description: "Spicy, flavorful root."
    },
    {
        name: "Grapes",
        type: "crops",
        imgSrc: require('./images/crops/grapes.jpg'),
        price: "₱200.00 / kg",
        qty: 20,
        description: "Sweet, juicy berries."
    },
    {
        name: "Guava",
        type: "crops",
        imgSrc: require('./images/crops/guava.png'),
        price: "₱170.00 / kg",
        qty: 15,
        description: "Tropical, flavorful fruit."
    },
    {
        name: "Hazelnut",
        type: "crops",
        imgSrc: require('./images/crops/hazelnut.jpg'),
        price: "₱300.00 / 250g",
        qty: 10,
        description: "Nutty, crunchy delight."
    },
    {
        name: "Kale",
        type: "crops",
        imgSrc: require('./images/crops/kale.jpg'),
        price: "₱400.00 / 500g",
        qty: 15,
        description: "Nutrient-packed leafy green."
    },
    {
        name: "Lemon",
        type: "crops",
        imgSrc: require('./images/crops/lemon.jpg'),
        price: "₱20.00 / pc",
        qty: 50,
        description: "Zesty, citrus fruit."
    },
    {
        name: "Lettuce",
        type: "crops",
        imgSrc: require('./images/crops/lettuce.jpg'),
        price: "₱120.00 / kg",
        qty: 20,
        description: "Crisp, leafy greens."
    },
    {
        name: "Mango",
        type: "crops",
        imgSrc: require('./images/crops/mango.jpg'),
        price: "₱130.00 / kg",
        qty: 20,
        description: "Sweet, tropical fruit."
    },
    {
        name: "Mushroom",
        type: "crops",
        imgSrc: require('./images/crops/mushroom.jpg'),
        price: "₱220.00 / 250g",
        qty: 15,
        description: "Savory, fungi delight."
    },
    {
        name: "Okra",
        type: "crops",
        imgSrc: require('./images/crops/okra.jpg'),
        price: "₱95.00 / kg",
        qty: 20,
        description: "Mild, green vegetable."
    },
    {
        name: "Onion",
        type: "crops",
        imgSrc: require('./images/crops/onion.jpg'),
        price: "₱120.00 / kg",
        qty: 20,
        description: "Versatile, aromatic bulb."
    },
    {
        name: "Orange",
        type: "crops",
        imgSrc: require('./images/crops/orange.jpg'),
        price: "₱30.00 / pc",
        qty: 50,
        description: "Juicy, citrus fruit."
    },
    {
        name: "Papaya",
        type: "crops",
        imgSrc: require('./images/crops/papaya.jpg'),
        price: "₱35.00 / kg",
        qty: 25,
        description: "Sweet, tropical fruit."
    },
    {
        name: "Pineapple",
        type: "crops",
        imgSrc: require('./images/crops/pineapple.jpg'),
        price: "₱150.00 / kg",
        qty: 15,
        description: "Sweet, tangy fruit."
    },
    {
        name: "Pumpkin",
        type: "crops",
        imgSrc: require('./images/crops/pumpkin.jpg'),
        price: "₱195.00 / pc",
        qty: 30,
        description: "Versatile, orange squash."
    },
    {
        name: "Radish",
        type: "crops",
        imgSrc: require('./images/crops/radish.jpg'),
        price: "₱60.00 / kg",
        qty: 20,
        description: "Crisp, peppery root."
    },
    {
        name: "Spinach",
        type: "crops",
        imgSrc: require('./images/crops/spinach.jpg'),
        price: "₱60.00 / kg",
        qty: 15,
        description: "Nutrient-packed green."
    },
    {
        name: "Tomato",
        type: "crops",
        imgSrc: require('./images/crops/tomato.jpg'),
        price: "₱70.00 / kg",
        qty: 20,
        description: "Juicy, versatile fruit."
    },
    {
        name: "Turnip",
        type: "crops",
        imgSrc: require('./images/crops/turnip.png'),
        price: "₱80.00 / kg",
        qty: 20,
        description: "Crisp, white root."
    },
    {
        name: "Watermelon",
        type: "crops",
        imgSrc: require('./images/crops/watermelon.jpg'),
        price: "₱150.00 / pc",
        qty: 15,
        description: "Sweet, refreshing fruit."
    },
    {
        name: "Eggs",
        type: "poultry",
        imgSrc: require('./images/poultry/eggs.jpg'),
        price: "₱280.00 / tray",
        qty: 15,
        description: "Fresh, farm eggs."
    },
    {
        name: "Milk",
        type: "poultry",
        imgSrc: require('./images/poultry/milk.jpeg'),
        price: "₱200.00 / liter",
        qty: 15,
        description: "Nutrient-rich fresh milk."
    },
];

export default data;
