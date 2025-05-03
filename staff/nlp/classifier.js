const axios = require('axios');
require('dotenv').config();

async function classifyTask(taskText) {
    if(!process.env.HUGGING_FACE_KEY) {
        throw new Error("HUGGING_FACE_KEY is not defined in the environment variables");
    }

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api-inference.huggingface.co/models/joeddav/xlm-roberta-large-xnli',
            headers: {
                Authorization: `Bearer ${process.env.HUGGING_FACE_KEY}`, 
            },

            data: {
                inputs: taskText.taskName,
                parameters: {
                    candidate_labels: ['work', 'study', 'personal', 'other'],
                }
            }
        });

        return response.data?.labels?.[0] || 'other'; // Default to 'other' if no label is found
    } catch (err) {
        console.log("Error from Hugging Face API:", err.message);
        return 'other'; // Default to 'other' in case of error
    }

}

module.exports = { classifyTask };

