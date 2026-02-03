
const GRAPH_API_VERSION = 'v21.0';
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

const config = {
    appId: "1249343870403404",
    appSecret: "8de9890c65aed337235fb9bbdfc6445e",
    accessToken: "EAARwRYmZAA0wBQjEAtey96aWVgacjKMA9M0xwFRL0Qx3gZCvNZAnUmZCZBOq1Pj6BK8nGeU02tKGWJ03sZCc4tOCwe0ZCEycMxPx2lFwnNyKqtIDQR6Jbpxihd30GrwAu7luTgUl1xOZC1c6f6WRJ2lbsyTi2mdX6Q30lQutdYOp4sZAkgPVZAZCnsvqlk6FTs7ZBRz1vd3mlO5x8wyXrY0V4sfrE6ISUQqYn1IDoFhZCizHNt1bc6lkmox7XlQyjk9ZAypiJnYhVV2qEs6SLI2USQfqZC7ZAIqIU8uhG6GnlAZDZD"
};

async function exchangeToken() {
    console.log("--- Attempting to Exchange Token for Long-Lived Token ---");

    try {
        const exchangeUrl = `${GRAPH_API_BASE}/oauth/access_token?` +
            `grant_type=fb_exchange_token&` +
            `client_id=${config.appId}&` +
            `client_secret=${config.appSecret}&` +
            `fb_exchange_token=${config.accessToken}`;

        console.log("Calling exchange endpoint...");
        const response = await fetch(exchangeUrl);
        const data = await response.json();

        if (data.error) {
            console.error("Exchange Failed:", data.error.message);
            console.log("Error Code:", data.error.code);
            console.log("Error Subcode:", data.error.error_subcode);

            if (data.error.error_subcode === 463) {
                console.log("\nTIP: The token is already expired. You need to generate a FRESH short-lived token from Graph API Explorer first.");
            }
        } else {
            console.log("SUCCESS! Long-Lived Token obtained:");
            console.log("Access Token:", data.access_token);
            console.log("Expires In (seconds):", data.expires_in);
            console.log("\nUpdate your .env or database with this long-lived token.");
        }

    } catch (error) {
        console.error("Execution error:", error);
    }
}

exchangeToken();
