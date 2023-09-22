const { User, Book } = require("../models");

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate(
                    "thoughts"
                );
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        saveBook: async (parents, args) => {
            const saved = await User.findOneAndUpdate(
                { _id: args._id },
                { $addToSet: { savedBooks: args.body } },
                { new: true, runValidators: true }
            );
            return saved;
        },
        removeBook: async (parents, { bookId }, context) => {
            if (context.user) {
                const book = await Book.findOneAndDelete({
                    _id: bookId,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: book._id } }
                );

                return book;
            }
            throw AuthenticationError;
        }
    },
};
