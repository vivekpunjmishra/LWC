import { LightningElement, track, api } from "lwc";
import { addItemToCart } from "commerce/cartApi";
import { trackAddProductToCart } from "commerce/activitiesApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class CartCreation extends LightningElement {
    @track cartItems = [];
    usageOptions = [
        { label: "Carryout tracker", value: "Carryout Tracker" },
        { label: "Digital Menu Board", value: "Digital Menu Board" },
        { label: "Cut Table Tech", value: "Cut Table Tech" },
        { label: "Flex Client", value: "Flex Client" },
        { label: "GPS", value: "GPS" }
    ];
    nextId = 2;
    @api productId;

    get storageKey() {
        return `tempCartItems_${this.productId}`;
    }

    connectedCallback() {
        // Load saved cart items specific to this product
        const savedItems = localStorage.getItem(this.storageKey);
        if (savedItems) {
            this.cartItems = JSON.parse(savedItems);
            // TODO FIX
            this.nextId = Math.max(...this.cartItems.map(item => item.id)) + 1;
        } else {
            this.initializeCartItem();
        }
    }

    initializeCartItem() {
        // Initialize with default first row
        this.nextId = 1;
        this.cartItems = [{ id: this.generateCartItemId(), rowNumber: 1, storeNumber: "", usage: "", quantity: 1 }];
    }

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
        console.log("item data1", item.quantity, item.storeNumber, item.usage);
        try {
            await addItemToCart(this.productId, {
                quantity: item.quantity,
                customFields: [
                    {
                        attributes: { type: "CartItem" },
                        Store_Number__c: item.storeNumber,
                        Flex_Client_Use__c: item.usage
                    }
                ]
            });
            console.log("item data2", item.quantity, item.storeNumber, item.usage);
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
}