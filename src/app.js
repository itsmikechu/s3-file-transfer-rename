require("babel-polyfill");

import AWS from 'aws-sdk';
import config from './config.json'
import fs from 'fs-extra';
import readline from 'readline';

class App {
    static main() {
        AWS.config.accessKeyId = config.credentials.accessKeyId;
        AWS.config.secretAccessKey = config.credentials.secretAccessKey;

        const s3 = new AWS.S3();

        const lineReader = readline.createInterface({
            input: fs.createReadStream(`${config.workingPath}\\files.csv`)
        });

        const header = [];
        lineReader.once('line', (dataline) => {
            const line = dataline.replace(new RegExp('"', 'g'), '');
            header.push(...line.split(','));
        });

        lineReader.on('line', (dataline) => {
            const line = dataline.replace(new RegExp('"', 'g'), '');
            const file = {};

            const data = line.split(',');
            header.map((fieldName, index) => {
                file[fieldName] = data[index];
            });

            s3.copyObject({
                Bucket: config.buckets.destination,
                CopySource: `${config.buckets.source}/${file.filePathOnDisk}`,
                Key: `${file.targetFileName}`,
            }, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(data);
            });
        });
    }
}

App.main(); 