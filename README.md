# s3-file-transfer-rename
Transfers files from one AWS S3 bucket to another and renames it

You'll need a config.js file near your entry point
```
{
    "credentials": {
        "accessKeyId": "<YOUR ACCESS ID>",
        "secretAccessKey": "<YOUR SECRET ACCESS KEY>"
    },
    "workingPath": "<ABSOLUTE PATH TO YOUR files.csv>",
    "buckets": {
        "source": "<SOURCE S3 BUCKET NAME>",
        "destination": "<DESTINATION S3 BUCKET NAME>"
    }
}
```
--- 
A quick utility for Ashworth College
