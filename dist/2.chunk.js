webpackJsonp([2,8],{

/***/ 1397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_routing__ = __webpack_require__(1409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_index__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_facebook_sdk__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_facebook_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_facebook_sdk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__apiServices_auth_service__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__apiServices_global_service__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__apiServices_auth_interceptor_service__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__apiServices_spinner_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__apiServices_api_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__index__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_http_interceptor__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__spinner_spinner_module__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__start_shopping_uk_start_shopping_uk_component__ = __webpack_require__(1406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__shopping_cart_uk_shopping_cart_component__ = __webpack_require__(1404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__brands_brands_module__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__apiServices_nav_scroll_service__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyModule", function() { return LazyModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















var LazyModule = (function () {
    function LazyModule() {
    }
    LazyModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_17__start_shopping_uk_start_shopping_uk_component__["a" /* StartShoppingUkComponent */], __WEBPACK_IMPORTED_MODULE_18__shopping_cart_uk_shopping_cart_component__["a" /* ShoppingCartComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common_index__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_16__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["Ng2Bs3ModalModule"],
                __WEBPACK_IMPORTED_MODULE_12__angular_router__["a" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_0__lazy_routing__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_13__index__["a" /* SDKBrowserModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_14_angular2_http_interceptor__["a" /* HttpInterceptorModule */].withInterceptors([{
                        provide: __WEBPACK_IMPORTED_MODULE_14_angular2_http_interceptor__["b" /* HttpInterceptor */],
                        useClass: __WEBPACK_IMPORTED_MODULE_9__apiServices_auth_interceptor_service__["a" /* AuthInterceptorService */],
                        multi: true
                    }]),
                __WEBPACK_IMPORTED_MODULE_16__angular_forms__["b" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_19__brands_brands_module__["a" /* BrandsModule */], __WEBPACK_IMPORTED_MODULE_15__spinner_spinner_module__["a" /* SpinnerModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5_ng2_facebook_sdk__["FacebookService"],
                __WEBPACK_IMPORTED_MODULE_8__apiServices_global_service__["a" /* GlobalService */],
                __WEBPACK_IMPORTED_MODULE_9__apiServices_auth_interceptor_service__["a" /* AuthInterceptorService */], __WEBPACK_IMPORTED_MODULE_10__apiServices_spinner_service__["a" /* SpinnerService */], __WEBPACK_IMPORTED_MODULE_11__apiServices_api_service__["a" /* ApiService */],
                __WEBPACK_IMPORTED_MODULE_7__apiServices_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_20__apiServices_nav_scroll_service__["a" /* NavScrollService */],
                { provide: __WEBPACK_IMPORTED_MODULE_4__angular_common__["LocationStrategy"], useClass: __WEBPACK_IMPORTED_MODULE_4__angular_common__["PathLocationStrategy"] }
            ],
            bootstrap: []
        }), 
        __metadata('design:paramtypes', [])
    ], LazyModule);
    return LazyModule;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/lazy.module.js.map

/***/ }),

/***/ 1404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apiServices_nav_scroll_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingCartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ShoppingCartComponent = (function () {
    function ShoppingCartComponent(spinner, router, Api, navScrollService, http) {
        this.spinner = spinner;
        this.router = router;
        this.Api = Api;
        this.navScrollService = navScrollService;
        this.http = http;
        this.title = 'Almost done';
        this.isUnValide = false;
        this.sharedVarChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.newObj = [];
        this.shopAgain = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        this.bill = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        this.http = http;
        this.getBrands2();
        if (localStorage.getItem('user') != undefined) {
            document.getElementById('order').setAttribute('class', '');
            document.getElementById('userLogin').setAttribute('class', '');
        }
        if (localStorage.getItem('obj') != null) {
            this.obj = JSON.parse(localStorage.getItem('obj'));
            console.log(this.obj);
        }
        this.getBrands();
        this.contactForm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["g" /* FormGroup */]({
            name: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
            phoneNo: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* Validators */].required),
            message: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* Validators */].required),
        });
    }
    ShoppingCartComponent.prototype.transform = function (value) {
        return Math.round(value);
    };
    ShoppingCartComponent.prototype.print = function () {
        var start = 0;
        if (localStorage.getItem('myCart') != undefined) {
            this.newObj = JSON.parse(localStorage.getItem('myCart'));
            start = this.newObj.length;
            for (var a in this.newObj) {
                for (var i_1 in this.newObj[a].items) {
                    this.newObj[a].items[i_1].isInvalid = false;
                }
            }
        }
        var matchFound = false;
        if (this.obj) {
            for (var i_2 in this.newObj) {
                if (this.isEquivalent(this.newObj[i_2].name, this.obj.item)) {
                    this.newObj[i_2].items.push({
                        name: this.obj.item.name,
                        url: "",
                        info: "",
                        Price: undefined,
                        image: '',
                        title: '',
                        quantity: 1,
                        isInvalid: false,
                        product_id: this.obj.item._id
                    });
                    matchFound = true;
                }
            }
            if (!matchFound) {
                this.newObj.push({
                    name: this.obj.item,
                    items: []
                });
                for (var i = 0; i < this.obj.qty; i++) {
                    this.newObj[start].items.push({
                        name: this.obj.item.name,
                        url: "",
                        info: "",
                        Price: undefined,
                        image: '',
                        title: '',
                        quantity: 1,
                        isInvalid: false,
                        product_id: this.obj.item._id
                    });
                }
            }
        }
        start++;
        localStorage.removeItem('obj');
        console.log("this.newObj", this.newObj);
    };
    ShoppingCartComponent.prototype.setToLocalStorage = function () {
        var name = 20;
        localStorage.setItem("myCart", JSON.stringify(this.newObj));
    };
    ShoppingCartComponent.prototype.Delete = function (item) {
        var obj = item;
        var newCart = [];
        for (var _i = 0, _a = this.newObj; _i < _a.length; _i++) {
            var c = _a[_i];
            // let newObj = { name: c.name, items: [] };
            var items = [];
            for (var _b = 0, _c = c.items; _b < _c.length; _b++) {
                var item_1 = _c[_b];
                if (item_1 != obj)
                    items.push(item_1);
            }
            if (items.length > 0) {
                newCart.push({ name: c.name, items: items });
            }
        }
        this.newObj = newCart;
        localStorage.setItem("myCart", JSON.stringify(newCart));
    };
    ShoppingCartComponent.prototype.isEquivalent = function (a, b) {
        //to check equality of two Objects
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    };
    ShoppingCartComponent.prototype.ShopAgain = function () {
        this.shopAgain.emit({ value: false });
    };
    ShoppingCartComponent.prototype.ShowBill = function () {
        this.bill.emit({ value: true });
        this.postOrder();
    };
    ShoppingCartComponent.prototype.postOrder = function () {
        var _this = this;
        var findBrand = true;
        var orderItems = [];
        // if (localStorage.getItem('bill')) {
        //   let bill = JSON.parse(localStorage.getItem('bill'));
        //   orderItems = bill.items;
        // }
        var noPrice = false; //check for price
        for (var a in this.newObj) {
            var objitems = this.newObj[a].items;
            for (var i = 0; i < objitems.length; i++) {
                // let w = objitems[i].url.indexOf('//');
                // let a = objitems[i].url.indexOf('.com');
                // let b = objitems[i].url.indexOf('/',a);
                // let brandUrl = objitems[i].url.substring(w+2,b);
                var brandUrl = objitems[i].url;
                var brand = void 0;
                for (var _i = 0, _a = this.Brands; _i < _a.length; _i++) {
                    var Brand = _a[_i];
                    var w = Brand.url.indexOf('//');
                    var a_1 = Brand.url.indexOf('.com');
                    var b = Brand.url.indexOf('/', a_1);
                    // let url = Brand.url.substring(w+2,b);
                    var url = Brand.url.substring(Brand.url.indexOf('.') + 1);
                    if (brandUrl.indexOf(url) > 0) {
                        brand = Brand;
                    }
                }
                console.log(brand);
                if (brand == undefined)
                    findBrand = false;
                // if(localStorage.getItem('bill') != undefined)
                //   orderItems = JSON.parse(localStorage.getItem('bill')).items;
                orderItems.push({
                    url: objitems[i].url,
                    additional_info: objitems[i].info,
                    price: objitems[i].Price,
                    image: objitems[i].image,
                    title: objitems[i].title,
                    quantity: objitems[i].quantity,
                    product_id: objitems[i].product_id,
                    brand_id: (brand != undefined) ? brand._id : '',
                    brand_name: (brand != undefined) ? brand.name : '',
                    brands: (brand != undefined) ? brand : '',
                    isInvalid: (brand == undefined || objitems[i].Price == undefined) ? true : false
                });
                if (objitems[i].Price == undefined) {
                    noPrice = true;
                }
            }
        }
        var obj = { items: orderItems };
        console.log(obj);
        if (findBrand && !noPrice) {
            this.isUnValide = false;
            this.Api.checkRatesuk(obj)
                .subscribe(function (data) {
                _this.spinner.stop();
                console.log(data);
                localStorage.setItem('bill', JSON.stringify(data));
                _this.specialOffer = data.special_offer.amount;
                // this.AddsModal.open(); 
                _this.router.navigate(['/billuk']);
            }, function (err) {
                console.log(err);
                _this.onError401(err);
                if (err.status == 400) {
                    _this.isUnValide = true;
                    var items = JSON.parse(err._body).items;
                    console.log("items", items);
                    console.log(_this.newObj);
                    var i_3 = 0;
                    for (var _i = 0, _a = _this.newObj; _i < _a.length; _i++) {
                        var obj_1 = _a[_i];
                        for (var _b = 0, _c = obj_1.items; _b < _c.length; _b++) {
                            var item = _c[_b];
                            if (items[i_3].isInvalid == true)
                                item.isInvalid = items[i_3].isInvalid;
                            else
                                item.isInvalid = false;
                            i_3++;
                        }
                    }
                    console.log("newObj", _this.newObj);
                }
                _this.spinner.stop();
            });
        }
        else {
            console.log(orderItems);
            var j = 0;
            for (var _b = 0, _c = this.newObj; _b < _c.length; _b++) {
                var obj_2 = _c[_b];
                for (var _d = 0, _e = obj_2.items; _d < _e.length; _d++) {
                    var item = _e[_d];
                    if (orderItems[j].isInvalid == true)
                        item.isInvalid = true;
                    else
                        item.isInvalid = false;
                    j++;
                }
            }
            console.log(this.newObj);
            this.isUnValide = true;
        }
    };
    ShoppingCartComponent.prototype.scrapper = function (index, i, item) {
        var _this = this;
        var data = {
            url: $("#url" + index + i).val()
        };
        if (data.url) {
            this.Api.scrap(data)
                .subscribe(function (data) {
                if (data.price) {
                    _this.transform($("#price" + index + i).attr('ng-reflect-model', data.price.replace(/[^0-9,.]/, "")));
                    _this.transform($("#price" + index + i).attr('value', data.price.replace(/[^0-9,.]/, "")));
                    _this.transform($("#price" + index + i).val(data.price.replace(/[^0-9,.]/, "")));
                    // $("#price").trigger('input'); // Use for Chrome/Firefox/Edge
                    // $("#price").trigger('change');
                    // $("#price").triggerHandler('input')
                    var input = $("#price" + index + i);
                    input.val(data.price.replace(/[^0-9,.]/, ""));
                    input.trigger('input'); // Use for Chrome/Firefox/Edge
                    input.trigger('change');
                    input.val(data.price.replace(/[^0-9,.]/, "")).change();
                    item.Price = _this.transform(data.price.replace(/[^0-9,.]/, ""));
                }
                $("#info" + index + i).val(data.dis);
                item.info = data.dis;
                item.title = data.title;
                $("#image" + index + i).val(data.img);
                item.image = data.img;
                $("#proimg" + index + i).attr('src', data.img);
                _this.spinner.stop();
                _this.setToLocalStorage();
            }, function (err) {
                console.log(err);
            });
        }
    };
    ShoppingCartComponent.prototype.doLogin = function (user) {
        var _this = this;
        this.Api.loginUser(user)
            .subscribe(function (data) {
            _this.spinner.stop();
            console.log(data);
            var user = data;
            localStorage.setItem('user', JSON.stringify(user));
            _this.loginmodal.close();
            document.getElementById('login').innerText = "";
            document.getElementById('abc').innerText = "Log Out";
            // this.postOrder();
        }, function (error) {
            console.log(error);
            document.getElementById('alert').innerHTML = "<div class='alert alert-danger' role='alert'>Login Failed!</div>	";
        }, function () {
            console.log("Completed");
        });
    };
    ShoppingCartComponent.prototype.onError401 = function (err) {
        if (err.status === 401) {
            this.spinner.stop();
            console.log('redirect to login');
            // remove user from local storage to log user out
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
        }
        else {
            console.log(err.statusText);
        }
    };
    ShoppingCartComponent.prototype.getBrands = function () {
        var _this = this;
        this.Api.getBrandsuk()
            .subscribe(function (data) {
            console.log(data);
            _this.Brands = data;
            _this.spinner.stop();
        }, function (err) {
            console.log(err);
        });
    };
    ShoppingCartComponent.prototype.getBrands2 = function () {
        var _this = this;
        this.Api.getBrandsuk()
            .subscribe(function (data) {
            console.log(data);
            _this.Brands2 = data;
            _this.brandsrow1 = _this.Brands2.splice(0, 11);
            _this.brandsrow2 = _this.Brands2.splice(0, 11);
            _this.brandsrow3 = _this.Brands2.splice(0, 11);
            setTimeout(function () {
                $(".sidebar_slider").slick({
                    arrows: true,
                    infinite: true,
                    slidesToShow: 1,
                    autoplay: true,
                    speed: 500
                });
            }, 1000);
            _this.spinner.stop();
        }, function (err) {
            console.log(err);
        });
    };
    ShoppingCartComponent.prototype.closeMenu = function () {
        if (document.getElementById('cart-list').style.display != 'none')
            document.getElementById('cart-list').style.display = 'none';
        if (document.getElementById('user-details').style.display != 'none')
            document.getElementById('user-details').style.display = 'none';
        console.log('closeMenu');
    };
    ShoppingCartComponent.prototype.addItem = function () {
        this.newObj[0].items.push({
            name: this.obj[0].item.name,
            url: "",
            info: "",
            Price: undefined,
            image: this.obj[0].item.image,
            title: '',
            quantity: 1,
            isInvalid: false,
            product_id: this.obj[0].item._id
        });
    };
    ShoppingCartComponent.prototype.gotoBill = function () {
        var _this = this;
        setTimeout(function () {
            _this.router.navigate(['/billuk']);
        }, 1000);
    };
    ShoppingCartComponent.prototype.closeModal = function () {
        this.AddsModal.close();
        var length = JSON.parse(localStorage.getItem("myCart")).length;
        for (var i = 0; i < length; i++) {
            if (document.getElementsByClassName("show")[0] != undefined)
                document.getElementsByClassName("show")[0].setAttribute('class', '');
        }
    };
    ShoppingCartComponent.prototype.addProduct = function (i) {
        if (this.newObj[i].items.length < 25) {
            this.newObj[i].items.push({
                name: this.newObj[i].name.name,
                url: "",
                info: "",
                Price: undefined,
                image: "",
                title: '',
                quantity: 1,
                isInvalid: false,
                product_id: this.newObj[i].name._id
            });
        }
        else {
            document.getElementById('alert').innerHTML = "<div class=\"alert error\">\n                You can only add 25 Items\n            </div>";
            document.getElementById('page').scrollIntoView();
            setTimeout(function () { document.getElementById('alert').innerHTML = ''; }, 3000);
        }
    };
    ShoppingCartComponent.prototype.PostMessage = function (obj) {
        var _this = this;
        console.log(obj);
        this.Api.postMessage(obj)
            .subscribe(function (data) {
            _this.spinner.stop();
            console.log(data);
            document.getElementById('alert-modal-contact').innerHTML = '<div class="alert alert-success">' + data.message + '</div>';
            _this.contactForm.reset();
            setTimeout(function () {
                document.getElementById('alert-modal-contact').innerHTML = '';
                _this.contactModal.close();
            }, 3000);
        }, function (err) {
            console.log(err);
            document.getElementById('alert-modal-contact').innerHTML = '<div class="alert alert-danger">' + JSON.parse(err._body).message + '</div>';
            setTimeout(function () {
                document.getElementById('alert-modal-contact').innerHTML = '';
            }, 3000);
        });
    };
    ShoppingCartComponent.prototype.ngOnInit = function () {
        this.print();
        this.navScrollService.setNav();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('loginModal'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"]) === 'function' && _a) || Object)
    ], ShoppingCartComponent.prototype, "loginmodal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('AddvertiseModal'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"]) === 'function' && _b) || Object)
    ], ShoppingCartComponent.prototype, "AddsModal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('Contactmodal'), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"]) === 'function' && _c) || Object)
    ], ShoppingCartComponent.prototype, "contactModal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], ShoppingCartComponent.prototype, "shopAgain", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], ShoppingCartComponent.prototype, "bill", void 0);
    ShoppingCartComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-shopping-cart',
            template: __webpack_require__(1425),
            styles: [__webpack_require__(1417)]
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__["a" /* SpinnerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__["a" /* SpinnerService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__["a" /* ApiService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__["a" /* ApiService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__apiServices_nav_scroll_service__["a" /* NavScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__apiServices_nav_scroll_service__["a" /* NavScrollService */]) === 'function' && _g) || Object, (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */]) === 'function' && _h) || Object])
    ], ShoppingCartComponent);
    return ShoppingCartComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/shopping-cart.component.js.map

