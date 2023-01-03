const mongoose = require('mongoose');
const User = require('./models/users');

mongoose.connect('mongodb://localhost:27017/intelUser', { useNewUrlParser: true })
    .then(() => {
        console.log("Mongo Connectiom Open!!!!!")
    })
    .catch(err => {
        console.log("Oh No mongo connection error!!!!")
        console.log(err)
    })


const seedProducts = [
    {
        firstName: 'ravi',
        lastName: 'Chauhan',
        emailId: 'ravi323@gmail.com',
        mobile: 7897643222,
        address1: 'Arekere',
        address2: 'bannergetta',
        state: 'Karnataka',
        city: "Bangalore",
        country: 'India',
        zipCode: 560076,

    },
    {
        firstName: 'mukesh',
        lastName: 'mishra',
        emailId: 'mukesh23@gmail.com',
        mobile: 7373678732,
        address1: 'whitefield',
        address2: 'marathalli',
        state: 'Karnataka',
        city: "Bangalore",
        country: 'India',
        zipCode: 560026,

    },
    {
        firstName: 'anuj',
        lastName: 'singh',
        emailId: 'anuj3@gmail.com',
        mobile: 7897644392,
        address1: 'devanahalli',
        address2: 'airport road',
        state: 'Karnataka',
        city: "Bangalore",
        country: 'India',
        zipCode: 560092,

    },

   
]
// User.insertMany(seedProducts)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })