define('app',["exports", "aurelia-auth"], function (_exports, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false
      }, {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true
      }, {
        route: 'users',
        moduleId: './modules/users',
        name: 'Users',
        auth: true
      }, {
        route: 'products',
        moduleId: './modules/products',
        name: 'Products',
        auth: true
      }, {
        route: 'productReviews',
        moduleId: './modules/productReviews',
        name: 'Product Reviews',
        auth: true
      }]);
    };

    return App;
  }();

  _exports.App = App;
});
define('text!app.html',[],function(){return "<template>\n  <nav-bar></nav-bar>\n  <router-view></router-view>\n  <link rel=\"stylesheet\" href=\"public/styles.css\" />\n</template>";});
define('auth-config',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
  };
  var _default = authConfig;
  _exports.default = _default;
});
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});
define('main',["exports", "./environment", "./auth-config", "regenerator-runtime"], function (_exports, _environment, _authConfig, _regeneratorRuntime) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);
  _authConfig = _interopRequireDefault(_authConfig);
  _regeneratorRuntime = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  window.regeneratorRuntime = _regeneratorRuntime.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig.default);
    }).feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!modules/components/editProduct.html',[],function(){return "<template>\r\n\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <span show.bind=\"product._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>\r\n                </div>\r\n\r\n                <form>\r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"productName\">Product Name</label>\r\n                            <input type=\"text\" class=\"form-control\" value.bind=\"product.productName\" id=\"productName\"\r\n                                placeholder=\"What is the product called?\">\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"description\">Description</label>\r\n                            <input type=\"text\" class=\"form-control\" value.bind=\"product.description\" id=\"description\"\r\n                                placeholder=\"What's the product all about?\">\r\n                        </div>\r\n\r\n                        <div class=\"form-group\">\r\n                            <label for=\"url\">URL</label>\r\n                            <input type=\"text\" class=\"form-control\" value.bind=\"product.url\" id=\"url\" placeholder=\"URL\" >\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <label for=\"file\">Product Image</label>\r\n\r\n                            <div class=\"col-2\">\r\n                                <label class=\"btn btn-primary\">\r\n                                    Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\r\n                                        files.bind=\"files\">\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"col-4\">\r\n                                <ul>\r\n                                    <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                            click.delegate=\"removeFile($index)\" class=\"pull-right\"></li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n\r\n                        <!-- <br>\r\n                        <button click.trigger=\"save()\">Save</button> -->\r\n\r\n                        <!-- <div class=\"card\" repeat.for=\"review of product.productsReviewsArray\">\r\n                            <div class=\"card-body\">\r\n                                <div class=\"row\" style=\"padding:3px;\">\r\n                                    <div class=\"col-3\">\r\n                                        <span innerhtml.bind=\"review.dateCreated | formatDate\"></span><br />\r\n                                        ${review.productid.productName} ${review.userid}\r\n                                    </div>\r\n\r\n                                    <div class=\"col-9\" style=\"border-left-style: solid; border-left-width: 1px;\">\r\n                                        ${review.review}\r\n                                    </div>\r\n                                    <div>\r\n                                        <a href=\"http://localhost:5000/uploadedFiles/products/${Review.file.fileName}\"\r\n                                            target=\"_blank\">${review.file.originalFileName}</a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div> -->\r\n               \r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</template>";});
