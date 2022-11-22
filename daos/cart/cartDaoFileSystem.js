import config from '../../config/config.js'
import ContainerFileSystem from '../../containers/ContainerFileSystem.js';

class CartDaoFileSystem extends ContainerFileSystem {
    constructor(file) {
        super(`${config.fileSystem.path}/${file}`);
    }
}

export default CartDaoFileSystem;