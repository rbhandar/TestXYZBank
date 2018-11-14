"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action1_1 = require("../../Action/action1");
class OpenAccount extends action1_1.Action {
    constructor(name, value1) {
        super();
        this.openAccountbtn = "//button[@ng-click='openAccount()']";
        this.CustomerSelectionXpath = "//*[contains(text(),'" + name + "')]";
        this.CurrencySelectionXpath = "//*[contains(text(),'" + value1 + "')]";
        this.processAccountbtn = "//button[@type='submit']";
    }
    clickOpenAccountButton() {
        // const btnOpenAccount = element(by.xpath(this.openAccountbtn));
        // if (btnOpenAccount.isDisplayed())
        //  {
        //      btnOpenAccount.myClick();
        //  }
        //  else
        //   {
        //      console.log("element not displayed")
        // }
        this.myClick(this.openAccountbtn, "click on Open Account button");
    }
    clickCustomerdropdown() {
        this.dropdown(this.CustomerSelectionXpath, 'Selecting Drop down');
    }
    clickCurrencydropdown() {
        this.dropdown(this.CurrencySelectionXpath, 'Selecting Drop down for Currency');
    }
    clickProcessbutton() {
        // const btnProcess = element(by.xpath(this.processAccountbtn));         
        //  if (btnProcess.isDisplayed())
        //  {
        //  btnProcess.myClick();
        //   }
        //  else
        //  {
        //      console.log("element not displayed")
        //  }
        this.myClick(this.processAccountbtn, "click on process button");
    }
}
exports.OpenAccount = OpenAccount;
//# sourceMappingURL=openaccount.js.map