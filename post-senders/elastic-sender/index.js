import ElasticEmail from '@elasticemail/elasticemail-client';
import 'dotenv/config'

const {ELASTIC_EMAIL_FROM, ELASTIC_API_KEY} = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;

const api = new ElasticEmail.EmailsApi()

const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [
        new ElasticEmail.EmailRecipient("pepono2274@klanze.com")
    ],
    Content: {
        Body: [
            ElasticEmail.BodyPart.constructFromObject({
                ContentType: "HTML",
                Content: "<strong>Test email</strong>"
            })
        ],
        Subject: "JS EE lib test",
        From: ELASTIC_EMAIL_FROM
    }
});

const callback = function(error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully.');
    }
};

api.emailsPost(email, callback);
