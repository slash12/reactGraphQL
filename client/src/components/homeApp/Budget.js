import React, { Component, Fragment } from 'react';
import AddAmount from './AddAmount';
import ChartBudget from './ChartBudget';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import SearchAmount from './SearchAmount';

const AMOUNTS_QUERY = gql`
    query getAmountsQuery{
        getAmounts{
            id
            amount
            timestamp
        }
    }
`;

class Budget extends Component {
    buildLabel = (amount) => {
        let label = [];
        
        amount.map((val, i) => {
            label.push(val.timestamp);
            return null;
        });

        return label;
    }

    buildData(amount) {
        let amountData = []

        amount.map((val, i) => {
            amountData.push(val.amount);
            return null;
        });

        return amountData;
    }

    render() {                
        return (
            <div className="container">
                <Query query={ AMOUNTS_QUERY }>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>Loading..</h4>;
                        if (error) console.log(error);
                        var amount = data.getAmounts;
                        var label  = this.buildLabel(amount);
                        var amountData = this.buildData(amount);                        

                        return <Fragment>                            
                            <div className="row">
                                <div className="col-sm-4">
                                    <AddAmount />
                                </div>
                                <div className="col-sm">
                                    <SearchAmount data={data.getAmounts} />
                                </div>                                                              
                            </div>
                            <ChartBudget label={label} amountData={amountData} />
                        </Fragment>
                    }
                }
                </Query>
            </div>
        )
    }
}

export default Budget
