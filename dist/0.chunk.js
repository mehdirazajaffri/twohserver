webpackJsonp([0,8],{

/***/ 1398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_routing__ = __webpack_require__(1410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_index__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_facebook_sdk__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_facebook_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_facebook_sdk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bootstrap__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__apiServices_auth_service__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__apiServices_global_service__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__apiServices_auth_interceptor_service__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__apiServices_spinner_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__apiServices_api_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__index__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_website_name_pipe__ = __webpack_require__(1412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_http_interceptor__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__spinner_spinner_module__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__profile_profile_component__ = __webpack_require__(1403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__orders_orders_component__ = __webpack_require__(1401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__apiServices_nav_scroll_service__ = __webpack_require__(74);
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
                __WEBPACK_IMPORTED_MODULE_19__profile_profile_component__["a" /* ProfileComponent */], __WEBPACK_IMPORTED_MODULE_20__orders_orders_component__["a" /* OrdersComponent */], __WEBPACK_IMPORTED_MODULE_15__pipes_website_name_pipe__["a" /* WebsiteNamePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common_index__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_18__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_bootstrap__["b" /* AccordionModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7_ng2_bs3_modal_ng2_bs3_modal__["Ng2Bs3ModalModule"],
                __WEBPACK_IMPORTED_MODULE_13__angular_router__["a" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_0__lazy_routing__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_14__index__["a" /* SDKBrowserModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_16_angular2_http_interceptor__["a" /* HttpInterceptorModule */].withInterceptors([{
                        provide: __WEBPACK_IMPORTED_MODULE_16_angular2_http_interceptor__["b" /* HttpInterceptor */],
                        useClass: __WEBPACK_IMPORTED_MODULE_10__apiServices_auth_interceptor_service__["a" /* AuthInterceptorService */],
                        multi: true
                    }]),
                __WEBPACK_IMPORTED_MODULE_18__angular_forms__["b" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_17__spinner_spinner_module__["a" /* SpinnerModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5_ng2_facebook_sdk__["FacebookService"],
                __WEBPACK_IMPORTED_MODULE_9__apiServices_global_service__["a" /* GlobalService */],
                __WEBPACK_IMPORTED_MODULE_10__apiServices_auth_interceptor_service__["a" /* AuthInterceptorService */], __WEBPACK_IMPORTED_MODULE_11__apiServices_spinner_service__["a" /* SpinnerService */], __WEBPACK_IMPORTED_MODULE_12__apiServices_api_service__["a" /* ApiService */],
                __WEBPACK_IMPORTED_MODULE_8__apiServices_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_21__apiServices_nav_scroll_service__["a" /* NavScrollService */],
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

/***/ 1401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apiServices_nav_scroll_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrdersComponent = (function () {
    function OrdersComponent(spinner, Api, router, navScrollService) {
        this.spinner = spinner;
        this.Api = Api;
        this.router = router;
        this.navScrollService = navScrollService;
        if (localStorage.getItem('user') != undefined)
            document.getElementById('order').setAttribute('class', '');
        var nav = document.getElementsByClassName('main-nav')[0];
        if (window.innerWidth < 800) {
            nav.setAttribute('class', 'main-nav dark stick-fixed mobile-on');
        }
        else {
            nav.setAttribute('class', 'main-nav dark stick-fixed');
        }
        this.getOrders();
    }
    OrdersComponent.prototype.getOrders = function () {
        var _this = this;
        this.Api.getOrders()
            .subscribe(function (data) {
            _this.spinner.stop();
            console.log("User Orders", data);
            _this.orders = data.data;
        }, function (err) {
            console.log(err);
            _this.onError401(err);
        });
    };
    OrdersComponent.prototype.closeMenu = function () {
        if (document.getElementById('cart-list').style.display != 'none')
            document.getElementById('cart-list').style.display = 'none';
        if (document.getElementById('user-details').style.display != 'none')
            document.getElementById('user-details').style.display = 'none';
        console.log('closeMenu');
    };
    OrdersComponent.prototype.onError401 = function (err) {
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
    OrdersComponent.prototype.ngOnInit = function () {
        this.navScrollService.setNav();
    };
    OrdersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-orders',
            template: __webpack_require__(1422),
            styles: [__webpack_require__(1414)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__["a" /* SpinnerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__apiServices_spinner_service__["a" /* SpinnerService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__["a" /* ApiService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__apiServices_api_service__["a" /* ApiService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__apiServices_nav_scroll_service__["a" /* NavScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__apiServices_nav_scroll_service__["a" /* NavScrollService */]) === 'function' && _d) || Object])
    ], OrdersComponent);
    return OrdersComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/orders.component.js.map

/***/ }),

/***/ 1403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apiServices_api_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apiServices_spinner_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apiServices_nav_scroll_service__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileComponent = (function () {
    function ProfileComponent(formBuilder, router, Api, spinner, navScrollService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.Api = Api;
        this.spinner = spinner;
        this.navScrollService = navScrollService;
        if (localStorage.getItem('user') != null)
            this.user = JSON.parse(localStorage.getItem('user'));
        this.complexForm = formBuilder.group({
            first_Name: [this.user.firstName, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            last_Name: [this.user.lastName, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            username: [this.user.displayName, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            Email: [this.user.email, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
            PhoneNo: [this.user.phone, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            Date: [this.user.dob, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            address: [this.user.address, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
        });
        this.url = this.router.url;
        console.log(this.url);
    }
    ProfileComponent.prototype.editProfile = function (newProfile) {
        var _this = this;
        console.log(newProfile);
        var obj = {
            _id: this.user._id,
            firstName: newProfile.first_Name,
            lastName: newProfile.last_Name,
            email: newProfile.Email,
            username: newProfile.username,
            dob: newProfile.Date,
            phone: newProfile.PhoneNo,
            address: newProfile.address
        };
        this.Api.editUser(obj)
            .subscribe(function (data) {
            console.log(data);
            _this.spinner.stop();
            _this.user = data;
            document.getElementById('editMsg').innerHTML = '<div class="alert alert-success">Successfully Edited</div>';
            localStorage.setItem('user', JSON.stringify(data));
        }, function (err) {
            console.log(err);
            document.getElementById('editMsg').innerHTML = '<div class="alert alert-danger">' + JSON.parse(err._body).message + '</div>';
            _this.spinner.stop();
            _this.onError401(err);
        });
    };
    ProfileComponent.prototype.closeMenu = function () {
        if (document.getElementById('cart-list').style.display != 'none')
            document.getElementById('cart-list').style.display = 'none';
        if (document.getElementById('user-details').style.display != 'none')
            document.getElementById('user-details').style.display = 'none';
        console.log('closeMenu');
    };
    ProfileComponent.prototype.onError401 = function (err) {
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
    ProfileComponent.prototype.ngOnInit = function () {
        this.navScrollService.setNav();
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(1424),
            styles: [__webpack_require__(1416)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormBuilder */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__apiServices_api_service__["a" /* ApiService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__apiServices_api_service__["a" /* ApiService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__apiServices_spinner_service__["a" /* SpinnerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__apiServices_spinner_service__["a" /* SpinnerService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__apiServices_nav_scroll_service__["a" /* NavScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__apiServices_nav_scroll_service__["a" /* NavScrollService */]) === 'function' && _e) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/profile.component.js.map

/***/ }),

/***/ 1410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile_component__ = __webpack_require__(1403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__orders_orders_component__ = __webpack_require__(1401);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__profile_profile_component__["a" /* ProfileComponent */] },
    { path: 'orders', component: __WEBPACK_IMPORTED_MODULE_2__orders_orders_component__["a" /* OrdersComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(routes);
//# sourceMappingURL=D:/studio/twohonline/web/src/lazy.routing.js.map

/***/ }),

/***/ 1412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebsiteNamePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WebsiteNamePipe = (function () {
    function WebsiteNamePipe() {
    }
    WebsiteNamePipe.prototype.transform = function (value, args) {
        // let limit = (args && args[0])? parseInt(args[0]):25
        // if(value)
        //   return value.substring(0,limit)+"...";
        if (value) {
            var a = value.indexOf('.');
            var b = value.indexOf('.', a + 1);
            return value.substring(a + 1, b);
        }
    };
    WebsiteNamePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'websiteName'
        }), 
        __metadata('design:paramtypes', [])
    ], WebsiteNamePipe);
    return WebsiteNamePipe;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/website-name.pipe.js.map

/***/ }),

/***/ 1414:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".page-section{\r\n    min-height: 800px;\r\n    margin-top: 50px\r\n}\r\np{\r\n    margin: 5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1416:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".page-section{\r\n    min-height: 800px;\r\n    margin-top: 50px\r\n}\r\n.card-header{\r\n    background-color: black;\r\n    color: white;\r\n    margin: 0;\r\n}\r\n.modal {\r\n    position: fixed;\r\n    top: 70%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    width: 100%;\r\n    height: 100%\r\n}\r\n.user-img{\r\n    height: 40px;\r\n    width: 40px;\r\n}\r\n.has-error{\r\n    border: 1px solid red;\r\n}\r\n.profile-page{\r\n    margin: 0;\r\n    padding: 0;\r\n    min-height: 200px;\r\n    text-align: left;\r\n}\r\n.profile-page-card{\r\n    border: none;\r\n}\r\n.row{\r\n    margin: 20px 0;\r\n}\r\n.bill-page>.row{\r\n    margin: 10px 0;\r\n}\r\n.card-header{\r\n    text-align: center;\r\n}\r\n.col-6{\r\n    margin: -1px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1422:
/***/ (function(module, exports) {

module.exports = "<app-spinner></app-spinner>\r\n<section class=\"page-section\" id=\"order\" (click)=\"closeMenu()\">\r\n    <div class=\"container relative \">\r\n\r\n        <h2 class=\"section-title font-alt mb-70 mb-sm-40\">\r\n            Your Previous Orders\r\n        </h2>\r\n        <div class=\"order-panel\">\r\n            <accordion [closeOthers]=\"true\">\r\n                <accordion-group *ngFor=\"let order of orders;let i=index\" heading=\"Order {{i+1}}\" id=\"config-panel-{{i+1}}\">\r\n\r\n                    <table class=\"table shopping-cart-table \">\r\n                        <tr>\r\n                            <th>\r\n                                Brand\r\n                            </th>\r\n                            <th>\r\n                                Quantity\r\n                            </th>\r\n                            <th>\r\n                                Shipping\r\n                            </th>\r\n                            <th>\r\n                                Price\r\n                            </th>\r\n\r\n                        </tr>\r\n                        <tbody>\r\n\r\n                            <tr *ngFor=\"let item of order.items;\">\r\n                                <td>\r\n                                    <a href=\"{{item.url}}\" target=\"_blank\">{{item.url | websiteName}} </a>\r\n                                </td>\r\n                                <td>\r\n\r\n                                    {{item.quantity}}\r\n                                </td>\r\n                                <td>\r\n                                    {{item.shipping_charges}}\r\n                                </td>\r\n                                <td>\r\n                                    {{item.price}}\r\n                                </td>\r\n\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                    <hr />\r\n                    <p>Order Number : {{order.order_number}}</p>\r\n                    <p>Order Status : {{order.order_status}}</p>\r\n                    <p>Total Amount of the Cart : <strong>{{order.total_amount|currency:'USD':true}}</strong></p>\r\n                    <p>Total Shipping from US to Pak : <strong>{{order.total_shipping|currency:'USD':true}}</strong></p>\r\n                    <p *ngIf='order.brand_shipping != undefined'>Brand Shipping : <strong>{{order.brand_shipping|currency:'USD':true}}</strong></p>\r\n                    <p>Taxes : <strong>{{order.tax|currency:'USD':true:'1.2'}}</strong> </p>\r\n                    <p>Service Charges : <strong>{{order.service_charges|currency:'USD':true}}</strong></p>\r\n                    <p> Total (USD) : <strong>{{order.grand_total|currency:'USD':true}}</strong></p>\r\n                    <p class=\"mb-10\">Delivery Charges from US to Pak : <strong>{{order.delivery_charges|currency:'PKR':true}}</strong></p>\r\n                    <p class=\"imp-bill mt-0\"> Total (PKR) : <strong>{{order.price_pkr|currency:'PKR':true}}</strong></p>\r\n                    <p class=\"mt-0\"> Security Deposit : <strong>{{order.security_deposit|currency:'PKR':true}}</strong></p>\r\n                    <p class=\"mt-0\"> Cash On Delivery : <strong>{{order.cod|currency:'PKR':true}}</strong></p>\r\n                    <p>If any of products run out of stock or if the price changes:\r\n                        <span *ngIf=\"order.contact_me_if_no_items\">Contact Me</span>\r\n                        <span *ngIf=\"order.purchase_whatever_available\">Purchase whatever is available</span>\r\n                    </p>\r\n\r\n\r\n\r\n\r\n                </accordion-group>\r\n            </accordion>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n</section>"

/***/ }),

/***/ 1424:
/***/ (function(module, exports) {

module.exports = "<app-spinner></app-spinner>\r\n<section class=\"page-section\" [ngClass]=\"{'profile-page':url == '/bill'}\" (click)=\"closeMenu()\">\r\n    <div [ngClass]=\"{'container relative':url != '/bill'}\">\r\n\r\n        <!--<h2 class=\"section-title font-alt mb-70 mb-sm-40\">\r\n            Profile\r\n        </h2>-->\r\n\r\n\r\n        <div class=\"card\" [ngClass]=\"{'profile-page-card':url == '/bill'}\">\r\n            <h3 class=\"card-header\">Personal Information</h3>\r\n            <div class=\"card-block\">\r\n                <div class=\"card-text\" [ngClass]=\"{'bill-page':url == '/bill'}\">\r\n                    <!--<p>\r\n                        Profile Picture : \r\n                        <img src=\"{{user.profileImageURL}}\" class=\"user-img img-circle\">\r\n                        \r\n                        <button type=\"button\" class=\"btn btn-mod btn-small btn-round\" (click)=\"ImageModal.open()\">Edit</button>\r\n                     </p>-->\r\n\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">Username : </div>\r\n                        <div class=\"col-6\">{{user.displayName}}</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">First Name : </div>\r\n                        <div class=\"col-6\">{{user.firstName}}</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">Last Name : </div>\r\n                        <div class=\"col-6\">{{user.lastName}}</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">Email : </div>\r\n                        <div class=\"col-6\" style=\"text-transform: none\">{{user.email}}</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">Phone :</div>\r\n                        <div class=\"col-6\">{{user.phone}}</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">Gender : </div>\r\n                        <div class=\"col-6\">{{user.gender}}</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">Date Of Birth : </div>\r\n                        <div class=\"col-6\">{{user.dob}}</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-6\">Address : </div>\r\n                        <div class=\"col-6\">{{user.address}}</div>\r\n                    </div>\r\n                    <div style=\"text-align: center\">\r\n                        <button type=\"button\" class=\"btn btn-mod btn-medium btn-round\" (click)=\"editProfileModal.open()\">Edit Profile</button>\r\n                    </div>\r\n                    <div id=\"editMsg\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</section>\r\n<modal #editProfileModal>\r\n    <modal-header>\r\n        <h4 class=\"modal-title\">Personal Information</h4>\r\n        <a href=\"javaScript:void(0)\" (click)=\"editProfileModal.close()\" class=\"modal-icon\"><i class=\"fa fa-times\" aria-hidden=\"true\"  ></i></a>\r\n    </modal-header>\r\n    <modal-body style=\"text-align: center\">\r\n        <form class=\"form contact-form\" id=\"contact_form\" [formGroup]=\"complexForm\" (ngSubmit)=\"editProfile(complexForm.value)\">\r\n            <div class=\"clearfix\">\r\n                <div class=\"form-group\" [ngClass]=\"{'has-error':!complexForm.controls['first_Name'].valid && complexForm.controls['first_Name'].touched}\">\r\n                    <input type=\"text\" [formControl]=\"complexForm.controls['first_Name']\" class=\"input-md round form-control\" placeholder=\"FirstName\">\r\n                </div>\r\n                <div class=\"form-group\" [ngClass]=\"{'has-error':!complexForm.controls['last_Name'].valid && complexForm.controls['last_Name'].touched}\">\r\n                    <input type=\"text\" [formControl]=\"complexForm.controls['last_Name']\" class=\"input-md round form-control\" placeholder=\"LastName\">\r\n                </div>\r\n                <div class=\"form-group\" [ngClass]=\"{'has-error':!complexForm.controls['username'].valid && complexForm.controls['username'].touched}\">\r\n                    <input type=\"text\" [formControl]=\"complexForm.controls['username']\" class=\"input-md round form-control\" placeholder=\"Username\">\r\n                </div>\r\n\r\n                <div class=\"form-group\" [ngClass]=\"{'has-error':!complexForm.controls['Email'].valid && complexForm.controls['Email'].touched}\">\r\n                    <input type=\"text\" [formControl]=\"complexForm.controls['Email']\" class=\"input-md round form-control\" placeholder=\"Email\"\r\n                        required>\r\n                </div>\r\n\r\n                <div class=\"form-group\" [ngClass]=\"{'has-error':!complexForm.controls['PhoneNo'].valid && complexForm.controls['PhoneNo'].touched}\">\r\n                    <input type=\"text\" [formControl]=\"complexForm.controls['PhoneNo']\" class=\"input-md round form-control\" placeholder=\"Phone Number\">\r\n                </div>\r\n\r\n                <div class=\"form-group\" [ngClass]=\"{'has-error':!complexForm.controls['Date'].valid && complexForm.controls['Date'].touched}\">\r\n                    <input type=\"date\" [formControl]=\"complexForm.controls['Date']\" class=\"input-md round form-control\" placeholder=\"Date Of Birth\">\r\n                </div>\r\n                <div class=\"form-group\" [ngClass]=\"{'has-error':!complexForm.controls['address'].valid && complexForm.controls['address'].touched}\">\r\n                    <input type=\"text\" [formControl]=\"complexForm.controls['address']\" class=\"input-md round form-control\" placeholder=\"Address\">\r\n                </div>\r\n\r\n\r\n            </div>\r\n\r\n            <div class=\"pt-10\">\r\n                <button class=\"submit_btn btn btn-mod btn-medium btn-round btn-full\" id=\"reg-btn\" type=\"submit\" [disabled]=\"!complexForm.valid\"\r\n                    (click)=\"editProfileModal.close()\">Edit</button>\r\n            </div>\r\n\r\n\r\n        </form>\r\n\r\n\r\n\r\n    </modal-body>\r\n\r\n</modal>\r\n<modal #ImageModal>\r\n    <modal-header class=\"editProfileModal-header\">\r\n        <h4 class=\"modal-title\" style=\"width: 100%\">Profile Picture</h4>\r\n    </modal-header>\r\n    <modal-body style=\"text-align: center\">\r\n        <!--<input type=\"file\" ng2FileSelect [uploader]=\"uploader\"/>-->\r\n\r\n\r\n    </modal-body>\r\n\r\n</modal>"

/***/ })

});
//# sourceMappingURL=0.chunk.js.map