import {browser,by,element} from 'protractor';
import {Action} from '../../Action/action1';
//import {Actions} from '../../Action/action';
import { extend } from 'webdriver-js-extender';
import { Actions } from '../../Action/action';


export class OpenAccount extends Action {
openAccountbtn: string;
CustomerSelectionXpath: string;
CurrencySelectionXpath: string;
processAccountbtn: string;

    constructor(name, value1){
        super();
        this.openAccountbtn = "//button[@ng-click='openAccount()']";
        this.CustomerSelectionXpath = "//*[contains(text(),'"+ name +"')]"
        this.CurrencySelectionXpath = "//*[contains(text(),'"+ value1 +"')]"
        this.processAccountbtn = "//button[@type='submit']"
    }
    
    public clickOpenAccountButton()
    {
       // const btnOpenAccount = element(by.xpath(this.openAccountbtn));
       // if (btnOpenAccount.isDisplayed())
      //  {
      //      btnOpenAccount.myClick();
      //  }
      //  else
     //   {
      //      console.log("element not displayed")
       // }

    
    this.myClick(this.openAccountbtn, "click on Open Account button")
    }

    public clickCustomerdropdown()
    {
        this.dropdown(this.CustomerSelectionXpath, 'Selecting Drop down');
    }

    public clickCurrencydropdown()
    {
        this.dropdown(this.CurrencySelectionXpath, 'Selecting Drop down for Currency');
    }

    public clickProcessbutton()
    {
       // const btnProcess = element(by.xpath(this.processAccountbtn));         
      //  if (btnProcess.isDisplayed())
      //  {
          //  btnProcess.myClick();
     //   }
      //  else
      //  {
      //      console.log("element not displayed")
      //  }
        this.myClick(this.processAccountbtn, "click on process button")
    }



}

