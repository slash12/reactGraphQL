import React, { Component } from 'react';
import { Combobox } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

import AmountForm from './AmountForm';

export class SearchAmount extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            amountData: props.data,
            selectData: null
        }
    }

    ListItem = ({ item }) => (
        <span>
          <strong>{item.amount}</strong>
          {" " + item.timestamp}
        </span>
      );
    
    selectedAmount = (data) => {
        console.log(data);
        this.setState({selectData: data}, () => {
            console.log(this.state);
        })        
    }
    
    render() {
        return (
            <div className="my-5">
                <div className="row" style={{ marginTop: '-0.5%' }}>
                    <div className="col-sm">
                        <Combobox
                            data={this.state.amountData}
                            textField='amount'
                            itemComponent={this.ListItem}
                            defaultValue={this.state.amountData[0].amount + ' (' + this.state.amountData[0].timestamp + ')'}
                            onChange={ item => this.selectedAmount(item) }                    
                        />  
                    </div>
                    <div className="col-sm">
                        <AmountForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchAmount
