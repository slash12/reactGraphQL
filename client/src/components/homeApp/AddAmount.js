import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { useAlert } from 'react-alert';

const ADD_AMOUNT_QUERY = gql`
        mutation AdBAmount($amount: Float!) {
            adBAmount(amount: $amount) {
            hint
            statusCode
        }
   }  
`;

const AddAmount = () => {
    let input;
    const alert = useAlert();

    const showNotification = (data) => {
        let status = data.statusCode;
        let hint = data.hint;

        if (status === 200) {
            alert.show(status + "/ " + hint, {
                timeout: 4000,
                type: 'success',
            });
        } else {
            alert.show(status + "/ " + hint, {
                timeout: 4000,
                type: 'error',
            });
        }        
    }

    return (
        // mutation request with its form
        <Mutation mutation={ADD_AMOUNT_QUERY}>
            {
                (addAmount, error) => (
                    <div className="my-3">
                        <form
                            onSubmit={e => {
                            e.preventDefault();

                            // make the mutation call
                            addAmount({ 
                                variables: { 
                                    // convert amount to float
                                    amount: parseFloat(input.value)
                                }                                
                            })
                                .then(res => {
                                    showNotification(res.data.adBAmount);
                                })
                                .catch(error => {
                                    showNotification({ "statusCode": 500, "hint": "Please enter appropriate value" });
                                })
                            input.value = '';
                            }}
                        >
                            <div className="form-group row">
                                <div className="col-xs-3">
                                    <label htmlFor="Amount">Amount</label>
                                    <input
                                        className="form-control"
                                        ref= {
                                            node => {
                                                input = node;
                                            }
                                        }
                                    />
                                </div>
                                <div className="col-xs-3 my-4">
                                    <button style={{marginTop: '5%'}} className="btn btn-primary" type="submit">Add Amount</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        </Mutation>
    )
}

export default AddAmount
