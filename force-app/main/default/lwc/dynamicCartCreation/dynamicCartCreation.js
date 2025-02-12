import { LightningElement, track, api, wire } from "lwc";
import { addItemToCart } from "commerce/cartApi";
import { trackAddProductToCart } from "commerce/activitiesApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import ADDITIONAL_INFO_FIELD from '@salesforce/schema/Product2.Additional_Information__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

export default class DynamicCartCreation extends LightningElement {
    @track cartItems = [];
    @api productId;
    //@api additionalInformation; // New property to receive from product context
    additionalInformation;

    usageOptions = [
        { label: "Carryout tracker", value: "Carryout Tracker" },
        { label: "Digital Menu Board", value: "Digital Menu Board" },
        { label: "Cut Table Tech", value: "Cut Table Tech" },
        { label: "Flex Client", value: "Flex Client" },
        { label: "GPS", value: "GPS" }
    ];
    nextId = 2;

    // @wire(getRecord, { recordId: '$productId', fields: [ADDITIONAL_INFO_FIELD] })
    // wiredProduct({ error, data }) {
    //     if (data) {
    //         console.log('Product Data:', data);
    //         this.additionalInformation = data.fields.Additional_Information__c.value;
    //         console.log('Additional Information:', this.additionalInformation);
    //     } else if (error) {
    //         console.error('Error loading product:', error);
    //     }
    // }
    @wire(getRecord, { 
        recordId: '$productId', 
        fields: [ADDITIONAL_INFO_FIELD]
    })
    wiredProduct({ error, data }) {
        if (data) {
            console.log('Product Data:', data);
            this.additionalInformation = getFieldValue(data, ADDITIONAL_INFO_FIELD);
            console.log('Additional Information:', this.additionalInformation);
        } else if (error) {
            console.error('Error loading product:', error);
        }
    }
    // Computed property to determine if Flex Client Use field should be shown
    get showFlexClientUse() {
        console.log('Checking showFlexClientUse:', this.additionalInformation);
        return this.additionalInformation === 'Flex Client Use';
    }

    get storageKey() {
        return `tempCartItems_${this.productId}`;
    }

    connectedCallback() {
        const savedItems = localStorage.getItem(this.storageKey);
        if (savedItems) {
            this.cartItems = JSON.parse(savedItems);
            this.nextId = Math.max(...this.cartItems.map(item => item.id)) + 1;
        } else {
            this.initializeCartItem();
        }
    }

    initializeCartItem() {
        this.nextId = 1;
        this.cartItems = [{
            id: this.generateCartItemId(),
            rowNumber: 1,
            storeNumber: "",
            usage: "",
            quantity: 1
        }];
    }

    // ... keep existing helper methods (generateCartItemId, updateLocalStorage, handleAddRow, handleRemoveRow, handleInputChange) ...
    generateCartItemId() {
        return `cart-item-${this.nextId++}`;
    }

    updateLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    }

    handleAddRow() {
        const newRow = {
            id: this.generateCartItemId(),
            rowNumber: this.cartItems.length + 1,
            storeNumber: "",
            usage: "",
            quantity: 1
        };
        this.cartItems = [...this.cartItems, newRow];
        this.updateLocalStorage();
    }

    handleRemoveRow(event) {
        const rowId = event.target.dataset.id;
        this.cartItems = this.cartItems.filter(item => item.id !== rowId);
        this.cartItems = this.cartItems.map((item, index) => ({
            ...item,
            rowNumber: index + 1
        }));
        this.updateLocalStorage();
    }

    handleInputChange(event) {
        const { id, field } = event.target.dataset;
        this.cartItems = this.cartItems.map(item => {
            return item.id === id
                ? { ...item, [field]: event.target.value }
                : item;
        });
        this.updateLocalStorage();
    }

    async handleAddToCart() {
        console.log("cartItems 1", this.cartItems);
        console.log("productId", this.productId);
        if (!this.productId) {
            this.showToast("Error", "Product ID is missing.", "error");
            return;
        }
        console.log("cartItems", this.cartItems);

        try {
            for (const item of this.cartItems) {
                console.log("item", item);
                await this.addToCart(item);
            }
            console.log("cartItems", this.cartItems);
            // Clear localStorage for this specific product
            localStorage.removeItem(this.storageKey);
            this.initializeCartItem();

            this.showToast("Success", "Items have been added to your Cart!", "success");
            this.dispatchEvent(new CustomEvent("cartchanged", {
                bubbles: true,
                composed: true
            }));
        } catch (error) {
            console.error("Error adding items to cart:", error);
            this.showToast("Error", "Failed to add items to cart. Please try again.", "error");
        }
    }

    async addToCart(item) {
        try {
            const customFields = {
                attributes: { type: "CartItem" },
                Store_Number__c: item.storeNumber,
            };

            // Only add Flex_Client_Use__c if it's required
            if (this.showFlexClientUse) {
                customFields.Flex_Client_Use__c = item.usage;
            }

            await addItemToCart(this.productId, {
                quantity: item.quantity,
                customFields: [customFields]
            });
            await trackAddProductToCart(this.productId);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            throw error;
        }
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
    // ... keep existing methods (handleAddToCart, showToast) ...
}