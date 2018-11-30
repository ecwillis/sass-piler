#!/usr/bin/env node
'use strict';

const compile = require('../');
const args = require('yargs').argv;

const main = async (ar) => {
  await compile(ar);
};


main(args);
