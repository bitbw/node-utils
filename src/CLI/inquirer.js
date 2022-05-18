let inquirer = require("inquirer");

(async function () {
  let question = [
    { type: "editor", name: "dec", message: "描述", default: "" },
    { type: "input", name: "username", message: "姓名", default: "" },
    {
      type: "list",
      name: "study",
      message: "学历",
      choices: ["小学", "初中", "高中", "大学", "研究生"],
    },
    {
      type: "checkbox",
      name: "hobby",
      message: "爱好",
      choices: ["篮球", "足球", "游泳"],
    },
    { type: "confirm", name: "isMan", message: "man", default: true },
  ];

  let answer = await inquirer.prompt(question);
  console.log(answer);
  // 根据选项的结果继续交互
  if (answer.isMan) {
    answer = await inquirer.prompt([
      { type: "input", name: "test", message: "根据isMan结果", default: "" },
    ]);
  }
})();
