const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));

app.post("/upload", (req, res) => {
    const imageData = req.body.image;

    if (!imageData) {
        return res.status(400).send("No image data");
    }

    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

    const filename = `image_${Date.now()}.png`;
    const filepath = path.join(__dirname, "images", filename);

    fs.writeFile(filepath, base64Data, "base64", (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving image");
        }

        console.log(`Image saved: ${filename}`);
        res.send("Image uploaded successfully");
    });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
