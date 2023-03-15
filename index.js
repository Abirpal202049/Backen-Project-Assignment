const express = require('express');
const dotenv = require('dotenv');
const Crypter = require('cryptr')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dbConnect = require('./db/dbConnect')
dotenv.config()


dbConnect()
const app = express();
const crypter = new Crypter(process.env.SECRETKEY,{
    pbkdf2Iterations : 50000,
    saltLength : 20
})
const PORT = 3000 | process.env.PORT

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors())

// Imporing the Rotes
const userRoute = require('./routes/userRoute')
const secureRoutes = require('./routes/secureRoutes')

// Routes
app.use("/api/v1", userRoute)
app.use("/api/user", secureRoutes)



// Testing Routes
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'The backend is working'
    })
})

app.get('/encrypt', (req,res) => {
    const userName = "Abir Pal"
    const encryptedString = crypter.encrypt(userName)

    return res.status(200).json({
        userName : encryptedString
    })
})

app.listen(PORT, ()=>{
    console.log(`The server is running at PORT ${PORT}`);
})