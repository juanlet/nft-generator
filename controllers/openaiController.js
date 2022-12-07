const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateNFTs = async (req,res)=>{
    const  { collectionDescription, imageSize, numberOfImages } = req.body;
    const sizes = {
        small: '256x256',
        medium: '512x512',
        large: '1024x1024'
    }

    try  {
       const response = await openai.createImage({
        prompt: collectionDescription,
        n: parseInt(numberOfImages),
        size: sizes[imageSize.toLowerCase()]
       });

       const generatedNFTS = response.data.data;

       res.status(200).json({
        success: true,
        data: generatedNFTS
       });
    } catch(error){
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        } 

        res.status(400).send({
            success: false,
            error: error.response?.data?.error?.message || 'There was an error generating the nfts.'
        });
    }
 }

 module.exports = { generateNFTs}