/***/ }),

/***/ 1406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apiServices_nav_scroll_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__apiServices_brands_service__ = __webpack_require__(330);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartShoppingUkComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var StartShoppingUkComponent = (function () {
    function StartShoppingUkComponent(spinner, Api, router, formBuilder, navScrollService, _brands) {
        this.spinner = spinner;
        this.Api = Api;
        this.router = router;
        this.formBuilder = formBuilder;
        this.navScrollService = navScrollService;
        this._brands = _brands;
        this.showNoOfItems = false;
        if (localStorage.getItem('user') != undefined) {
            document.getElementById('order').setAttribute('class', '');
            document.getElementById('userLogin').setAttribute('class', '');
        }
        var nav = document.getElementsByClassName('main-nav')[0];
        if (window.innerWidth < 800) {
            nav.setAttribute('class', 'main-nav dark stick-fixed mobile-on');
        }
        else {
            nav.setAttribute('class', 'main-nav dark stick-fixed');
        }
        this.getProducts();
        document.getElementById('nav').scrollIntoView();
        this.contactForm = formBuilder.group({
            name: [null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* Validators */].required],
            email: [null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
            phoneNo: [null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* Validators */].required],
            message: [null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* Validators */].required],
        });
    }
    StartShoppingUkComponent.prototype.sort = function () {
        for (var i = 0; i < this.items.length; i++) {
            var ptr = i + 1;
            while (ptr < this.items.length) {
                if (this.items[ptr].order_number < this.items[i].order_number) {
                    var temp = this.items[ptr];
                    this.items[ptr] = this.items[i];
                    this.items[i] = temp;
                }
                ptr++;
            }
        }
        console.log(this.items);
    };
    StartShoppingUkComponent.prototype.getProducts = function () {
        var _this = this;
        if (this._brands.getProducts()) {
            this.items = this._brands.getProducts();
            this.sort();
        }
        else {
            this.Api.getProducts()
                .subscribe(function (data) {
                _this.spinner.stop();
                console.log(data);
                _this.items = data;
                _this._brands.setProducts(data);
                // this.items.push({name:"Others"})
                _this.sort();
            }, function (err) {
                console.log(err);
                _this.onError401(err);
            }, function () {
                console.log("product api completed");
            });
        }
    };
    StartShoppingUkComponent.prototype.onClick = function (item) {
        this.selectedItem = item.name;
        this.productDetails = item;
        this.showNoOfItems = true;
    };
    StartShoppingUkComponent.prototype.Next = function () {
        this.showMore = true;
    };
    StartShoppingUkComponent.prototype.EndShopping = function () {
        console.log(this.obj);
        console.log(this.productDetails);
        this.obj = { item: this.productDetails, qty: this.qty };
        localStorage.setItem('obj', JSON.stringify(this.obj));
        this.router.navigate(['/buyNowuk/shopingCart']);
    };
    StartShoppingUkComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('obj') != null) {
            this.obj = JSON.parse(localStorage.getItem('obj'));
        }
        this.navScrollService.setNav();
    };
    StartShoppingUkComponent.prototype.onError401 = function (err) {
        if (err.status === 401) {
            this.spinner.stop();
            console.log('redirect to login');
            // remove user from local storage to log user out
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
        }
        else {
            console.log(err.statusText);
        }
    };
    StartShoppingUkComponent.prototype.closeMenu = function () {
        if (document.getElementById('cart-list').style.display != 'none')
            document.getElementById('cart-list').style.display = 'none';
        if (document.getElementById('user-details').style.display != 'none')
            document.getElementById('user-details').style.display = 'none';
        console.log('closeMenu');
    };
    StartShoppingUkComponent.prototype.PostMessage = function (obj) {
        var _this = this;
        console.log(obj);
        this.Api.postMessage(obj)
            .subscribe(function (data) {
            _this.spinner.stop();
            console.log(data);
            document.getElementById('modal-alert').innerHTML = '<div class="alert alert-success">' + data.message + '</div>';
            _this.contactForm.reset();
            setTimeout(function () {
                document.getElementById('modal-alert').innerHTML = '';
                _this.contactModal.close();
            }, 3000);
        }, function (err) {
            console.log(err);
            document.getElementById('modal-alert').innerHTML = '<div class="alert alert-danger">' + JSON.parse(err._body).message + '</div>';
            setTimeout(function () {
                document.getElementById('modal-alert').innerHTML = '';
            }, 3000);
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('contactUs'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"]) === 'function' && _a) || Object)
    ], StartShoppingUkComponent.prototype, "contactModal", void 0);
    StartShoppingUkComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-start-shopping-uk',
            template: __webpack_require__(1427),
            styles: [__webpack_require__(1419)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__["a" /* SpinnerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__["a" /* SpinnerService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__["a" /* ApiService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__["a" /* ApiService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormBuilder */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__apiServices_nav_scroll_service__["a" /* NavScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__apiServices_nav_scroll_service__["a" /* NavScrollService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__apiServices_brands_service__["a" /* BrandsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__apiServices_brands_service__["a" /* BrandsService */]) === 'function' && _g) || Object])
    ], StartShoppingUkComponent);
    return StartShoppingUkComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/start-shopping-uk.component.js.map

