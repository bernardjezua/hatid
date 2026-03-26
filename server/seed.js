import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  // Seeds & Crops (10)
  {
    name: "Guyabano Seeds",
    description: "Freshly harvested guyabano, locally grown and organic.",
    price: 80,
    imageUrl: "https://m.media-amazon.com/images/I/81Hjn5nFIIL.jpg",
    stockQuantity: 95,
    category: "Seeds & Crops",
    vendor: "Local Farmer Coop"
  },
  {
    name: "Native White Corn (Per Kilo)",
    description: "Freshly harvested corn, locally grown and organic.",
    price: 80,
    imageUrl: "https://pindotlang.com/cdn/shop/products/IMG_20181128_133343.jpg?v=1610710092&width=1920",
    stockQuantity: 95,
    category: "Seeds & Crops",
    vendor: "Local Farmer Coop"
  },
  {
    name: "Tomato Seedlings",
    description: "Ready-to-plant tomato seedlings in nursery pots. High survival rate.",
    price: 35,
    imageUrl: "https://greengarden.ph/cdn/shop/files/1711520953792.jpg?v=1711520962",
    stockQuantity: 500,
    category: "Seeds & Crops",
    vendor: "East-West Seed"
  },
  {
    name: "Eggplant Seedlings",
    description: "Sturdy eggplant seedlings, ready for transplanting. Disease resistant.",
    price: 65,
    imageUrl: "https://harvesttotable.com/wp-content/uploads/2022/03/Eggplant-seedlings-bigstock-Eggplant-Seedling-Sprouts-On-T-361446109-1024x683.jpg",
    stockQuantity: 300,
    category: "Seeds & Crops",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Bell Pepper Seeds",
    description: "Mixed bell pepper seeds for various colors. Easy to grow.",
    price: 95,
    imageUrl: "https://www.homegrown-peppers.com/wp-content/uploads/2020/05/Grocery-Store-Pepper-Seeds.jpg",
    stockQuantity: 250,
    category: "Seeds & Crops",
    vendor: "Bureau of Plant Industry"
  },
  {
    name: "Kangkong (Per Bundle)",
    description: "Freshly harvested upland kangkong, locally grown and organic.",
    price: 20,
    imageUrl: "https://bagsakanbyedds.com/cdn/shop/products/ce19f9b8-9d93-4a90-a33f-a3efb45b902f_1021x.png?v=1598616664",
    stockQuantity: 1000,
    category: "Seeds & Crops",
    vendor: "Local Farmer Coop"
  },
  {
    name: "Pechay (Per Bundle)",
    description: "Crispy green pechay leaves, perfect for stir-fry and soup.",
    price: 30,
    imageUrl: "https://pindotlang.com/cdn/shop/products/pechay_e9a9e8f9-d6c0-4d6e-8298-9095fc167e51.jpg?v=1610703170",
    stockQuantity: 800,
    category: "Seeds & Crops",
    vendor: "Baguio Sun-Dried"
  },
  {
    name: "Papaya Seedlings",
    description: "Sweet papaya variety seedlings, ready for garden or field planting.",
    price: 85,
    imageUrl: "https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-111081136/111081136.jpg",
    stockQuantity: 150,
    category: "Seeds & Crops",
    vendor: "Tropical Seeds Co"
  },
  {
    name: "Snap Bean Seeds",
    description: "Stringless green bean seeds. High production.",
    price: 110,
    imageUrl: "https://www.adaptiveseeds.com/wp-content/uploads/2014/12/Bean-Pole-Scalzo-3.jpg",
    stockQuantity: 400,
    category: "Seeds & Crops",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Ampalaya (Per Kilo)",
    description: "Large, bitter gourd fruits harvested daily from the farm.",
    price: 120,
    imageUrl: "https://pindotlang.com/cdn/shop/products/ampalaya_57b907fd-9daa-4205-ae21-caf123c1999e.jpg?v=1643933599&width=1024",
    stockQuantity: 350,
    category: "Seeds & Crops",
    vendor: "PhilRice"
  },

  // Organic Fertilizers (10)
  {
    name: "Vermicompost",
    description: "Organic fertilizer from earthworm castings.",
    price: 350,
    imageUrl: "https://homegrown.extension.ncsu.edu/wp-content/uploads/2019/09/Composting-Vermicomposting-makes-your-garden-grow_NC-State-Extension_Homegrown.jpg",
    stockQuantity: 200,
    category: "Organic Fertilizers",
    vendor: "Green Earth Mindanao"
  },
  {
    name: "Seaweed Extract",
    description: "Natural growth stimulant for fruits and leaves.",
    price: 850,
    imageUrl: "https://www.agrifarming.in/wp-content/uploads/2022/10/Seaweed-Extract-Uses-in-Agriculture6.jpg",
    stockQuantity: 30,
    category: "Organic Fertilizers",
    vendor: "Agri-Aqua Solutions"
  },
  {
    name: "Bone Meal",
    description: "Phosphorus source for root development.",
    price: 280,
    imageUrl: "https://frankiafertilizers.com/wp-content/uploads/2021/03/bone_meal_pile.jpg",
    stockQuantity: 100,
    category: "Organic Fertilizers",
    vendor: "Bio-Organic Ph"
  },
  {
    name: "Chicken Manure",
    description: "Rich organic fertilizer in pelletized form.",
    price: 420,
    imageUrl: "https://drearth.com/wp-content/uploads/chicken-manure-iStock-1222751574.jpg",
    stockQuantity: 150,
    category: "Organic Fertilizers",
    vendor: "Poultry King"
  },
  {
    name: "Bat Guano",
    description: "Natural minerals for soil rejuvenation.",
    price: 550,
    imageUrl: "https://bunny-wp-pullzone-xllypyhf2j.b-cdn.net/wp-content/uploads/2017/01/high-nitrogen-bat-guano-at-walts-organic-fertilizers-1.jpg",
    stockQuantity: 80,
    category: "Organic Fertilizers",
    vendor: "Caves Harvest"
  },
  {
    name: "Fish Amino Acid",
    description: "Fermented fish juice for nitrogen boost.",
    price: 150,
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5f98f0cf5c8e5f0409c204f4/1625503857223-AT1UIR525WL38RKL9R9J/Screen+Shot+2021-07-02+at+4.32.54+PM.png",
    stockQuantity: 60,
    category: "Organic Fertilizers",
    vendor: "Coastal Agri"
  },
  {
    name: "Bokashi Bran",
    description: "Active microbes for indoor composting.",
    price: 220,
    imageUrl: "https://cdn.shopify.com/s/files/1/0433/2578/4221/files/How_Much_Bokashi_Bran.jpg?v=1602688767",
    stockQuantity: 400,
    category: "Organic Fertilizers",
    vendor: "Home Bloom"
  },
  {
    name: "Potassium Humate",
    description: "Soil conditioner for nutrient uptake.",
    price: 680,
    imageUrl: "https://5.imimg.com/data5/KG/SG/MY-16998878/super-potassium-humate-500x500.jpg",
    stockQuantity: 120,
    category: "Organic Fertilizers",
    vendor: "Agri-Aqua Solutions"
  },
  {
    name: "Calcium Phosphate",
    description: "Calcium and Phosphorus spray for plants.",
    price: 190,
    imageUrl: "https://img.lazcdn.com/g/p/0019953add07e9a27e6432db4b03cb47.png_960x960q80.png_.webp",
    stockQuantity: 200,
    category: "Organic Fertilizers",
    vendor: "Green Earth Mindanao"
  },
  {
    name: "Alfalfa Meal",
    description: "Organic fertilizer for plants.",
    price: 190,
    imageUrl: "https://m.media-amazon.com/images/I/61YKLVmTP8L._AC_UF1000,1000_QL80_.jpg",
    stockQuantity: 200,
    category: "Organic Fertilizers",
    vendor: "Green Earth Mindanao"
  },

  // Heavy Machinery (10)
  {
    name: "Hand Tractor",
    description: "7HP diesel engine power tiller for plowing.",
    price: 45000,
    imageUrl: "https://www.yantailansu.com/uploads/202130757/15hp-farm-tractor27338392307.jpg",
    stockQuantity: 5,
    category: "Heavy Machinery",
    vendor: "Kubota Philippines"
  },
  {
    name: "Rice Thresher",
    description: "Efficient rice thresher for small farms.",
    price: 28000,
    imageUrl: "https://rcef.philmech.gov.ph/resources/machines/actual/thresher.png",
    stockQuantity: 3,
    category: "Heavy Machinery",
    vendor: "PhilMech"
  },
  {
    name: "Corn Sheller",
    description: "Automatic corn sheller with 1 ton/hr capacity.",
    price: 15000,
    imageUrl: "https://www.shellermachine.com/wp-content/uploads/2021/12/movable-maize-sheller-machine.jpg",
    stockQuantity: 2,
    category: "Heavy Machinery",
    vendor: "Agri-Mach Ph"
  },
  {
    name: "Mist Blower",
    description: "Mist blower sprayer for orchards and fields.",
    price: 12500,
    imageUrl: "https://mistblower.ph/wp-content/uploads/2019/10/FOG.jpg",
    stockQuantity: 15,
    category: "Heavy Machinery",
    vendor: "Bureau of Plant Industry"
  },
  {
    name: "Solar Water Pump",
    description: "Solar powered irrigation pump for remote farms.",
    price: 18500,
    imageUrl: "https://i0.wp.com/solarquarter.com/wp-content/uploads/2022/10/15-5.png?fit=1200%2C675&ssl=1",
    stockQuantity: 8,
    category: "Heavy Machinery",
    vendor: "Sun-Agri Solar"
  },
  {
    name: "Disc Plow",
    description: "Standard disc plow attachment for tillers.",
    price: 6500,
    imageUrl: "https://rcef.philmech.gov.ph/resources/machines/actual/2024/4WDTimplement_pto.png",
    stockQuantity: 20,
    category: "Heavy Machinery",
    vendor: "Local Implements Ph"
  },
  {
    name: "Diesel Generator",
    description: "Backup power generator for farm machinery.",
    price: 24000,
    imageUrl: "https://toolssavvy.ph/cdn/shop/files/diesel_d9b56997-3986-4016-81ca-4236e15e4512.jpg?v=1770689099",
    stockQuantity: 4,
    category: "Heavy Machinery",
    vendor: "Power-Gen Ph"
  },
  {
    name: "Grass Cutter",
    description: "Grass cutter for field paths and orchards.",
    price: 5000,
    imageUrl: "https://clkmakita.ph/wp-content/uploads/2022/09/XGT_UR012G-AP1.png",
    stockQuantity: 25,
    category: "Heavy Machinery",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Forage Chopper",
    description: "Shreds stalks and grasses for livestock feed.",
    price: 15500,
    imageUrl: "https://img.lazcdn.com/g/ff/kf/Sa76774d604f94cde90977bdd11de0dbdD.jpg_720x720q80.jpg",
    stockQuantity: 6,
    category: "Heavy Machinery",
    vendor: "PhilMech"
  },
  {
    name: "Hydraulic Jack",
    description: "Heavy duty jack for machinery repairs.",
    price: 4500,
    imageUrl: "https://www.wadfowstore.com/cdn/shop/files/WHJ1520_35cf1765-f9c7-4e57-b1b4-409073c9593e.jpg?v=1756965857",
    stockQuantity: 12,
    category: "Heavy Machinery",
    vendor: "Kubota Philippines"
  },

  // Livestock Feed (10)
  {
    name: "Hog Starter",
    description: "Nutritious feed for piglets.",
    price: 1450,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI6YTOa0Wf9Kqez_YTSejJNDijcra8MeK6RQ&s",
    stockQuantity: 50,
    category: "Livestock Feed",
    vendor: "B-Meg Philippines"
  },
  {
    name: "Feed Crumble",
    description: "Feed for poultry egg production.",
    price: 12000,
    imageUrl: "https://s.alicdn.com/@sc04/kf/H82168fc8c7ee4557973e314dd37b5d9b7/Animal-Pellet-Feed-Mill-Machine-with-3-Head-Roller-Feed-Crumble-Machine.jpg",
    stockQuantity: 75,
    category: "Livestock Feed",
    vendor: "Purina PH"
  },
  {
    name: "Duck Pellets (Per Kilo)",
    description: "Formulated feed for laying ducks.",
    price: 115,
    imageUrl: "https://img.lazcdn.com/g/p/6ac19bf12838bda23bd18033c9c0ecd6.jpg_720x720q80.jpg",
    stockQuantity: 40,
    category: "Livestock Feed",
    vendor: "Purina PH"
  },
  {
    name: "Goat Feed (Per Kilo)",
    description: "High-fiber feed for dairy and meat goats.",
    price: 250,
    imageUrl: "https://www.alphaagventure.com/wp-content/uploads/2025/02/Buy-Rumsol-Goat-Maintenance-Feed-Pellet-for-Sale-from-Alpha-Agventure-Farms-800x650-v1.png",
    stockQuantity: 30,
    category: "Livestock Feed",
    vendor: "Local Livestock Ph"
  },
  {
    name: "Fish Pellets (Per Kilo)",
    description: "Floating pellets for tilapia and bangus.",
    price: 200,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51KDnQe7zVL.jpg",
    stockQuantity: 100,
    category: "Livestock Feed",
    vendor: "Agri-Aqua Solutions"
  },
  {
    name: "Rabbit Pellets (Per Kilo)",
    description: "Standard feed for healthy rabbits.",
    price: 120,
    imageUrl: "https://www.pilmico.com/wp-content/uploads/2023/10/Pilmico_Rabbit_Feeding_Blog.jpg",
    stockQuantity: 60,
    category: "Livestock Feed",
    vendor: "B-Meg Philippines"
  },
  {
    name: "Cattle Mix (Per Kilo)",
    description: "Feed mix for beef cattle growth.",
    price: 350,
    imageUrl: "https://riversfamilyfarm.com/wp-content/uploads/2024/12/make-organic-feed-for-dairy-cows.1-1024x1024.jpg",
    stockQuantity: 20,
    category: "Livestock Feed",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Gamefowl Feed (Per Kilo)",
    description: "Premium grain mix for gamefowls.",
    price: 250,
    imageUrl: "https://leachgrain.com/wp-content/uploads/2018/09/mix-poultry-high-octane-800px.jpg",
    stockQuantity: 120,
    category: "Livestock Feed",
    vendor: "Thunderbird Ph"
  },
  {
    name: "Bird Feed (Per Kilo)",
    description: "Starter feed pellets for quail chicks.",
    price: 100,
    imageUrl: "https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg",
    stockQuantity: 90,
    category: "Livestock Feed",
    vendor: "Purina PH"
  },
  {
    name: "Molasses (Per Kilo)",
    description: "Feed supplement for livestock.",
    price:  200,
    imageUrl: "https://ph-test-11.slatic.net/p/c974328355eb5785b0738c0a32fab985.jpg",
    stockQuantity: 200,
    category: "Livestock Feed",
    vendor: "Local Livestock Ph"
  },

  // Fresh Produce (10)
  {
    name: "Ginger (Per Kilo)",
    description: "Aromatic ginger rhizomes. Good for cooking.",
    price: 200,
    imageUrl: "https://www.imtnews.ph/wp-content/uploads/2024/06/images-2024-06-07T140251.189.jpeg",
    stockQuantity: 100,
    category: "Fresh Produce",
    vendor: "Cordillera Farmers Coop"
  },
  {
    name: "Onions (Per Kilo)",
    description: "Native red onions from Nueva Ecija.",
    price: 220,
    imageUrl: "https://media.philstar.com/photos/2025/02/27/11_2025-02-27_22-13-33.jpg",
    stockQuantity: 150,
    category: "Fresh Produce",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Coffee (750g)",
    description: "Arabica coffee berries from Benguet.",
    price: 650,
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 25,
    category: "Fresh Produce",
    vendor: "Baguio Sun-Dried"
  },
  {
    name: "Pomelo (Per Kilo)",
    description: "Large pink pomelo from Davao.",
    price: 280,
    imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 40,
    category: "Fresh Produce",
    vendor: "Davao Fruit Trust"
  },
  {
    name: "Dragon Fruit (Per Kilo)",
    description: "Fresh dragon fruit from Ilocos.",
    price: 450,
    imageUrl: "https://fisherscart.com/cdn/shop/products/Dragonfruitred.png?v=1648373025",
    stockQuantity: 60,
    category: "Fresh Produce",
    vendor: "Northern Vines"
  },
  {
    name: "Pineapple (Per Pc)",
    description: "Sweet and juicy pineapple from Cavite.",
    price: 150,
    imageUrl: "https://5aday.co.nz/assets/site/fruit-and-vegetables/_articleHero/Pineapple.jpg",
    stockQuantity: 80,
    category: "Fresh Produce",
    vendor: "Southern Harvest"
  },
  {
    name: "Cabbage (Per Kilo)",
    description: "Crisp cabbage heads from Baguio.",
    price: 85,
    imageUrl: "https://www.kikkoman.com/en/cookbook/assets/img/0023_feature2.jpg",
    stockQuantity: 200,
    category: "Fresh Produce",
    vendor: "Baguio Sun-Dried"
  },
  {
    name: "Mango (Per Kilo)",
    description: "Sweet Guimaras mangoes.",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 35,
    category: "Fresh Produce",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Garlic (Per Kilo)",
    description: "Native garlic from Ilocos.",
    price: 380,
    imageUrl: "https://pindotlang.com/cdn/shop/products/20221130_095029_afef3727-75df-47aa-a2bc-861a0edb8d74.jpg?v=1669776820",
    stockQuantity: 120,
    category: "Fresh Produce",
    vendor: "Bureau of Plant Industry"
  },
  {
    name: "Lettuce (Per Kilo)",
    description: "Fresh hydroponic lettuce mix.",
    price: 140,
    imageUrl: "https://pindotlang.com/cdn/shop/products/image_png_1969972551.png?v=1641809453",
    stockQuantity: 90,
    category: "Fresh Produce",
    vendor: "Green House Tech"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || 'mongodb+srv://izumiiipromos_db_user:hlic8Y4oVUEk69l1@hatid.0kmwew9.mongodb.net/hatid?retryWrites=true&w=majority');
    console.log("Connected to MongoDB for seeding...");
    
    await Product.deleteMany({});
    console.log("Cleared existing products.");
    
    await Product.insertMany(products);
    console.log(`Successfully seeded database with ${products.length} basic products!`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
