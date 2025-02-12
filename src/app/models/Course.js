const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;


const Course = new Schema({
  name: { type: String, require: true },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  videoId: { type: String, require: true },
  level: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name', unique: true },
}, {
  timestamps : true,
});

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all', // Quan trọng: đảm bảo override hoạt động
});


module.exports = mongoose.model('Course', Course);
