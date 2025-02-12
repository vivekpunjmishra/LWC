import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/GetContactOppurtunityDetails.getAccounts'
const columns = [
    { label: 'Accounts Name', fieldName: 'Name' },
];
export default class SimpleDataTable extends LightningElement {
    recordId;
    accounts;
    columns = columns;

    @wire(getAccounts,({ data}))
    if(data){
        this.accounts = data;
    }
}