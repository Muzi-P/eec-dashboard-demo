import React, { Component } from 'react'
import axios from 'axios'
import defaultModel from "../../model/models";
import weekDayGenSchedule from '../../data/weekDayGenSchedule.json'
import weekEndGenSchedule from '../../data/weekEndGenSchedule.json'
import weekSunGenSchedule from '../../data/weekSunGenSchedule.json'
import functions from '../../utils/functions'

const InflowsContext = React.createContext();

class InflowsProvider extends Component {
    constructor(props) {
        super()
        this.state = {
            inflows: [],
            models: [],
            modelNames: [],
            currentYear: new Date().getFullYear(),
            reviewYears: [],
            reviewModels: [],
            utils: functions,
            selectedModel: [],
            currentModel: [],
            gs15ReviewYears: [`${new Date().getFullYear()}`],
            years: [],
            config : {
                headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwMjkyZjZjZjFiOTAwMTcyODZhMmYiLCJpYXQiOjE1OTY5OTE3OTF9.n0rOE78rbqRVWzWS3t9qn9KVDQQGAG4RIDEITlh07sk' }
            },
            date: `${new Date().toDateString()} ${new Date().toTimeString()}`,
            months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekDayGenSchedule: weekDayGenSchedule,
            weekEndGenSchedule: weekEndGenSchedule,
            weekSunGenSchedule: weekSunGenSchedule,
            currentSchedule: []
        }
    }
    componentDidMount() {
        this.getAllInflows()
        this.getAllModels()
    }
    getAllInflows = () => {
        axios.get(`${process.env.REACT_APP_API}/inflows`, this.state.config)
        .then(res => {
            this.setState({ inflows: res.data })
            this.getAllYears(res.data)
        })
    }
    getAllModels = () => {
        axios.get(`${process.env.REACT_APP_API}/models`, this.state.config)
        .then(res => {
            this.setState({ models: res.data })
            this.getAllModelNames(res.data)
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
    getAllModelNames = (models) => {
        let modelNames = []
        models.forEach(item => {
            modelNames.push(item.Model_Name)
        })
        this.setState({modelNames})

    }
    
    postToNode (inflows) {
        let config = {
            headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwMjkyZjZjZjFiOTAwMTcyODZhMmYiLCJpYXQiOjE1OTY5OTE3OTF9.n0rOE78rbqRVWzWS3t9qn9KVDQQGAG4RIDEITlh07sk' }
        }
        inflows.forEach (item => {
            axios.post( 
                `${process.env.REACT_APP_API}/inflows`,
                item,
                config
              ).then(res =>console.log(res)).catch(res => console.log(res));
        })
        
    }
    populateGS15Model = (reviewYear) => {
        let singleYearInflows = this.state.inflows.filter(inflow => inflow.Day_of_Input.includes(reviewYear))
        // this.postToNode(singleYearInflows)
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
        // this.postToNode(singleYearInflows)
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

    handleReviewModel = (model) => {
        if (this.state.reviewModels.includes(model)) {
            this.setState({ reviewModels: this.state.reviewModels.filter(item => item !== model) })
        } else {
            this.setState({ reviewModels: [...this.state.reviewModels, model] })
        }
    }
    handleGS15ReviewYear = (year) => {
        if (this.state.gs15ReviewYears.includes(year)) {
            this.setState({ gs15ReviewYears: this.state.gs15ReviewYears.filter(item => item !== year) })
        } else {
            this.setState({ gs15ReviewYears: [...this.state.gs15ReviewYears, year] })
        }

    }
    populateModelDataPoints = () => {
        let reviewModelsDataPoints = this.state.reviewModels.map(model => {
            const {min, max, opt} = this.generatePoints(model)
            let singleYearDataPoint = this.singleModelDataPoint(model,opt,min,max)
            return singleYearDataPoint
        })
        let data = this.singleModelDataPoint('model', defaultModel.defaultModel.opt(), defaultModel.defaultModel.min(), defaultModel.defaultModel.max())
        if (reviewModelsDataPoints[0]) return reviewModelsDataPoints.flat()
        return data 
    }
    singleModelDataPoint = (name,opt,min,max) => {
        let data = [
            {
                type: "spline",
                name: `${name}-opt`,
                showInLegend: true,
                xValueFormatString: "DD MMM",
                yValueFormatString: "#,###.## m.a.s.l",
                dataPoints: opt
            },
            {
                type: "spline",
                name: `${name}-min`,
                showInLegend: true,
                xValueFormatString: "DD MMM",
                yValueFormatString: "#,###.## m.a.s.l",
                dataPoints: min
            },
            {
                type: "spline",
                name: `${name}-max`,
                showInLegend: true,
                xValueFormatString: "DD MMM",
                yValueFormatString: "#,###.## m.a.s.l",
                dataPoints: max
            }
        ]

        return data
    }
    populateDataPoints = () => {
        
        let data = this.populateModelDataPoints()
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
    generatePoints = (modelName) => {
        let currentModel = this.state.models.filter(model => model.Model_Name === modelName)
        const {Min, Max, Opt} = currentModel[0]
        return {
            min: this.generateModelDataPoint(Min),
            max: this.generateModelDataPoint(Max),
            opt: this.generateModelDataPoint(Opt)
        }
    }
    generateModelDataPoint = (arr) => {
        let result = {}
        let dataPoints = arr.map(item => {
            let data = { x: new Date(item.x), y: parseFloat(item.y) }
            result = { ...data }
            return result
        })
        return dataPoints
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
    handleForecastDateChange = (date) => {
        let day = date.getDay()
        console.log(day)
        if(day === 6 ) {
            this.setState({currentSchedule: this.state.weekEndGenSchedule})
        } else if(day === 0) {
            this.setState({currentSchedule: this.state.weekSunGenSchedule})
        } else {
            this.setState({currentSchedule: this.state.weekDayGenSchedule})
        }
    }
    generateSchedule = () => {
        let currentSchedule = this.state.currentSchedule
        currentSchedule.forEach(item => {
            item.EZULWINI = 10
        })
        this.setState({currentSchedule})
    } 



    /********Drainage model*****/
    handleDrainageModelChange = (modelName) => {
        this.setState({ reviewModels: [modelName] })
        let selectedModel = this.state.models.filter(model => model.Model_Name === modelName)
        this.setState({currentModel: selectedModel})
        let model = []
        selectedModel[0].Max.forEach((item,index) => {
            let volume = this.state.utils.methods.levelToVol(parseInt(selectedModel[0].Opt[index].y))
            let perc = this.state.utils.methods.volToPerc(volume)
            let singleMonth = {
                month: item.month,
                max: item.y,
                min: selectedModel[0].Min[index].y,
                opt: selectedModel[0].Opt[index].y,
                perc: perc
            }
            model.push(singleMonth)
        })
        this.setState({selectedModel: model})
    }

    /*updating models */
    updateModel = (edit, current) => {
        let currentModel = current
        edit.forEach((item,index) => {
            currentModel[0].Min[index].y = item.min
            currentModel[0].Max[index].y = item.max
            currentModel[0].Opt[index].y = item.opt
        })
        this.updateModelApi (currentModel)
    }
    updateModelApi = (model) => {
        axios.patch( 
            `${process.env.REACT_APP_API}/models/${model[0].Model_Name}`,
            model[0],
            this.state.config
          ).then(this.getAllModels()).catch(res => console.log(res));
    }

    /*adding a new  model */
    newModel = (model, modelName) => {
        let newModel = this.state.models[0]
        const {Max, Min, Opt} = newModel
        model.forEach((item, index) => {
            Max[index].y = item.max
            Min[index].y = item.min
            Opt[index].y = item.opt
            delete  Max[index]._id
            delete  Min[index]._id
            delete  Opt[index]._id
        })
        newModel.Model_Name = modelName
        delete newModel._id
        delete newModel.createdAt
        delete newModel.updatedAt
        delete newModel._v
        this.newModelApi(newModel)
    }
    newModelApi = (model) => {
        axios.post( 
            `${process.env.REACT_APP_API}/models`,
            model,
            this.state.config
          ).then(this.getAllModels())
          .catch(res => console.log(res));
    }

    /*delete a model */
    deleteModel = (modelName) => {
        axios.delete( 
            `${process.env.REACT_APP_API}/models/${modelName}`,
            this.state.config
          ).then(this.handleDrainageModelChange(this.state.modelNames[0]))
          .catch(res => console.log(res));
    }
    render() {
        return (
            <InflowsContext.Provider value={{ ...this.state, getData: this.populateModel, getDefaultModel: this.getDefaultModel, changeForecastYear: this.changeForecastYear, handleReviewYear: this.handleReviewYear, populateDataPoints: this.populateDataPoints, handleGS15ReviewYear: this.handleGS15ReviewYear, changeGS15ForecastYear: this.changeGS15ForecastYear, populateGS15DataPoints: this.populateGS15DataPoints, handleForecastDateChange: this.handleForecastDateChange, generateSchedule: this.generateSchedule, handleReviewModel: this.handleReviewModel, handleDrainageModelChange: this.handleDrainageModelChange, updateModel: this.updateModel, newModel: this.newModel, deleteModel: this.deleteModel, getAllModels: this.getAllModels }}>
                {this.props.children}
            </InflowsContext.Provider>
        )
    }
}

const InflowsConsumer = InflowsContext.Consumer

export { InflowsProvider, InflowsConsumer, InflowsContext }


