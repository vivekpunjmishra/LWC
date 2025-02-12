import { LightningElement } from 'lwc';

export default class LwcConditionalRendering extends LightningElement {
    ButtonLabel = 'Button 3';
    property1=false;
    property2=false;
    handleClick(){
        if(this.property1 == true) {
            this.property1 = false;
            this.property2 = true;
            this.ButtonLabel = 'Button 2';
        }
        else{
            this.property2 = false;
            this.property1 = true;
            this.ButtonLabel = 'Button 1';
        }
    }
}