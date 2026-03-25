import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

const initializeDB = async () => {
    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) throw new Error("DB_URL not found in .env");

        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB...");

        // 1. Initialize User Wallet Balances
        const usersToUpdate = await User.find({ walletBalance: { $exists: false } });
        console.log(`Found ${usersToUpdate.length} users without walletBalance. Initializing to ₱5000...`);
        for (let user of usersToUpdate) {
            user.walletBalance = 5000;
            await user.save();
        }

        // 2. Ensure admin roles have default balances too
        const admins = await User.find({ role: 'admin', walletBalance: { $exists: false } });
        for (let admin of admins) {
            admin.walletBalance = 5000;
            await admin.save();
        }

        // 3. Migrate legacy orders to include snapshots if products still exist
        const allOrders = await Order.find({ "products.name": { $exists: false } });
        console.log(`Checking ${allOrders.length} legacy orders for snapshot migration...`);
        const Product = (await import('./models/Product.js')).default;
        for (let order of allOrders) {
            let updated = false;
            for (let item of order.products) {
                const p = await Product.findById(item.product);
                if (p) {
                    item.name = p.name;
                    item.price = p.price;
                    item.imageUrl = p.imageUrl;
                    updated = true;
                }
            }
            if (updated) await order.save();
        }

        // 4. Mark existing orders as unassigned if approvedBy is missing
        const ordersToUpdate = await Order.find({ 
            status: { $in: ['approved', 'declined', 'received'] },
            approvedBy: { $exists: false } 
        });
        console.log(`Found ${ordersToUpdate.length} legacy orders. Marking as unassigned...`);
        for (let order of ordersToUpdate) {
            order.approvedBy = null;
            await order.save();
        }

        console.log("Database successfully initialized for the new credit & attribution system! 🚜✨");
        process.exit(0);
    } catch (err) {
        console.error("Initialization failed:", err);
        process.exit(1);
    }
};

initializeDB();
