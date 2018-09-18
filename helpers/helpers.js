#!/usr/bin/env node
'use strict';

class Helpers {
    static GetQueryString(parameterCollection) {
        let queryString = "";
        if (Array.isArray(parameterCollection)) {
            let qs = parameterCollection.map(parameter => {
                return parameter.QueryStringName + "=" + parameter.Value
            }).join("&");

            queryString = queryString.concat("?", qs);
        }
        return queryString;
    }
}

module.exports = Helpers;