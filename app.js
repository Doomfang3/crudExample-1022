// Import express
const express = require('express')
const bodyParser = require('body-parser')
// Make an instance of express (server)
const app = express()
// Import Express Ejs Layouts
const expressLayouts = require('express-ejs-layouts')
// Import our db config
require('./db')
// Import our Product model
const Product = require('./models/Product')

// Define where our views folder use
app.set('views', __dirname + '/views')
// Set the view engine to use (Ejs in this case)
app.set('view engine', 'ejs')
// Use the Express Ejs Layouts library
app.use(expressLayouts)
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Define our route '/'
app.get('/', (req, res) => {
  res.send('<p>some html</p>')
})

// Define our route '/products'
app.get('/products', async (req, res) => {
  console.log(req.query)
  const { price } = req.query
  const products = await Product.find(/*{ price: { $lte: price } }*/)
  res.render('products', { products })
})

app.post('/products', async (req, res) => {
  console.log(req.body)
  await Product.create(req.body)
  res.redirect('/products')
})

// Define our route for one product
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params
  const product = await Product.findById(productId)
  res.send(product)
})

// Run the server
app.listen(3000, () => console.log('App listening on port 3000!'))
