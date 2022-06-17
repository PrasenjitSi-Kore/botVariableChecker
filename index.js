'use strict'

const fs = require('fs');

const config = require('./config.json');

function tool() {
    try {
        if (!(config.file_one && fs.existsSync(config.file_one))) {
            console.error('Error: file_one not found');
            process.exit(0);
        }

        if (!(config.file_two && fs.existsSync(config.file_two))) {
            console.error('Error: file_two not found');
            process.exit(0);
        }

        if (!config.filterType) {
            console.error('Error: filterType type is missing in config.json');
            process.exit(0);
        }

        if (!config.variableType) {
            console.error('Error: variableType type is missing in config.json');
            process.exit(0);
        }

        const fileOne = require(config.file_one);
        const fileTwo = require(config.file_two);

        // Set variable type
        let VARIABLE_TYPE = 'locale'; // Default
        if (config.variableType === 'content' || config.variableType === 'locale') {
            VARIABLE_TYPE = 'locale';
        } else if (config.variableType === 'env' || config.variableType === 'environment') {
            VARIABLE_TYPE = 'env';
        }

        const fileOneVar = fileOne.filter(item => {
            return item.variableType && item.variableType === VARIABLE_TYPE;
        });

        const fileTwoVar = fileTwo.filter(item => {
            return item.variableType && item.variableType === VARIABLE_TYPE;
        });

        fileOneVar.forEach((item, index) => {
            const key = item.key;
            const fileTwoItem = fileTwoVar.find(f2i => {
                return f2i.key === key;
            });

            let diff = item.value !== fileTwoItem.value;
            if (config.filterType && config.filterType.indexOf('same') > -1) {
                diff = item.value === fileTwoItem.value;
            }

            if (fileTwoItem && diff) {
                console.log('===================================================================================== ' + (index + 1))
                console.log(`\nVariable: ${key}\n`);
                console.log('------------------- file one ------------------------')
                console.log(`\n${item.value}\n`);
                console.log('------------------- file two ------------------------')
                console.log(`\n${fileTwoItem.value}\n`);
            }

            if (!fileTwoItem) {
                console.log('===================================================================================== ' + (index + 1))
                console.log(`\nVariable: ${key}\n`);
                console.log('------------------- file two ------------------------')
                console.log(`\n${item.value}\n`);
            }
        });
    } catch (err) {
        console.error(err.message);
        console.error(err.stack);
    }
}

tool();
