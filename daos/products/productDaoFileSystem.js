import config from '../../config/config.js'
import ContainerFileSystem from '../../containers/ContainerFileSystem.js';

class ProductDaoFileSystem extends ContainerFileSystem {
    constructor(file) {
        super(`${config.fileSystem.path}/${file}`);
    }
}

export default ProductDaoFileSystem;