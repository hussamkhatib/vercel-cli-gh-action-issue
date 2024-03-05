import prisma from "..";

const seedScript = async () => {
  const randomEmail = Math.random().toString(36).substring(7) + "@example.com";
  const name = randomEmail.split("@")[0];

  await prisma.user.create({
    data: {
      email: randomEmail,
      name: name,
      posts: {
        create: {
          title: "Hello World",
          content: "This is a test post",
        },
      },
    },
  });
};

seedScript();
