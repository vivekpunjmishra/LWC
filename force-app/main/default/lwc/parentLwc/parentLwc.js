import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {
    countValue = 0;
    handleDecrement(){
        this.countValue--;
    }
    handleIncrement(){
        this.countValue++;
    }
    handleMultiply(event){
        const MultiplyingNumber = event.detail;
        // alert('MultiplyingNumber: '+MultiplyingNumber);
        this.countValue *= MultiplyingNumber;
    }
}