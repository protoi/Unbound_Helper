const express = require("express")

const server = express()

//the server has been made

//route making, the thing that will be pinged by uptimg robot

server.all("/", (req, res) => {
  res.send("Bot is up")  
})

//function to start the server
function keepActive()
{
  server.listen(3000, () => {
    console.log("server is ready.")
  })
}

module.exports = keepActive