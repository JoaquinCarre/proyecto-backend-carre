import ContainerFirebase from "../../containers/ContainerFirebase";

class ProductDaoFirebase extends ContainerFirebase {
    constructor() {
        super('products');
    }
}

export default ProductDaoFirebase;