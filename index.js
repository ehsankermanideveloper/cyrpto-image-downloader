const Downloader = require("nodejs-file-downloader");
const axios = require('axios');

const donwload = async (url) => {
  //Wrapping the code with an async function, just for the sake of example.

  const downloader = new Downloader({
    url,
    directory: "./downloads",
  });
  try {
    const { filePath, downloadStatus } = await downloader.download();
    return downloadStatus
    console.log("All done");
  } catch (error) {
    console.log("Download failed", error);
  }
};
var config = {
  method: 'get',
  url: 'https://soex.pro/api/v1/currencies/available/',
  headers: {}
};

axios(config)
  .then(function (response) {
    const cryptoHasLogo = response.data.data.filter((i) => i.logo != false);
    const logos = cryptoHasLogo.map(i => i.logo);
    const logosLength = logos.length;
    const donwloadResult = [];
    for (let index = 0; index < logosLength; index++) {
      donwloadResult.push(donwload(logos[index]))
    }

    Promise.all(donwloadResult)

    console.log(donwloadResult);
  })
  .catch(function (error) {
    console.log(error);
  });
