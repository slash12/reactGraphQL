import React, { Component } from 'react';
import AddAmount from './AddAmount';
import ChartBudget from './ChartBudget';

class Budget extends Component {
    render() {                
        return (
            <div className="container">        
                <AddAmount />
                <ChartBudget test="test" />
            </div>
        )
    }
}

export default Budget
