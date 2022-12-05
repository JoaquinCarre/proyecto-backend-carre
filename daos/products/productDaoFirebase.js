import ContainerFirebase from "../../containers/ContainerFirebase.js";

class ProductDaoFirebase extends ContainerFirebase {
    constructor() {
        super('products');
    }
}

export default ProductDaoFirebase;