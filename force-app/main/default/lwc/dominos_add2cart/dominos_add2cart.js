import {api, track, LightningElement } from 'lwc';
import Toast from "lightning/toast";

export default class Dominos_add2cart extends LightningElement {
    @api buttonText;
    @api productId;
    @track rowList = [];
    nextId = 0;
    get options() {
        return [
            { label: 'Carryout tracker', value: 'carryout_tracker' },
            { label: 'Digital menuboard', value: 'digital_menuboard' },
            { label: 'Cut table tech', value: 'cut_table_tech' },
            { label: 'flex client', value: 'flex_client' },
            { label: 'GPS', value: 'GPS' }
        ];
    }
    connectedCallback() {
        // Initialize with three empty rows
        this.addInitialRows();
    }

    addInitialRows() {
        for (let i = 0; i < 3; i++) {
            this.addRow();
        }
    }

    addRow() {
        this.rowList.push({
            id: this.nextId++,
            number: this.rowList.length + 1,
            storeNumber: '',
            usage: '',
            qty: ''
        });
    }

    removeRow(event) {
        const index = parseInt(event.target.dataset.id, 10);
        this.rowList.splice(index, 1);
        // Renumber remaining rows
        this.rowList.forEach((row, idx) => {
            row.number = idx + 1;
        });
    }

    handleInputChange(event) {
        const index = parseInt(event.target.dataset.id, 10);
        const fieldName = event.target.name;
        const value = event.target.value;
        
        this.rowList[index][fieldName] = value;
    }

    handleSave() {
        // Validate inputs
        const allValid = this.validateInputs();
        
        if (allValid) {
            // Here you would typically call an Apex method to save the records
            console.log('Rows to save:', JSON.parse(JSON.stringify(this.rowList)));
            
            // Show success message using lightning-card
            this.dispatchEvent(
                new CustomEvent('success', {
                    detail: {
                        message: 'Records created successfully!'
                    }
                })
            );
        } else {
            // Show error message
            this.dispatchEvent(
                new CustomEvent('error', {
                    detail: {
                        message: 'Please fill in all required fields.'
                    }
                })
            );
        }
    }

    validateInputs() {
        return this.rowList.every(row => 
            row.storeNumber && 
            row.usage && 
            row.qty
        );
    }
}