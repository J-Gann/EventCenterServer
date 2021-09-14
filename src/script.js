// 1
const { PrismaClient } = require("@prisma/client");

// 2
const prisma = new PrismaClient();

// 3
async function main() {
  const allDemos = await prisma.demo.findMany();
  console.log(allDemos);
}

// 4
main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
