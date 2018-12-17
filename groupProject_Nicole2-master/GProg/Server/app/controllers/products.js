var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    async = require('async'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    ProductReview = mongoose.model('ProductReview');
asyncHandler = require('express-async-handler'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/products', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all products');
        let query = Product.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/products/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get product %s', req.params.id);
        await Product.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/products', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Creating product');
        var product = new Product(req.body.product);
        await product.save()
            .then(result => {
                res.status(201).json({ imageID: result._id });
            })
    }));

    router.post('/products', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating Product');
        var product = new Product(req.body.product);

        await product.save()
            .then(result => {
                req.body.review.productId = result._id;
                var productReview = new ProductReview(req.body.review);
                productReview.save()
                    .then(review => {
                        res.status(201).json({ reviewID: review._id });
                    })
            })
    }));


    router.put('/products', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Updating products');
        console.log('DSLFJS:LFDJL')
        console.log(req.body)
        await Product.findOneAndUpdate({ _id: req.body.product._id }, req.body.product, { new: true })
            .then(result => {
                res.status(201).json({ imageID: result._id });
            })
    }));

    // router.put('/products', asyncHandler(async (req, res) => {
    //     logger.log('info', 'Updating Product');
    //     await Product.findOneAndUpdate({ _id: req.body.product._id }, req.body.product, { new: true })
    //         .then(result => {
    //             if (req.body.review) {
    //                 req.body.review.productId = result._id;
    //                 var productReview = new ProductReview(req.body.review);
    //                 helpTicketReview.save()
    //                     .then(review => {
    //                         res.status(201).json({ reviewID: review._id });
    //                     })
    //             } else {
    //                 res.status(200).json(result);
    //             }
    //         })
    // }));


    router.delete('/products/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting product %s', req.params.id);
        await Product.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    var storage = multer.diskStorage({
        destination: function (req, image, cb) {
            var path = config.uploads + '/products';
            mkdirp(path, function (err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        imagename: function (req, image, cb) {
            image.imageName = image.originalname;
            cb(null, image.imagename + '-' + Date.now());
        }
    });

    var upload = multer({ storage: storage });

    router.post('/products/upload/:id', upload.any(), asyncHandler(async (req, res) => {
        logger.log('info', 'Uploading image');
        await Product.findById(req.params.id).then(result => {
            for (var i = 0, x = req.images.length; i < x; i++) {
                var image = {
                    originalImageName: req.images[i].originalname,
                    imageName: req.images[i].imagename
                };
                result.image = image;
            }
            result.save().then(result => {
                res.status(200).json(result);
            });
        })
    }));

    router.get('/productsReviews', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting all Product Reviews');
        let query = ProductReview.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/productReviews/product/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting a Product Review');
        let query = ProductReview.find({ productId: req.params.id });
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/productReviews', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating Product Review');
        var productReview = new ProductReview(req.body);
        const result = await productReview.save()
        res.status(201).json(result);
    }));

    router.post('/productReviews/product/:id', asyncHandler(async (req, res) => {
        logger.log('info', ' Upload a file for a specific Product Review');
        var productReview = new ProductReview(req.body);
        await productReview.save()
            .then(result => {
                req.body.review.productId = result._id;
                var productReview = new ProductReview(req.body.review);
                productReview.save()
                    .then(review => {
                        res.status(201).json(result);
                    })
            })
    }));


    router.put('/productReviews', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating Product Review');
        await ProductReview.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/productReviews/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting Product Reviews %s', req.params.id);
        await ProductReview.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var path = config.uploads + '/products';
            mkdirp(path, function (err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            file.fileName = file.originalname;
            cb(null, file.fieldname + '-' + Date.now());
        }
    });

    var upload = multer({ storage: storage });
    router.post('/productReviews/upload/:id', upload.any(), asyncHandler(async (req, res) => {
        logger.log('info', 'Uploading files');
        await ProductReview.findById(req.params.id).then(result => {
            for (var i = 0, x = req.files.length; i < x; i++) {
                var file = {
                    originalFileName: req.files[i].originalname,
                    fileName: req.files[i].filename
                };
                result.file = file;
            }
            result.save().then(result => {
                res.status(200).json(result);
            });
        })
    }));

};
