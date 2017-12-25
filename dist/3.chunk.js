webpackJsonp([3,8],{

/***/ 1396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__faq_routing__ = __webpack_require__(1408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_index__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__faq_component__ = __webpack_require__(1400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__policy_policy_component__ = __webpack_require__(1402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__spinner_spinner_module__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__apiServices_nav_scroll_service__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqModule", function() { return FaqModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FaqModule = (function () {
    function FaqModule() {
    }
    FaqModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__faq_component__["a" /* FaqComponent */], __WEBPACK_IMPORTED_MODULE_6__policy_policy_component__["a" /* PolicyComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common_index__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_0__faq_routing__["a" /* routing */], __WEBPACK_IMPORTED_MODULE_7__spinner_spinner_module__["a" /* SpinnerModule */]
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_common__["LocationStrategy"], useClass: __WEBPACK_IMPORTED_MODULE_2__angular_common__["PathLocationStrategy"] },
                __WEBPACK_IMPORTED_MODULE_8__apiServices_nav_scroll_service__["a" /* NavScrollService */]
            ],
            bootstrap: []
        }), 
        __metadata('design:paramtypes', [])
    ], FaqModule);
    return FaqModule;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/faq.module.js.map

/***/ }),

/***/ 1400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiServices_nav_scroll_service__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FaqComponent = (function () {
    function FaqComponent(navScrollService) {
        this.navScrollService = navScrollService;
    }
    FaqComponent.prototype.ngOnInit = function () {
        this.navScrollService.setNav();
    };
    FaqComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-faq',
            template: __webpack_require__(1421),
            styles: [__webpack_require__(1413)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__apiServices_nav_scroll_service__["a" /* NavScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__apiServices_nav_scroll_service__["a" /* NavScrollService */]) === 'function' && _a) || Object])
    ], FaqComponent);
    return FaqComponent;
    var _a;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/faq.component.js.map

/***/ }),

/***/ 1402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiServices_nav_scroll_service__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolicyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PolicyComponent = (function () {
    function PolicyComponent(navScrollService) {
        this.navScrollService = navScrollService;
    }
    PolicyComponent.prototype.ngOnInit = function () {
        this.navScrollService.setNav();
    };
    PolicyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-policy',
            template: __webpack_require__(1423),
            styles: [__webpack_require__(1415)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__apiServices_nav_scroll_service__["a" /* NavScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__apiServices_nav_scroll_service__["a" /* NavScrollService */]) === 'function' && _a) || Object])
    ], PolicyComponent);
    return PolicyComponent;
    var _a;
}());
//# sourceMappingURL=D:/studio/twohonline/web/src/policy.component.js.map

/***/ }),

/***/ 1408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__faq_component__ = __webpack_require__(1400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__policy_policy_component__ = __webpack_require__(1402);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });



