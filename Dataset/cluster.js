const { Cluster } = require('puppeteer-cluster');

const fs = require('fs');
var newsData = JSON.parse(fs.readFileSync('./News_Category_Dataset_v3.json'));

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 5,
        timeout: 60000,
        monitor: true,
        puppeteerOptions: {
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
        },
    });

    cluster.on("taskerror", (err, data) => {
        console.log(`Error Crawling ${data}: ${err.message}`);
    })

    await cluster.task(async ({ page, data: { url, otherData } }) => {

        await page.goto(url);

        let paragraphList = await page.evaluate(() => { 
            const pList = document.querySelectorAll('.primary-cli.cli.cli-text');

            let content = [];
            
            if(pList != null)
            {    
                pList.forEach((p) => { 
                    content.push(p.innerText);
                });
            }
            else
            {
                return null;
            }

            return content;

        });

        let image = await page.evaluate(() => {
            let i = document.querySelector('.cli.cli-image.js-no-inject > div > picture > source')
            
            console.log(i);
            
            if( i != null)
            {
                return i.srcset;
            }
           
            return null;

        })

        
        

        //let object = { ...jsonInfo, paragraphs: paragraphList};
        //console.log(object);
        //let content = [];
        //paragraphs.forEach((p, i) => { content.push('Paragraph ', i, ' : ', p.innerText) });

        if(paragraphList && image == null)
        {
            fs.appendFile(
                `NewsCategory-batch14.json`,
                `${JSON.stringify({otherData, isValid: false})},`,
                function(err) { if(err) throw err }
            )
        }
        else
        {

            fs.appendFile(
                `NewsCategory-batch14.json`,
                `${JSON.stringify({otherData, articleContent: paragraphList, image: image, isValid: true})},`,
                function(err) { if(err) throw err }
            )
        }
        
    });
   
    for(const index in newsData)
    {
        if(index > 16500) //(2433+1128+345+3849)) 1633+2426+3849
        {
            if(index <= 19500)
            {
                cluster.queue({url: newsData[index].link, otherData: newsData[index]});   
            }
            //console.log(index);
        }

        
    }

    console.log("Done");

    await cluster.idle();
    await cluster.close();

})();