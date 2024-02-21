import { TextServiceClient } from "@google-ai/generativelanguage";

// import { GoogleGenerativeAI} from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

// const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const MODEL_NAME = "tunedModels/mind-care-5eyqo7cwuyv4";

const client = new TextServiceClient();


const stopSequences = [];

export const chatWithAiController = async (usermessage,socket) => {
    const message = usermessage;

    try{
        const prompt = `${message}`;

        const promptString = `input: ${prompt} output:`;

        const result = await client.generateText({
            model: MODEL_NAME,

            temperature: 0.8,        

            candidateCount: 1,

            topK: 40,

            topP: 0.95,

            maxOutputTokens: 2048,

            stopSequences: stopSequences,

            safetySettings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":"BLOCK_NONE"},
            {"category":"HARM_CATEGORY_TOXICITY","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_VIOLENCE","threshold":"BLOCK_NONE"},
            {"category":"HARM_CATEGORY_SEXUAL","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_MEDICAL","threshold":"BLOCK_NONE"},
            {"category":"HARM_CATEGORY_DANGEROUS","threshold":"BLOCK_NONE"}],

            prompt: {
              text: promptString,
            },})
        
        let text = result && result[0] && result[0].candidates && result[0].candidates[0] ? result[0].candidates[0].output : null;;

        socket.emit('aiResponse',text);

        return text;
        

    }catch(err){
        console.log(err);
    }   

}

// export const voiceChatWithAiController = async (req, res) => {



// }