/***/ }),

/***/ 1409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__start_shopping_uk_start_shopping_uk_component__ = __webpack_require__(1406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shopping_cart_uk_shopping_cart_component__ = __webpack_require__(1404);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__start_shopping_uk_start_shopping_uk_component__["a" /* StartShoppingUkComponent */] },
    { path: 'shopingCart', component: __WEBPACK_IMPORTED_MODULE_2__shopping_cart_uk_shopping_cart_component__["a" /* ShoppingCartComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(routes);
//# sourceMappingURL=D:/studio/twohonline/web/src/lazy.routing.js.map

/***/ }),

/***/ 1417:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1419:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1425:
/***/ (function(module, exports) {

module.exports = "\r\n<app-spinner></app-spinner>\r\n\r\n<div class=\"handbag_sec wow fadeInDown\">\r\n    <div class=\"container\">\r\n     <div class=\"row\">\r\n     \r\n            <div class=\"col-md-4 pull-right\">\r\n                    <div class=\"sidebar_sec\">\r\n                      \r\n                      <h2>Brands</h2>\r\n                    \r\n                      <div class=\"sidebar_slider\">\r\n                         <div class=\"item\">\r\n                              <div class=\"brand_logo\">\r\n                                  <ul>\r\n                                      <li *ngFor=\"let brand of brandsrow1; let i = index;\">\r\n                                          <a href=\"{{brand.url}}\" target=\"_blank\"><img src=\"{{brand.image}}\" alt=\"{{brand.name}}\" class=\"img-zoom\"/></a>\r\n                                      </li>\r\n                                  </ul>\r\n                              </div>\r\n                         </div>\r\n              \r\n                          <div class=\"item\">\r\n                              <div class=\"brand_logo\">\r\n                                  <ul>\r\n                                      <li *ngFor=\"let brand of brandsrow2; let i = index;\">\r\n                                          <a href=\"{{brand.url}}\" target=\"_blank\"><img src=\"{{brand.image}}\" alt=\"{{brand.name}}\" class=\"img-zoom\"/></a>\r\n                                      </li>\r\n                                  </ul>\r\n                              </div>\r\n                         </div>\t\t\r\n                  \r\n                         \r\n                      </div>\r\n                         \r\n                    </div>\r\n                   </div>\r\n\r\n\r\n     <div class=\"col-md-8\">\r\n        <div class=\"alert error\" *ngIf=\"isUnValide\">\r\n            <i class=\"fa fa-lg  fa-times-circle\"></i> Please enter URLs from the UK website\r\n        </div>\r\n        <div id=\"alert\">\r\n\r\n        </div>\r\n        <div *ngIf=\"newObj.length ==0\" class=\"error\" style=\"font-size: 20px;text-align: center;color:#ffa500;\"><i class=\"fa fa-lg  fa-exclamation-triangle\"></i> No items! Please add items</div>\r\n        <div *ngFor=\"let ob of newObj;let index = index\">\r\n        <div *ngIf=\"ob.items.length>0\">\r\n      <div class=\"handbag_box\">\r\n            <h2>{{ob.name.name}}</h2>\r\n      </div>\r\n      \r\n       <div class=\"row\">\r\n\r\n       <div *ngFor=\"let item of ob.items ;let i = index;\" [class.invalid]=\"item.isInvalid\">\r\n\r\n            <div class=\"col-md-10\" >\r\n                \r\n                <a href=\"javascript:void(0)\" (click)=\"Delete(item)\" class=\"btn-rm-add delbtn\" *ngIf=\"newObj.length>1 || ob.items.length>1\">\r\n                    <i class=\"fa fa-trash \" aria-hidden=\"true \"></i><span class=\"hidden-xs remove\"></span>\r\n                </a>\r\n\r\n                <div class=\"handbag_form\">\r\n                <label>Enter URL</label>\r\n                        <input id=\"url{{ index  }}{{ i }}\" on-focusout=\"scrapper( index, i, item )\" type=\"text\" placeholder=\"Paste product URL\" class=\"input-md form-control\" [(ngModel)]=\"item.url \">\r\n                </div>\r\n                \r\n                <div class=\"handbag_form\">\r\n                <label>Additional info</label>\r\n                        <input id=\"info{{ index  }}{{ i }}\" type=\"text\" placeholder=\"Please specify the size, color etc \" class=\"input-md form-control\" [(ngModel)]=\"item.info \">\r\n                </div>\r\n                \r\n                <div class=\"handbag_form\">\r\n                <label>PRICE IN GBP £</label>\r\n                        <input id=\"price{{ index  }}{{ i }}\" type=\"number\" placeholder=\"£\" class=\"input-md form-control\" [(ngModel)]=\"item.Price\" >\r\n                        <input id=\"image{{ index  }}{{ i }}\" type=\"hidden\" placeholder=\"image\" class=\"input-md form-control\" [(ngModel)]=\"item.image\">\r\n                </div>\r\n\r\n            </div>\r\n                \r\n            <div class=\"col-md-2\">\r\n                <div class=\"product_beg\">\r\n                    <img id=\"proimg{{ index  }}{{ i }}\" src=\"{{ item.image }}\" alt=\"\"/>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"add_item col-lg-12\">\r\n            <a href=\"javascript:;\" (click)=\"addProduct(index)\"><i class=\"fa fa-plus-circle\"></i>Add item</a>\r\n        </div>\r\n\r\n       </div>\r\n    </div>\r\n</div>\r\n       <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n         <div class=\"addproduct-btn\">\r\n          <a class=\"addproduct-btn-bg\" href=\"javascript:;\" (click)=\"setToLocalStorage();ShopAgain() \" routerLink=\"/buyNow\"><span>Add More Product</span></a>\r\n          <button href=\"javascript:;\" (click)=\"setToLocalStorage();postOrder()\" style=\"background: transparent;vertical-align: top;\"><span>Show price in PRK</span></button>\r\n         </div>\r\n        </div>\r\n       </div>\r\n    \r\n     </div>\r\n     \r\n\r\n     \r\n     </div>\r\n    </div>\r\n   </div>\r\n   \r\n<modal #AddvertiseModal>\r\n    <modal-header style=\"text-align: center\">\r\n        <h4 class=\"modal-title\" style=\"width: 100%\">\r\n            Promotions\r\n        </h4>\r\n        <a href=\"javaScript:void(0)\" (click)=\"closeModal()\" class=\"modal-icon\">\r\n            <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\r\n        </a>\r\n    </modal-header>\r\n    <modal-body style=\"text-align: center\">\r\n        <!--if you buy {{itemsLength+1}} items then you will get 30% discount-->\r\n        Buy it yourself and let us ship it with 100% cash on delivery! {{specialOffer |currency:'USD':false:'1.2'}}\r\n\r\n    </modal-body>\r\n    <modal-footer>\r\n        <button class=\"btn btn-mod btn-round btn-medium\" (click)=\"closeModal();addItem();\" style=\"margin: 0;margin-right: 5px\">\r\n                            Yes\r\n                    </button>\r\n        <button class=\"btn btn-mod btn-round btn-medium\" (click)=\"closeModal();gotoBill()\" style=\"margin: 0\">\r\n                            No\r\n                    </button>\r\n    </modal-footer>\r\n\r\n</modal>\r\n\r\n<modal #Contactmodal>\r\n    <modal-header style=\"text-align: center\">\r\n        <h4 class=\"modal-title\" style=\"width: 100%\">Contact Us</h4>\r\n        <a href=\"javaScript:void(0)\" (click)=\"Contactmodal.close()\" class=\"modal-icon\">\r\n            <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\r\n        </a>\r\n    </modal-header>\r\n    <modal-body>\r\n        <div id=\"alert-modal-contact\"></div>\r\n        <form class=\"form contact-form\" [formGroup]=\"contactForm\" (ngSubmit)=\"PostMessage(contactForm.value)\">\r\n            <div class=\"clearfix\">\r\n\r\n                <div class=\"cf-left-col\">\r\n\r\n                    <div class=\"form-group\" [ngClass]=\"{'has-error':!contactForm.controls['name'].valid && contactForm.controls['name'].touched}\">\r\n                        <input type=\"text\" [formControl]=\"contactForm.controls['name']\" name=\"name\" id=\"name\" class=\"input-sm round form-control\"\r\n                            placeholder=\"Name\" pattern=\".{3,100}\" required>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\" [ngClass]=\"{'has-error':!contactForm.controls['email'].valid && contactForm.controls['email'].touched}\">\r\n                        <input type=\"email\" [formControl]=\"contactForm.controls['email']\" name=\"email\" id=\"email\" class=\"input-sm round form-control\"\r\n                            placeholder=\"Email\" pattern=\".{5,100}\" required>\r\n                    </div>\r\n                    <div class=\"form-group\" [ngClass]=\"{'has-error':!contactForm.controls['phoneNo'].valid && contactForm.controls['phoneNo'].touched}\">\r\n                        <input type=\"text\" [formControl]=\"contactForm.controls['phoneNo']\" name=\"PhoneNo\" id=\"PhoneNo\" class=\"input-sm round form-control\"\r\n                            placeholder=\"Phone Number\" pattern=\".{5,100}\" required>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"cf-right-col\">\r\n\r\n                    <div class=\"form-group\" [ngClass]=\"{'has-error':!contactForm.controls['message'].valid && contactForm.controls['message'].touched}\">\r\n                        <textarea name=\"message\" [formControl]=\"contactForm.controls['message']\" id=\"message\" class=\"input-md round form-control\"\r\n                            style=\"height: 115px;\" placeholder=\"Message\"></textarea>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n            <hr/>\r\n            <div class=\"clearfix\">\r\n\r\n                <div class=\"cf-left-col\">\r\n\r\n                    <div class=\"form-tip pt-20\">\r\n                        <i class=\"fa fa-info-circle\"></i> All the fields are required\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"cf-right-col\">\r\n\r\n                    <div class=\"align-right pt-10\">\r\n                        <button type=\"submit\" class=\"submit_btn btn btn-mod btn-medium btn-round\" id=\"submit_btn\" [disabled]=\"!contactForm.valid\">Submit Message</button>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n            <div id=\"result\"></div>\r\n        </form>\r\n    </modal-body>\r\n\r\n</modal>"

/***/ }),

