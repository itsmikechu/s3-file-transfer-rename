const AWS = require('aws-sdk');
const config = require('./config.json');
const fs = require('fs-extra');
const readline = require('readline');

class App {
    static main() {
        AWS.config.accessKeyId = config.credentials.accessKeyId;
        AWS.config.secretAccessKey = config.credentials.secretAccessKey;

        const s3 = new AWS.S3();

        const lineReader = readline.createInterface({
            input: fs.createReadStream(`${config.workingPath}\\files.csv`)
        });

        const header = [];
        lineReader.on('line', (dataline) => {
            const line = dataline.replace(new RegExp('"', 'g'), '');
            const file = {};

            const data = line.split(',');
            if (header.length === 0) {
                header.push(...line.split(','));
            }
            else {
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
            }
        });
    }
}

App.main(); 