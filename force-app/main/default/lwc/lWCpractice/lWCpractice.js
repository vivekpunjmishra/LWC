import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LWCpractice extends LightningElement {
    myTitle = "Salesforce Noob";
    connectedCallback() {
        let callMyFuction = this.myFuction(10, 2);
        window.alert('callMyFunction by arrow function: '+callMyFuction);
    }
    myFuction = (dividend, divisor) =>{
        return (dividend / divisor);
    }
}