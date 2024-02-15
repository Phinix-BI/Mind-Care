import { GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});



export const chatWithAiController = async (usermessage,socket) => {
    const message = usermessage;

    try{
        const prompt = `${message}`;
    
        const result = await model.generateContentStream(prompt);
        
        let text = '';

        for await (const chunk of result.stream) {

             const chunkText = chunk.text();
           
              socket.emit('aiResponse',chunkText);

                text += chunkText;

            
        }

        return text;
        // console.log(text);

    }catch(err){
        console.log(err);
    }   

}

// export const voiceChatWithAiController = async (req, res) => {



// }