define('text!modules/components/editReview.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-12\">\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"backReview()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"saveReview()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                </div>\r\n                <form>\r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <h2>${product.productName}</h2>\r\n                        <!-- <div class=\"form-group\">\r\n                            <label for=\"productName\">Product Name</label>\r\n                            <input type=\"text\" class=\"form-control\" value.bind=\"product.productName\" id=\"productName\"\r\n                                placeholder=\"Product Name\">\r\n                        </div> -->\r\n\r\n                        <div class=\"dont-break-out\">\r\n                            <a href=\"${product.url}\">${product.url}</a>\r\n                          \r\n                        </div>\r\n                        <div class=\"row\">\r\n\r\n                            <div class=\"form-group\" style=\"margin-top:10px;\">\r\n                                <label for=\"review\">Add Product Review</label>\r\n                                <textarea value.bind=\"productReview.review\" class=\"form-control\" rows=\"5\" cols=\"40\"></textarea>\r\n                                <!-- <label class=\"btn btn-primary\" style=\"margin-top:10px\">\r\n                                    Browse for files&hellip; <input type=\"file\" style=\"display: none\" change.delegate=\"changeFiles()\"\r\n                                        files.bind=\"files\">\r\n                                </label> -->\r\n                            </div>\r\n\r\n                            <div>\r\n                                <img src=\"http://localhost:5000/uploadedFiles/products/${product.productImage.imageName}\" target=\"_blank\"\r\n                                    ${review.file.originalFileName}>\r\n                            </div>\r\n                           \r\n                            <div class=\"col-10\">\r\n                                <ul>\r\n                                    <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                            click.delegate=\"removeFile($index)\" class=\"pull-right\"></li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <br>\r\n\r\n\r\n                        <div class=\"card\" repeat.for=\"review of products.reviewsArray\">\r\n                            <div class=\"card-body\">\r\n                                <div class=\"row\" style=\"padding:3px;\">\r\n                                    <div class=\"col-3\">\r\n                                        <span innerhtml.bind=\"review.dateCreated | formatDate\"></span><br />\r\n                                        ${review.productid.productName} ${review.userid}\r\n                                    </div>\r\n\r\n                                    <div class=\"col-9\" style=\"border-left-style: solid; border-left-width: 1px;\">\r\n                                        ${review.review}\r\n                                    </div>\r\n\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                </form>\r\n\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</template>";});
define('text!modules/components/editUser.html',[],function(){return "<template>\r\n        <div class=\"container\">\r\n            <div class=\"row justify-content-center\">\r\n                <div class=\"col-8\">\r\n    \r\n                    <div class=\"list-group-item\">\r\n                        <span click.trigger=\"back()\">\r\n                            <i data-feather=\"arrow-left-circle\"></i>\r\n                        </span>\r\n                        <span click.trigger=\"save()\" style=\"margin-left:5px;\">\r\n                            <i data-feather=\"save\"></i>\r\n                        </span>\r\n                        <span show.bind=\"user._id\" click.trigger=\"delete()\">\r\n                            <i data-feather=\"trash-2\"></i>\r\n                        </span>\r\n                    </div>\r\n    \r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <label for=\"firstName\">First name</label>\r\n                        <input type=\"email\" class=\"form-control\" value.bind=\"user.firstName\" id=\"firstName\" placeholder=\"First name\">\r\n                    </div>\r\n    \r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <label for=\"lastName\">Last name</label>\r\n                        <input type=\"email\" class=\"form-control\" value.bind=\"user.lastName\" id=\"lastName\" placeholder=\"Last name\">\r\n                    </div>\r\n    \r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <label for=\"email\">Email</label>\r\n                        <input type=\"email\" class=\"form-control\" value.bind=\"user.email\" id=\"email\" placeholder=\"Email\">\r\n                    </div>\r\n    \r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <label for=\"password\">Password</label>\r\n                        <input type=\"email\" class=\"form-control\" value.bind=\"user.password\" id=\"password\" placeholder=\"Password\">\r\n                    </div>\r\n    \r\n    \r\n                    <div class=\"form-group\">\r\n                        <label for=\"role\">Role</label>\r\n                        <select value.bind=\"user.role\" class=\"form-control\" id=\"role\">\r\n                            <option value=\"user\">User</option>\r\n                            <option value=\"staff\">Staff</option>\r\n                            <option value=\"admin\">Administrator</option>\r\n                        </select>\r\n                    </div>\r\n    \r\n    \r\n                    <div class=\"form-check\">\r\n                        <input class=\"form-check-input\" checked.bind=\"user.active\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                        <label class=\"form-check-label\" for=\"defaultCheck1\">\r\n                            Active\r\n                        </label>\r\n                    </div>\r\n    \r\n    \r\n    \r\n                   \r\n                </div>\r\n            </div>\r\n        </div>\r\n    </template>";});
define('text!modules/components/tableProducts.html',[],function(){return "<template>\r\n    <div class=\"container-fluid\">\r\n        <div class=\"row justify-content-left\">\r\n            <div class=\"col-12\">\r\n        \r\n                <br></br>\r\n                <table class=\"table\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th colspan=\"5\">                                    \r\n                                <span click.trigger=\"newProduct()\"><i data-feather=\"plus\"></i></span>\r\n                                <span click.trigger=\"getProducts()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                            </th>\r\n                        </tr>\r\n\r\n                        <thead class=\"thead-dark\">\r\n                            <tr >\r\n                                <th scope=\"col\">Image</th>\r\n                                <th scope=\"col\">See Reviews</th>\r\n                                <th scope=\"col\">Product Name</th>\r\n                                <th scope=\"col\">Description</th>\r\n                                <th scope=\"col\">URL</th>\r\n                                \r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr repeat.for=\"product of products.productsArray\">\r\n                                <td img src=\"http://localhost:5000/uploadedFiles/products/${product.productImage.imageName}\" target=\"_blank\" ${review.file.originalFileName}></td>\r\n                                <td click.trigger=\"getProductReviews(product)\"><i data-feather=\"star\"></i></td> \r\n                                <td click.trigger=\"editProduct(product)\">${product.productName}</td>\r\n                                <td click.trigger=\"editProduct(product)\">${product.description}</td>\r\n                                <td class=\"dont-break-out\" click.trigger=\"editProduct(product)\">${product.url}</td>     \r\n                              \r\n                            </tr>\r\n                        </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</template>";});
define('text!modules/components/tableUsers.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n\r\n                <table class=\"table\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th colspan=\"4\">\r\n                                <span click.trigger=\"newUser()\">\r\n                                    <i data-feather=\"plus\"></i>\r\n                                </span>\r\n                                <span click.trigger=\"getUsers()\" style=\"margin-left:5px;\">\r\n                                    <i data-feather=\"refresh-cw\"></i>\r\n                                </span>\r\n                            </th>\r\n                        </tr>\r\n\r\n                        <tr>\r\n\r\n                            <th scope=\"col\">First</th>\r\n                            <th scope=\"col\">Last</th>\r\n                            <th scope=\"col\">Role</th>\r\n                            <th scope=\"col\">Active</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr>\r\n                                <tr repeat.for=\"user of users.usersArray\">\r\n                                        <td click.trigger=\"editUser(user)\">${user.firstName}</td>\r\n                                        <td click.trigger=\"editUser(user)\">${user.lastName}</td>\r\n                                        <td click.trigger=\"editUser(user)\">${user.role}</td>\r\n                                        <td>\r\n                                            <div class=\"form-check\">\r\n                                        <input class=\"form-check-input\" change.delegate=\"changeActive(user)\" checked.bind=\"user.active\" \r\n                                        type=\"checkbox\" value=\"\" id=\"defaultCheck1\"></div>\r\n                                        </td>\r\n                                        </tr>\r\n                                        \r\n\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('modules/home',["exports", "aurelia-framework", "aurelia-router"], function (_exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  _exports.__esModule = true;
  _exports.Home = void 0;

  var _dec, _class;

  var Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class =
  /*#__PURE__*/
  function () {
    function Home(router) {
      this.router = router;
      this.message = 'Home';
    }

    var _proto = Home.prototype;

    _proto.login = function login() {
      this.router.navigate('users');
    };

    return Home;
  }()) || _class);
  _exports.Home = Home;
});
define('text!modules/home.html',[],function(){return "<template>\r\n    <body>\r\n        <style> body{ background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_jOCwX_yzhHNOyU0Q2yA1av-ybxspKBXyZOm7VbkPSOovzX8ug');\r\n     }</style>\r\n   \r\n        <h1>${message}</h1>\r\n\r\n        <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Yg50tGUC-DvGhtfnTB0ptS9Os_Kt2BkOoIiJ9qaLuv9wHowEng\"\r\n            class=\"rounded mx-auto d-block\" alt=\"reviews1\">\r\n        <!-- <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVs_lO3Tm2syj7GMbWRMV0wNDb4jWQu8pUFvjTRAkwtYo9VQiO\"\r\n            class=\"rounded mx-auto d-block\" alt=\"reviews2\"> -->\r\n    </body>\r\n</template>";});
define('modules/landing',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.Landing = void 0;

  var Landing = function Landing() {};

  _exports.Landing = Landing;
});
define('text!modules/landing.html',[],function(){return "<template>\r\n\r\n        <body>\r\n                <style>\r\n                        body {\r\n                                background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_jOCwX_yzhHNOyU0Q2yA1av-ybxspKBXyZOm7VbkPSOovzX8ug');\r\n                        }\r\n                </style>\r\n\r\n                <h1></h1>\r\n                <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVs_lO3Tm2syj7GMbWRMV0wNDb4jWQu8pUFvjTRAkwtYo9VQiO\"\r\n                        class=\"rounded mx-auto d-block\" alt=\"reviews2\">\r\n\r\n        </body>\r\n</template>";});
define('modules/productReviews',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.ProductReviews = void 0;

  var ProductReviews = function ProductReviews() {
    this.message = "Product Reviews";
  };

  _exports.ProductReviews = ProductReviews;
});
define('text!modules/productReviews.html',[],function(){return "<template>\r\n    <h1>${message} </h1>\r\n</template>";});
define('modules/products',["exports", "aurelia-framework", "aurelia-router", "../resources/data/product-object"], function (_exports, _aureliaFramework, _aureliaRouter, _productObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.Products = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Products = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _productObject.Product), _dec(_class =
  /*#__PURE__*/
  function () {
    function Products(router, products) {
      this.router = router;
      this.products = products;
      this.message = 'Products';
      this.showProductEditForm = 'table';
      this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }

    var _proto = Products.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.products.getProducts(this.userObj);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _activate.apply(this, arguments);
      }

      return activate;
    }(); // async activate() {
    //     await this.getProducts();
    // }


    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.getProducts =
    /*#__PURE__*/
    function () {
      var _getProducts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.products.getProducts();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getProducts() {
        return _getProducts.apply(this, arguments);
      }

      return getProducts;
    }();

    _proto.newProduct = function newProduct() {
      this.product = {
        file: "",
        productName: "",
        description: "",
        url: ""
      };
      this.openEditForm();
      this.productReview = {
        productId: this.userObj._id,
        review: ""
      };
      this.openEditForm();
    };

    _proto.editProduct =
    /*#__PURE__*/
    function () {
      var _editProduct = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(product) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.product = product;
                this.productReview = {
                  productId: this.product._id,
                  review: ""
                };
                _context3.next = 4;
                return this.products.getProductsReviews(product._id);

              case 4:
                this.showEditForm();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function editProduct(_x) {
        return _editProduct.apply(this, arguments);
      }

      return editProduct;
    }();

    _proto.editProduct = function editProduct(product) {
      this.product = product;
      this.openEditForm();
    };

    _proto.openEditForm = function openEditForm() {
      this.showProductEditForm = 'form';
      setTimeout(function () {
        $("#productName").focus();
      }, 500);
    };

    _proto.openReviewForm = function openReviewForm(product) {
      this.productReview = {
        productId: this.product._id,
        review: ""
      };
      this.message = 'Reviews';
      this.showProductEditForm = 'review';
    };

    _proto.changeActive = function changeActive(product) {
      this.product = product;
      this.save();
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var obj, _serverResponse;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('lskfjl;asf');

                if (!(this.product && this.product.productName && this.product.description && this.product.url)) {
                  _context4.next = 10;
                  break;
                }

                obj = {
                  product: this.product,
                  review: this.productReview
                };
                _context4.next = 5;
                return this.products.saveProduct(obj);

              case 5:
                _serverResponse = _context4.sent;
                if (this.filesToUpload && this.filesToUpload.length > 0) this.products.uploadFile(this.filesToUpload, _serverResponse.contentID);
                _context4.next = 9;
                return this.getProducts();

              case 9:
                this.back();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }();

    _proto.saveReview =
    /*#__PURE__*/
    function () {
      var _saveReview = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.productReview && this.productReview.review)) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 3;
                return this.products.saveReview(this.productReview);

              case 3:
                if (this.filesToUpload && this.filesToUpload.length > 0) this.products.uploadFile(this.filesToUpload, serverResponse.contentID);

              case 4:
                this.back();

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function saveReview() {
        return _saveReview.apply(this, arguments);
      }

      return saveReview;
    }(); // async save() {
    //     if (this.product && this.product.productName && this.productReview && this.productReview.review) {
    //     if(this.userObj.role !== 'user'){
    //         this.product.productName = this.userObj._id;
    //     }
    //     let product = {product: this.product, review: this.productReview }
    //     let serverResponse = await this.products.saveProducts(product);
    //     if (this.filesToUpload && this.filesToUpload.length > 0) this.products.uploadFile(this.filesToUpload, serverResponse.reviewID);
    //          await this.getProducts();
    //          this.back();
    //     }
    // }


    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.product) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 3;
                return this.products.delete(this.product);

              case 3:
                _context6.next = 5;
                return this.getProducts();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }();

    _proto.getProductReviews =
    /*#__PURE__*/
    function () {
      var _getProductReviews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(product) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.product = product;
                _context7.next = 3;
                return this.products.getProductReviews(product._id);

              case 3:
                this.openReviewForm();

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getProductReviews(_x2) {
        return _getProductReviews.apply(this, arguments);
      }

      return getProductReviews;
    }();

    _proto.showProductReview = function showProductReview() {
      this.showProductReview = true;
    };

    _proto.back = function back() {
      this.showProductEditForm = 'table';
      this.filesToUpload = new Array();
      this.files = new Array();
    };

    _proto.backReview = function backReview() {
      this.message = 'Products';
      this.showProductEditForm = 'table';
    };

    _proto.changeFiles = function changeFiles() {
      var _this = this;

      this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();

      for (var i = 0; i < this.files.length; i++) {
        var addFile = true;
        this.filesToUpload.forEach(function (item) {
          if (item.name === _this.files[i].name) addFile = false;
        });
        if (addFile) this.filesToUpload.push(this.files[i]);
      }
    };

    _proto.logout = function logout() {
      this.router.navigate('home');
    };

    return Products;
  }()) || _class);
  _exports.Products = Products;
});
define('text!modules/products.html',[],function(){return "<template>\r\n    <style>\r\n        body {\r\n            background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dSJ28naLQz-lYeo1ejkNsZ8DpT3tP4HxynLE5XtwrNQdIQ6-Dg');\r\n            background-size: cover\r\n        }\r\n    </style>\r\n    <h1>${message}</h1>\r\n    <compose show.bind=\"showProductEditForm == 'table'\" view=\"./components/tableProducts.html\"></compose>\r\n    <compose show.bind=\"showProductEditForm == 'form'\" view=\"./components/editProduct.html\"></compose>\r\n    <compose show.bind=\"showProductEditForm == 'review'\" view=\"./components/editReview.html\"></compose>\r\n    <!-- <compose show.bind=\"showProductEditForm == 'file'\" view=\"../public/uploadedFiles/products\"></compose> -->\r\n</template>";});
define('modules/users',["exports", "aurelia-framework", "aurelia-router", "../resources/data/user-object"], function (_exports, _aureliaFramework, _aureliaRouter, _userObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.Users = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Users = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userObject.User), _dec(_class =
  /*#__PURE__*/
  function () {
    function Users(router, users) {
      this.router = router;
      this.users = users;
      this.message = 'Reviewers';
      this.showUserEditForm = false;
    }

    var _proto = Users.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getUsers();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _activate.apply(this, arguments);
      }

      return activate;
    }();

    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.users.getUsers();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUsers() {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }();

    _proto.newUser = function newUser() {
      this.user = {
        firstName: "",
        lastName: "",
        active: true,
        role: "user",
        email: "",
        password: ""
      };
      this.openEditForm();
    };

    _proto.editUser = function editUser(user) {
      this.user = user;
      this.openEditForm();
    }; // async save (){
    //     console.log(this.user);
    // }


    _proto.openEditForm = function openEditForm() {
      this.showUserEditForm = true;
      setTimeout(function () {
        $("#firstName").focus();
      }, 500);
    };

    _proto.back = function back() {
      this.showUserEditForm = false;
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.user && this.user.firstName && this.user.lastName && this.user.email && this.user.password)) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this.users.saveUser(this.user);

              case 3:
                _context3.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.user) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.users.delete(this.user);

              case 3:
                _context4.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }();

    _proto.changeActive = function changeActive(user) {
      this.user = user;
      this.save();
    }; // logout() {
    //     this.router.navigate('home');
    // }


    return Users;
  }()) || _class);
  _exports.Users = Users;
});
define('text!modules/users.html',[],function(){return "<template>\r\n\r\n<style>\r\n  body{ background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgICAgICAoICAcHBwoHBwcICA8ICQcKFREWFhURExMYHSggGCYlJxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NDisZFRkrNysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrNysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAQIDBAcGBf/EABgQAQEBAQEAAAAAAAAAAAAAAAABEgIR/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECBAUD/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwDIQzkdevNzBFxMjSRnW8Vy15Z8xrzGNaxpy25ZcxtxGNbxry15Z8teWdaxry15Z8tOWNaacteWfLTllWnLTlny0iNNI05Z8tOUVpy05Z8tORWnLTlny0gq4uIjSCr5VExUFUcTFKGZHAAAAgZARGVQKkdIHj3h+Lyc5d9edEyLkOcrnLO61mDmNOYOeWnMY3WsxXMa8xPMa8xnWsxfMa8xPMacxjWsXzGvMRzGnMZ1rF8xpzE8xpzGVVy05RzGnMRpfK+UxpzEVfK+UctOYKvlpE8qgq+WkZxpBVRUTFRRUUmKihmRgAAoCMkARkgkeHQDyXJzlrOTnLtrgjOcrnK5yucsbrUTzy055PnlpzyzutZhc8teeRzy055Z3WofMacwc8tOYzrWHzGnMLmNOYypyNOYUi5GWj5jTmJkaSIp8xpImLgqo05RGkRVxXKYuCr5XERUUXFREVAXFIiooo0wwMAKAgEARkBUAA8ywc5bYPDprkjKcqnLWcKnLNWM+eWk5XOVzlN1qI55ac8q55XOWd1YU5acw5yuRlocxcgkXIysEi5BIuRFORfMTIuIpxcTFwVUXExURVxpGcq5QXFREqpVVcOIlVKC5Veoh+qL9P1Ep+qivT9R6foGC9L0FFS9L0DBel6D4PJ5bZPL7VzxlOFTlpOTnKVYicqnK5yucs1YicrkVIqRK1CkVIci5GSFIuQSKkRoSLkKHEDi4mKiKqKiYqIqoqI9OUVrKqVlKqUGsqoylVOgaSqlZyn6o0lVKy9PSjT0/Wc6GlGno9R6WhGno9RotA09L1Ho0ov0es/RoHy2Ty0yMt18ojJ5Xk5EqxE5VOVyHIixM5VIcipEWFIchyGgJDBopw4QQVDifT9RVyn6z9HqDWU5WUqtIrSVUrLR6BtOjlY6PQrb1U6YTtWlG2j9YaPa1G2j0x0elGuhpjo50o10NMtDQjTQ0y0NKNdDTLQ0D8jw/F+DxpmI8PxXh+IRPh+KkApSKkBoF4JDNAgAgAXpeiq9HqPR6yL9HrPQ0g00emOj0itdHpjoaBvo50w0NiujRzpz7PYOjQ0w2elRvs9ufY2o6Njbn2NqOnY259jao6NlthsbUb6GmGxsGfg8MNIXhmECB+H4KXhgIAvQQAqLU2oh+laVpWgLSvSbU2oK0WkXor0yNNFplei0g20NMNDaK6NDbn2ewdGxtz7GxXTOz25tjajp2NufY2qOnY25tntR0bG3PsbUdGxtz7GwdGxthsbUdpgNgIwgDIACBUAVBIFam06i0QWptFqLRBam9Fai1EO9JvSb0i9IVd6LTO9JvTJWuhtjei0i1toaYaGha6Njbn2Ng6NjbDY2Do2NufY0qujY2w0NiOjY259jajo2e3Ps9qN9HthOj0K/aHoDYPTIAPQCAFQVoC0itK0QWs7TtRaIXVRadrPqkQrUWjqo6pEK1NpWotSJTvSb0m1NqQqr0WkWpvSRa10WmWhpIVroaY6Gki1toaY6LQrfQ2w0NA32NsNHpRvsaYaPQN9HphOlTpVbTpWmM6P0H0noAbaAAEIegARAAm1NoCoi1FpgZZ2s+qAIz6rPqgCM+qi0ARFqLQERNpWgIqfS9AQGi0AijRaAFGi0AKehoABo9AAqdKlMCqlV6AD/2Q==');\r\nbackground-size: cover} \r\n</style>\r\n\r\n<body>\r\n    <h1>${message}</h1>\r\n\r\n    <compose show.bind=\"showUserEditForm\" view=\"./components/editUser.html\" >\r\n    </compose>\r\n    <compose show.bind=\"!showUserEditForm\" view=\"./components/tableUsers.html\">\r\n    </compose>\r\n    \r\n      \r\n</body>\r\n</template>";});
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (_exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  _exports.__esModule = true;
  _exports.DataServices = void 0;

  var _dec, _class;

  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class =
  /*#__PURE__*/
  function () {
    function DataServices(http) {
      var _this = this;

      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');

            _request.headers.append('Authorization', authHeader);

            console.log('Requesting ${request.method} ${request.url}');
            return _request;
          },
          response: function response(_response) {
            console.log('Received ${response.status} ${response.url}');
            return _response;
          }
        });
      });
    }

    var _proto = DataServices.prototype;

    _proto.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.uploadImages = function uploadImages(images, url) {
      var formData = new FormData();
      images.forEach(function (item, index) {
        formData.append("image" + index, item);
      });
      return this.httpClient.fetch(url, {
        method: 'post',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.uploadFiles = function uploadFiles(files, url) {
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append("file" + index, item);
      });
      return this.httpClient.fetch(url, {
        method: 'post',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
  _exports.DataServices = DataServices;
});
define('resources/data/product-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.Product = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Product = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function Product(data) {
      this.data = data;
      this.PRODUCT_SERVICE = 'products';
      this.PRODUCT_REVIEWS = 'productReviews';
    }

    var _proto = Product.prototype;

    _proto.saveProduct =
    /*#__PURE__*/
    function () {
      var _saveProduct = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(product) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!product) {
                  _context.next = 11;
                  break;
                }

                if (!product.product._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(product, this.PRODUCT_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(product, this.PRODUCT_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                return _context.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveProduct(_x) {
        return _saveProduct.apply(this, arguments);
      }

      return saveProduct;
    }();

    _proto.saveReview =
    /*#__PURE__*/
    function () {
      var _saveReview = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!obj) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.data.post(obj, this.PRODUCT_REVIEWS);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveReview(_x2) {
        return _saveReview.apply(this, arguments);
      }

      return saveReview;
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(product) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(product && product._id)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.data.delete(this.PRODUCT_SERVICE + '/' + product._id);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }();

    _proto.getProducts =
    /*#__PURE__*/
    function () {
      var _getProducts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.data.get(this.PRODUCT_SERVICE);

              case 2:
                response = _context4.sent;

                if (!response.error) {
                  this.productsArray = response;
                } else {
                  this.productsArray = [];
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getProducts() {
        return _getProducts.apply(this, arguments);
      }

      return getProducts;
    }();

    _proto.getProductReviews =
    /*#__PURE__*/
    function () {
      var _getProductReviews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.data.get(this.PRODUCT_REVIEWS + '/product/' + id);

              case 2:
                response = _context5.sent;
                this.reviewsArray = response;

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getProductReviews(_x4) {
        return _getProductReviews.apply(this, arguments);
      }

      return getProductReviews;
    }();

    _proto.uploadFile =
    /*#__PURE__*/
    function () {
      var _uploadFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(files, id) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.data.uploadFiles(files, this.PRODUCT_SERVICE + "/upload/" + id);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function uploadFile(_x5, _x6) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }(); // async uploadFile(files, id) {
    //     await this.data.uploadFiles(files, this.PRODUCT_REVIEW_SERVICE + "/upload/" + id );
    // }


    return Product;
  }()) || _class);
  _exports.Product = Product;
});
define('resources/data/user-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.User = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var User = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function User(data) {
      this.data = data;
      this.USER_SERVICE = 'users';
    }

    var _proto = User.prototype;

    _proto.saveUser =
    /*#__PURE__*/
    function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 11;
                  break;
                }

                if (!user._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(user, this.USER_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(user, this.USER_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                return _context.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveUser(_x) {
        return _saveUser.apply(this, arguments);
      }

      return saveUser;
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(user) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(user && user._id)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.data.delete(this.USER_SERVICE + '/' + user._id);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }();

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.get(this.USER_SERVICE);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  this.usersArray = response;
                } else {
                  this.usersArray = [];
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUsers() {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }();

    return User;
  }()) || _class);
  _exports.User = User;
});
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.NavBar = void 0;

  var _dec, _class;

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth) {
      // this.authenticated = false;
      this.loginError = '';
      this.router = router;
      this.auth = auth; // this.email = "";
      // this.password = "";
    }

    var _proto = NavBar.prototype;

    _proto.bind = function bind() {
      this.isAuthenticated = this.auth.isAuthenticated();
    };

    _proto.attached = function attached() {
      $('.navbar-nav a').on('click', function () {
        $('.navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
    }; // login() {
    //     console.log(this.email);
    //     console.log(this.password);
    //     this.authenticated = true;
    //     this.router.navigate('home');
    // }


    _proto.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        _this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(_this.userObj));
        _this.loginError = "";
        _this.isAuthenticated = _this.auth.isAuthenticated();

        _this.router.navigate('home');
      }).catch(function (error) {
        console.log(error);
        _this.authenticated = false;
        _this.loginError = "Invalid credentials.";
      });
    };

    // logout() {
    //     this.authenticated = false;
    //     this.router.navigate('landing');
    // }
    _proto.logout = function logout() {
      this.auth.logout(); // if (this.userObj) this.auth.logout(this.userObj.email);

      sessionStorage.removeItem('user');
      this.isAuthenticated = this.auth.isAuthenticated();
    };

    return NavBar;
  }()) || _class);
  _exports.NavBar = NavBar;
});
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\r\n  <nav class=\"navbar navbar-expand-lg navbar navbar-dark bg-dark\">\r\n          <a class=\"navbar-brand\" href=\"#\">Product Reviews</a>\r\n          <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n          </button>\r\n          <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n              <form show.bind=\"!isAuthenticated\" class=\"form-inline\">\r\n                      <div class=\"form-group mb-2\">\r\n                          <label for=\"staticEmail2\" class=\"sr-only\">Email</label>\r\n                          <input type=\"text\" class=\"form-control\" id=\"staticEmail2\" value.bind=\"email\" placeholder=\"Email\" >\r\n                      </div>\r\n                      <div class=\"form-group mx-sm-3 mb-2\">\r\n                          <label for=\"inputPassword2\" class=\"sr-only\">Password</label>\r\n                          <input type=\"password\" class=\"form-control\" id=\"inputPassword2\" value.bind=\"password\" placeholder=\"Password\">\r\n                      </div>\r\n                      <button click.trigger=\"login()\" type=\"submit\" class=\"btn btn-primary mb-2\">Login</button>\r\n                      <span show.bind=\"loginError\" style=\"color: white;margin-left: 10px;\">${loginError}</span> \r\n              \r\n              </form>\r\n            <ul show.bind=\"isAuthenticated\"  class=\"navbar-nav\">\r\n              <li class=\"nav-item active\">\r\n                <a class=\"nav-link\" href=\"#home\">Home <span class=\"sr-only\">(current)</span></a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" show.bind=\"userObj.role === 'admin'\" href=\"#users\">Reviewers</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" href=\"#products\">Products</a>\r\n               \r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" href=\"#\" click.trigger=\"logout()\">Logout</a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </nav>\r\n</template>";});
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {
    config.globalResources(['./elements/nav-bar']);
    config.globalResources(['./value-converters/format-date']);
  }
});
define('resources/value-converters/format-date',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.FormatDateValueConverter = void 0;

  var FormatDateValueConverter =
  /*#__PURE__*/
  function () {
    function FormatDateValueConverter() {}

    var _proto = FormatDateValueConverter.prototype;

    _proto.toView = function toView(value) {
      var myDate = new Date(value);
      return myDate.toLocaleDateString() + "<br/>" + myDate.toLocaleTimeString();
    };

    return FormatDateValueConverter;
  }();

  _exports.FormatDateValueConverter = FormatDateValueConverter;
});
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map