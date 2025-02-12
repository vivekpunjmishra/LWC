import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
    startCounter = 0;
    handleStartChange(event){
        this.startCounter = parseInt(event.target.value);
    }
    handelMaximizeCounter(){
        // this.template.querySelector('c-child').maximizeCounter();
        const updateCounter = this.template.querySelector('c-child');
        updateCounter.maximizeCounter();
    }
}