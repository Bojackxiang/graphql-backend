import { gql, IResolvers } from "apollo-server";
import { contextType } from "src/types/userResolverTypes";
import faker, { fake } from "faker";
import Response from "../../utils/Response/Response";
import cities from "../../fake_data/fake_data.json";
import codeAndCity from "../../fake_data/au_postcodes.json";

export const FAKE_DATA_SCHEMA = gql`
  extend type Query {
    createFakeData: Response
  }
`;

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const FAKE_DATA_RESOLVER: IResolvers<any, any> = {
  Query: {
    createFakeData: async (_, __, { db }: contextType) => {
      try {
        const { city, streetName } = faker.address;

        const allCityJson = JSON.parse(JSON.stringify(cities)).data;
        const postCodeAgainstCityName = JSON.parse(JSON.stringify(codeAndCity))
          .data;

        let collection = [];

        for (let i = 0; i < 100; i++) {
          const randomData = {
            userId: "",
            suburb: [
              // allCityJson[faker.random.number(allCityJson.length)].suburb,
              "kensington", 'kingsford',
            ],
            // code: allCityJson[faker.random.number(allCityJson.length)].postcode,
            code: '2033',
            // state: allCityJson[faker.random.number(allCityJson.length)].state,
            state: 'NSW',
            street: faker.address.streetName(),
            country: "Australia",
            unit: `Unit ${faker.random.number(100)}`,
            landLord: `${faker.name.firstName()} ${faker.name.lastName()}`,
            startDate: randomDate(new Date(2020, 1, 1), new Date()),
            cover: faker.image.city(),
            images: [
              faker.image.city(),
              faker.image.transport(),
              faker.image.city(),
              faker.image.city(),
              faker.image.city(),
            ],
            isAvailable: Math.random() * 10 >= 5 ? true : false,
          };

          collection.push(randomData);
        }

        await db.collection("renting_properties").insertMany(collection);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
