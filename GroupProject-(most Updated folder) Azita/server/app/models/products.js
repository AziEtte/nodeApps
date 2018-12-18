var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Bcrypt = require('bcryptjs');

var productSchema = new Schema({
    
    productName: { type: String, require: true },
    description: { type: String, require: true },
    url: { type: String, require: true },
    productImage: { 
        imageName: { type: String },
        originalImageName: { type: String }
    },
});
   
module.exports = Mongoose.model('Product', productSchema);

var ProductReviewSchema = new Schema({
    productId: { type: Schema.Types.ObjectId },
    productName: { type: String, require: true },
    review: { type: String },
    dateCreated: { type: Date, default: Date.now },
    personId: { type: Schema.Types.ObjectId },
    file: {
        fileName: { type: String },
        originalFileName: { type: String }
    }
});
module.exports = Mongoose.model('ProductReview', ProductReviewSchema);
