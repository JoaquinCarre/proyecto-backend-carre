import { faker } from "@faker-js/faker";

export async function generateOneProductFaker() {
  const product = {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.avatar(),
  };
  return product;
}
