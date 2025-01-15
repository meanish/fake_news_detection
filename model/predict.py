import numpy as np
import json
import warnings
import os
import sys
import logging
from joblib import load

# Configure logging
logging.basicConfig(level=logging.INFO)



# File paths
script_dir = os.path.dirname(os.path.abspath(__file__))
model_file = os.path.join(script_dir, "fake_news_model.joblib")




# Load model
try:
    lr = load(model_file)
except FileNotFoundError:
    print("Error: Model file not found.")
    sys.exit(1)
except Exception as e:
    print(f"Error: Failed to load the model. Details: {e}")
    sys.exit(1)


def predict_news(news):
    x = news

    try:
        prediction = lr.predict([x])
        return prediction
    except Exception as e:
        print(f"Error during prediction: {e}")
        return None


if __name__ == "__main__":

    news = sys.argv[1]


    prediction = predict_news(news)
    if prediction is not None:
        print(prediction)
