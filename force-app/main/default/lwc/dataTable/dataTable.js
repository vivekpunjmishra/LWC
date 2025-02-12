import { LightningElement, api } from 'lwc';
import getChildDetails from '@salesforce/apex/GetContactOppurtunityDetails.getChildDetails';
// Declaring columns for opportunity datatable
const columns1 = [
    { label: 'Opportunity Id', fieldName: 'Id' },
    { label: 'Opportunity Name', fieldName: 'Name' }
];

const columns2 = [
    { label: 'Contact Id', fieldName: 'Id' },
    { label: 'Contact Name', fieldName: 'Name' }
]
export default class DataTable extends LightningElement {
    @api buttonLabel = "Show";
    opportunityData = []; //this array will store opportunity datails
    contactData = []; //this array will store contact details

    opportunityTempArray = [];
    contactTempArray = [];

    column1 = columns1;

    column2 = columns2;

    @api recordId; // this property store the current account recordId
    @api showDatatable = false;
    // this method called when user click the button
    handleShow(event) {
        // if user clicks Show button then Datatable show visible and button become Hide
        if(event.target.label == "Show"){
            this.buttonLabel = "Hide";
            this.showDatatable = true;
        }
        // if user clicks Hide button then DataTable  will invisible and become Show
        else if(event.target.label == "Hide"){
            this.buttonLabel = "Show";
            this.showDatatable = false;
        }
    }
    connectedCallback(){
        // calling apex method by passing current account record Id
        getChildDetails({recId : this.recordId})
        .then(res => {
            let tempRecords = res;
            console.log('tempRecords:'+JSON.stringify(tempRecords));
            // create two object for storing oppunity and contacts datails
            let temp = tempRecords.map(row => {
                return Object.assign({OppName : row.Opportunities, ContactName : row.Contacts})
            })
            console.log('temp >>'+JSON.stringify(temp));
            // store opportunity and contacts datails in diffrent array 
            temp.forEach(element => {
                // opportunity array
                this.opportunityTempArray = element.OppName;
                console.log('opportunityTempArray >>'+JSON.stringify(this.opportunityTempArray));
                // contact array
                this.contactTempArray = element.ContactName;
                console.log('contactTempArray >>'+JSON.stringify(this.contactTempArray));
            })
            // data for oppourtunity datatable
            this.opportunityData = this.opportunityTempArray;
            // data for contact datatable
            this.contactData = this.contactTempArray;

        })
        .catch(error => {
            console.error('error:'+JSON.stringify(error));
        });
    }
}