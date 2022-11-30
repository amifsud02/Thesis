const { ServerApiVersion, MongoClient } = require('mongodb');
const scraper = require('./scraper');

const username = encodeURIComponent("thesis2022");
const password = encodeURIComponent("thesis2022");

const uri = `mongodb+srv://${username}:${password}@cluster0.xzlir.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try{
        const database = client.db("news_category");
        const collection = database.collection("dataset");

        const cursor = collection.find().limit(1).sort({$natural:-1}) 
    
        await cursor.forEach(async (article) => {
           console.log(article)
        })
    //    const cursor = collection.find().limit(1);
    
    //     if((await cursor.count) === 0) {
    //         console.log("No documents found!");
    //     }

    //     await cursor.forEach(async (article) => {
    //         let res = await scraper(article.link);

    //         article.update()

    //         console.log(res)
    //     })
        
    }
    finally{
        await client.close();
    }
}

run().catch(console.dir);