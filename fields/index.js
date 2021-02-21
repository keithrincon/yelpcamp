// file is self contained 
// so it will connect to mongos and use our model
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./teamHelpers');
const Team = require('../models/team');

mongoose.connect('mongodb://localhost:27017/keysubs-teams', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// started by just removing everything from in the database.
const fieldDB = async () => {
    await Team.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const cost = Math.floor(Math.random() * 20) + 10;
        const field = new Team({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/720x720/?sport,team',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eum hic voluptate repellat omnis ducimus. Eveniet, cum assumenda asperiores culpa libero, impedit commodi, inventore placeat quaerat dolorum perferendis aspernatur maiores.',
            cost
        })
        await field.save();
    }
}
fieldDB().then(() => {
    mongoose.connection.close();
})

