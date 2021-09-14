const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is the API for a demonstaration planning application.`,
    demos: async (parent, { ids }, { prisma }) => {
      if (ids)
        return await prisma.demo.findMany({ where: { id: { in: ids } } });
      else return await prisma.demo.findMany();
    },
    demo: async (parent, { id }, { prisma }) =>
      await prisma.demo.findUnique({ where: { id: id } }),
  },
  Mutation: {
    createDemo: async (parent, args, { prisma }, info) =>
      await prisma.demo.create({ data: { ...args } }),
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: { prisma },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
