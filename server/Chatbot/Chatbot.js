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
  };

  try {
    const response = await sessionClient.detectIntent(request);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { textQuery };
