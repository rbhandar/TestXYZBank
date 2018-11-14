import {$, browser, element, by, protractor, ExpectedConditions, WebDriver} from "protractor";

import { exec } from "child_process";
import {async}from "q";
import { ECONNABORTED } from "constants";
import { AddCustomer } from "../Pages/addcustomer";

let jsd = require('../data/testData');

var customerdetails = new AddCustomer();

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
    })