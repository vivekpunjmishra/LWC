import { LightningElement, api, track } from 'lwc';
import getPlayersList from '@salesforce/apex/assignClubCaptain.getPlayersList';
import assignClubCaptain from '@salesforce/apex/assignClubCaptain.assignClubCaptain';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
const actions = [
    { label: 'Assign', name: 'assign' },
    { label: 'View', name: 'view' }
];
 const columns = [
    { label: 'Players', fieldName: 'Name' },
    { label: 'Goals', fieldName: 'Goals__c' },
    { 
        type: 'action',
        typeAttributes: { rowActions: actions},
                        
    }
 ];
export default class AssignClubCaptain extends NavigationMixin(LightningElement) {
    
    @track showPlayers = "Show Players";
    @track showPlayers = "Show Players";
    @track isVisible = false;
    @api recordId;
    @track data = [];
    @track playerData = [];
    columns = columns;
    error;
    connectedCallback(){
        console.log('recordId: '+this.recordId);

        getPlayersList({selectedIdFromLwc: this.recordId})
        .then(result => {
            this.data = result;
        })
        .catch(error => {
            this.error = error;
        })
    }
    handleClick(event){
        const label = event.target.label;
        if(label === 'Show Players') {
            this.showPlayers = 'Hide Players';
            this.isVisible = true;
        }else if(label === 'Hide Players'){
            this.showPlayers = 'Show Players';
            this.isVisible = false;
        }
    }
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch(actionName) {
            case 'assign':
                this.assignCaptain(row);
                break;
            case 'view':
                this.navigateToPlayerRecordPage(row);
                break;
                default:
        }
    }
    assignCaptain(currentRow){
        const selectedRow = currentRow;
        assignClubCaptain({lwcRowId: selectedRow.Id})
        .then(result => {
            this.playerData = result;
    })
    .catch(error => {
        this.error = error;
    })
    this.showSuccessToast();
    window.location.reload;
    }
    showSuccessToast(){
        const event = new ShowToastEvent({
            Label : 'Record Updated',
        	message : 'Record Updated Successfully',
        	variant : 'success',
            mode : 'dismissable'
        });
        this.dispatchEvent(event);
    }
    navigateToPlayerRecordPage(rowData){
        const player = rowData;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: player.Id,
                actionName: 'view',
            }
        });
    }
}