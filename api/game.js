export default function handler(req, res) {
    if (req.method === "POST") {
        const { action } = req.body;  // Get action from RL agent

        // Example: Modify player position (You need to sync this with your game)
        let gameState = { playerX: 0, playerY: 0 };  // Replace with actual state
        let reward = 0;

        if (action === "left") gameState.playerX -= 1;
        if (action === "right") gameState.playerX += 1;
        if (action === "up") gameState.playerY += 1;
        if (action === "down") gameState.playerY -= 1;
        if (req.method === "POST") {
            gameState = { playerX: 0, playerY: 0, gameOver: false };  // Reset position
            res.status(200).json({ message: "Game reset", state: gameState });
        } else {
            res.status(405).json({ message: "Method Not Allowed" });
        }

        res.status(200).json({ state: gameState, reward: reward });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
