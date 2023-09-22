const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [bookschema]
    }

    type Book {
        bookId: ID!
        authors: [String!]
        description: String!
        title: String
        link: String
        image: String
    }

    type Auth {
        token: String!
        user(email: String!, password: String!): User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(author: [Author!], description: String!, title: String!, link: String): User
        removeBook(bookId: ID!): User
    }
`