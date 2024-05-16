function sendMessage() {
  const message = document.getElementById("chat-input").value;
  if (message.trim() === "") { // Check if message is empty
    return;
  }

  document.getElementById("chat-input").value = "";

  const chatHistory = document.getElementById("chat-history"); // Get chat history element

  // Add user message to the chat history
  const userMessage = document.createElement("p");
  userMessage.classList.add("user");
  userMessage.textContent = message;
  chatHistory.appendChild(userMessage);

  // Scroll to the bottom to always show the latest message
  chatHistory.scrollTop = chatHistory.scrollHeight; 

  // Create and append the bot's "thinking" message
  const chatGPTResponse = document.createElement("p");
  chatGPTResponse.classList.add("chatgpt");
  chatGPTResponse.textContent = "RBI Consultant Beta is thinking...";
  chatHistory.appendChild(chatGPTResponse);

  fetch("/ask", {  // Change the route to "/ask"
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question: message }) // Use "question" key
  })
    .then(response => response.json())
    .then(data => {
      if (data && data.answer) {  // Ensure the answer exists
        chatGPTResponse.textContent = data.answer;
      } else {
        chatGPTResponse.textContent = "No answer found for your query.";
      }
      chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll again after update
    })
    .catch(error => {
      chatGPTResponse.textContent = "An error occurred. Please try again later.";
      console.error("Error fetching response:", error); 
    });
}

