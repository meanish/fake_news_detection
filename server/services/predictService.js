const { spawn } = require('child_process');
const path = require('path');

const find = (req, res) => {
    const { news } = req.body;
    console.log(news)
    console.log('Current directory:', __dirname);
    const pythonFilePath = path.join(__dirname, '../../model/predict.py');
    console.log('Python script path:', pythonFilePath);
    const pythonProcess = spawn('python', [pythonFilePath, news]);

    pythonProcess.stdout.on('data', (data) => {
        console.log('Python script output:', data.toString());
        try {
            const response = JSON.parse(data.toString().trim());
            let message = "";
            switch (response[0]) {
                case 1:
                    message = "The news is classified as Real.";
                    break;
                case 0:
                    message = "The news is classified as Fake.";
                    break;
                default:
                    message = "Unexpected classification received.";
            }

            console.log("Response:", response);
            res.json({ success: true, data: response[0], message });
        } catch (error) {
            console.error('Error parsing Python response:', error);
            res.status(500).json({ success: false, message: 'Error parsing Python response' });
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Python script error:', data.toString());
        res.status(500).json({ success: false, message: `Python error: ${data.toString()}` });
    });

    // process close (exit) means final result
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        if (code !== 0) {
            res.status(500).json({ success: false, message: `Python process exited with code ${code}` });
        }
    });


    // const firstNum = 40;
    // const secondNum = 7;

    // console.log(firstNum, secondNum);

    // console.log('Current directory:', __dirname);
    // const pythonFilePath = path.join(__dirname, './predict.py');
    // console.log('Python script path:', pythonFilePath);

    // const pythonProcess = spawn('python', [pythonFilePath, firstNum, secondNum]);

    // let pythonOutput = ''; // Buffer for Python output

    // pythonProcess.stdout.on('data', (data) => {
    //     pythonOutput += data.toString(); // Accumulate data
    // });

    // pythonProcess.stdout.on('end', () => {
    //     try {

    //         console.log("pythonOutput", pythonOutput)
    //         // Parse the accumulated output as JSON
    //         const response = JSON.parse(pythonOutput.trim());
    //         console.log("Response:", response);
    //         // Return the response (assuming you're in an Express.js route)
    //         res.json({ success: true, data: response });
    //     } catch (error) {
    //         console.error('Error parsing Python response:', error);
    //         res.status(500).json({ success: false, message: 'Error parsing Python response' });
    //     }
    // });

    // pythonProcess.stderr.on('data', (data) => {
    //     console.error('Python script error:', data.toString());
    //     res.status(500).json({ success: false, message: `Python error: ${data.toString()}` });
    // });

    // pythonProcess.on('close', (code) => {
    //     console.log(`Python process exited with code ${code}`);
    //     if (code !== 0) {
    //         res.status(500).json({ success: false, message: `Python process exited with code ${code}` });
    //     }
    // });
}

module.exports = {
    find,
};
