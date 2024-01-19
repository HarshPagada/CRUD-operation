const connectMongo = require("./db");
const express =require('express')
// const multer = require('multer')
const app = express()
var cors = require('cors')


connectMongo();
app.use(cors());

const port = 5000
app.use(express.json()) // Middleware


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the directory where you want to store the images
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // Endpoint for handling image uploads
// app.post('/upload', upload.single('image'), (req, res) => {
//   // Handle the uploaded image (store in the specified directory, etc.)
//   const imagePath = req.file.path; // This is a path to the stored image on the server
//   res.json({ imagePath });
// });

// app.use('/api/auth',require('./routes/auth'))
app.use('/api/product2',require('./routes/product2'))


app.listen(port, () => {
  console.log(`server is running on port http://localhost: ${port}`)
})