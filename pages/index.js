import Layout from "../components/layout";
import fetch from 'isomorphic-unfetch';
import React from "react";
import {faBrush, faFilter, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {faFileCode} from "@fortawesome/free-solid-svg-icons/faFileCode";
import {faCode} from "@fortawesome/free-solid-svg-icons/faCode";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

function handleCountrySearch() {
    $(".country").css("display","none");
    $(".countryNameLabel").each( function() {
        if ($(this).text().toLowerCase().match($("#countryNameId").val().toLowerCase())) {
            $(this.parentElement).css("display","block");
        }
    });
}

const selectedCountry = [];
function handleCountryClick(clickedItem, countryName) {
    var item = $(clickedItem.currentTarget);
    if (item.hasClass("bg-info text-white")){
        item.removeClass("bg-info text-white");
        item.addClass("text-danger");
        $(".badge:contains("+countryName+")").remove()
    }else{
        item.addClass("bg-info text-white");
        item.removeClass("text-danger");
        selectedCountry.push("<span class=\"countryBadge pointer badge badge-info p-2\">"+countryName+"</span>")
        $(".selectedCountryList").append("<span class=\"countryBadge pointer badge badge-info p-2 mr-1\">#"+countryName+"</span>");
    }
}
function handleFilterClick() {
    if ($(".selectedCountryList").text().trim().length>0){
        location.href="/country/"+$(".selectedCountryList").text().replace(/#/gi,"-").substring(1);
    }
}

function clearFilterClick() {
    $("#countryNameId").val("");
    $(".selectedCountryList").html("");

    $(".country").removeClass("bg-info text-white");
    $(".country").addClass("text-danger");

    handleCountrySearch();
}

const ProductListPage = pageProps => (
    <Layout>
        <div className={"navbar fixed-top"}>
            <div className={"text-center col-md-12"}>
                <h2 className={"text-danger"}>
                    <FontAwesomeIcon icon={faExclamationTriangle} className={"mr-2"} width={32}/>
                    Heyyy! Compare Corona Stats by Country of Your Choice
                </h2>
                <p className={"text-right small"}>

                    <a target={"_blank"} href={"http://corona.abdulkerimdulger.com"}>
                        <FontAwesomeIcon icon={faLink} className={"mr-2"} width={16}/>
                        http://corona.abdulkerimdulger.com</a>
                    <br/>

                    <a target={"_blank"} href={"https://twitter.com/bortecoder"}>
                        <FontAwesomeIcon icon={faCode} className={"mr-2"} width={16}/>
                        @bortecoder
                    </a>
                    <br/>
                    <span className={"text-primary"}>
                        <FontAwesomeIcon icon={faUser} className={"mr-2"} width={12}/>
                    Abdülkerim DÜLGER
                    </span>
                </p>
                <hr/>
            </div>
            <div className={"row col-md-12"}>
                <div className={"form-group col-md-5"}>
                    <input type={"text"}
                           placeholder={"Country Name"}
                           className={"form-control"} id={"countryNameId"}
                           name={"countryName"}
                           onKeyUp={handleCountrySearch}/>
                </div>
                <div className={"col-md-3 text-white"}>
                    <a className={"btn btn-warning mr-1 text-dark"} onClick={()=>{
                        clearFilterClick()}}>
                        <FontAwesomeIcon icon={faBrush} className={"mr-2"} width={16}/>
                        Clear Filter
                    </a>
                    <a className={"btn btn-info"} onClick={()=>{
                        handleFilterClick()}}>
                        <FontAwesomeIcon icon={faFilter} className={"mr-2"} width={16}/>
                        Show Chart By Country
                    </a>
                </div>

            </div>
            <div className={"col-md-12 selectedCountryList"}></div>
            <hr/>
        </div>
        <div className="row countries">
            {pageProps.country.map(countryName => (
                 // <Link href="/country/[country]" as={`/country/${countryName}`} key={countryName}>
                <div className={"country col-md-2 col-sm-4 col-6 card p-1 text-danger pointer"}
                     key={countryName}
                     onClick={(e) => { handleCountryClick(e, countryName);}}>
                    {
                        (pageProps.countryCodeByName[countryName]!=null)?
                            <img src={"https://www.countryflags.io/"+pageProps.countryCodeByName[countryName]+"/shiny/64.png"} width={"64"}/>:""
                    }
                    <div className={"countryNameLabel text-right"}>
                        {countryName}
                    </div>
                </div>
            ))}
        </div>
        <style jsx>
            {`

            .countries{
                padding-top:210px;
            }
            .navbar{
                padding-top:20px;
                background-color:white;
            }

                .country{
                    height:100px
                }
                .country img{
                    position:absolute;
                    top:43%;
                    left:1px;
                }
                .pointer{
                    cursor:pointer;
                }
                .badge{
                    cursor:pointer;
                }
                .countryNameLabel{
                    font-size:1.5em !important;
                }
            `}
        </style>
    </Layout>
);



ProductListPage.getInitialProps = async function () {
    const res = await fetch('https://pomber.github.io/covid19/timeseries.json');
    const data = await res.json();

    data["Palestine"] = data["West Bank and Gaza"];
    data["United States"] = data["US"];
    delete data["West Bank and Gaza"];
    delete data["US"];
    delete data["MS Zaandam"];
    delete data["Diamond Princess"];

    const dataCountryCodeByName = await import('../countryNameToCode.json');

    return {
        country: Object.keys(data),
        countryCodeByName: dataCountryCodeByName,
    };

};

export default ProductListPage
