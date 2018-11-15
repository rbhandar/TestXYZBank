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
const openaccount_1 = require("../Pages/OpenAccount/openaccount");
let jsd = require('../data/testData');
var opAct = new openaccount_1.OpenAccount(jsd.CustomerData1.firstName + " " + jsd.CustomerData1.lastName, jsd.CustomerData1.currency);
//var customer = new customer(jsd.CustomerData1.firstName);
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
        var myfirstName = protractor_1.element(protractor_1.by.xpath("//input[@ng-model='fName']"));
        //await firstName.sendKeys('Roshan');
        //another way of writing .then is handling promise 
        myfirstName.sendKeys(jsd.CustomerData1.firstName); //.then(null, function(error)    
        {
            console.log("first name error");
        }
    }));
    it('Add last name', () => __awaiter(this, void 0, void 0, function* () {
        var mylastName = protractor_1.element(protractor_1.by.xpath("//input[@ng-model='lName']"));
        yield mylastName.sendKeys(jsd.CustomerData1.lastName);
    }));
    it('Add postal code', () => __awaiter(this, void 0, void 0, function* () {
        var postCode = protractor_1.element(protractor_1.by.xpath("//input[@ng-model='postCd']"));
        yield postCode.sendKeys(jsd.CustomerData1.zipCode);
    }));
    it('Click on Add Customer button to submit', () => __awaiter(this, void 0, void 0, function* () {
        var ClickTogenerateCustomerID = protractor_1.element(protractor_1.by.xpath("//button[@type='submit']"));
        yield ClickTogenerateCustomerID.click();
        var alrertDialog = protractor_1.browser.switchTo().alert();
        yield expect(alrertDialog.accept()).toBeDefined();
        alrertDialog.getText().then((text) => {
            console.log(text);
        });
        //read alert
        // it('Read alert', async ()=> {
        //  var alrertDialog = browser.switchTo().alert();
        // await expect(alrertDialog.accept).toBeDefined();
        // alrertDialog.getText().then((text)=>{
        //console.log(text);
        //});
    }));
    it('Click Open Account', () => __awaiter(this, void 0, void 0, function* () {
        opAct.clickOpenAccountButton();
    }));
    it('Click and select customer dropdown', () => __awaiter(this, void 0, void 0, function* () {
        opAct.clickCustomerdropdown();
    }));
    it('select currency', () => __awaiter(this, void 0, void 0, function* () {
        opAct.clickCurrencydropdown();
    }));
    it("click on Process button to generate account no", () => {
        opAct.clickProcessbutton();
        console.log("Clickd Process button");
        var alertValidate = protractor_1.browser.switchTo().alert();
        expect(alertValidate.accept).toBeDefined();
        alertValidate.getText().then((text) => {
            console.log(text);
            alertValidate.accept();
        });
    });
});
//# sourceMappingURL=hwforjson.js.map