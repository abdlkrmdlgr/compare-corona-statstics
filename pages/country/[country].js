import Layout from "../../components/layout";
import LineChart from "../../components/LineChart";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShare} from "@fortawesome/free-solid-svg-icons/faShare";

const Country = props => (
    <Layout>
        <div className={"mb-2"}>
            <a href={"/"} className={"btn btn-danger"}>
                <FontAwesomeIcon icon={faShare } className={"mr-2"} width={16}/>
            Back to Country List</a>
        </div>
            <div>
                <div dangerouslySetInnerHTML={{__html: props.countryBadge}}></div>
            </div>
            {/*<LineChart {...props}/>*/}
    </Layout>
);

Country.getInitialProps = async function (context) {
    const {country} = context.query;
    console.log(country);

    const res = await fetch('https://pomber.github.io/covid19/timeseries.json');
    const data = await res.json();


    data["Palestine"] = data["West Bank and Gaza"];
    data["United States"] = data["US"];
    delete data["West Bank and Gaza"];
    delete data["US"];
    delete data["MS Zaandam"];
    delete data["Diamond Princess"];


    console.log(data);

    const dataCountryCodeByName = await import('../../countryNameToCode.json');
    var countryBadge = "Selected Countries: ";

    country.split("-").map(item =>{
        countryBadge+=("<span class=\"badge badge-info p-2 mr-1\">"+item+"</span>");
    });
    return {
        countryName: country,
        countryBadge: countryBadge,
        countryData: data,
        countryCodeByName: dataCountryCodeByName,
    };
};
export default Country;
