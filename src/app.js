require("babel-polyfill");

import AWS from 'aws-sdk';
import config from './config.json'
import fs from 'fs-extra';

class App {
    static main() {
        AWS.config.accessKeyId = config.credentials.accessKeyId;
        AWS.config.secretAccessKey = config.credentials.secretAccessKey;

        const s3 = new AWS.S3();

        s3.copyObject({ 
            Bucket: config.buckets.destination,
            CopySource: `${config.buckets.source}/TestFileFromSakai.txt`,
            Key: `TestFileFromSakaiButRenamed.txt`,
        }, (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(data);
        });
    }
}

App.main();