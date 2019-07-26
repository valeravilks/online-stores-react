import {observable, computed, action} from 'mobx';

export default class{
    @observable products = [];
    @observable disableId = [];

    constructor(rootStore){
        this.rootStore = rootStore;
        this.api = this.rootStore.api.cart;
        this.storage = this.rootStore.storage;
        this.token = this.storage.getItem('cartToken');
    }

    @computed get productsDetailed(){
        return this.products.map((pr) => {
            let product = this.rootStore.products.getById(pr.id);
            return {...product, cnt: pr.cnt};
        });
    }тзь

    @computed get inCart(){
        return (id) => this.products.some((product) => product.id === id);
    }

    @computed get cartCnt(){
        return this.products.length;
    }

    @computed get total(){
        return this.productsDetailed.reduce((t, pr) => {
            return t + pr.price * pr.cnt;
        }, 0);
    }

    @computed get disableElement(){
        return (id) => this.disableId.some((product) => product === id);
    }

    @action load(){
        this.api.load(this.token).then((data) => {
            this.products = data.cart;
            
            if(data.needUpdate){
                this.token = data.token;
                this.storage.setItem('cartToken', this.token);
            }
        });
    }

    @action add(id){
        this.disableId.push(id);
        this.api.add(this.token, id).then((res) => {
            if(res){
                this.disableId.splice(this.disableId.indexOf(id), 1);
                this.products.push({id, cnt: 1});
            }
        });
    }

    @action change(id, cnt){
        this.disableId.push(id);
        let index = this.products.findIndex((pr) => pr.id === id);

        if(index !== -1){
            this.api.change(this.token, id, cnt).then((res) => {
                this.disableId.splice(this.disableId.indexOf(id), 1);
                this.products[index].cnt = cnt;
            });
        }
    }

    @action clean = () =>{
        this.api.clean(this.token).then((res) => {
            this.products = [];
        });
    };

    @action remove(id){
        this.disableId.push(id);
        let index = this.products.findIndex((pr) => pr.id === id);

        if(index !== -1){
            this.api.remove(this.token, id).then((res) => {
                this.disableId.splice(this.disableId.indexOf(id), 1);
                this.products.splice(index, 1);
            });
        }
    }



}