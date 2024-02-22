import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Place from './models/Place.js';
import Booking from './models/Booking.js';
import { log } from 'console';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jkfhlkasjdhflaweur";

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

try {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connection Successful");
    })
} catch (e) {
    throw e;
}

function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        })
    })
}


app.get("/test", (req, res) => {
    res.json('test ok')
})

//

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const registeredUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(registeredUser);
    } catch (e) {
        res.status(422).json(e);
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let userDoc = await User.findOne({ email });
        if (userDoc) {
            let passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(userDoc)
                })

            } else {
                res.status(422).json("Pass not ok")
            }
        }
        else {
            res.json("Not found")
        }
    } catch (e) {

    }
})

app.get("/profile", async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        })
    } else {
        res.json(null);
    }
})

app.post("/logout", (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, imagesLink, description, price,
        perks, checkIn, checkOut, maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            photos: imagesLink,
            title: title,
            price: price,
            description: description,
            perks: perks,
            address: address,
            checkIn: checkIn,
            checkOut: checkOut,
            maxGuests: maxGuests
        });
        res.json(placeDoc);
    });

})

app.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})

app.put("/places", async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, imagesLink, description, price,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                photos: imagesLink,
                title: title,
                price: price,
                description: description,
                perks: perks,
                address: address,
                checkIn: checkIn,
                checkOut: checkOut,
                extraInfo: extraInfo,
                maxGuests: maxGuests
            })
            await placeDoc.save();
            res.json('ok ')
        }
    });
})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.delete('/places/:id', async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.json("ok");
});


app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const {
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;
    Booking.create({
        name: name,
        price: price,
        user: userData.id,
        checkIn: checkIn,
        checkOut: checkOut,
        place: place,
        numberOfGuests: numberOfGuests,
        phone: phone
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
})


app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'))
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})