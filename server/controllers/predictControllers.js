const Predict = require("../services/predictService");



const predictnews = async (req, res) => {
    // res.status(200).json({ data: "okay", success: true });
    await Predict.find(req, res)

}

module.exports = {
    predictnews
};