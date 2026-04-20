export default async function handler(req, res) {
    try {
        console.log("Incoming request:", req.body);

        const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const { messages } = body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}