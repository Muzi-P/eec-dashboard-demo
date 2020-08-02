import React, { Component } from 'react'
import axios from 'axios'
import defaultModel from "../../model/models";
import weekDayGenSchedule from '../../data/weekDayGenSchedule.json'

const InflowsContext = React.createContext();

class InflowsProvider extends Component {
    constructor(props) {
        super()
        this.state = {
            inflows: [],
            currentYear: new Date().getFullYear(),
            reviewYears: [],
            gs15ReviewYears: [`${new Date().getFullYear()}`],
            years: [],
            config : {
                headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjIzY2E3ODY4ZDU3YjViZWM1NjU0ZTYiLCJpYXQiOjE1OTYxODE4NDJ9.KpDl4sTqkVG5zOvXHyACNbIB8VWVjZAk16nJok0tuHw' }
            },
            date: `${new Date().toDateString()} ${new Date().toTimeString()}`,
            months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekDayGenSchedule: weekDayGenSchedule
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:3000/inflows', this.state.config)
            .then(res => {
                this.setState({ inflows: res.data })
                this.getAllYears(res.data)
            })
    }

    getAllYears = (inflows) => {
        let years = []
        inflows.forEach(item => {
            let year = new Date(item.Day_of_Input).getFullYear()
            if (!years.includes(year.toString())) years.push(year.toString())
        })
        this.setState({years})

        // this.postToNode(inflows)
    }
    
    postToNode (inflows) {
        const config = {
            headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjIzY2E3ODY4ZDU3YjViZWM1NjU0ZTYiLCJpYXQiOjE1OTYxODE4NDJ9.KpDl4sTqkVG5zOvXHyACNbIB8VWVjZAk16nJok0tuHw' }
        };
        inflows.forEach (item => {
            axios.post( 
                'http://localhost:3000/inflows',
                item,
                config
              ).then(res =>console.log(res)).catch(res => console.log(res));
        })
        
    }
    populateGS15Model = (reviewYear) => {
        let singleYearInflows = this.state.inflows.filter(inflow => inflow.Day_of_Input.includes(reviewYear))
        let yearlyGS15Inflows = []
        let dataGS15 = []
        for (let i = 0; i < 12; i++) {
            let singleMonth = singleYearInflows.filter(inflow => (new Date(inflow.Day_of_Input)).getMonth() === i)
            let monthlyGS15 = singleMonth.map(inflow => {
                return parseFloat(inflow.GS_15)
            })
            let average = this.gs15MonthlyInflowsAverage(monthlyGS15)
            let object = {}
            object[this.state.months[i]] = monthlyGS15;
            object['average'] = parseFloat(average);
            yearlyGS15Inflows.push(object)

            let dataPointObject = {};
            dataPointObject['label'] = this.state.months[i];
            dataPointObject['y'] = parseFloat(average);
            dataGS15.push(dataPointObject)

        }
        return dataGS15
    }

    populateModel = (reviewYear) => {


        // Current model
        let singleYearInflows = this.state.inflows.filter(inflow => inflow.Day_of_Input.includes(reviewYear))
        let result = {}
        let dataPoints = singleYearInflows.map(inflow => {
            let year = inflow.Day_of_Input.split('-')
            year[0] = "2010"
            let newDay_of_Input = year.join('-')
            let data = { x: (new Date(newDay_of_Input)), y: parseFloat(inflow.Luphohlo_Daily_Level) }
            result = { ...data }
            return result
        })
        return dataPoints
    }

    getDefaultModel = () => {
        // default model
        let defaultdataPoints = defaultModel.defaultModel.opt()
        return defaultdataPoints
    }

    changeForecastYear = (year) => {
        this.setState({ reviewYear: year })
    }
    changeGS15ForecastYear = (year) => {
        this.setState({ gs15ReviewYears: year })
    }
    handleReviewYear = (year) => {
        if (this.state.reviewYears.includes(year)) {
            this.setState({ reviewYears: this.state.reviewYears.filter(item => item !== year) })
        } else {
            this.setState({ reviewYears: [...this.state.reviewYears, year] })
        }

    }
    handleGS15ReviewYear = (year) => {
        if (this.state.gs15ReviewYears.includes(year)) {
            this.setState({ gs15ReviewYears: this.state.gs15ReviewYears.filter(item => item !== year) })
        } else {
            this.setState({ gs15ReviewYears: [...this.state.gs15ReviewYears, year] })
        }

    }

    populateDataPoints = () => {
        let data = [
            {
                type: "spline",
                name: "model-opt",
                showInLegend: true,
                xValueFormatString: "DD MMM",
                yValueFormatString: "#,###.## m.a.s.l",
                dataPoints: defaultModel.defaultModel.opt()
            },
            {
                type: "spline",
                name: "model-min",
                showInLegend: true,
                xValueFormatString: "DD MMM",
                yValueFormatString: "#,###.## m.a.s.l",
                dataPoints: defaultModel.defaultModel.min()
            },
            {
                type: "spline",
                name: "model-max",
                showInLegend: true,
                xValueFormatString: "DD MMM",
                yValueFormatString: "#,###.## m.a.s.l",
                dataPoints: defaultModel.defaultModel.max()
            }
        ]

        let reviewYearsDataPoints = this.state.reviewYears.map(year => {
            let singleYearDataPoint = this.singleYearDataPoint(year)
            return singleYearDataPoint
        })

        if (reviewYearsDataPoints.length === 0) {
            return data
        } else {
            let merge = data.concat(reviewYearsDataPoints)
            return merge

        }

    }
    populateGS15DataPoints = () => {
        let reviewYearsGS15DataPoints = this.state.gs15ReviewYears.map(year => {
            let singleYearDataPoint = this.singleYearGS15DataPoint(year)
            return singleYearDataPoint
        })
        return reviewYearsGS15DataPoints


    }

    singleYearDataPoint = (year) => {
        let data = {
            type: "line",
            name: year,
            showInLegend: true,
            xValueFormatString: "DD MMM",
            yValueFormatString: "#,###.## m.a.s.l",
            xValueType: "dateTime",
            dataPoints: this.populateModel(year)
        }
        return data
    }
    singleYearGS15DataPoint = (year) => {
        let data = {
            type: "spline",
            name: year,
            showInLegend: true,
            xValueFormatString: "MMM",
            yValueFormatString: "#,###.## m^3/s",
            // xValueType: "dateTime",
            dataPoints: this.populateGS15Model(year)
        }
        return data
    }

    gs15MonthlyInflowsAverage = (arr) => {
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i]
        }

        return (sum / arr.length).toFixed(2)
    }

    render() {
        return (
            <InflowsContext.Provider value={{ ...this.state, getData: this.populateModel, getDefaultModel: this.getDefaultModel, changeForecastYear: this.changeForecastYear, handleReviewYear: this.handleReviewYear, populateDataPoints: this.populateDataPoints, handleGS15ReviewYear: this.handleGS15ReviewYear, changeGS15ForecastYear: this.changeGS15ForecastYear, populateGS15DataPoints: this.populateGS15DataPoints }}>
                {this.props.children}
            </InflowsContext.Provider>
        )
    }
}

const InflowsConsumer = InflowsContext.Consumer

export { InflowsProvider, InflowsConsumer, InflowsContext }


