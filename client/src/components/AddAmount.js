import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const ADD_AMOUNT_QUERY = gql`
        mutation {
            adBAdmount(amount: $amount) {
            hint
            statusCode
        }
   }  
`;

class AddAmount extends Component {
    state = {
        amount: ''
    }

    addAmount = (amount) => (
        <Query 
            query={ADD_AMOUNT_QUERY} 
            variables={{ amount }}
        >
            {                        
                ({loading, error, data}) => {                            
                    if (loading) return <h4>Processing ...</h4>
                    if (error) console.log(error)

                    console.log(data);
                }                        
            }
        </Query>
    );
    
    onSubmit = (e) => {
        e.preventDefault();
        let amount = this.state.amount;
        amount = parseFloat(amount);    

        return this.addAmount(amount);        
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    render() {
        return (
            <div>
                <form                    
                    onSubmit={ this.onSubmit }
                >
                    <div className="form-group row my-3">
                        <div className="col-xs-3">
                            <label htmlFor="Amount">Amount:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="amount" 
                                value={ this.state.amount }
                                placeholder="Add Amount ..."
                                onChange={ this.onChange }
                            />
                        </div>
                        <div className="col-xs-3 my-4">
                            <input                                
                                type="submit" 
                                value="Add Amount" 
                                className="btn btn-secondary" 
                                style={{ marginTop: "5%", marginLeft: "5%" }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

AddAmount.propTypes = {
    addAmount: PropTypes.string
}

export default AddAmount
