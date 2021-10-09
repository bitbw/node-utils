
var parser = require('xml2json');
var axios = require('axios');
axios.default.head
axios.post("https://rpc.cnblogs.com/metaweblog/bitbw",
`<?xml version="1.0"?>
<methodCall>
 <methodName>metaWeblog.getPost</methodName>
  <params>
    <param>
        <value><string>14277949</string></value>
    </param>
    <param>
        <value><string>bitbw</string></value>
    </param>
    <param>
        <value><string>bowen591005606</string></value>
    </param>
   
  </params>
</methodCall>`
).then(res=>{
    const json = parser.toJson(res.data)
    const data = JSON.parse(json)
    var xml = parser.toXml(json);
    console.log("Bowen: res.data", res.data)
    console.log("Bowen: json", json)
    console.log("Bowen: xml", xml)
    
})
 
// var xml = "<foo attr=\"value\">bar</foo>";
// console.log("input -> %s", xml)
 
// // xml to json
// var json = parser.toJson(xml);
// console.log("to json -> %s", json);
 
// // json to xml
// var xml = parser.toXml(json);
// console.log("back to xml -> %s", xml)


