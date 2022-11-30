const { ServerApiVersion, MongoClient } = require('mongodb');
const scraper = require('./scraper');

const username = encodeURIComponent("thesis2022");
const password = encodeURIComponent("thesis2022");

const uri = `mongodb+srv://${username}:${password}@cluster0.xzlir.mongodb.net/?retryWrites=true&w=majority`;

const run = async () => {
   
    var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

    const database = client.db("news_category");
    const collection = database.collection("dataset");
    
    // let end = 100;

    // for (let start = 0; start <= end; start + 10) {

    //     const cursor = collection.find().skip(start).limit(10);        
        
    //     if((await cursor.count) === 0) {
    //         console.log("No documents found!");
    //     }

    //     let counter = 0;

    //     await cursor.forEach(async (article) => {
    //         let res = await scraper(article.link);
    //         console.log(res, article._id);
    //         counter = counter + 1;

    //         collection.updateOne({_id: article._id}, {$set: {paragraphs: res.paragraphs}}, function(err, res) {
    //             if(err) throw err;

    //             console.log("1 document updated");

    //             if(counter === 10){client.close()};
    //         });
    //     })

    //     setTimeout( () => {console.log("Waiting")}, 60000) // 60 seconds
    // }

    // const cursor = collection.find().skip(20).limit(10); // SKIP first 10 rows, get first 10 rows following skip

    // if((await cursor.count) === 0) {
    //     console.log("No documents found!");
    // }

    // counter = 0;

    // cursor.forEach((article, index) => {
    //     setTimeout(
    //         async () => {
    //             let res = await scraper(article.link);
    //             console.log(res, article._id);

    //             collection.updateOne({_id: article._id}, {$set: {paragraphs: res.paragraphs}}, function(err, res) {
    //                 if(err) throw err;

    //                 console.log("1 document updated");                    
    //             });

    //             if(counter == 10)
    //             {
    //                 client.close();
    //             }
    //         },
    //     index * 60000)

    //     counter ++;

        
    // })
    
    const cursor = collection.find().skip(20).limit(10);

    cursor.forEach(()) => {

    });
    

    // cursor.forEach(async function(article, index){
    //     await wait(1000 * index);
    //     console.log(article.link);
    // })

    
}

function wait(ms){
    return new Promise( resolve => {
        setTimeout(() => { resolve('')}, ms);
    })
}

run()