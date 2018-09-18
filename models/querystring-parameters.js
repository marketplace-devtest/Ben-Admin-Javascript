#!/usr/bin/env node
'use strict';

class QueryStringParameter {
    constructor(name, value){
        this.name = name;
        this.value = value;
    }

    get Name(){
        return this.name;
    }

    get Value() {
        return this.value;
    }

    get QueryStringName(){
        return this.name.toLowerCase();
    }
}

module.exports = QueryStringParameter;