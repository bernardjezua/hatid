import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  // Seeds & Crops (10)
  {
    name: "Golden Sweet Corn Kernels",
    description: "High-yield hybrid corn seeds, perfect for PH tropical climate. Resists common pests.",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 120,
    category: "Seeds & Crops",
    vendor: "Bureau of Plant Industry"
  },
  {
    name: "Premium Rice Seeds (RC222)",
    description: "Certified high-yielding rice variety with drought resistance and high recovery rate.",
    price: 1850,
    imageUrl: "https://images.unsplash.com/photo-1536630596251-b12ba0d7f7aa?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 45,
    category: "Seeds & Crops",
    vendor: "PhilRice"
  },
  {
    name: "Organic Tomato Seeds",
    description: "Heirloom tomato varieties selected for size and deep red color.",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307bac?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 500,
    category: "Seeds & Crops",
    vendor: "East-West Seed"
  },
  {
    name: "Hybrid Eggplant F1",
    description: "Consistent production of glossy purple fruits, highly disease resistant.",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1563212891-36423049537e?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 300,
    category: "Seeds & Crops",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Bell Pepper Mix Seeds",
    description: "A blend of red, yellow, and green bell pepper seeds for diverse harvesting.",
    price: 95,
    imageUrl: "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 250,
    category: "Seeds & Crops",
    vendor: "Bureau of Plant Industry"
  },
  {
    name: "Upland Kangkong Seeds",
    description: "Fast-growing water spinach variety suitable for both soil and hydroponics.",
    price: 45,
    imageUrl: "https://images.unsplash.com/photo-1620608514481-9964a3504313?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 1000,
    category: "Seeds & Crops",
    vendor: "Local Farmer Coop"
  },
  {
    name: "Super-Baguio Pechay",
    description: "Crispy green leaves, perfect for local stir-fry and soup dishes.",
    price: 65,
    imageUrl: "https://images.unsplash.com/photo-1582284540020-8acaf01f344a?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 800,
    category: "Seeds & Crops",
    vendor: "Baguio Sun-Dried"
  },
  {
    name: "Red Lady Papaya Seeds",
    description: "Early fruiting, large fruit variety with sweet, firm flesh.",
    price: 320,
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 150,
    category: "Seeds & Crops",
    vendor: "Tropical Seeds Co"
  },
  {
    name: "Snap Bean Bush Type",
    description: "Heavy producer of stringless green beans, easy to manage.",
    price: 110,
    imageUrl: "https://images.unsplash.com/photo-1549413204-6338aa4d0ef9?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 400,
    category: "Seeds & Crops",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Bitter Gourd (Ampalaya)",
    description: "Long variety with distinct ridges and high nutritional value.",
    price: 140,
    imageUrl: "https://images.unsplash.com/photo-1596450514735-373fbed4af5e?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 350,
    category: "Seeds & Crops",
    vendor: "PhilRice"
  },

  // Organic Fertilizers (10)
  {
    name: "Super-Grow Vermicompost",
    description: "Premium organic fertilizer enriched with earthworm castings and microbial activity.",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1628352081506-83c43143df6a?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 200,
    category: "Organic Fertilizers",
    vendor: "Green Earth Mindanao"
  },
  {
    name: "Liquid Seaweed Extract",
    description: "Natural growth stimulant for bigger fruits, healthier leaves, and stress recovery.",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 30,
    category: "Organic Fertilizers",
    vendor: "Agri-Aqua Solutions"
  },
  {
    name: "Organic Bone Meal",
    description: "Slow-release phosphorus source for strong root development and blooming.",
    price: 280,
    imageUrl: "https://images.unsplash.com/photo-1589307736340-692591637554?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 100,
    category: "Organic Fertilizers",
    vendor: "Bio-Organic Ph"
  },
  {
    name: "Chicken Manure Pelletized",
    description: "N-P-K rich organic pellets, easy to apply and odor-neutralized.",
    price: 420,
    imageUrl: "https://images.unsplash.com/photo-1615671134821-fb3582101754?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 150,
    category: "Organic Fertilizers",
    vendor: "Poultry King"
  },
  {
    name: "Guano Phosphate",
    description: "Natural bat droppings rich in minerals for soil rejuvenation.",
    price: 550,
    imageUrl: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 80,
    category: "Organic Fertilizers",
    vendor: "Caves Harvest"
  },
  {
    name: "Fish Amino Acid (FAA)",
    description: "Homemade style fermented fish juice for nitrogen boost.",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1628352081506-83c43143df6a?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 60,
    category: "Organic Fertilizers",
    vendor: "Coastal Agri"
  },
  {
    name: "Bokashi Bran Mix",
    description: "Active microbes for indoor composting and soil amendment.",
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c350a41f8a?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 400,
    category: "Organic Fertilizers",
    vendor: "Home Bloom"
  },
  {
    name: "Potassium Humate Powder",
    description: "Highly concentrated soil conditioner that improves nutrient uptake.",
    price: 680,
    imageUrl: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 120,
    category: "Organic Fertilizers",
    vendor: "Agri-Aqua Solutions"
  },
  {
    name: "Cal-Phos Solution",
    description: "Calcium and Phosphorus spray from eggshells and bone meal.",
    price: 190,
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307bac?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 200,
    category: "Organic Fertilizers",
    vendor: "Green Earth Mindanao"
  },
  {
    name: "Epsom Salt (Magnesium)",
    description: "Food-grade magnesium sulfate for greener leaves and sweeter fruits.",
    price: 310,
    imageUrl: "https://images.unsplash.com/photo-1589307736340-692591637554?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 250,
    category: "Organic Fertilizers",
    vendor: "Philsalt"
  },

  // Heavy Machinery (10)
  {
    name: "Hand Tractor (Power Tiller)",
    description: "Heavy-duty 7HP diesel engine power tiller with rotavator attachment for easy plowing.",
    price: 45000,
    imageUrl: "https://images.unsplash.com/photo-1594434250005-59b33a76f272?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 5,
    category: "Heavy Machinery",
    vendor: "Kubota Philippines"
  },
  {
    name: "Portable Rice Thresher",
    description: "Compact and efficient rice thresher designed for small to medium farms.",
    price: 28000,
    imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 3,
    category: "Heavy Machinery",
    vendor: "PhilMech"
  },
  {
    name: "Corn Sheller Machine",
    description: "Automatic corn sheller with 1 ton/hr capacity. High efficiency.",
    price: 32000,
    imageUrl: "https://images.unsplash.com/photo-1594434250005-59b33a76f272?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 2,
    category: "Heavy Machinery",
    vendor: "Agri-Mach Ph"
  },
  {
    name: "Backpack Mist Blower",
    description: "Professional grade sprayer for large orchards and paddy fields.",
    price: 12500,
    imageUrl: "https://images.unsplash.com/photo-1582284540020-8acaf01f344a?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 15,
    category: "Heavy Machinery",
    vendor: "Bureau of Plant Industry"
  },
  {
    name: "Mini Solar Water Pump",
    description: "Eco-friendly irrigation pump powered by sunlight, perfect for remote farms.",
    price: 18500,
    imageUrl: "https://images.unsplash.com/photo-1549413204-6338aa4d0ef9?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 8,
    category: "Heavy Machinery",
    vendor: "Sun-Agri Solar"
  },
  {
    name: "Manual Disc Plow",
    description: "Standard disc plow attachment for power tillers. Durable steel construction.",
    price: 6500,
    imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 20,
    category: "Heavy Machinery",
    vendor: "Local Implements Ph"
  },
  {
    name: "Diesel Generator 5KVA",
    description: "Reliable backup power for farm lighting and machinery maintenance.",
    price: 24000,
    imageUrl: "https://images.unsplash.com/photo-1536630596251-b12ba0d7f7aa?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 4,
    category: "Heavy Machinery",
    vendor: "Power-Gen Ph"
  },
  {
    name: "Electric Grass Cutter",
    description: "Telescopic grass cutter for maintaining field paths and orchards.",
    price: 3800,
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307bac?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 25,
    category: "Heavy Machinery",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Forage Chopper 2HP",
    description: "Shreds corn stalks and grasses into livestock feed quickly.",
    price: 15500,
    imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 6,
    category: "Heavy Machinery",
    vendor: "PhilMech"
  },
  {
    name: "Hydraulic Jack 10T",
    description: "Heavy duty jack for tractor and machinery repairs.",
    price: 4500,
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 12,
    category: "Heavy Machinery",
    vendor: "Kubota Philippines"
  },

  // Livestock Feed (10)
  {
    name: "High-Protein Hog Starter",
    description: "Balanced nutrition for piglets, promoting rapid growth and health.",
    price: 1450,
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 50,
    category: "Livestock Feed",
    vendor: "B-Meg Philippines"
  },
  {
    name: "Premium Layer Crumble",
    description: "Ensures consistent egg production and strong eggshells for poultry.",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1582722073842-2543b19aee44?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 75,
    category: "Livestock Feed",
    vendor: "Purina PH"
  },
  {
    name: "Duck Laying Pellets",
    description: "Specifically formulated for ducks to improve hatchability and feather quality.",
    price: 1100,
    imageUrl: "https://images.unsplash.com/photo-1527756733973-5ca3b7787f9f?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 40,
    category: "Livestock Feed",
    vendor: "Purina PH"
  },
  {
    name: "Goat Feed Concentrates",
    description: "High-fiber nutrition for productive dairy and meat goats.",
    price: 950,
    imageUrl: "https://images.unsplash.com/photo-1524388658844-e2007ce45d7d?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 30,
    category: "Livestock Feed",
    vendor: "Local Livestock Ph"
  },
  {
    name: "Fish Floating Pellets",
    description: "Extruded pellets for tilapia and bangus, reduces water pollution.",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1526716173434-a9b0174621d2?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 100,
    category: "Livestock Feed",
    vendor: "Agri-Aqua Solutions"
  },
  {
    name: "Rabbit Breeding Pellets",
    description: "Enriched with vitamins A and D for healthy rabbit litters.",
    price: 380,
    imageUrl: "https://images.unsplash.com/photo-1551061713-94cc3f730ca1?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 60,
    category: "Livestock Feed",
    vendor: "B-Meg Philippines"
  },
  {
    name: "Cattle Fattener Mix",
    description: "Grain-based mix for efficient weight gain in beef cattle.",
    price: 2100,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 20,
    category: "Livestock Feed",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Gamefowl Maintenance",
    description: "Premium grains for conditioned performance and strong immunity.",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1615671134821-fb3582101754?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 120,
    category: "Livestock Feed",
    vendor: "Thunderbird Ph"
  },
  {
    name: "Quail Starter Crumbles",
    description: "Tiny pellets for quail chicks with high protein content.",
    price: 650,
    imageUrl: "https://images.unsplash.com/photo-1582722073842-2543b19aee44?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 90,
    category: "Livestock Feed",
    vendor: "Purina PH"
  },
  {
    name: "Livestock Salt Block",
    description: "Mineral licking block for cattle, goats, and horses.",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1589307736340-692591637554?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 200,
    category: "Livestock Feed",
    vendor: "Philsalt"
  },

  // Fresh Produce (10)
  {
    name: "Organic Highland Ginger",
    description: "Large, aromatic ginger rhizomes from Mt. Province. Great for tea and cooking.",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1596450514735-373fbed4af5e?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 100,
    category: "Fresh Produce",
    vendor: "Cordillera Farmers Coop"
  },
  {
    name: "Native Red Onions",
    description: "Strongly flavored shallots, harvest from Nueva Ecija farmers.",
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1508747703725-71977713d542?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 150,
    category: "Fresh Produce",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Benguet Arabica Coffee",
    description: "Medium roast, single-origin Arabica berries with floral notes.",
    price: 650,
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 25,
    category: "Fresh Produce",
    vendor: "Baguio Sun-Dried"
  },
  {
    name: "Sweet Davao Pomelo",
    description: "Extra large pink pomelo with juicy segments and minimal seeds.",
    price: 280,
    imageUrl: "https://images.unsplash.com/photo-1628352081506-83c43143df6a?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 40,
    category: "Fresh Produce",
    vendor: "Davao Fruit Trust"
  },
  {
    name: "Organic Dragon Fruit",
    description: "Grown in Ilocos, white or red flesh with high antioxidant content.",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307bac?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 60,
    category: "Fresh Produce",
    vendor: "Northern Vines"
  },
  {
    name: "Fresh Cavite Pineapples",
    description: "Large, sweet and juicy pineapples harvested at peak ripeness.",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1550258114-68bd6350cd93?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 80,
    category: "Fresh Produce",
    vendor: "Southern Harvest"
  },
  {
    name: "Mountain Grown Cabbage",
    description: "Firm, crisp cabbage heads from the chilly hills of Atok.",
    price: 85,
    imageUrl: "https://images.unsplash.com/photo-1582284540020-8acaf01f344a?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 200,
    category: "Fresh Produce",
    vendor: "Baguio Sun-Dried"
  },
  {
    name: "Premium Honey Gold Mango",
    description: "Export quality Guimaras mangoes, incredibly sweet and fiber-less.",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 35,
    category: "Fresh Produce",
    vendor: "Dept. of Agriculture"
  },
  {
    name: "Native Garlic (Large)",
    description: "Pungent Ilocos garlic, small bulbs with intense aroma.",
    price: 380,
    imageUrl: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=800",
    stockQuantity: 120,
    category: "Fresh Produce",
    vendor: "Bureau of Plant Industry"
  },
  {
    name: "Hydroponic Lettuce Mix",
    description: "Clean, insecticide-free lettuce mix for bistro-quality salads.",
    price: 140,
    imageUrl: "https://images.unsplash.com/photo-1556781366-336f8353bb7c?auto=format&fit=crop&q=80&w=800",
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
    console.log(`Successfully seeded database with ${products.length} high-quality products!`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
