import { LightningElement, track } from 'lwc';
import PLAYER_OBJECT  from '@salesforce/schema/Player__c';
import NAME_FIELD from '@salesforce/schema/Player__c.Name';
import FOOTBALL_CLUB_FIELD from '@salesforce/schema/Player__c.Football_Club__c';
import GOALS_FIELD from '@salesforce/schema/Player__c.Goals__c';
export default class RecordFormDemo extends LightningElement {
    ObjectApiName = PLAYER_OBJECT;
    recordId = 'a02dL000009jKevQAE';
    @track fields = [NAME_FIELD, FOOTBALL_CLUB_FIELD, GOALS_FIELD];
}