"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../Action/action");
class AddCustomer extends action_1.Actions {
    constructor() {
        super();
        this.clickAddCustomer = "//button[@ng-click ='addCust()']";
        this.firstName = "//input[@ng-model='fName']";
        this.lastName = "//input[@ng-model='lName']";
        this.postCode = "//input[@ng-model='postCd']";
        this.generateCustomerID = "//button[@type='submit']";
    }
    clickAddCustomerButton() {
        this.myClick(this.clickAddCustomer, "Click on add Customer");
    }
    enterFirstName(keys) {
        this.sendKey(this.firstName, "Enter First Name", "Roshan");
    }
    enterLasnName(keys) {
        this.sendKey(this.lastName, "Enter last Name", "Bhandari");
    }
    enterPostCode(keys) {
        this.sendKey(this.postCode, "Enter post cost", "72762");
    }
}
exports.AddCustomer = AddCustomer;
//# sourceMappingURL=addcustomer.js.map