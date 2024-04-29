const dialogflow = require("dialogflow").v2beta1;

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
      knowledgeBaseNames: ["projects/" + projectId + "/knowledgeBases/" + "NjYwNTE5MzIzMzQzOTkxNjAzMw"+""]
    }
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const queryResult = responses[0].queryResult;

    
    return responses;
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = { textQuery };
