import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    
   @api itemName = "Salesforce Noob";

   @api handleChangeValue(){
    this.itemName = " Salesforce LWC demo";
   }
}