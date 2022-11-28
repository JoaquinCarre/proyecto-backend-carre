import ContainerFirebase from "../../containers/ContainerFirebase";

class CartDaoFirebase extends ContainerFirebase {
    constructor() {
        super('carts');
    }
}

export default CartDaoFirebase;