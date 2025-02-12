import { LightningElement, api } from 'lwc';
import PLAYER_OBJECT from '@salesforce/schema/Player__c';
import NAME_FIELD from '@salesforce/schema/Player__c.Name';
import Football_Club_FIELD from '@salesforce/schema/Player__c.Football_Club__c';
import GOALS_FIELD from '@salesforce/schema/Player__c.Goals__c';

export default class RecordViewForm extends LightningElement {
    @api recordId;
    @api ObjectApiName;
    nameField = NAME_FIELD;
    clubField = Football_Club_FIELD;
    goalsField = GOALS_FIELD;
}