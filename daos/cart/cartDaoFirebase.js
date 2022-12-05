import ContainerFirebase from "../../containers/ContainerFirebase.js";

class CartDaoFirebase extends ContainerFirebase {
    constructor() {
        super('carts');
    }
}

export default CartDaoFirebase;