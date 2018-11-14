"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const dataprovider_1 = require("../dataprovider/dataprovider");
let using = require('jasmine-data-provider');
using(dataprovider_1.DataProvider.Common, function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        describe('XYZ Bank Bank manager', function () {
            it('Open XYZ Bank and Verify Title', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield protractor_1.browser.get(data.testUrl);
                    var gettitle = protractor_1.browser.getTitle();
                    expect(gettitle.toEqual('XYZ Bank'));
                }
                catch (error) {
                    console.log(error);
                }
            }));
            it('Click on Bank Manager Button', () => __awaiter(this, void 0, void 0, function* () {
                //expect(browser.getTitle().toEqual('test'));
                const BankcustLoginClick = protractor_1.element(protractor_1.by.xpath("//button[@ng-click = 'manager()']"));
                yield protractor_1.browser.wait(BankcustLoginClick, 5 * 3000, "start in 5 seconds");
                //await BankcustLoginClick.click();
                if (BankcustLoginClick.isDisplayed()) {
                    debugger;
                    yield BankcustLoginClick.click();
                }
                else {
                    console.log('Login Button NOT DISPLAYED');
                }
            }));
            it('Click on Add Customer button', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const clickAddCustomer = protractor_1.element(protractor_1.by.xpath("//button[@ng-click ='addCust()']"));
                    if (clickAddCustomer.isDisplayed()) {
                        yield clickAddCustomer.click();
                    }
                    else {
                        console.log("element not present");
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
            it('Add first name', () => __awaiter(this, void 0, void 0, function* () {
                var firstName = protractor_1.element(protractor_1.by.xpath("//input[@ng-model='fName']"));
                //await firstName.sendKeys('Roshan');
                //another way of writing .then is handling promise 
                firstName.sendKeys(data.firstname).then(null, function (error) {
                    console.log(error);
                });
            }));
            it('Add last name', () => __awaiter(this, void 0, void 0, function* () {
                var lastName = protractor_1.element(protractor_1.by.xpath("//input[@ng-model='lName']"));
                yield lastName.sendKeys(data.lastname);
            }));
            it('Add postal code', () => __awaiter(this, void 0, void 0, function* () {
                var postCode = protractor_1.element(protractor_1.by.xpath("//input[@ng-model='postCd']"));
                yield postCode.sendKeys(data.postalcode);
            }));
            it('Click on Add Customer button to submit', () => __awaiter(this, void 0, void 0, function* () {
                var ClickTogenerateCustomerID = protractor_1.element(protractor_1.by.xpath("//button[@type='submit']"));
                yield ClickTogenerateCustomerID.click();
            }));
            //read alert
            it('Read alert', () => __awaiter(this, void 0, void 0, function* () {
                var alrertDialog = protractor_1.browser.switchTo().alert();
                yield expect(alrertDialog.accept).toBeDefined();
                alrertDialog.getText().then((text) => {
                    console.log(text);
                });
            }));
        });
    });
});
//# sourceMappingURL=hw.js.map