#!/usr/bin/env node
'use strict';

const Helpers = require("../helpers/helpers");

class DemographicDataClient {
    constructor(requestClient) {
        this.requestClient = requestClient;
    }

    async GetEmployeeListV1(parameterCollection) {
        try {
            let queryString = Helpers.GetQueryString(parameterCollection);
            let response = await this.requestClient.get("public/DemographicData/v1/employees" + queryString);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = DemographicDataClient;