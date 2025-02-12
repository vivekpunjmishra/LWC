import { LightningElement, track } from 'lwc';
import getAccountList from '@salesforce/apex/forEachDemoClass.getAccountList';

export default class LifeCycleHooks extends LightningElement {
    @track property;

    constructor(){
        super();
        // defined a variable is allowed
        let name = "Salesforce";
        if(name){
            this.property = "Salseforce noob";
        }
        // Not Allowed - access the elements inside the constructor
        this.template.querySelector('lightning-button');

        // you can call apex method from constructor
        getAccountList().then(result => {
            this.accounts = result;
        })
        .catch(error => {
            this.error = error;
        });

        // Navigation is not allowed in constructor
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName:'Account',
                actionName:'view'
            }
        });
    }

    error;
    stack;
    errorCallback(error, stack) {
    this.error = error;
    this.stack = stack;
    }
}