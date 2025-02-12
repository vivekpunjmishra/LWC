import { LightningElement, track, wire } from 'lwc';
import getAccountList from '@salesforce/apex/forEachDemoClass.getAccountList';
export default class ForEachDemo extends LightningElement {
@track data = [];
    @wire(getAccountList)
    accounts;
}