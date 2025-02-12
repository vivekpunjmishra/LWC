import { LightningElement, track } from 'lwc';
import getAccountList from '@salesforce/apex/wireDemo.getAccountList';
import getContactList from '@salesforce/apex/wireDemo.getContactList';

const columns = [
    { label: 'Contacts Name', fieldName: 'Name' },
    { label: 'Contacts Email', fieldName: 'Email'},
];
export default class ComboBoxDemo extends LightningElement {
    @track value = '';
    @track accOption = [];
    @track cardVisible = false;
    @track data = [];
    @track columns = columns;

    get options(){
       return this.accOption; 
    }
    connectedCallback(){
        getAccountList().then(result => {
            let arr = [];
            for(var i=0; i<result.length; i++){
                arr.push({label:result[i].Name, value:result[i].Id});
            }
            this.accOption = arr;
        });
    }
    handleChanged(event) {
        this.cardVisible = true;
        this.value = event.detail.value;
        getContactList({selectedAccountId: this.value}).then(result => {
            this.data = result;
        })
        .catch(error => {
            window.alert("error: "+error);
        })
    }
}