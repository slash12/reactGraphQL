const axios = require('axios');
const { 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');

//  Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number:     {type: GraphQLInt},
        mission_name:      {type: GraphQLString},
        launch_year:       {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success:    {type: GraphQLBoolean},
        rocket:            {type: RocketType}
    })
});

//  Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id:   {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString},
    })
});

// Budget Amount Type (for adding an amount to budget)
const BAmountType = new GraphQLObjectType({
    name: 'BAmountType',
    fields: () => ({
        amount: { type: GraphQLFloat },
        hint: { type: GraphQLString },
        statusCode: { type: GraphQLInt },
    })
})

// object for listing the amount entries from the budget
const AmountType = new GraphQLObjectType({
    name: 'AmountType',
    fields: () => ({
        id: { type: GraphQLInt },
        amount: { type: GraphQLFloat },
        timestamp: { type:GraphQLString }
    })
})

const Mutation =  new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        adBAmount: {
            type: BAmountType,
            args: {
                amount: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args){
                return axios.post('http://localhost:8000/add/amount', {
                    amount: args.amount
                }).then(res => res.data);                
            }
        },
        upBAmount: {
            type: BAmountType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                amount: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args){
                return axios.put(`http://localhost:8000/update/amount/${args.id}`, {
                    amount: args.amount
                }).then(res => res.data);                
            }
        }
    }
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // launches: {
        //     type: new GraphQLList(LaunchType),
        //     resolve(parent, args) {
        //         return axios.get('https://api.spacexdata.com/v3/launches')
        //             .then(res => res.data);
        //     }
        // },
        getAmounts: {
            type: new GraphQLList(AmountType),
            resolve(parent, args) {
                return axios.get('http://localhost:8000/list/amount')
                    .then(res => res.data);
            }
        },
        getAmountById: {
            type: AmountType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`http://localhost:8000/amount/${args.id}`)
                    .then(res => res.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});