/***/ 1427:
/***/ (function(module, exports) {

module.exports = "<app-spinner></app-spinner>\n<section class=\"page-section\" (click)=\"closeMenu()\">\n\n    <div class=\"whatweare_sec\">\n        <div class=\"container\">\n         <div class=\"row\">\n         \n         <div class=\"whatweare_caption wow fadeInDown\">\n          <h2>what are we <span>buying today?</span></h2>\n         </div>\n         \n         </div>\n         \n         <div class=\"row\">\n          <div class=\"col-md-7 col-xs-offset-2\">\n           <div class=\"row\">\n          <div class=\"inner_service wow fadeInDown\">\n          \n           <div class=\"col-md-6\">\n            <div class=\"inner_service_box\">\n             <ul>\n            <li><span class=\"icon1\"><img src=\"assets/images/icon1.png\" alt=\"\"/></span>\n            <a href=\"javascript:;\" data-hover=\"Women’s Apparel\">Women’s Apparel</a>\n             <div class=\"list-item\">\n              <ul>\n               <li *ngFor=\"let item of items\" >\n                 <a *ngIf=\"item.parent_cat == 'women'\" (click)=\"onClick(item);qty=1;EndShopping();\" href=\"javascript:;\" >{{item.name}}</a>\n               </li>\n              </ul>\n              </div>\n            </li>\n            <li><span class=\"icon2\"><img src=\"assets/images/icon2.png\" alt=\"\"/></span>\n            <a href=\"javascript:;\">Baby/kids Apparel</a>\n            <div class=\"list-item\">\n              <ul>\n                  <li *ngFor=\"let item of items\" >\n                    <a *ngIf=\"item.parent_cat == 'kid'\" (click)=\"onClick(item);qty=1;EndShopping();\" href=\"javascript:;\" >{{item.name}}</a>\n                  </li> \n              </ul>\n              </div>\n            </li>\n             <li><span class=\"icon6\"><img src=\"assets/images/icon6.png\" alt=\"\"/></span><a href=\"javascript:;\">Others</a>\n              <div class=\"list-item\">\n              <ul>\n                  <li *ngFor=\"let item of items\" >\n                    <a *ngIf=\"item.parent_cat == 'other'\" (click)=\"onClick(item);qty=1;EndShopping();\" href=\"javascript:;\" >{{item.name}}</a>\n                  </li> \n              </ul>\n              </div>\n            </li>\n         \n           </ul>\n            </div>\n           </div>\n           \n             <div class=\"col-md-6\">\n            <div class=\"inner_service_box\">\n             <ul>\n            <li><span class=\"icon4\"><img src=\"assets/images/icon4.png\" alt=\"\"/></span><a href=\"javascript:;\">Men’s Apparel</a>\n             <div class=\"list-item\">\n              <ul>\n                  <li *ngFor=\"let item of items\" >\n                    <a *ngIf=\"item.parent_cat == 'men'\" (click)=\"onClick(item);qty=1;EndShopping();\" href=\"javascript:;\" >{{item.name}}</a>\n                  </li> \n              </ul>\n              </div>\n            </li>\n            <li><span class=\"icon5\"><img src=\"assets/images/icon5.png\" alt=\"\"/></span><a href=\"javascript:;\">Cosmetics</a>\n               <div class=\"list-item\">\n              <ul>\n                  <li *ngFor=\"let item of items\" >\n                    <a *ngIf=\"item.parent_cat == 'cosmetic'\" (click)=\"onClick(item);qty=1;EndShopping();\" href=\"javascript:;\" >{{item.name}}</a>\n                  </li> \n              </ul>\n              </div>\n            </li>\n           \n           </ul>\n            </div>\n           </div>\n           \n          </div>\n          \n          </div>\n       \n         </div>\n         \n        </div>\n        <div class=\"cant-btn\">\n            <a href=\"javascript:;\" class=\"btn btn-default\" (click)=\"contactUs.open()\"><span>Can't Find My Product</span></a>\n          </div>\n         </div>\n       </div>\n       \n\n\n\n\n\n\n\n\n\n\n  <!--<div class=\"container relative\">\n\n    <h2 class=\"section-title font-alt mb-70 mb-sm-40\">\n      What are we buying today?\n    </h2>\n\n\n    <div class=\"row multi-columns-row alt-features-grid\">\n      <div class=\"col-xs-6 col-sm-6 col-md-2 col-lg-2\" *ngFor=\"let item of items\">\n        <div class=\"alt-features-item align-center item\" (click)=\"onClick(item);qty=1;EndShopping();\">\n          <div class=\"alt-features-icon\">\n            <img src=\"{{item.image}}\" alt=\"Work\" *ngIf=\"item.image != undefined\" class=\"item-img\" />\n            <i class=\"fa fa-question\" aria-hidden=\"true\" *ngIf=\"item.image == undefined\"></i>\n          </div>\n          <h3 class=\"alt-features-title font-alt\" style=\"font-size: 11px\">{{item.name}}</h3>\n          <div class=\"alt-features-descr align-left\">\n\n          </div>\n        </div>\n      </div>\n    </div>\n    \n    <div style=\"margin-top: 20px\">\n      <a href=\"javaScript:void(0)\" class=\"btn btn-mod btn-border btn-circle btn-medium\" (click)=\"contactUs.open()\">Can't find my Product</a>\n    </div>\n  </div> -->\n\n</section>\n<modal #contactUs>\n  <modal-header style=\"text-align: center\">\n    <h4 class=\"modal-title\" style=\"width: 100%\">Contact Us</h4>\n    <a href=\"javaScript:void(0)\" (click)=\"contactUs.close()\" class=\"modal-icon\">\n            <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n        </a>\n  </modal-header>\n  <modal-body>\n    <div id=\"modal-alert\"></div>\n    <form class=\"form contact-form\" [formGroup]=\"contactForm\" (ngSubmit)=\"PostMessage(contactForm.value)\">\n      <div class=\"clearfix\">\n\n        <div class=\"cf-left-col\">\n\n          <div class=\"form-group\" [ngClass]=\"{'has-error':!contactForm.controls['name'].valid && contactForm.controls['name'].touched}\">\n            <input type=\"text\" [formControl]=\"contactForm.controls['name']\" name=\"name\" id=\"name\" class=\"input-sm round form-control\"\n              placeholder=\"Name\" pattern=\".{3,100}\" required>\n          </div>\n\n          <div class=\"form-group\" [ngClass]=\"{'has-error':!contactForm.controls['email'].valid && contactForm.controls['email'].touched}\">\n            <input type=\"email\" [formControl]=\"contactForm.controls['email']\" name=\"email\" id=\"email\" class=\"input-sm round form-control\"\n              placeholder=\"Email\" pattern=\".{5,100}\" required>\n          </div>\n          <div class=\"form-group\" [ngClass]=\"{'has-error':!contactForm.controls['phoneNo'].valid && contactForm.controls['phoneNo'].touched}\">\n            <input type=\"text\" [formControl]=\"contactForm.controls['phoneNo']\" name=\"PhoneNo\" id=\"PhoneNo\" class=\"input-sm round form-control\"\n              placeholder=\"Phone Number\" pattern=\".{5,100}\" required>\n          </div>\n\n        </div>\n\n        <div class=\"cf-right-col\">\n\n          <div class=\"form-group\" [ngClass]=\"{'has-error':!contactForm.controls['message'].valid && contactForm.controls['message'].touched}\">\n            <textarea name=\"message\" [formControl]=\"contactForm.controls['message']\" id=\"message\" class=\"input-md round form-control\"\n              style=\"height: 115px;\" placeholder=\"Message\"></textarea>\n          </div>\n\n        </div>\n\n      </div>\n      <hr/>\n      <div class=\"clearfix\">\n\n        <div class=\"cf-left-col\">\n\n          <div class=\"form-tip pt-20\">\n            <i class=\"fa fa-info-circle\"></i> All the fields are required\n          </div>\n\n        </div>\n\n        <div class=\"cf-right-col\">\n\n          <div class=\"align-right pt-10\">\n            <button type=\"submit\" class=\"submit_btn btn btn-mod btn-medium btn-round\" id=\"submit_btn\" [disabled]=\"!contactForm.valid\">Submit Message</button>\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n      <div id=\"result\"></div>\n    </form>\n  </modal-body>\n\n</modal>"

/***/ })

});
//# sourceMappingURL=2.chunk.js.map