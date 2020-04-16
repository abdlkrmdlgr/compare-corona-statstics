import {faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faProcedures} from "@fortawesome/free-solid-svg-icons/faProcedures";
import {faRunning} from "@fortawesome/free-solid-svg-icons/faRunning";
import Layout from "./layout";

function drawChart(props, type) {
    var dataObject = [];
    var dateObject = [];
    var detailMessage = null;
    var countries = props.countryName.split("-");

    var colorArr = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#FF0000", "#000", "#FF0", "#999"];
    var colorIndex = 0;
    countries.forEach(country => {

        var datesArr = [];
        var confirmedArr = [];
        var deathsArr = [];
        var recoveredArr = [];

        // //gün gün tarihler dönülür.
        Object.keys(props.countryData[country]).map(index => {
            var item = props.countryData[country][index];

            if (Date.parse(item.date) >= Date.parse("2020-3-1")) {
                datesArr.push(item.date);
                confirmedArr.push(item.confirmed);
                deathsArr.push(item.deaths);
                recoveredArr.push(item.recovered);
            }
        });

        dateObject = datesArr;

        var sourceData = null;

        if (type == "D") {
            sourceData = deathsArr;
            detailMessage = "Death Statistic";
        } else if (type == "C") {
            sourceData = confirmedArr;
            detailMessage = "Confirmed Statistic";
        } else if (type == "R") {
            sourceData = recoveredArr;
            detailMessage = "Recovered Statistic";
        }

        dataObject.push(
            {
                data: sourceData,
                label: country,
                borderColor: colorArr[colorIndex],
                fill: false
            }
        );
        colorIndex += 1;
    });

    $(".canvasDiv canvas").remove();
    $(".canvasDiv").html('<canvas id="line-chart" width="800" height="320"/>');

    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: dateObject,
            datasets: dataObject
        },
        options: {
            title: {
                display: true,
                text: 'Corona Statistic - ' + detailMessage
            }
        }
    });

};

const LineChart = props => (

        <div className={"text-right chartGroupButton pt-2"}>
            <button className={"col-md-2 col-sm-3 col-4 btn btn-success p-2 mr-1"} onClick={() => drawChart(props, "R")}>
                <FontAwesomeIcon icon={faRunning} className={"mr-2"} width={16}/>
                Recovered Chart
            </button>

            <button className={"col-md-2 col-sm-3 col-4 btn btn-warning mr-1 p-2"} onClick={() => drawChart(props, "C")}>
                <FontAwesomeIcon icon={faProcedures} className={"mr-2"} width={16}/>
                Confirmed Chart
            </button>

            <button className={"col-md-2 col-sm-3 col-3 btn btn-danger mr-1 p-2"} onClick={() => drawChart(props, "D")}>
                <FontAwesomeIcon icon={faSkullCrossbones} className={"mr-2"} width={16}/>
                Death Chart
            </button>

            <div className={"canvasDiv"}>
                <canvas id="line-chart" width="800" height="320"/>
            </div>
        </div>

);

export default LineChart;
