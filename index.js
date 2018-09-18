#!/usr/bin/env node
'use strict';

const config = require("config");
const QueryStringParameter = require("./models/querystring-parameters");
const CommonQueryStringNames = require("./helpers/common-querystring-names");

Main();

async function Main() {
    let apiConfig = config.get("APIClient");
    let PaycorAPIClient = require("./api-clients/paycor-api-client");

    let client = new PaycorAPIClient(apiConfig);

    console.info("Calling Api");
    console.info("");
    
    await GetFirstPageOfEmployees(client);
    await GetSinglePageOfEmployees(client);
    await GetThreePagesOfEmployees(client);
    await GetMaxEmployeeNumber(client);
    await GetEmployeesSmallObjectSize(client);
    await GetEmployeesUsingUnCommonQueryStringParameter(client);

    console.info("Finished");
}

async function GetFirstPageOfEmployees(client) {    
    console.info("GetFirstPageOfEmployees");
    let parameterCollection = [];
    parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.PageSize, "10"));

    let employeeCollection = await client.DemographicData.GetEmployeeListV1(parameterCollection);

    WriteCollectionToConsole(employeeCollection);    
}

async function GetSinglePageOfEmployees(client) {    
    console.info("GetSinglePageOfEmployees");
    let parameterCollection = [];
    parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.PageSize, "10"));
    parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.Page, "3"));

    let employeeCollection = await client.DemographicData.GetEmployeeListV1(parameterCollection);

    WriteCollectionToConsole(employeeCollection);    
}

async function GetThreePagesOfEmployees(client) {    
    console.info("GetThreePagesOfEmployees");
    let numberOfPages = 3;
    let employeeCollection = [];
    for (let i = 1; i <= numberOfPages; i++) {
        let parameterCollection = [];
        parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.PageSize, "10"));
        parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.Page, i));

        let tempCollection = await client.DemographicData.GetEmployeeListV1(parameterCollection);

        tempCollection.forEach(employee => {
            employeeCollection.push(employee);
        });
    }
    WriteCollectionToConsole(employeeCollection);
}

async function GetMaxEmployeeNumber(client) {
    console.info("GetMaxEmployeeNumber");
    let parameterCollection = [];
    parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.PageSize, "1"));
    parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.Sort, "-employeeNumber"));

    let employeeCollection = await client.DemographicData.GetEmployeeListV1(parameterCollection);

    WriteCollectionToConsole(employeeCollection);
}

async function GetEmployeesSmallObjectSize(client) {    
    console.info("GetEmployeesSmallObjectSize");
    let parameterCollection = [];
    parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.PageSize, "10"));
    parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.ObjectSize, "small"));

    let employeeCollection = await client.DemographicData.GetEmployeeListV1(parameterCollection);

    WriteCollectionToConsole(employeeCollection);
}

async function GetEmployeesUsingUnCommonQueryStringParameter(client) {
    console.info("GetEmployeesUsingUnCommonQueryStringParameter");
    let parameterCollection = [];
    parameterCollection.push(new QueryStringParameter(CommonQueryStringNames.PageSize, "10"));
    parameterCollection.push(new QueryStringParameter("includeDirectReportField", "true"));

    let employeeCollection = await client.DemographicData.GetEmployeeListV1(parameterCollection);

    WriteCollectionToConsole(employeeCollection);
}

function WriteCollectionToConsole(collection) {
    console.info("============================");
    collection.forEach(item => {
        console.info(item);
    });
    console.info("============================");
    console.info("");
}