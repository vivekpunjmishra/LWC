import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PLAYER_OBJECT from '@salesforce/schema/Player__c';
import PLAYER_NAME from '@salesforce/schema/Player__c.Name';
import GOALS from '@salesforce/schema/Player__c.Goals__c';
import FOOTBALL_CLUB from '@salesforce/schema/Player__c.Football_Club__c';

export default class RecordEditForm extends LightningElement {
    ObjectApiName = PLAYER_OBJECT;
    @api recordId;
    nameField = PLAYER_NAME;
    goalsField = GOALS;
    footballClubField = FOOTBALL_CLUB;
    playerId = recordId;

    
    handleSuccess(event) {
        this.playerId = event.detail.id;
        const evt = new ShowToastEvent({
            title: 'Successful',
            message: 'Player Created',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}