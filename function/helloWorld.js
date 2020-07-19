'use strict';

module.exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello world again, the current time is ${new Date().toTimeString()}.`,
    }),
  };

  return response;
};
