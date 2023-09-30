const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        link: String
        image: String
    }

    type Auth {
        token: String!
        user: User
    }

    input InputBook {
        bookId: ID
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: InputBook): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;