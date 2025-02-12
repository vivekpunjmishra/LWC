import { LightningElement, track } from 'lwc';
import  getAccountList from '@salesforce/apex/wireDemo.getAccountList';
const columns = [
    {   label: 'Name', fieldName: 'Name'},  
    {   label: 'Account Record Id', fieldName: 'Id'}
]

export default class ImperativeDemo extends LightningElement {
    @track columns = columns;
    @track data = [];

    connectedCallback(){
        getAccountList().then(result => {
            this.data = result;
        })
    .catch(error => {
        console.log('error occurred');
    })} 
}