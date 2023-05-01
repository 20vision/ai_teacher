
const axios = require('axios');
const { OpenAIApi, Configuration } = require('openai');

const API_KEYS = {
    _20_VISION: 'your-20-vision-api-key', // Your https://www.20.vision API KEY
    OPEN_AI: 'your-openai-api-key' // Your https://openai.com/blog/openai-api API KEY
}

const YOUR_20VISION_PAGENAME = "your-20vision-page" //Your https://www.20.vision Pagename

axios.defaults.headers['x-api-key'] = API_KEYS._20_VISION;

const configuration = new Configuration({
    apiKey: API_KEYS.OPEN_AI,
});
  
const openai = new OpenAIApi(configuration);

async function createRecursiveContent(header, body, parentUid) {
    try{
        let content_prompt = `Pretend to be an author. Write a book about "${header} - ${body}". Each chapter can be 430 characters long. Return your response without an introduction, conclusion.`
    
        let created_content = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { 
                    role: 'user', 
                    content:  content_prompt
                }
            ],
            temperature: 0,
            top_p: 0
        });

        created_content = created_content.data.choices[0].message.content

        let formatted_content = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: content_prompt },
                {role: 'assistant', content: created_content},
                {role: 'user', content: 'Format each chapter into an array of json objects. Also provide for each a prompt for an ai to visualise the content in an explanatory way. You have to describe the picture in detail within 240 chars and make it visually appealing. Your json should be like [{header: ..., paragraph: ..., image_prompt: ...}, {header: ..., ...'}
            ],
            temperature: 0,
            top_p: 0
        });

        formatted_content = JSON.parse(formatted_content.data.choices[0].message.content)

        for (const cont of formatted_content) {
            const dalleERes = await openai.createImage({
              prompt: cont.image_prompt+', digital art',
              n: 1,
              size: '512x512',
              user: '20VisionOpenaiPage',
            });
        
            const url = dalleERes.data.data[0].url;
            let imageType = url.split('.').pop();
            imageType = imageType.split(';')[0].split('?')[0];
        
            const downloaded_image = await axios.get(url, { responseType: 'arraybuffer' });
        
            const postData = {
              image_base64: `data:image/${imageType};base64,${Buffer.from(downloaded_image.data, 'binary').toString('base64')}`,
              header: cont.header,
              body: cont.paragraph,
              parent_uids: [parentUid]
            };
        
            await axios.post(`https://api.20.vision/external/component/${YOUR_20VISION_PAGENAME}`, postData);
      
            console.log('Success 🥳🎉🎊')
      
        }
    }catch(err){
        console.log(err)
    }
  
}

async function createContentForPopularPosts(){
    const response = await axios.get(`https://api.20.vision/external/components/${YOUR_20VISION_PAGENAME}/0`);
    let popularPosts = response.data
  
    for (const post of popularPosts) {
        createRecursiveContent(post.header, post.body, post.uid)
    }
}

createContentForPopularPosts()