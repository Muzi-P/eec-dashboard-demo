import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ViewModelChart extends Component {
    render() {
        const { data } = this.props
        
        const options = {
            theme: "dark2",
            backgroundColor: "rgba(29,140,248,0)",
            animationEnabled: true,
            animationDuration: 5000,
            
            axisY: {
                includeZero: false,
                gridColor: "rgba(29,140,248,0.2)",
                gridThickness: 2,
                labelFontColor: "#9a9a9a",
                minimum: 995,
                maximum: 1017,
                title: "m.a.s.l"
            },
            axisX: {
                includeZero: true,
                gridColor: "rgba(29,140,248,0.2)",
                gridThickness: 2,
                valueFormatString: "MMM",
                labelFontColor: "#9a9a9a",
                interval:1,
                intervalType: "month"
            },
            toolTip: {
                shared: true
            },
            data: data
        }

        return (
            <div>
                <CanvasJSChart options={options}
                />
            </div>
        );
    }
}

export default ViewModelChart;