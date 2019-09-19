import React, { Component, Fragment } from 'react'
import { Chart, Line } from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom';
import 'react-hammerjs';

export default class ChartBudget extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            chartData: {
                showScale: true,
                pointDot: true,
                labels: props.label,
                datasets: [
                    {
                        label: 'Amount',
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
                        data: props.amountData,
                    }
                ],
            },
        }        
    }

    UNSAFE_componentWillMount() {
        Chart.plugins.register(zoom);
    }

    render () {        
        return (
            <Fragment>
                <h4 className="display">Budget Overview</h4>
                <div className="chart">
                    <Line
                        data={this.state.chartData}
                        options={
                            { 
                                maintainAspectRatio: false,
                                pan: {
                                    enabled: true,
                                    mode: 'x',                                    
                                 },
                                 zoom: {
                                    enabled: true,
                                    mode: 'x',
                                    speed: 100
                                 }
                              }
                            }
                        width={1000}
                        height={350}
                    />
                </div>
            </Fragment>
            
        )
    }
}



