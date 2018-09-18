#!/usr/bin/env node
'use strict';

const axios = require("axios");
const qs = require('querystring');
const DemographicData = require("./demographic-data-client");

class PaycorAPIClient {
    constructor(apiConfig) {
        this.apiConfig = apiConfig;

        this.requestClient = axios.create({
            baseURL: this.apiConfig.baseUrl,
            timeout: this.apiConfig.timeout,
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": this.apiConfig.subscriptionKey
            }
        });

        this.authRequestClient = axios.create({
            baseURL: this.apiConfig.baseUrl,
            timeout: this.apiConfig.timeout,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Ocp-Apim-Subscription-Key": this.apiConfig.subscriptionKey
            }
        });

        this.requestClient.interceptors.request.use(async config => {
            let currentDT = new Date();
            if (this.accessToken === undefined || this.accessToken[".expires"] <= currentDT.toUTCString()) {
                let requestBody = {
                    grant_type: "client_credentials",
                    client_id: this.apiConfig.oauthClient,
                    client_secret: this.apiConfig.oauthSecret
                }
                let response = await this.authRequestClient.post("Security/v2/AuthToken", qs.stringify(requestBody))
                this.accessToken = response.data;
            }
            config.headers.Authorization = "Bearer " + this.accessToken.access_token;
            return config;
        });

        this.demographicData = new DemographicData(this.requestClient);
    }

    get DemographicData() {
        return this.demographicData;
    }
}

module.exports = PaycorAPIClient;