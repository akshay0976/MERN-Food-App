const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://gofood:root1@cluster0.0y7irbu.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ MongoDB connected successfully");

        // Fetch food_items collection data
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const foodItemsData = await foodItemsCollection.find({}).toArray();

        // Fetch foodCategory collection data
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();

        // Set as global variables (used in API later)
        global.food_items = foodItemsData;
        global.foodCategory = foodCategoryData;

        console.log("📦 Data fetched and stored globally");

    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};

module.exports = mongoDB;




// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,

// });

// const db = mongoose.connection;

// db.on('connected', () => {
//     console.log('Database connected');
// });
// db.on('error', () => {
//     console.log('Database error');
// });
// db.on('disconnect', () => {
//     console.log('Database disconnect');
// });

// module.exports = db;



