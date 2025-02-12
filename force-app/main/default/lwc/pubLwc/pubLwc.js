import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import COUNTING_UPDATED_CHANNEL from '@salesforce/messageChannel/Counting_Update__c';

export default class PubLwc extends LightningElement {
    @wire(MessageContext)
    messagecountext;

    handleIncrement(){
        const payload = {
            operator: 'add',
            constant:1
        }
        publish(this.messagecountext, COUNTING_UPDATED_CHANNEL, payload);
    }
        handleDecrement(){
            const payload = {
                operator: 'substract',
                constant:1
            }
            publish(this.messagecountext, COUNTING_UPDATED_CHANNEL, payload);
        }

        handleMultiply(){
            const payload = {
                operator: 'multiply',
                constant:2
            }
            publish(this.messagecountext, COUNTING_UPDATED_CHANNEL, payload);
        }
}