const fs = require("fs");
let rawdata = fs.readFileSync("test.json");
let questions = JSON.parse(rawdata);
let arr = [];
// 读取全部的题目，需要转义成数据库需要的json
// console.log(questions);
// 定义三个题的标签
const type = {
  html: "5ff5bc68fce5d000011cd514",
  js: "5ff5bc70c23632000132f512",
  css: "5ff5bc78fce5d000011cd530",
};
const nowDate = new Date().toISOString();
for (let key in questions.result) {
  for (let typeKey in questions.result[key]) {
    if (typeKey !== "skill") {
      let item = questions.result[key][typeKey];
      let temp = {
        title: item.title,
        areaID: "5fdf56a3e2c1ee0001a52e49", // 前端
        publishUserID: "5ff5bdd5770c7900015b1f80", // 对应用户
        content: item.body,
        questionExplanation: [],
        tagID: type[typeKey],
        createDate: nowDate,
        updateDate: nowDate,
        deleteDate: ""
      };
      arr.push(temp);
    }
  }
}
let data = JSON.stringify(arr);
fs.writeFileSync("print.json", data);