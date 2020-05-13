const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
let { users, tasks } = require('./constants/index');
const resolvers = require('./resolvers/index');
const typeDefs = require('./typeDefs/index');
const { connection } = require('./util');
dotEnv.config();

const app = express();

//cors
app.use(cors());

// db connectivity
connection();

//body parser middleware
app.use(express.json());

// const typeDefs = gql`
// 	type Query {
// 		grettings: [String]
// 		tasks: [Task!]
// 		task(id: ID!): Task
// 		users: [User!]
// 		user(id: ID!): User
// 	}

// 	input createTaskInput {
// 		name: String!
// 		completed: Boolean!
// 		userId: ID!
// 	}

// 	type Mutation {
// 		createTask(input: createTaskInput): Task
// 	}

// 	type User {
// 		id: ID!
// 		name: String!
// 		email: String!
// 		tasks: [Task!]
// 	}

// 	type Task {
// 		id: ID!
// 		name: String!
// 		completed: String!
// 		user: User!
// 	}

// 	extend type User {
// 		address: String
// 	}
// `;

// const resolvers = {
// 	Query: {
// 		grettings: () => [ 'Hello', 'World' ],
// 		tasks: () => tasks,
// 		task: (_, { id }) => tasks.find((task) => task.id === id),
// 		users: () => users,
// 		user: (_, { id }) => users.find((user) => user.id === id)
// 	},
// 	Mutation: {
// 		createTask: (_, { input }) => {
// 			const task = { ...input, id: uuid.v4() };
// 			tasks.push(task);
// 			return task;
// 		}
// 	},

// 	Task: {
// 		user: ({ userId }) => users.find((user) => user.id === userId)
// 	},
// 	User: {
// 		tasks: ({ id }) => tasks.filter((task) => task.userId === id)
// 	}
// };

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3002;

app.use('/', (req, res, next) => {
	res.send({ message: 'Hello' });
});

app.listen(PORT, () => {
	console.log(`Server listing on port: ${PORT}`);
	console.log(`Graphql: ${apolloServer.graphqlPath}`);
});
