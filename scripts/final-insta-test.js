
const dotenv = require('dotenv');
const path = require('path');

// Load env from root
dotenv.config({ path: path.join(__dirname, '../.env') });

async function finalTest() {
    console.log("--- DigitalMEng Instagram Integration Test ---");

    const config = {
        appId: process.env.META_APP_ID,
        appSecret: process.env.META_APP_SECRET,
        accessToken: process.env.META_ACCESS_TOKEN,
        instagramAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID,
        facebookPageId: process.env.FACEBOOK_PAGE_ID
    };

    if (!config.accessToken) {
        console.error("Missing META_ACCESS_TOKEN in .env file.");
        return;
    }

    console.log("Config loaded from .env:");
    console.log("- App ID:", config.appId);
    console.log("- Instagram ID:", config.instagramAccountId);
    console.log("- Token (first 10 chars):", config.accessToken.substring(0, 10) + "...");

    try {
        console.log("\nTesting Connection...");
        const connResponse = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${config.accessToken}`);
        const connData = await connResponse.json();

        if (connData.error) {
            console.error("Connection Failed ❌");
            console.error("Error:", connData.error.message);
            console.error("Code:", connData.error.code);
            console.error("Subcode:", connData.error.error_subcode);

            if (connData.error.error_subcode === 463) {
                console.log("\n[!] ACTION REQUIRED: Your Meta Access Token has EXPIRED.");
                console.log("Please generate a new one at: https://developers.facebook.com/tools/explorer/");
            }
        } else {
            console.log("Connection Successful ✅");
            console.log("Connected as:", connData.name);
            console.log("User ID:", connData.id);

            // Fetching Instagram Account info specifically
            console.log("\nVerifying Instagram Account ID...");
            const instaResponse = await fetch(`https://graph.facebook.com/v21.0/${config.instagramAccountId}?fields=id,username,name&access_token=${config.accessToken}`);
            const instaData = await instaResponse.json();

            if (instaData.error) {
                console.error("Instagram Account Verification Failed ❌");
                console.error("Error:", instaData.error.message);
            } else {
                console.log("Instagram Account Found! ✅");
                console.log("Username:", instaData.username);
                console.log("Name:", instaData.name);
            }
        }

    } catch (error) {
        console.error("Test execution error:", error.message);
    }

    console.log("\n--- Test Finished ---");
}

finalTest();
