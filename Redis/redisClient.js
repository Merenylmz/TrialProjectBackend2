const {createClient} = require("redis");

const client = createClient({
    url: "redis://localhost:6379"
});

client.on("connect", ()=>{
    console.log("Redis is Ready");
});

client.connect().catch((err)=>{
    console.log("Redis Error ", err);
})

module.exports = client;