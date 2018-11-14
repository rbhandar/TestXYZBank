import { $, browser, by, element, ElementFinder, protractor } from 'protractor';

import{Actions} from '../Action/action';
import{AddCustomer} from '../Pages/addcustomer';

export class CreateCustomer extends Actions {
    clickAddCustomer : string;
    firstName :  string;
    lastName : string;
    postCode : string;


}


