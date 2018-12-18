import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Product } from '../resources/data/product-object';

@inject(Router, Product)
export class Products {
    constructor(router, products) {
        this.router = router;
        this.products = products;
        this.message = 'Products';
        this.showProductEditForm = 'table';
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
}
async activate(){
	await this.products.getProducts(this.userObj);
}


    // async activate() {
    //     await this.getProducts();
    // }

    attached() {
        feather.replace();
    }

    async getProducts() {
        await this.products.getProducts();
    }

    newProduct() {
        this.product = {
            file: "",
            productName: "",
            description: "",
            url: "",
        }
        this.openEditForm();


        this.productReview = {
            productId: this.userObj._id,
            review: ""
            };
            this.openEditForm();
            
    }


    async editProduct(product){
        this.product = product;
        this.productReview = {
        productId: this.product._id,
        review: ""
        };
        await this.products.getProductsReviews(product._id)
        this.showEditForm();
        }
        

    editProduct(product) {
        this.product = product;
        this.openEditForm();
    }

    openEditForm() {
        this.showProductEditForm = 'form';
        setTimeout(() => { $("#productName").focus(); }, 500);
    }

    openReviewForm(product){
        this.productReview = {
            productId: this.product._id,
            review: ""
            };
        this.message = 'Reviews';
        this.showProductEditForm = 'review';
    }

    changeActive(product) {
        this.product = product;
        this.save();
    }

    async save() {
        console.log('lskfjl;asf')
        if (this.product && this.product.productName && this.product.description && this.product.url) {
            let obj = {product: this.product, review: this.productReview};
                let serverResponse = await this.products.saveProduct(obj);
                if (this.filesToUpload && this.filesToUpload.length > 0) 
                this.products.uploadFile(this.filesToUpload, serverResponse.contentID);
            await this.getProducts();
            this.back();
        }
    }

    async saveReview(){
        if(this.productReview && this.productReview.review){
            await this.products.saveReview(this.productReview);
            if (this.filesToUpload && this.filesToUpload.length > 0) 
                this.products.uploadFile(this.filesToUpload, serverResponse.contentID);
        }
        this.back();
    }

    // async save() {
    //     if (this.product && this.product.productName && this.productReview && this.productReview.review) {
    //     if(this.userObj.role !== 'user'){
    //         this.product.productName = this.userObj._id;
    //     }
    //     let product = {product: this.product, review: this.productReview }

    //     let serverResponse = await this.products.saveProducts(product);
    //     if (this.filesToUpload && this.filesToUpload.length > 0) this.products.uploadFile(this.filesToUpload, serverResponse.reviewID);
    //          await this.getProducts();
    //          this.back();
    //     }
    // }
        
        

    async delete() {
        if (this.product) {
            await this.products.delete(this.product);
            await this.getProducts();
            this.back();
        }
    }

    async getProductReviews(product) {
        this.product = product;
        await this.products.getProductReviews(product._id);
        this.openReviewForm();
    }

    showProductReview() {
        this.showProductReview = true;
    }

    back() {
        this.showProductEditForm = 'table';
        this.filesToUpload = new Array();
        this.files = new Array();
    }

    backReview(){
        this.message = 'Products';
        this.showProductEditForm = 'table';
    }

    changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
        for (var i = 0; i < this.files.length; i++) {
        let addFile = true;
        this.filesToUpload.forEach(item => {
            if (item.name === this.files[i].name) addFile = false;
        })
            if (addFile) this.filesToUpload.push(this.files[i]);
        }
        }
        

    logout() {
        this.router.navigate('home');
    }

}