var routes = [
    { path: 'faq', component: __WEBPACK_IMPORTED_MODULE_1__faq_component__["a" /* FaqComponent */] },
    { path: 'policy', component: __WEBPACK_IMPORTED_MODULE_2__policy_policy_component__["a" /* PolicyComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(routes);
//# sourceMappingURL=D:/studio/twohonline/web/src/faq.routing.js.map

/***/ }),

/***/ 1413:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1415:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1421:
/***/ (function(module, exports) {

module.exports = "<!-- Head Section -->\r\n<app-spinner></app-spinner>\r\n\r\n<div class=\"heading_caption\">\r\n    <div class=\"container\">\r\n     \r\n     <div class=\"row\">\r\n      <h2>FAQ</h2>\r\n     </div>\r\n     \r\n    </div>\r\n   </div>\r\n   \r\n   \r\n   <div class=\"content_caption\">\r\n    <div class=\"container\">\r\n     <div class=\"row\">\r\n     \r\n        <h4 class=\"font-alt\">What do you mean by an End Product?</h4>\r\n        <p>\r\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula porttitor rutrum. Ut laoreet sodales rutrum.\r\n            Ut eget tristique nibh. Cras mattis est eget lacus dignissim, non consectetur velit pellentesque. Ut\r\n            sit amet placerat eros, id gravida arcu. Sed felis purus, tempor ac vestibulum nec, consectetur at purus.\r\n        </p>\r\n\r\n        <hr class=\"mb-30\" />\r\n\r\n        <h4 class=\"font-alt\">I have bought a product that has files missing, what do I do?</h4>\r\n        <p>\r\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula porttitor rutrum. Ut laoreet sodales rutrum.\r\n            Ut eget tristique nibh. Cras mattis est eget lacus dignissim, non consectetur velit pellentesque. Ut\r\n            sit amet placerat eros, id gravida arcu. Sed felis purus, tempor ac vestibulum nec, consectetur at purus.\r\n        </p>\r\n\r\n        <hr class=\"mb-30\" />\r\n\r\n        <h4 class=\"font-alt\">Do I need to buy a licence for each site?</h4>\r\n        <p>\r\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula porttitor rutrum. Ut laoreet sodales rutrum.\r\n            Ut eget tristique nibh. Cras mattis est eget lacus dignissim, non consectetur velit pellentesque. Ut\r\n            sit amet placerat eros, id gravida arcu. Sed felis purus, tempor ac vestibulum nec, consectetur at purus.\r\n        </p>\r\n\r\n        <hr class=\"mb-30\" />\r\n\r\n        <h4 class=\"font-alt\">Is my license transferable?</h4>\r\n        <p>\r\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula porttitor rutrum. Ut laoreet sodales rutrum.\r\n            Ut eget tristique nibh. Cras mattis est eget lacus dignissim, non consectetur velit pellentesque. Ut\r\n            sit amet placerat eros, id gravida arcu. Sed felis purus, tempor ac vestibulum nec, consectetur at purus.\r\n        </p>\r\n\r\n        <hr class=\"mb-30\" />\r\n\r\n        <h4 class=\"font-alt\">Can I incorporate advertising in my end product with a regular licence?</h4>\r\n        <p>\r\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula porttitor rutrum. Ut laoreet sodales rutrum.\r\n            Ut eget tristique nibh. Cras mattis est eget lacus dignissim, non consectetur velit pellentesque. Ut\r\n            sit amet placerat eros, id gravida arcu. Sed felis purus, tempor ac vestibulum nec, consectetur at purus.\r\n        </p>\r\n     \r\n     </div>\r\n    </div>\r\n   </div>\r\n"

/***/ }),

/***/ 1423:
/***/ (function(module, exports) {

module.exports = "<section class=\"page-section bg-dark-alfa-30 parallax-3\" data-background=\"images/full-width-images/section-bg-6.jpg\" style=\"background-color: black; margin-top: 50px\">\r\n  <div class=\"relative container align-left\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-8\">\r\n        <h1 class=\"hs-line-11 font-alt mb-20 mb-xs-0\">How can we help?</h1>\r\n      </div>\r\n      <div class=\"col-md-4 mt-30\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n<section class=\"page-section\">\r\n  <div class=\"container relative\">\r\n    <div class=\"row section-text\">\r\n      <div class=\"col-md-8 col-md-offset-2\">\r\n        <hr class=\"mb-30\" />\r\n        <h4 class=\"font-alt\">Delivery:</h4>\r\n        <p>\r\n          Our delivery time is between 25 to 30 days. In most cases, you you'd get your products within this time frame.\r\n        </p>\r\n        <p>Delivery time depends on when the brand ships your product to our warehouse in the United States. Most brands deliver\r\n          the products within 4-9 business days, however, the lead time may vary from brand to brand.</p>\r\n        <p>You can check the status of your order by logging into your customer profile and track the order. If you have any\r\n          other queries, please email us at contact@twohonlinestore.com.\r\n        </p>\r\n        <hr class=\"mb-30\" />\r\n        <h4 class=\"font-alt\">Return:</h4>\r\n        <p>\r\n          Returns are NOT ACCEPTED under any circumstances. Once the order is placed, it cannot be changed or returned.\r\n        </p>\r\n        <p>\r\n          Customers are responsible for communicating the correct sizes/colors of the products that they want to purchase. Two H will\r\n          not be responsible for any issues pertaining to incorrect size/color of the product communicated by the customers.</p>\r\n        <p>Orders once placed cannot be changed or cancelled. If in case the customer wants to cancel the order, the security\r\n          deposit will not be refunded.</p>\r\n        <hr class=\"mb-30\" />\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>"

/***/ })

});
//# sourceMappingURL=3.chunk.js.map