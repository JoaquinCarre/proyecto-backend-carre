let productDao;
let cartDao;

//importación dinámica durante la ejecución para no tener que importar de más sin ser necesario, solo se importa el dao necesario
switch (process.env.TYPE_PERSISTANCE) {
    case 'memory':
        const { default: ProductDaoMemory } = await import('./products/productDaoMemory.js');
        const { default: CartDaoMemory } = await import('./cart/cartDaoMemory.js');

        productDao = new ProductDaoMemory();
        cartDao = new CartDaoMemory();
        break;

    case 'mongodb':
        const { default: ProductDaoMongoDB } = await import('./products/productDaoMongoDB.js');
        const { default: CartDaoMongoDB } = await import('./cart/cartDaoMongoDB.js');
        productDao = new ProductDaoMongoDB();
        cartDao = new CartDaoMongoDB();
        break;

    default:
        const { default: ProductDaoFileSystem } = await import('./products/productDaoFileSystem.js');
        const { default: CartDaoFileSystem } = await import('./cart/cartDaoFileSystem.js');

        productDao = new ProductDaoFileSystem('/dataBase/products.json');
        cartDao = new CartDaoFileSystem('/dataBase/cart.json');
        break;
}

export { productDao, cartDao };