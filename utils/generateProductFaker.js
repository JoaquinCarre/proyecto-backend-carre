import { faker } from '@faker-js/faker';

class generateProductFaker {
    async generateProduct() {
        const product = {
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.avatar()
        }
        return product;
    }
}

export default generateProductFaker;