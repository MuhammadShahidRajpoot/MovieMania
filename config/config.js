module.exports = {
  local: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
};

// module.exports = {
//   local: {
//     username: "jfvrdgwxcb",
//     password: "2p28H4BFZu",
//     database: "jfvrdgwxcb",
//     host: "147.182.175.71",
//     dialect: "mysql",
//   },
//   development: {
//     username: "jfvrdgwxcb",
//     password: "2p28H4BFZu",
//     database: "jfvrdgwxcb",
//     host: "147.182.175.71",
//     dialect: "mysql",
//   },
//   test: {
//     username: "jfvrdgwxcb",
//     password: "2p28H4BFZu",
//     database: "jfvrdgwxcb",
//     host: "147.182.175.71",
//     dialect: "mysql",
//   },
//   production: {
//     username: "jfvrdgwxcb",
//     password: "2p28H4BFZu",
//     database: "jfvrdgwxcb",
//     host: "147.182.175.71",
//     dialect: "mysql",
//   },
// };
