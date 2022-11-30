const puppeteer = require('puppeteer');

async function getArticle(url) 
{
    const browser = await puppeteer.launch({
        headless: false, 
        devtools: false
    });

    const page = await browser.newPage();
    let status = await page.goto(url);

    status = status.status();

    if(status != 404) {
        const grabArticles = await page.evaluate(() => {
            const paragraphs = document.querySelectorAll('.primary-cli.cli.cli-text');
            //const images = document.querySelectorAll('.cli.cli-image.js-no-inject');
            //const videos = document.querySelectorAll('.cli.cli-embed.cli-embed--header-media.cli-embed--full-width.js-no-inject');
    
            let content = [];
    
            
            paragraphs.forEach((paragraph) => {
                content.push(paragraph.innerText);
            })  

            data = {
                isValid: true,
                paragraphs: content,
            }

            return data;
            
        })

        let content = grabArticles;

        await browser.close();

        return content;
    }
    else
    {
        console.log("Error 404");
        data = { 
            isValid: false
        }

        return data
    }
}

module.exports = getArticle;