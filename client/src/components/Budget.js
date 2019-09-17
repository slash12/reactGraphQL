import React, { Component } from 'react';
import AddAmount from './AddAmount';

class Budget extends Component {
    render() {                
        return (
            <div className="container">        
                <AddAmount />
            </div>
        )
    }
}

export default Budget
