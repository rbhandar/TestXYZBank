import {$, browser, element, by, protractor, ExpectedConditions, WebDriver} from "protractor";
import { exec } from "child_process";
import {async}from "q";
import { ECONNABORTED } from "constants";

describe('XYZ Bank Bank manager', function  ()
{
    it('Open XYZ Bank and Verify Title', async ()=> {

        try {
            await browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/login");
            var gettitle: any = browser.getTitle;
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

            var firstName = element(by.xpath("//input[@ng-model='fName']"));
           //await firstName.sendKeys('Roshan');
        //another way of writing .then is handling promise 
           firstName.sendKeys('Roshan').then(null, function(error)    
        {
            console.log(error);
           
        })
    })

    it('Add last name', async ()=> {
            var lastName = element(by.xpath("//input[@ng-model='lName']"));
           await lastName.sendKeys("Bhandari");      
    })

    it('Add postal code', async ()=> {
            var postCode = element(by.xpath("//input[@ng-model='postCd']"));
           await postCode.sendKeys("72762");
    })

    it('Click on Add Customer button to submit', async ()=> {
            var ClickTogenerateCustomerID = element(by.xpath("//button[@type='submit']"));
          await  ClickTogenerateCustomerID.click();
    })
//read alert
    it('Read alert', async ()=> {

        var alrertDialog = browser.switchTo().alert();
        await expect(alrertDialog.accept()).toBeDefined();
        alrertDialog.getText().then((text)=>{
            console.log(text);
        });

    });
});
