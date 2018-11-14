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
const addcustomer_1 = require("../Pages/addcustomer");
let jsd = require('../data/testData');
var customerdetails = new addcustomer_1.AddCustomer();
describe('XYZ Bank Bank manager', function () {
    it('Open XYZ Bank and Verify Title', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield protractor_1.browser.get(jsd.CustomerData1.url);
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
});
//# sourceMappingURL=dd.js.map