import {browser, element, by, protractor} from "protractor";


describe('',function()
{
    it('Verify Title', ()=>{
        browser.actions().mouseMove({x:50,y:10}).click
        browser.executeScript
        browser.executeAsyncScript
        browser.call
        //to get all items of a page
        browser.getPageSource()

        var cURL = browser.getCurrentUrl()
        var bTitle = browser.getTitle()
        browser.takeScreenshot()
        //for web confirmation
        var newb: any = browser.switchTo().alert();

        browser.setLocation('api')  //add more on a URL

        browser.refresh()  

        browser.isElementPresent

        browser.findElements
        browser.findElement

        browser.waitForAngular
        browser.waitForAngular 


        element(by.css(''));

       // var  mparent: any = $('.parent').getWebElement();
        element(by.css('.parent')).getWebElement;
        browser.driver.findElement(by.css('.parent'));
        browser.findElement(by.css('.parent'));

        let items = element(by.css('.parent')).all(by.tagName('li'));

        //chain 
        let child1: any = element(by.css('.parent')).element(by.css('.child')).element(by.css('.phone number'));
        expect(child1.getText()).toBe('479-333-4345');

        //Element exists
        //expect(element(by.binding('person.name')).isPresent()).toBe(true);
        //element not present
        //expect(element(by.binding('person.name')).isPresent()).toBe(false);

        browser.findElement(by.css('')).click

        browser.findElement(by.css('')).sendKeys("text was", protractor.Key.CONTROL, "a",protractor.Key.NULL,"now this text")


        var myelement = browser.findElement(by.tagName(''))


        //for check box checked or not
        var foo = element(by.id("foo"));
        //expect(foo.isPresent()).toBe(false);

        element(by.id("3434")).submit();
        element(by.id("3434")).clear();

        element(by.id("3434")).all("")

        


    })
})