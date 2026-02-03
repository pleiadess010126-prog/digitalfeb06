
const GRAPH_API_VERSION = 'v21.0'; // Using v21.0 which is definitely valid
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

const config = {
    accessToken: "EAARwRYmZAA0wBQjEAtey96aWVgacjKMA9M0xwFRL0Qx3gZCvNZAnUmZCZBOq1Pj6BK8nGeU02tKGWJ03sZCc4tOCwe0ZCEycMxPx2lFwnNyKqtIDQR6Jbpxihd30GrwAu7luTgUl1xOZC1c6f6WRJ2lbsyTi2mdX6Q30lQutdYOp4sZAkgPVZAZCnsvqlk6FTs7ZBRz1vd3mlO5x8wyXrY0V4sfrE6ISUQqYn1IDoFhZCizHNt1bc6lkmox7XlQyjk9ZAypiJnYhVV2qEs6SLI2USQfqZC7ZAIqIU8uhG6GnlAZDZD",
    appId: "1249343870403404",
    appSecret: "8de9890c65aed337235fb9bbdfc6445e",
    facebookPageId: "944825198719790",
    instagramAccountId: "17841478122026822"
};

const appAccessToken = `${config.appId}|${config.appSecret}`;

async function testInstagramAPI() {
    console.log("--- Starting Instagram API Test ---");

    try {
        // 1. Debug Token using App Access Token
        console.log("\n1. Debugging Token...");
        const debugUrl = `${GRAPH_API_BASE}/debug_token?input_token=${config.accessToken}&access_token=${appAccessToken}`;
        const debugResponse = await fetch(debugUrl);
        const debugData = await debugResponse.json();

        if (debugData.error) {
            console.log("Debug Token Error:", debugData.error.message);
        } else {
            console.log("Debug Token Result:", JSON.stringify(debugData.data, null, 2));
        }

        // 2. Get User Info
        console.log("\n2. Getting User Info...");
        const userUrl = `${GRAPH_API_BASE}/me?fields=id,name,email&access_token=${config.accessToken}`;
        const userResponse = await fetch(userUrl);
        const userData = await userResponse.json();

        if (userData.error) {
            console.log("User Info Error:", userData.error.message);
        } else {
            console.log("User Info:", JSON.stringify(userData, null, 2));
        }

        // 3. Get Pages and Linked Instagram Accounts
        console.log("\n3. Getting User Pages...");
        const pagesUrl = `${GRAPH_API_BASE}/me/accounts?fields=id,name,access_token,category,instagram_business_account{id,username,profile_picture_url}&access_token=${config.accessToken}`;
        const pagesResponse = await fetch(pagesUrl);
        const pagesData = await pagesResponse.json();

        if (pagesData.error) {
            console.log("Pages Error:", pagesData.error.message);
        } else {
            console.log("User Pages Count:", pagesData.data?.length || 0);
            const targetPage = pagesData.data?.find(p => p.id === config.facebookPageId);
            if (targetPage) {
                console.log("Found Target Page:", JSON.stringify(targetPage, null, 2));
            } else {
                console.log("Target Page ID not found in user's pages list.");
            }
        }

    } catch (error) {
        console.log("Test execution failed:", error);
    }

    console.log("\n--- Instagram API Test Finished ---");
}

testInstagramAPI();
