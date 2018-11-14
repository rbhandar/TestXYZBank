import {browser,by,element} from 'protractor';
import{Actions} from '../Action/action';

export class AddCustomer extends Actions {
    clickAddCustomer : string;
    firstName :  string;
    lastName : string;
    postCode : string;
    generateCustomerID : string;

    constructor(){
        super();
        this.clickAddCustomer = "//button[@ng-click ='addCust()']";
        this.firstName = "//input[@ng-model='fName']";
        this.lastName = "//input[@ng-model='lName']";
        this.postCode = "//input[@ng-model='postCd']";
        this.generateCustomerID = "//button[@type='submit']";

    }
    
    public clickAddCustomerButton()
    {
        this.myClick(this.clickAddCustomer, "Click on add Customer");
    }

    public enterFirstName(keys)
    {

        this.sendKey(this.firstName,"Enter First Name","Roshan")
    }

    public enterLasnName(keys)
    {

        this.sendKey(this.lastName,"Enter last Name","Bhandari")
    }

    public enterPostCode(keys)
    {

        this.sendKey(this.postCode,"Enter post cost","72762")
    }

}

