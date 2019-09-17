import React from 'react';
import gql from 'graphql-tag';
// import { Mutation } from 'react-apollo';
import { Mutation } from '@apollo/react-components';

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

    return (
        <Mutation mutation={ADD_AMOUNT_QUERY}>
            {(addAmount, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                        e.preventDefault();
                        addAmount({ variables: { amount: parseFloat(input.value) } });
                        input.value = '';
                        }}
                    >
                        <input
                        ref={node => {
                            input = node;
                        }}
                        />
                        <button type="submit">Add Amount</button>
                    </form>
                </div>
            )}
        </Mutation>
    )
}

export default AddAmount
