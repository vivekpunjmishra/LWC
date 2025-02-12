import { LightningElement } from 'lwc';
import SalesforceNoob from '@salesforce/resourceUrl/SalesforceNoob';
export default class CarouselDemo extends LightningElement {
    players = [
        {
            id:"1",
            header:"Neymar",
            src: SalesforceNoob + '/Players_image/Neymar_Jr.jpg',
            description:"Neymar jr",
            href:"https://en.wikipedia.org/wiki/Neymar",

        },
        {
            id:"2",
            header:"Messi",
            src: SalesforceNoob + '/Players_image/Lionel-Messi.jpg',
            description:"Lionel Messi",
            href:"https://en.wikipedia.org/wiki/Lionel_Messi",

        },
        {
            id:"3",
            header:"Ronaldo",
            src: SalesforceNoob + '/Players_image/Cristiano_Ronaldo.jpg',
            description:"Cristiano Ronaldo",
            href:"https://en.wikipedia.org/wiki/Cristiano_Ronaldo",

        }
    ]
}