import React, { Component } from "react";
import axios from "axios";
import defaultModel from "../../model/models";
import weekDayGenSchedule from "../../data/weekDayGenSchedule.json";
import weekEndGenSchedule from "../../data/weekEndGenSchedule.json";
import weekSunGenSchedule from "../../data/weekSunGenSchedule.json";
import functions from "../../utils/functions";
import swal from "sweetalert";
import Cookies from "js-cookie";
import FileDownload from "js-file-download";
const InflowsContext = React.createContext();

class InflowsProvider extends Component {
  constructor(props) {
    super();
    this.state = {
      inflows: [],
      models: [],
      modelNames: [],
      currentYear: new Date().getFullYear(),
      reviewYears: [],
      powerStations: [],
      reviewModels: [],
      loading: true,
      utils: functions,
      selectedModel: [],
      currentModel: [],
      gs15ReviewYears: [`${new Date().getFullYear()}`],
      years: [],
      ezulwini: [],
      isAuthenticated: false,
      user: {},
      ezulwiniPS: {},
      edwaleniPS: {},
      maguduzaPS: {},
      config: {},
      schedules: {},
      date: `${new Date().toDateString()}`,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      weekDayGenSchedule: weekDayGenSchedule,
      weekEndGenSchedule: weekEndGenSchedule,
      weekSunGenSchedule: weekSunGenSchedule,
      currentSchedule: [],
      summary: [
        {
          text: "Current Model",
          value: "",
        },
        {
          text: "Current Month",
          value: "",
        },
        {
          text: "Monthly Limit (m.a.s.l)",
          value: "",
        },
        {
          text: "Monthly Limit (%)",
          value: "",
        },
        {
          text: "Initial Dam Level (m.a.s.l)",
          value: "",
        },
        {
          text: "Initial Dam Level (%)",
          value: "",
        },
        {
          text: "Available Water (mil. m³)",
          value: "",
        },
        {
          text: "Water Used (mil. m³)",
          value: "",
        },
        {
          text: "Final Dam Level(m.a.s.l)",
          value: "",
        },
        {
          text: "Final Dam Level(%)",
          value: "",
        },
      ],
    };
  }
  componentDidMount = () => {
    this.init();
  };
  init = async () => {
    const token = Cookies.get("token");
    if (token) {
      await this.setState({ isAuthenticated: true });
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await this.setState({ config });
    this.getAllInflows();
    this.getAllModels();
    this.getCurrentUser();
    this.getAllPowerStations();
    this.getCurrentSchedule();
  };
  /**
   * @description get all inflows
   */
  getAllInflows = () => {
    axios
      .get(`${process.env.REACT_APP_API}/inflows`, this.state.config)
      .then((res) => {
        this.setState({ inflows: res.data });
        this.getAllYears(res.data);
      })
      .catch(() => {
        this.setState({ isAuthenticated: false });
      });
  };
  /**
   * @description get all power stations
   */
  getAllPowerStations = () => {
    axios
      .get(`${process.env.REACT_APP_API}/power-stations`, this.state.config)
      .then((res) => {
        this.formatStations(res.data);
      })
      .catch(() => {
        this.setState({ isAuthenticated: false });
      });
  };
  /**
   * @description format power stations
   */
  formatStations = (stations) => {
    this.setState({ powerStations: stations });
    stations.forEach((item) => {
      switch (item.Name) {
        case "Edwaleni Power Station":
          this.setState({ edwaleniPS: item });
          break;
        case "Maguduza Power Station":
          this.setState({ maguduzaPS: item });
          break;
        case "Ezulwini Power Station":
          this.setState({ ezulwiniPS: item });
          break;
        default:
          break;
      }
    });
    this.setState({ loading: false });
  };
  /**
   * @description get all models
   */
  getAllModels = () => {
    axios
      .get(`${process.env.REACT_APP_API}/models`, this.state.config)
      .then((res) => {
        this.setState({ models: res.data });
        this.getAllModelNames(res.data);
      });
  };
  /**
   * @description get current user
   */
  getCurrentUser = () => {
    axios
      .get(`${process.env.REACT_APP_API}/users/me`, this.state.config)
      .then((res) => {
        this.setState({ user: res.data });
      });
  };
  /**
   * @description get all active inflows years
   */
  getAllYears = (inflows) => {
    let years = [];
    inflows.forEach((item) => {
      let year = new Date(item.Day_of_Input).getFullYear();
      if (!years.includes(year.toString())) years.push(year.toString());
    });
    this.setState({ years });
    this.setState({ gs15ReviewYears: years });
  };
  /**
   * @description format model names
   */
  getAllModelNames = (models) => {
    let modelNames = [];
    models.forEach((item) => {
      modelNames.push(item.Model_Name);
    });
    this.setState({ modelNames });
    // set default model
    this.setState({ reviewModels: [modelNames[0]] });
    this.handleDrainageModelChange(modelNames[0]);
  };
  /**
   * @description get current schedules
   */
  getCurrentSchedule = (date = new Date()) => {
    axios
      .get(
        `${process.env.REACT_APP_API}/schedules/${this.formatDate(date)}`,
        this.state.config
      )
      .then((res) => {
        this.setState({ schedules: res.data });
      })
      .catch((res) => {
        console.log(res);
        this.setState({ schedules: [] });
      });
  };
  postToNode(inflows) {
    let config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwMjkyZjZjZjFiOTAwMTcyODZhMmYiLCJpYXQiOjE1OTY5OTE3OTF9.n0rOE78rbqRVWzWS3t9qn9KVDQQGAG4RIDEITlh07sk",
      },
    };
    inflows.forEach((item) => {
      axios
        .post(`${process.env.REACT_APP_API}/inflows`, item, config)
        .then((res) => console.log(res))
        .catch((res) => console.log(res));
    });
  }
  populateGS15Model = (reviewYear) => {
    let singleYearInflows = this.state.inflows.filter((inflow) =>
      inflow.Day_of_Input.includes(reviewYear)
    );
    // this.postToNode(singleYearInflows)
    let yearlyGS15Inflows = [];
    let dataGS15 = [];
    for (let i = 0; i < 12; i++) {
      let singleMonth = singleYearInflows.filter(
        (inflow) => new Date(inflow.Day_of_Input).getMonth() === i
      );
      let monthlyGS15 = singleMonth.map((inflow) => {
        return parseFloat(inflow.GS_15);
      });
      let average = this.gs15MonthlyInflowsAverage(monthlyGS15);
      let object = {};
      object[this.state.months[i]] = monthlyGS15;
      object["average"] = parseFloat(average);
      yearlyGS15Inflows.push(object);

      let dataPointObject = {};
      dataPointObject["label"] = this.state.months[i];
      dataPointObject["y"] = parseFloat(average);
      dataGS15.push(dataPointObject);
    }
    return dataGS15;
  };

  populateModel = (reviewYear) => {
    // Current model
    let singleYearInflows = this.state.inflows.filter((inflow) =>
      inflow.Day_of_Input.includes(reviewYear)
    );
    // this.postToNode(singleYearInflows)
    let result = {};
    let dataPoints = singleYearInflows.map((inflow) => {
      let year = inflow.Day_of_Input.split("-");
      year[0] = "2016";
      let newDay_of_Input = year.join("-");
      let data = {
        x: new Date(newDay_of_Input),
        y: parseFloat(inflow.Luphohlo_Daily_Level),
      };
      result = { ...data };
      return result;
    });
    return dataPoints;
  };

  getDefaultModel = () => {
    // default model
    let defaultdataPoints = defaultModel.defaultModel.opt();
    return defaultdataPoints;
  };

  changeForecastYear = (year) => {
    this.setState({ reviewYear: year });
  };
  changeGS15ForecastYear = (year) => {
    this.setState({ gs15ReviewYears: year });
  };
  handleReviewYear = (year) => {
    if (this.state.reviewYears.includes(year)) {
      this.setState({
        reviewYears: this.state.reviewYears.filter((item) => item !== year),
      });
    } else {
      this.setState({ reviewYears: [...this.state.reviewYears, year] });
    }
  };

  handleReviewModel = (model) => {
    if (this.state.reviewModels.includes(model)) {
      this.setState({
        reviewModels: this.state.reviewModels.filter((item) => item !== model),
      });
    } else {
      this.setState({ reviewModels: [...this.state.reviewModels, model] });
    }
  };
  handleGS15ReviewYear = (year) => {
    if (this.state.gs15ReviewYears.includes(year)) {
      this.setState({
        gs15ReviewYears: this.state.gs15ReviewYears.filter(
          (item) => item !== year
        ),
      });
    } else {
      this.setState({ gs15ReviewYears: [...this.state.gs15ReviewYears, year] });
    }
  };
  populateModelDataPoints = () => {
    let reviewModelsDataPoints = this.state.reviewModels.map((model) => {
      const { min, max, opt } = this.generatePoints(model);
      let singleYearDataPoint = this.singleModelDataPoint(model, opt, min, max);
      return singleYearDataPoint;
    });
    let data = this.singleModelDataPoint(
      "default-model",
      defaultModel.defaultModel.opt(),
      defaultModel.defaultModel.min(),
      defaultModel.defaultModel.max()
    );
    if (reviewModelsDataPoints[0]) return reviewModelsDataPoints.flat();
    return data;
  };
  singleModelDataPoint = (name, opt, min, max) => {
    let data = [
      {
        type: "spline",
        name: `${name}-opt`,
        showInLegend: true,
        xValueFormatString: "DD MMM",
        yValueFormatString: "#,###.## m.a.s.l",
        dataPoints: opt,
      },
      {
        type: "spline",
        name: `${name}-min`,
        showInLegend: true,
        xValueFormatString: "DD MMM",
        yValueFormatString: "#,###.## m.a.s.l",
        dataPoints: min,
      },
      {
        type: "spline",
        name: `${name}-max`,
        showInLegend: true,
        xValueFormatString: "DD MMM",
        yValueFormatString: "#,###.## m.a.s.l",
        dataPoints: max,
      },
    ];

    return data;
  };
  populateDataPoints = (view = false) => {
    let data = this.populateModelDataPoints();

    let reviewYearsDataPoints = this.state.reviewYears.map((year) => {
      let singleYearDataPoint = this.singleYearDataPoint(year);
      return singleYearDataPoint;
    });
    if (view) {
      reviewYearsDataPoints = [];
    }
    if (reviewYearsDataPoints.length === 0) {
      return data;
    } else {
      let merge = data.concat(reviewYearsDataPoints);
      return merge;
    }
  };
  generatePoints = (modelName) => {
    let currentModel = this.state.models.filter(
      (model) => model.Model_Name === modelName
    );
    const { Min, Max, Opt } = currentModel[0];
    return {
      min: this.generateModelDataPoint(Min),
      max: this.generateModelDataPoint(Max),
      opt: this.generateModelDataPoint(Opt),
    };
  };
  generateModelDataPoint = (arr) => {
    let result = {};
    let dataPoints = arr.map((item) => {
      let data = { x: new Date(item.x), y: parseFloat(item.y) };
      result = { ...data };
      return result;
    });
    return dataPoints;
  };
  populateGS15DataPoints = () => {
    let reviewYearsGS15DataPoints = this.state.gs15ReviewYears.map((year) => {
      let singleYearDataPoint = this.singleYearGS15DataPoint(year);
      return singleYearDataPoint;
    });
    return reviewYearsGS15DataPoints;
  };

  singleYearDataPoint = (year) => {
    let data = {
      type: "line",
      name: year,
      showInLegend: true,
      xValueFormatString: "DD MMM",
      yValueFormatString: "#,###.## m.a.s.l",
      dataPoints: this.populateModel(year),
    };
    return data;
  };
  singleYearGS15DataPoint = (year) => {
    let data = {
      type: "spline",
      name: year,
      showInLegend: true,
      xValueFormatString: "MMM",
      yValueFormatString: "#,###.## m^3/s",
      dataPoints: this.populateGS15Model(year),
    };
    return data;
  };

  gs15MonthlyInflowsAverage = (arr) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    return (sum / arr.length).toFixed(2);
  };
  /**
   * @description change schedule template as per day of the week
   * @param {*} date date of scheduling
   */
  handleForecastDateChange = (date) => {
    let day = date.getDay();
    if (day === 6) {
      this.setState({ currentSchedule: this.state.weekEndGenSchedule });
    }

    if (day === 0) {
      this.setState({ currentSchedule: this.state.weekSunGenSchedule });
    }

    if (day !== 6 && day !== 0) {
      this.setState({ currentSchedule: this.state.weekDayGenSchedule });
    }
  };
  /**
   * @description format date string date type ---> "yyyy-mm-dd" or "yyyy,mm,dd"
   * @param {*} date
   * @param {*} commaSeparated if true return yyyy,mm,dd
   */
  formatDate = (date, commaSeparated = false) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return commaSeparated
      ? [2016, month, day].join(",")
      : [year, month, day].join("-");
  };
  volumeToPerc = (volume) => ((volume / 23600000) * 100).toFixed(2);
  generateSchedule = async (state) => {
    const {
      startDate,
      Mkinkomo_Reservoir_Daily_Level,
      Luphohlo_Daily_Level,
      Ferreira,
      GS_15,
      GS_2,
      model,
    } = state;
    let selectedModel = this.state.models.filter(
      (models) => models.Model_Name === model
    );
    await this.setState({ currentModel: selectedModel });
    const inflow = {
      Day_of_Input: this.formatDate(startDate),
      GS_2: GS_2,
      GS_15: GS_15,
      Ferreira: Ferreira,
      Luphohlo_Daily_Level: Luphohlo_Daily_Level,
      Mkinkomo_Reservoir_Daily_Level: Mkinkomo_Reservoir_Daily_Level,
    };
    await this.postInflow(inflow);
    this.updateSummary("Current Model", model);
    this.updateSummary("Initial Dam Level (m.a.s.l)", Luphohlo_Daily_Level);
    this.updateSummary(
      "Current Month",
      this.state.months[startDate.getMonth()]
    );
    let dateString = this.formatDate(startDate, true);
    let limit = "";
    this.state.currentModel[0].Opt.forEach((item) => {
      if (item.x === dateString) {
        limit = item.y;
        return false;
      }
    });
    const dayVolume = this.state.utils.methods.levelToVol(
      parseFloat(Luphohlo_Daily_Level)
    );
    this.updateSummary("Initial Dam Level (%)", this.volumeToPerc(dayVolume));
    let volume;

    const month = startDate.getMonth();
    const day = startDate.getDay();
    if (month === 5 || month === 6 || month === 7) {
      if (day === 6 || day === 0) {
        // weekends and peak season
        // only generate if there is a spillage
        limit = 1015.6;
        volume = this.state.utils.methods.levelToVol(limit);
        await this.calculateDailyReq(
          parseFloat(GS_15),
          parseInt(volume),
          parseInt(dayVolume)
        );
      } else {
        // weekday and peak season
        volume = this.state.utils.methods.levelToVol(parseInt(limit));
        await this.calculateDailyReq(
          parseFloat(GS_15),
          parseInt(volume),
          parseInt(dayVolume)
        );
      }
    } else {
      if (day === 6 || day === 0) {
        // weekends off-peak season
        // only generate if dam is above 90%
        limit = 1014.35;
        volume = this.state.utils.methods.levelToVol(limit);
        await this.calculateDailyReq(
          parseFloat(GS_15),
          parseInt(volume),
          parseInt(dayVolume)
        );
      } else {
        // weekday and off-peak season
        volume = this.state.utils.methods.levelToVol(parseInt(limit));
        await this.calculateDailyReq(
          parseFloat(GS_15),
          parseInt(volume),
          parseInt(dayVolume)
        );
      }
    }

    const percent = ((volume / 23600000) * 100).toFixed(2);
    this.updateSummary("Monthly Limit (m.a.s.l)", limit);
    this.updateSummary("Monthly Limit (%)", percent);

    this.populateSchedule(
      startDate,
      Luphohlo_Daily_Level,
      parseFloat(GS_2),
      parseFloat(Ferreira)
    );
    this.storeSchedule(startDate);
  };
  /**
   * @description function to store schedules in backend
   * @param startDate
   */

  storeSchedule = (startDate) => {
    let powerStations = [];
    let schedulesPostData = {};
    schedulesPostData.Date = this.formatDate(startDate);
    schedulesPostData["Power_Stations"] = [];
    this.state.powerStations.forEach((item) => {
      if (!powerStations.includes(item.Name)) {
        powerStations.push(item.Name);
      }
    });
    powerStations.forEach((powerStation) => {
      let powerStationSchedule = {};
      powerStationSchedule["Schedule"] = [];
      let totals = [];
      powerStationSchedule.Name = powerStation;
      this.state.currentSchedule.forEach((item) => {
        if (item.Time !== "") {
          powerStationSchedule["Schedule"].push({
            Time: item.Time,
            Period: item.Period,
            Power: this.getPower(powerStation, item),
            ezulwiniSumPeak:
              item["ezulwiniSumPeak"] >= 0 ? item["ezulwiniSumPeak"] : null,
            ezulwiniSumStnd:
              item["ezulwiniSumStnd"] >= 0 ? item["ezulwiniSumStnd"] : null,
            ezulwiniSumOffPeak:
              item["ezulwiniSumOffPeak"] >= 0
                ? item["ezulwiniSumOffPeak"]
                : null,
            edwaleniSumPeak:
              item["edwaleniSumPeak"] >= 0 ? item["edwaleniSumPeak"] : null,
            edwaleniSumStnd:
              item["edwaleniSumStnd"] >= 0 ? item["edwaleniSumStnd"] : null,
            edwaleniSumOffPeak:
              item["edwaleniSumOffPeak"] >= 0
                ? item["edwaleniSumOffPeak"]
                : null,
            maguduzaSumPeak:
              item["maguduzaSumPeak"] >= 0 ? item["maguduzaSumPeak"] : null,
            maguduzaSumStnd:
              item["maguduzaSumStnd"] >= 0 ? item["maguduzaSumStnd"] : null,
            maguduzaSumOffPeak:
              item["maguduzaSumOffPeak"] >= 0
                ? item["maguduzaSumOffPeak"]
                : null,
          });
        } else {
          let stationKey = powerStation.split(" ")[0].toUpperCase();
          let objectKey = item.Period.toLowerCase();
          let sumObject = {};
          sumObject[objectKey] = item[stationKey];
          totals.push(sumObject);
        }
      });
      powerStationSchedule["totals"] = totals;
      schedulesPostData["Power_Stations"].push(powerStationSchedule);
    });

    axios.post(
      `${process.env.REACT_APP_API}/schedules`,
      schedulesPostData,
      this.state.config
    );
  };
  /**
   * @description match power generated to power station from schedules object
   * @param powerStation
   * @param hourlyGeneration
   */
  getPower = (powerStation, hourlyGeneration) => {
    let power = "";
    switch (powerStation) {
      case "Edwaleni Power Station":
        power = hourlyGeneration.EDWALENI;
        break;
      case "Ezulwini Power Station":
        power = hourlyGeneration.EZULWINI;
        break;
      case "Maguduza Power Station":
        power = hourlyGeneration.MAGUDUZA;
        break;
      default:
        break;
    }
    return power;
  };

  /**
   * @description the main function for schedulling
   * @param startDate
   * @param Luphohlo_Daily_Level
   * @param GS_2
   * @param Ferreira
   */
  populateSchedule = (startDate, Luphohlo_Daily_Level, GS_2, Ferreira) => {
    const month = startDate.getMonth();
    const day = startDate.getDay();
    if (month === 5 || month === 6 || month === 7) {
      if (day === 6 || day === 0) {
        // weekends and peak season
        // only generate if there is a spillage
        this.populateScheduleWeekEndOffPeak(day);
      } else {
        // weekday and peak season
        this.populateScheduleWeekDayPeakSeason(Luphohlo_Daily_Level);
      }
    } else {
      if (day === 6 || day === 0) {
        // weekends off-peak season
        // only generate if dam is above 90%
        this.populateScheduleWeekEndOffPeak(day);
      } else {
        // weekday and off-peak season
        this.populateScheduleWeekDayOffPeak(GS_2, Ferreira);
      }
    }
    this.calcSum();
  };
  populateScheduleWeekEndOffPeak = async (day) => {
    let waterConsumed = 0;
    let generatedSchedule = this.state.utils.methods.ezulwiniShutDown(
      this.state.currentSchedule
    );
    const {
      SAT_STANDARD,
      SAT_STANDARDHALFLOAD,
      SAT_OFFPEAKHALFLOAD,
      SAT_OFFPEAKFULLLOAD,
      SUN_OFFPEAKHALFLOAD,
      SUN_OFFPEAKFULLLOAD,
      TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD,
      DAILY_LUPHOHLO_INFLOW,
      INITIAL_LUPHOHLO_DAM_VOLUME,
    } = this.state.ezulwini;
    if (day === 6) {
      // saturday
      if (
        (SAT_STANDARDHALFLOAD === 0 || SAT_STANDARDHALFLOAD > 0) &&
        SAT_STANDARD < 0
      ) {
        generatedSchedule = this.state.utils.methods.ezulwiniStandardHalfLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD;
      }
      if (SAT_STANDARD === 0 || SAT_STANDARD > 0) {
        generatedSchedule = this.state.utils.methods.ezulwiniStandardFullLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD;
      }
      if (
        (SAT_OFFPEAKHALFLOAD === 0 || SAT_OFFPEAKHALFLOAD > 0) &&
        SAT_OFFPEAKFULLLOAD < 0
      ) {
        generatedSchedule = this.state.utils.methods.ezulwiniOffPeakHalfLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD;
      }
      if (SAT_OFFPEAKFULLLOAD === 0 || SAT_OFFPEAKFULLLOAD > 0) {
        generatedSchedule = this.state.utils.methods.ezulwiniOffPeakFullLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD;
      }
    } else {
      // sunday
      if (
        (SUN_OFFPEAKHALFLOAD === 0 || SUN_OFFPEAKHALFLOAD > 0) &&
        SUN_OFFPEAKFULLLOAD < 0
      ) {
        generatedSchedule = this.state.utils.methods.ezulwiniOffPeakHalfLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD;
      }
      if (SUN_OFFPEAKFULLLOAD === 0 || SUN_OFFPEAKFULLLOAD > 0) {
        generatedSchedule = this.state.utils.methods.ezulwiniOffPeakHalfLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD;
      }
    }

    // calculate sum per hour periods
    generatedSchedule = this.state.utils.methods.calcWeekDaySum(
      generatedSchedule
    );

    let finalDamVolume =
      DAILY_LUPHOHLO_INFLOW + INITIAL_LUPHOHLO_DAM_VOLUME - waterConsumed;
    finalDamVolume = this.volumeToPerc(finalDamVolume);

    waterConsumed = (waterConsumed / 1000000).toFixed(2);
    this.updateSummary("Water Used (mil. m³)", waterConsumed);
    this.updateSummary("Final Dam Level(%)", finalDamVolume);
    await this.setState({ currentSchedule: generatedSchedule });
  };
  populateScheduleWeekDayOffPeak = async (GS_2, Ferreira) => {
    const {
      PEAK,
      STANDARD,
      STANDARDHALFLOAD,
      OFFPEAKHALFLOAD,
      OFFPEAKFULLLOAD,
      TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD,
      DAILY_LUPHOHLO_INFLOW,
      INITIAL_LUPHOHLO_DAM_VOLUME,
    } = this.state.ezulwini;
    let generatedSchedule = this.state.utils.methods.allShutDown(
      this.state.currentSchedule
    );
    let waterConsumed = 0;

    if (PEAK === 0 || PEAK > 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniPeakFullLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD;
    }
    if (PEAK > 0 && STANDARDHALFLOAD > 0 && STANDARD < 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniStandardHalfLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD;
    }
    if (PEAK > 0 && STANDARD > 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniStandardFullLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD;
    }
    if (OFFPEAKHALFLOAD > 0 && PEAK > 0 && OFFPEAKFULLLOAD < 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniOffPeakHalfLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD;
    }
    if (OFFPEAKFULLLOAD > 0 && PEAK > 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniOffPeakFullLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD;
    }

    let finalDamVolume =
      DAILY_LUPHOHLO_INFLOW + INITIAL_LUPHOHLO_DAM_VOLUME - waterConsumed;
    finalDamVolume = this.volumeToPerc(finalDamVolume);
    waterConsumed = (waterConsumed / 1000000).toFixed(2);

    this.updateSummary("Water Used (mil. m³)", waterConsumed);
    this.updateSummary("Final Dam Level(%)", finalDamVolume);

    // Edwaleni & Maguduza
    const edwalwniSum = GS_2 + Ferreira;
    if (edwalwniSum > 8) {
      generatedSchedule = this.state.utils.methods.edwaleniPeakFullLoad(
        generatedSchedule
      );
      generatedSchedule = this.state.utils.methods.maguduzaPeakFullLoad(
        generatedSchedule
      );
    }
    if (edwalwniSum > 16) {
      generatedSchedule = this.state.utils.methods.edwaleniStandardFullLoad(
        generatedSchedule
      );
      generatedSchedule = this.state.utils.methods.maguduzaStandardFullLoad(
        generatedSchedule
      );
    }
    if (edwalwniSum > 21) {
      generatedSchedule = this.state.utils.methods.edwaleniOffPeakFullLoad(
        generatedSchedule
      );
      generatedSchedule = this.state.utils.methods.maguduzaOffPeakFullLoad(
        generatedSchedule
      );
    }
    // calculate sum per hour periods
    generatedSchedule = this.state.utils.methods.calcWeekDaySum(
      generatedSchedule
    );
    await this.setState({ currentSchedule: generatedSchedule });
  };
  populateScheduleWeekDayPeakSeason = async (Luphohlo_Daily_Level) => {
    let generatedSchedule = this.state.utils.methods.ezulwiniShutDown(
      this.state.currentSchedule
    );
    // ezulwini
    if (parseInt(Luphohlo_Daily_Level) > 1002) {
      generatedSchedule = this.state.utils.methods.ezulwiniPeakFullLoad(
        generatedSchedule
      );
      let waterConsumed = (this.state.ezulwini.PEAK / 1000000).toFixed(2);
      this.updateSummary("Water Used (mil. m³)", waterConsumed);
    }

    // edwaleni
    generatedSchedule = this.state.utils.methods.edwaleniPeakFullLoad(
      generatedSchedule
    );
    generatedSchedule = this.state.utils.methods.maguduzaPeakFullLoad(
      generatedSchedule
    );
    // calculate sum per hour periods
    generatedSchedule = this.state.utils.methods.calcWeekDaySum(
      generatedSchedule
    );

    await this.setState({ currentSchedule: generatedSchedule });
  };
  calcSum = async () => {
    let generatedSchedule = this.state.currentSchedule;
    generatedSchedule = this.state.utils.methods.calcSum(generatedSchedule);
    await this.setState({ currentSchedule: generatedSchedule });
  };
  calculateDailyReq = async (
    GS_15,
    MONTHLY_LIMIT,
    INITIAL_LUPHOHLO_DAM_VOLUME
  ) => {
    const DAILY_LUPHOHLO_INFLOW = GS_15 * 24 * 60 * 60;
    const TOTAL_DAILY_AVAILABLE_WATER =
      DAILY_LUPHOHLO_INFLOW + INITIAL_LUPHOHLO_DAM_VOLUME - MONTHLY_LIMIT;
    this.updateSummary(
      "Available Water (mil. m³)",
      (TOTAL_DAILY_AVAILABLE_WATER / 1000000).toFixed(2)
    );

    /* weekdays */
    const TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD = this.calcEzWater(20, 7);
    const TOTAL_WATER_NEEDED_FOR_PEAK_HALF_LOAD = this.calcEzWater(10, 7);
    const TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD = this.calcEzWater(20, 9); // C28
    const TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD = this.calcEzWater(10, 9); // E28
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD = this.calcEzWater(20, 8); // E33
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD = this.calcEzWater(10, 8); // E31

    const PEAK =
      TOTAL_DAILY_AVAILABLE_WATER - TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD; // C27
    const PEAKHALFLOAD =
      TOTAL_DAILY_AVAILABLE_WATER - TOTAL_WATER_NEEDED_FOR_PEAK_HALF_LOAD;
    const STANDARD = PEAK - TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD; // C29 = C27 - C28
    const STANDARDHALFLOAD = PEAK - TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD; // E29 = C27 - E28
    const OFFPEAKHALFLOAD =
      STANDARD - TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD; // E32 = C29 - E31
    const OFFPEAKFULLLOAD =
      STANDARD - TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD; // E34 = C29 - E33

    /* saturday */
    const TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD = this.calcEzWater(20, 7);
    const TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD = this.calcEzWater(10, 7);
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD = this.calcEzWater(
      20,
      17
    );
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD = this.calcEzWater(
      10,
      17
    );

    const SAT_STANDARD =
      TOTAL_DAILY_AVAILABLE_WATER - TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD;
    const SAT_STANDARDHALFLOAD =
      TOTAL_DAILY_AVAILABLE_WATER - TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD;
    const SAT_OFFPEAKHALFLOAD =
      SAT_STANDARD - TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD;
    const SAT_OFFPEAKFULLLOAD =
      SAT_STANDARD - TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD;

    /* sunday */
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD = this.calcEzWater(
      20,
      24
    );
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD = this.calcEzWater(
      10,
      24
    );

    const SUN_OFFPEAKHALFLOAD =
      TOTAL_DAILY_AVAILABLE_WATER -
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD;
    const SUN_OFFPEAKFULLLOAD =
      TOTAL_DAILY_AVAILABLE_WATER -
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD;

    const ezulwini = {
      PEAK,
      PEAKHALFLOAD,
      STANDARD,
      STANDARDHALFLOAD,
      OFFPEAKHALFLOAD,
      OFFPEAKFULLLOAD,
      SAT_STANDARD,
      SAT_STANDARDHALFLOAD,
      SAT_OFFPEAKHALFLOAD,
      SAT_OFFPEAKFULLLOAD,
      SUN_OFFPEAKHALFLOAD,
      SUN_OFFPEAKFULLLOAD,
      TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_PEAK_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD,
      DAILY_LUPHOHLO_INFLOW,
      INITIAL_LUPHOHLO_DAM_VOLUME,
    };
    await this.setState({ ezulwini });
  };

  calcEzWater = (watts, hours) =>
    watts *
    hours *
    parseFloat(this.state.ezulwiniPS.Genarators[0].Rated_Flow) *
    60 *
    60;

  /**
   * @description update summary
   * */
  updateSummary = async (text, value) => {
    const elementsIndex = this.state.summary.findIndex(
      (element) => element.text === text
    );
    let newSummary = [...this.state.summary];
    newSummary[elementsIndex] = { ...newSummary[elementsIndex], value: value };
    await this.setState({
      summary: newSummary,
    });
  };

  /**
   * @description post new inflows
   * */
  postInflow = (inflow) => {
    axios
      .post(`${process.env.REACT_APP_API}/inflows`, inflow, this.state.config)
      .then((res) => {
        this.alert(
          "Inflows Added",
          `Date: ${res.data.Day_of_Input.split("T")[0]}`
        );
      })
      .catch((res) => console.log(res));
  };
  /**
   * @description edit rate flow
   * */
  editRatedFlow = (powerStation) => {
    axios
      .patch(
        `${process.env.REACT_APP_API}/power-stations/${powerStation.Name}`,
        powerStation,
        this.state.config
      )
      .then((res) => {
        this.alert("Rated Flow Updated", res.data.Name);
      })
      .catch((res) => console.log(res));
  };

  alert = (title, text, icon = "success") => {
    swal({
      title,
      text,
      icon,
      button: "Okay",
    }).then(() => {
      this.getAllInflows();
      this.getAllPowerStations();
      this.getAllModels();
    });
  };
  /**
   * @description handle when user selects model in drop down
   * @param {*} modelName
   */
  /********Drainage model*****/
  handleDrainageModelChange = (modelName) => {
    this.setState({ reviewModels: [modelName] });
    let selectedModel = this.state.models.filter(
      (model) => model.Model_Name === modelName
    );
    this.setState({ currentModel: selectedModel });
    let model = [];
    selectedModel[0].Max.forEach((item, index) => {
      let day = item.x.split(",")[2];
      let date = new Date(item.x);
      if (day === "15") {
        let volume = this.state.utils.methods.levelToVol(
          parseInt(selectedModel[0].Opt[index].y)
        );
        let perc = this.state.utils.methods.volToPerc(volume);
        let singleMonth = {
          max: item.y,
          min: selectedModel[0].Min[index].y,
          opt: selectedModel[0].Opt[index].y,
          month: this.state.months[date.getMonth()],
          day: item.x,
          perc,
        };
        model.push(singleMonth);
      }
    });
    this.setState({ selectedModel: model });
  };
  /**
   * @description update model
   * @param {*} edit
   * @param {*} current
   * @param {*} name
   */
  updateModel = (edit, current, name) => {
    let currentModel = current;
    edit.forEach((item, index) => {
      currentModel[0].Min[index].y = item.min;
      currentModel[0].Max[index].y = item.max;
      currentModel[0].Opt[index].y = item.opt;
    });
    currentModel[0].Model_Name = edit.Model_Name;
    delete currentModel[0].__v;
    this.updateModelApi(currentModel, name);
  };
  updateModelApi = (model, name) => {
    axios
      .patch(
        `${process.env.REACT_APP_API}/models/${name}`,
        model[0],
        this.state.config
      )
      .then((res) => {
        this.alert("Model Updated", `Model Name: ${res.data.Model_Name}`);
      })
      .catch((error) => console.log(error));
  };

  /*adding a new  model */
  newModel = (model, modelName) => {
    let newModel = this.state.models[0];
    const { Max, Min, Opt } = newModel;
    model.forEach((item, index) => {
      Max[index].y = item.max;
      Min[index].y = item.min;
      Opt[index].y = item.opt;
      delete Max[index]._id;
      delete Min[index]._id;
      delete Opt[index]._id;
    });
    newModel.Model_Name = modelName;
    delete newModel._id;
    delete newModel.createdAt;
    delete newModel.updatedAt;
    delete newModel.__v;
    this.newModelApi(newModel);
  };
  newModelApi = (model) => {
    axios
      .post(`${process.env.REACT_APP_API}/models`, model, this.state.config)
      .then(this.getAllModels())
      .catch((res) => console.log(res));
  };
  signIn = (loginInfo) => {
    axios
      .post(`${process.env.REACT_APP_API}/users/login`, loginInfo)
      .then((res) => {
        Cookies.set("token", res.data.token);
        Cookies.set("loggedIn", true);
        this.setState({ user: res.data.user });
      })
      .then(() => {
        this.init();
      })
      .catch((res) => {
        this.alert("Sign In Error", "Incorrect Credentials", "error");
      });
  };
  signUp = (loginInfo) => {
    axios
      .post(`${process.env.REACT_APP_API}/users`, loginInfo)
      .then((res) => {
        Cookies.set("token", res.data.token);
        Cookies.set("loggedIn", true);
        this.setState({ user: res.data.user });
      })
      .then(() => {
        this.init();
      })
      .catch((res) => {
        this.alert("Sign Up Error", "Unauthorized Email", "error");
      });
  };

  /*delete a model */
  deleteModel = (modelName) => {
    axios
      .delete(
        `${process.env.REACT_APP_API}/models/${modelName}`,
        this.state.config
      )
      .then(this.handleDrainageModelChange(this.state.modelNames[0]))
      .catch((res) => console.log(res));
  };
  keepLoggedIn = () => {
    this.setState({ isAuthenticated: true });
  };
  logOut = async () => {
    const token = Cookies.get("token");
    if (!token) {
      await this.setState({ isAuthenticated: false });
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(`${process.env.REACT_APP_API}/users/logout`, {}, config)
      .then((res) => {
        Cookies.remove("token");
        Cookies.set("loggedIn", false);
        this.setState({ isAuthenticated: false });
      })
      .catch((res) => console.log(res));
  };
  /**
   * @description export shedules to excel files
   * @param date export date
   */

  exportSchedules = (date) => {
    // console.log(this.formatDate(date));
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API}/download-schedules/${this.formatDate(
    //       date
    //     )}`,
    //     this.state.config
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     // download(res.data, "test.xlsx");
    //   });
    axios({
      url: `${process.env.REACT_APP_API}/download-schedules/${this.formatDate(
        date
      )}`,
      data: {
        date,
      },
      headers: this.state.config.headers,
      method: "POST",
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(response.data, "report.xlsx");
    });
  };
  render() {
    return (
      <InflowsContext.Provider
        value={{
          ...this.state,
          getData: this.populateModel,
          getDefaultModel: this.getDefaultModel,
          changeForecastYear: this.changeForecastYear,
          handleReviewYear: this.handleReviewYear,
          populateDataPoints: this.populateDataPoints,
          handleGS15ReviewYear: this.handleGS15ReviewYear,
          changeGS15ForecastYear: this.changeGS15ForecastYear,
          populateGS15DataPoints: this.populateGS15DataPoints,
          handleForecastDateChange: this.handleForecastDateChange,
          generateSchedule: this.generateSchedule,
          handleReviewModel: this.handleReviewModel,
          handleDrainageModelChange: this.handleDrainageModelChange,
          updateModel: this.updateModel,
          signIn: this.signIn,
          newModel: this.newModel,
          deleteModel: this.deleteModel,
          getAllModels: this.getAllModels,
          keepLoggedIn: this.keepLoggedIn,
          logOut: this.logOut,
          signUp: this.signUp,
          exportSchedules: this.exportSchedules,
          getCurrentSchedule: this.getCurrentSchedule,
          editRatedFlow: this.editRatedFlow,
        }}
      >
        {this.props.children}
      </InflowsContext.Provider>
    );
  }
}

const InflowsConsumer = InflowsContext.Consumer;

export { InflowsProvider, InflowsConsumer, InflowsContext };
