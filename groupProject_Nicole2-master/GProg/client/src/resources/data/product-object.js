import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)

export class Product {
    constructor(data) {
        this.data = data;
        this.PRODUCT_SERVICE = 'products';
        this.PRODUCT_REVIEWS = 'productReviews';
    }

    async saveProduct(product) {
        let serverResponse;
        if (product) {
            if (product.product._id) {
                serverResponse = await this.data.put(product, this.PRODUCT_SERVICE);
            } else {
                serverResponse = await this.data.post(product, this.PRODUCT_SERVICE);
            }
            return serverResponse;
        }
    }

    async saveReview(obj){
        if(obj){
            await this.data.post(obj,this.PRODUCT_REVIEWS);
        }
    }

    async delete(product) {
        if (product && product._id) {
            await this.data.delete(this.PRODUCT_SERVICE + '/' + product._id)
        }
    }

    async getProducts() {
        let response = await this.data.get(this.PRODUCT_SERVICE);
        if (!response.error) {
            this.productsArray = response;
        } else {
            this.productsArray = [];
        }
    }

    async getProductReviews(id){
        let response = await this.data.get(this.PRODUCT_REVIEWS + '/product/' + id);
        this.reviewsArray = response;
    }

    async uploadImage(images, id) {
        await this.data.uploadImages(images, this.PRODUCT_SERVICE + "/upload/" + id);
    }

    async uploadFile(files, id) {
        await this.data.uploadFiles(files, this.PRODUCT_REVIEW_SERVICE + "/upload/" + id );
    }
    
}
