// const { default: axios } = require("axios");

// async function compileAndRunCode(code, language) {
//   const response = await axios.post("https://www.jdoodle.com/api/v1/execute", {
//     script: code,
//     language: language,
//     versionIndex: "0",
//     stdin: "",
//     clientId: "4a76a71b0b16b60c38118711d669f8b7",
//     clientSecret:
//       "50a405bac73a6cad4533b88435daabf357c11ea7b5833ef63896ec202e58f710",
//   });

//   return response.data;
// }

// const code = ` echo("hello"); `

// const language = "php";

// compileAndRunCode(code, language)
//   .then((result) => {
//     console.log(result.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });


var request = require("request");

const code = `print("hello") `;

var program = {
  script: code,
  language: "python3",
  versionIndex: "0",
  clientId: "4a76a71b0b16b60c38118711d669f8b7",
  clientSecret: "50a405bac73a6cad4533b88435daabf357c11ea7b5833ef63896ec202e58f710",
};
request(
  {
    url: "https://api.jdoodle.com/v1/execute",
    method: "POST",
    json: program,
  },
  function (error, response, body) {
    console.log("error:", error);
    console.log("statusCode:", response && response.statusCode);
    console.log("body:", body.output);
  }
);
