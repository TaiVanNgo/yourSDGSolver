async function bridgeTokenizedCreditsToVerra(tokenId) {
    try {
        // Example of bridging process
        const bridgeResult = await toucan.bridgeToVerra(tokenId);
        console.log("Successfully bridged tokenized credits to Verra: ", bridgeResult);
    } catch (error) {
        console.error("Error bridging to Verra: ", error);
    }
}   

// Example usage after tokenizing
bridgeTokenizedCreditsToVerra('TOKEN_ID_FROM_TOUCAN');
