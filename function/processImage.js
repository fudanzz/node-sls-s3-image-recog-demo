'use strict';
const aws = require('aws-sdk');
const s3 = new aws.S3();
const ImageAnalyser = require('../lib/imageAnalyzer');

module.exports.handler = async (event) => {

  const bucketname = event.Records[0].s3.bucket.name;
  const imageName = event.Records[0].s3.object.key;
  console.log(`New .jpg object has been uploaded: ${imageName} in (${bucketname} )`);

  const s3Config = {
    bucket: bucketname,
    imageName: imageName
  };

  const labels = await ImageAnalyser.getImageLabels(s3Config);

  console.log(`receive labels: ${labels}`);

  const destparams = {
      Bucket: bucketname,
      Key: imageName,
      Body: JSON.stringify(labels),
      ContentType: "application/json"
  };


  console.log('send result to s3 bucket');
  const putResult = await s3.putObject(destparams).promise(); 


};
