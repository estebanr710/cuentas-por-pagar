import axios from "axios";

const getJWT = async (): Promise<string> => {

    try {
        
        const CLIENT_ID: string = process.env.CLIENT_ID ?? '__default__';
        const CLIENT_SECRET: string = process.env.CLIENT_SECRET ?? '__default__';
        const TENANT_ID: string = process.env.TENANT_ID ?? '__default__';

        const ENDPOINT = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

        const BODY: any = {
            client_id: CLIENT_ID,
            scope: "https://graph.microsoft.com/.default",
            client_secret: CLIENT_SECRET,
            grant_type: "client_credentials"
        };

        const X_WWW_FORM_URLENCODED = Object.keys(BODY).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(BODY[key])}`).join("&");

        const RESPONSE = await axios.post(ENDPOINT, X_WWW_FORM_URLENCODED);

        const JWT: string = RESPONSE.data.access_token;

        return JWT;
    } catch (e) {
        
        return `Error: ${e}`;
    }
}

const getJWTByUser = async (): Promise<string> => {

    try {
        
        const CLIENT_ID: string = process.env.CLIENT_ID ?? '__default__';
        const CLIENT_SECRET: string = process.env.CLIENT_SECRET ?? '__default__';
        const TENANT_ID: string = process.env.TENANT_ID ?? '__default__';
        const GRANT_USER: string = process.env.GRANT_USER ?? '__default__';
        const GRANT_PASSWORD: string = process.env.GRANT_PASSWORD ?? '__default__';

        const ENDPOINT = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

        const BODY: any = {
            client_id: CLIENT_ID,
            scope: "https://grupoafiansa.sharepoint.com/.default",
            client_secret: CLIENT_SECRET,
            username: GRANT_USER,
            password: GRANT_PASSWORD,
            grant_type: "password"
        };

        const X_WWW_FORM_URLENCODED = Object.keys(BODY).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(BODY[key])}`).join("&");

        const RESPONSE = await axios.post(ENDPOINT, X_WWW_FORM_URLENCODED);

        const JWT: string = RESPONSE.data.access_token;

        return JWT;
    } catch (e) {
        
        return `Error: ${e}`;
    }
}

const getDiggestValue = async (): Promise<string> => {

    try {
        
        const JWT: string = await getJWTByUser();

        const ENDPOINT = 'https://grupoafiansa.sharepoint.com/sites/LasVegasDocs/_api/contextinfo';

        const DATA: any = {
            "x": 1
        }

        const PAYLOAD = {
            headers: {
                'Content-Type': 'application/json; odata=verbose',
                Accept: "application/json; odata=verbose",
                'Content-Length': Object.keys(DATA).length,
                Authorization: `Bearer ${JWT}`
            }
        };

        const RESPONSE = await axios.post(ENDPOINT, DATA, PAYLOAD)

        const SPLIT: any = RESPONSE.data.d.GetContextWebInformation.FormDigestValue.split(",");

        const DIGGEST_VALUE: string = SPLIT[0];

        return DIGGEST_VALUE;
    } catch (e) {

        return `Error: ${e}`;
    }
}

export { getJWT, getJWTByUser, getDiggestValue }