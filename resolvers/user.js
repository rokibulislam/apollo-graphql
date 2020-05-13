const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');

const { users, tasks } = require('../constants/index');
const Task = require('../models/task');
const User = require('../models/user');

const User = require('../util/index');

module.exports = {
	Query: {
		users: () => users,
		user: (_, { id }) => users.find((user) => user.id === id)
	},
	Mutation: {
		signup: async (_, { input }) => {
			try {
				const user = await User.findOne({ email: input.email });
				if (user) {
					throw new Error('Email already in use');
				}

				const hashPassword = await bcrypt.hash(input.password, 12);
				const newUser = new User({ ...input, password: hashPassword });
				console.log(newUser);
				const result = await newUser.save();

				return result;
			} catch (error) {}
		}
	},
	User: {
		tasks: ({ id }) => tasks.filter((task) => task.userId === id)
		// createdAt: () => '209-09-18T12:55:02:836Z'
	}
};
