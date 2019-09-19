import React, { Component } from 'react';
import { Combobox } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

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
        this.setState({selectData: data}, function() {
            console.log(Document.getElementByName('amountData'));
        });
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
                        <div className="col-xs-3">
                            <input
                                name="amountData"
                                type="text" 
                                className="form-control"
                                defaultValue={ this.state.selectData === null ? " " : this.state.selectData.amount }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchAmount
