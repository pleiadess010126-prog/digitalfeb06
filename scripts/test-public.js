
const GRAPH_API_VERSION = 'v21.0';
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

const config = {
    appId: "1249343870403404",
    appSecret: "8de9890c65aed337235fb9bbdfc6445e",
    facebookPageId: "944825198719790",
    instagramAccountId: "17841478122026822"
};

const appAccessToken = `${config.appId}|${config.appSecret}`;

async function testPublicInfo() {
    console.log("--- Testing Public Info with App Token ---");

    try {
        // Test if we can see the Instagram Account
        console.log("\nFetching Instagram Account Info...");
        const instaUrl = `${GRAPH_API_BASE}/${config.instagramAccountId}?fields=id,username,name&access_token=${appAccessToken}`;
        const instaResponse = await fetch(instaUrl);
        const instaData = await instaResponse.json();

        if (instaData.error) {
            console.log("Instagram Account Error:", instaData.error.message);
        } else {
            console.log("Instagram Account Info:", JSON.stringify(instaData, null, 2));
        }

        // Test if we can see the Facebook Page
        console.log("\nFetching Facebook Page Info...");
        const pageUrl = `${GRAPH_API_BASE}/${config.facebookPageId}?fields=id,name&access_token=${appAccessToken}`;
        const pageResponse = await fetch(pageUrl);
        const pageData = await pageResponse.json();

        if (pageData.error) {
            console.log("Page Error:", pageData.error.message);
        } else {
            console.log("Page Info:", JSON.stringify(pageData, null, 2));
        }

    } catch (error) {
        console.log("Test execution failed:", error);
    }
}

testPublicInfo();
