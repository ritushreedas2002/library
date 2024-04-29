const dialogflow = require("dialogflow");

const config = require("../config/devKey");

const projectId = config.googleProjectId;
const sessionId = config.dialogFlowSessionID;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });
//const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const textQuery = async (userText, userId) => {
  const sessionPath = sessionClient.sessionPath(projectId, sessionId + userId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userText,
        languageCode: config.dislpgFlowSessionLanguageCode,
      },
    },
    queryParams: {
      knowledgeBaseNames: ["projects/" + projectId + "/knowledgeBases/" + "NjYwNTE5MzIzMzQzOTkxNjAzMw"]
    }
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const queryResult = responses[0].queryResult;

    // Extract only knowledge base responses, ignore other intent responses
    let knowledgeResponse = "";
    if (queryResult.knowledgeAnswers && queryResult.knowledgeAnswers.answers.length > 0) {
      const topAnswer = queryResult.knowledgeAnswers.answers.reduce((prev, current) => {
        return (prev.matchConfidence > current.matchConfidence) ? prev : current;
      });
      knowledgeResponse = topAnswer.answer;
    }

    // If no knowledge response, you could either send a default message or handle it differently
    if (!knowledgeResponse) {
      return {
        response: "I'm sorry, I don't have enough information on that topic."
      };
    }

    return {
      response: knowledgeResponse
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { textQuery };
