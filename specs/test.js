"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('', function () {
    it('Verify Title', () => {
        protractor_1.browser.actions().mouseMove({ x: 50, y: 10 }).click;
        protractor_1.browser.executeScript;
        protractor_1.browser.executeAsyncScript;
        protractor_1.browser.call;
        //to get all items of a page
        protractor_1.browser.getPageSource();
        var cURL = protractor_1.browser.getCurrentUrl();
        var bTitle = protractor_1.browser.getTitle();
        protractor_1.browser.takeScreenshot();
        //for web confirmation
        var newb = protractor_1.browser.switchTo().alert();
        protractor_1.browser.setLocation('api'); //add more on a URL
        protractor_1.browser.refresh();
        protractor_1.browser.isElementPresent;
        protractor_1.browser.findElements;
        protractor_1.browser.findElement;
        protractor_1.browser.waitForAngular;
        protractor_1.browser.waitForAngular;
        protractor_1.element(protractor_1.by.css(''));
        // var  mparent: any = $('.parent').getWebElement();
        protractor_1.element(protractor_1.by.css('.parent')).getWebElement;
        protractor_1.browser.driver.findElement(protractor_1.by.css('.parent'));
        protractor_1.browser.findElement(protractor_1.by.css('.parent'));
        let items = protractor_1.element(protractor_1.by.css('.parent')).all(protractor_1.by.tagName('li'));
        //chain 
        let child1 = protractor_1.element(protractor_1.by.css('.parent')).element(protractor_1.by.css('.child')).element(protractor_1.by.css('.phone number'));
        expect(child1.getText()).toBe('479-333-4345');
        //Element exists
        //expect(element(by.binding('person.name')).isPresent()).toBe(true);
        //element not present
        //expect(element(by.binding('person.name')).isPresent()).toBe(false);
        protractor_1.browser.findElement(protractor_1.by.css('')).click;
        protractor_1.browser.findElement(protractor_1.by.css('')).sendKeys("text was", protractor_1.protractor.Key.CONTROL, "a", protractor_1.protractor.Key.NULL, "now this text");
        var myelement = protractor_1.browser.findElement(protractor_1.by.tagName(''));
        //for check box checked or not
        var foo = protractor_1.element(protractor_1.by.id("foo"));
        //expect(foo.isPresent()).toBe(false);
        protractor_1.element(protractor_1.by.id("3434")).submit();
        protractor_1.element(protractor_1.by.id("3434")).clear();
        protractor_1.element(protractor_1.by.id("3434")).all("");
    });
});
//# sourceMappingURL=test.js.map