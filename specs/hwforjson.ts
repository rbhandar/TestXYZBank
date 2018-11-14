import {$, browser, element, by, protractor, ExpectedConditions, WebDriver} from "protractor";

import { exec } from "child_process";
import {async}from "q";
import { ECONNABORTED } from "constants";
import { OpenAccount } from "../Pages/OpenAccount/openaccount";
import {AddCustomer} from "../Pages/addcustomer";

let jsd = require('../data/testData');
var opAct =  new OpenAccount(jsd.CustomerData1.firstName+" "+jsd.CustomerData1.lastName, jsd.CustomerData1.currency);
//var customer = new customer(jsd.CustomerData1.firstName);


describe('XYZ Bank Bank manager', function  (){
    it('Open XYZ Bank and Verify Title', async ()=> {
        try {
            await browser.get(jsd.CustomerData1.url);
            var gettitle: any = browser.getTitle();
            expect(gettitle.toEqual('XYZ Bank'));
        } catch (error) {
            console.log(error)
        }
    })

    it('Click on Bank Manager Button', async ()=> {
        //expect(browser.getTitle().toEqual('test'));
        const BankcustLoginClick: any = element(by.xpath("//button[@ng-click = 'manager()']"));
        await browser.wait(BankcustLoginClick, 5*3000, "start in 5 seconds");
        //await BankcustLoginClick.click();
        
        if (BankcustLoginClick.isDisplayed()) {
            debugger
            await BankcustLoginClick.click();
            } else { 
            console.log('Login Button NOT DISPLAYED')
            } 

        })

    it('Click on Add Customer button', async ()=> {
        try {
            const clickAddCustomer = element(by.xpath("//button[@ng-click ='addCust()']"));
            if (clickAddCustomer.isDisplayed())
            {
             await clickAddCustomer.click();
            } else {
                console.log("element not present")
            }
        } catch (error) {
            console.log(error)
        }

    });

    it('Add first name', async ()=> {
            var myfirstName = element(by.xpath("//input[@ng-model='fName']"));
           //await firstName.sendKeys('Roshan');
        //another way of writing .then is handling promise 
           myfirstName.sendKeys(jsd.CustomerData1.firstName)  //.then(null, function(error)    
        {
            console.log("first name error");         
        }
    })

    it('Add last name', async ()=> {
            var mylastName = element(by.xpath("//input[@ng-model='lName']"));
           await mylastName.sendKeys(jsd.CustomerData1.lastName);      
    })

    it('Add postal code', async ()=> {
            var postCode = element(by.xpath("//input[@ng-model='postCd']"));
           await postCode.sendKeys(jsd.CustomerData1.zipCode);
    })
        
    it('Click on Add Customer button to submit', async ()=> {
            var ClickTogenerateCustomerID = element(by.xpath("//button[@type='submit']"));
          await  ClickTogenerateCustomerID.click();

          var alrertDialog = browser.switchTo().alert();
          await expect(alrertDialog.accept()).toBeDefined();
          alrertDialog.getText().then((text)=>{
          console.log(text);
    })
      //read alert
   // it('Read alert', async ()=> {
      //  var alrertDialog = browser.switchTo().alert();
       // await expect(alrertDialog.accept).toBeDefined();
       // alrertDialog.getText().then((text)=>{
        //console.log(text);
        //});
    });

    it('Click Open Account', async ()=> {
        opAct.clickOpenAccountButton();
    })

    it('Click and select customer dropdown', async ()=> {
        opAct.clickCustomerdropdown();
    })

it('select currency', async ()=> {
    opAct.clickCurrencydropdown();
})

it("click on Process button to generate account no", () => { 
    opAct.clickProcessbutton();
    var alertValidate = browser.switchTo().alert();
    expect(alertValidate.accept).toBeDefined();
    alertValidate.getText().then((text) => { 
        console.log(text);
        alertValidate.accept();
    })
    
});


});

