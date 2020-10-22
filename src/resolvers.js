module.exports = {
  Query: {
    getUser: async (a, b, c, d) => {
      return {
        name: "alex",
      };
    },

    getUserByName: async ( a, b, {db}, d ) => {
      const foundResult = await db.collection('users').find().toArray();
      console.log(foundResult);
      return {
        name: "alex",
      };
    },
  },
};
