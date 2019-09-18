import React, { Component, Fragment } from 'react'
import { Line } from 'react-chartjs-2';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const AMOUNTS_QUERY = gql`
    query getAmountsQuery{
        getAmounts{
            id
            amount
            timestamp
        }
    }
`;

export default class ChartBudget extends Component {
    
    constructor(props){
        super(props);

        console.log

        this.state = {
            chartData: {
                labels: [
                    'January', 
                    'February', 
                    'March', 
                    'April', 
                    'May', 
                    'June', 
                    'July'
                ],
                datasets: [
                    {
                        label: 'My First dataset',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [
                            65, 
                            59, 
                            80, 
                            81, 
                            56, 
                            55, 
                            40
                        ]
                    }
                ]
            }
        }        
    }

    buildLabel(amount) {
        let label = [];
        
        amount.map((val, i) => {
            label.push(val.timestamp);
        });

        return label;
    }

    buildData(amount) {
        let amountData = []

        amount.map((val, i) => {
            amountData.push(val.amount);
        });

        return amountData;
    }

    updateState = (label) => {
        this.setState({
            chartData: {
                labels: label
            }
        })
    }

    render () {
        return (
            <div>
                <Query query={ AMOUNTS_QUERY }>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>Loading..</h4>;
                        if (error) console.log(error);
                        var amount = data.getAmounts;
                        var label  = this.buildLabel(amount);
                        var amountData = this.buildData(amount);                        
                        // update state labels
                        this.updateState(label);
                        

                        return <Fragment>
                            <div className="chart">
                                <Line
                                    data={this.state.chartData}
                                    options={{ maintainAspectRatio: false }}
                                />
                            </div>
                        </Fragment>
                    }
                }
                </Query>  
            </div>
        )
    }
}



