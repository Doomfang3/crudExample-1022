const mongoose = require('mongoose')

async function connection() {
  try {
    await mongoose.connect('mongodb://localhost:27017/crudExample')
    console.log('Database connected')
  } catch (error) {
    console.log('There was an error', error)
  }
}

connection()
