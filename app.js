const http = require("http");
const fs = require("fs");
const isPrime = require("./comps/primes");
const factorial = require("./comps/factorial");

const server = http
  .createServer((req, res) => {
    if (req.url === "/contacts") {
      fs.readFile("." + req.url + ".json", (err, data) => {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(data.toString());
        console.log(JSON.parse(data.toString())[0].name);
        console.log("ok json!");
        return res.end();
      });
    } else if (req.url.startsWith("/contacts/")) {
      const id = req.url.split("/")[2];
      fs.readFile("./contacts.json", (err, data) => {
        const parseData = JSON.parse(data);
        const find = parseData.find((e) => e.id == id);
        console.log(find);
        if (err) {
          res.writeHead(404, { "content-type": "text/html" });
          res.write("404");
          return res.end();
        } else if (!find) {
          res.statusCode(404);
          res.write("no such user");
          return res.end();
        } else {
          res.writeHead(200, { "content-type": "application/json" });
          res.write(JSON.stringify(find));
          return res.end();
        }
      });
    } 
    else if (req.url.startsWith("/comps/")) {
      const num = req.url.split("/")[3];
      const currentComps = req.url.split("/")[2];

      console.log("curentComps:", currentComps, "\nnum:", num);
      if (currentComps == "factorial") {
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(factorial(num).toString());
        res.end();
      }
      else if (currentComps == "prime") {
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(isPrime(num).toString());
        res.end();
      }
    }
    
    else {
      fs.readFile("." + req.url + ".html", (err, data) => {
        if (data) {
          res.writeHead(200, { "content-type": "text/html" });
          res.write(data.toString());
          return res.end();
        }
        else if (err) {
          res.writeHead(404, { "content-type": "text/html" });
          res.write("404");
          return res.end();
        }
      });
    }
  })
  .listen(3000);
