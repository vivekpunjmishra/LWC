import { LightningElement, track } from 'lwc';

export default class ConditionalDemo extends LightningElement {
@track onClickedButtonLabel = 'Show';
myTitle = 'Salesforce Noob';
@track cordVisible = false;
    handleClick(event){
        const label = event.target.label;
        // this.onClickedButtonLabel = label === 'Show' ? 'Hide' : 'Show';
        if(label === 'Show') {
            this.onClickedButtonLabel = 'Hide';
            this.cordVisible = true;
        } else if(label === 'Hide'){
            this.onClickedButtonLabel = 'Show';
            this.cordVisible = false;
        }
    }   
}