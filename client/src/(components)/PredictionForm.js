import React, { useState } from "react";

const FakeNewsDetectionApp = () => {
    const [inputText, setInputText] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeText = async () => {
        console.log(inputText)
        if (inputText) {
            setLoading(true);
            setError(null);
            setResult(null);

            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/predict/news`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ news: inputText }),
                });

                if (!response.ok) {
                    throw new Error("Failed to analyze News.");
                }

                const res = await response.json();
                if (res?.success) {
                    console.log(res)
                    setResult(res);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl border-t-4 border-blue-600">
                <h1 className="text-4xl font-extrabold font-serif text-gray-500 text-center mb-6">
                    Fake News Detection
                </h1>
                <textarea
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:outline-none text-gray-700 mb-4 shadow-sm transition h-72"
                    placeholder="Enter news to analyze..."
                    rows="6"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <button
                    onClick={analyzeText}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-md"
                        }`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                            Analyzing...
                        </div>
                    ) : (
                        "Analyze News"
                    )}
                </button>
                <div className="news_source grid md:grid-cols-2 gap-10 my-16 px-6">
                    <div className="trusted-news bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-400">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">
                            Trusted News Portals
                        </h3>
                        <ul className="list-disc text-start space-y-3 ml-6">
                            <li>
                                <a
                                    href="https://www.bbc.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-700 underline hover:text-blue-900 transition duration-300"
                                >
                                    BBC News
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cnn.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-700 underline hover:text-blue-900 transition duration-300"
                                >
                                    CNN
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.reuters.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-700 underline hover:text-blue-900 transition duration-300"
                                >
                                    Reuters
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="fake-news bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500">
                        <h3 className="text-xl font-semibold text-red-500 mb-4">
                            Fake News Alerts
                        </h3>
                        <ul className="list-disc text-start mb-0 ml-6">
                            <li>
                                <a
                                    href="https://www.snopes.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-700 underline hover:text-red-900 transition duration-300"
                                >
                                    Snopes
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.factcheck.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-700 underline hover:text-red-900 transition duration-300"
                                >
                                    FactCheck.org
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>


                {result && (
                    <div className="mt-6 p-6 bg-green-50 rounded-lg shadow-md border-l-4 border-green-600">
                        <h2 className="text-2xl font-bold text-yellow-500 font-sans mb-2">Result</h2>
                        <p className="text-gray-700 text-2xl font-bold">{result.message}</p>

                    </div>
                )}

                {error && (
                    <div className="mt-6 p-6 bg-red-50 rounded-lg shadow-md border-l-4 border-red-600">
                        <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
                        <p className="text-gray-700">{error}</p>
                    </div>
                )}

                <div class="mt-10 p-2 bg-gray-100 rounded-lg shadow-lg">
                    <p class="text-gray-800">
                        The model was trained using datasets available in
                        <a href="https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 underline"> Kaggle Fake News Dataset</a>.
                    </p>
                </div>



            </div>
        </div>


    );
};

export default FakeNewsDetectionApp;
