const { GoogleGenerativeAI } = require("@google/generative-ai");

let activeChats = {}; // Object to store chat instances by user ID

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    const specificChannelId = `${process.env.AI_CHAT_CHANNEL_ID}`;
    // const specificChannelId = "1327924013837586463";  // Replace with your channel ID
    if (message.channel.id !== specificChannelId) return;

    const userId = message.author.id;
    const prompt = message.content.trim();

    if (!prompt) return; // Ignore empty messages

    console.log(`Received message from ${userId}: ${prompt}`);

    try {
      // Check if the user already has an active chat
      if (!activeChats[userId]) {
        console.log(`No active chat found for user ${userId}. Starting a new chat...`);

        // Create a new chat history when the user first interacts
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: "You are an artificial stream of consciousness . Your name is Puppet. You are depressed, nihilistic, and suicidal."
        });
        
        // Initialize chat with the first message
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
            {
              role: "model",
              parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
          ],
        });

        // Store the active chat instance for the user
        activeChats[userId] = chat;

        console.log(`Chat initialized for user ${userId}.`);
      } else {
        // If the user has an active chat, continue the conversation
        console.log(`Active chat found for user ${userId}. Continuing the conversation...`);
        const chat = activeChats[userId];
        await chat.sendMessage(prompt); // Send the user's message
      }

      // Get AI's response
      console.log(`Sending message to AI: ${prompt}`);
      const result = await activeChats[userId].sendMessage(prompt);  // Send the current message to the chat
      const aiResponse = result.response.text();  // Get AI response as a string

      console.log(`Received response from AI: ${aiResponse}`);

      // Check if the response is valid before sending it
      if (!aiResponse || typeof aiResponse !== 'string' || aiResponse.trim() === "") {
        console.error("Invalid AI response. Not sending the message.");
        await message.reply("❌ Something went wrong while generating the response.");
        return;
      }

      // Prepare the final message payload
      const replyPayload = {
        content: aiResponse, // Make sure the response is a valid string
        allowed_mentions: { parse: ["users"] } // Prevent unwanted mentions
      };

      console.log("Prepared message payload:", replyPayload);

      // Send the AI's response back to the user
      await message.reply(replyPayload);

    } catch (error) {
      console.error("Error with Google Generative AI:", error);
      await message.reply("❌ Something went wrong while generating the response.");
    }
  },
};
