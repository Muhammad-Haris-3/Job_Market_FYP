from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

def load_data():
    try:
        # NOTE: Maine path theek kiya hai (r lagaya hai aur double quotes hataye hain)
        # Agar file backend folder mein ho to sirf 'hotel_bookings.csv' likhna behtar hai
        file_path = r"C:\Users\haris\Python practice\hotel_bookings.csv"
        
        df = pd.read_csv(file_path)
        
        # NaN (Empty values) ko empty string banate hain taake JSON error na de
        df = df.fillna("")
        
        return df
    except Exception as e:
        print(f"Error reading file: {e}")
        return None

@app.route('/api/stats', methods=['GET'])
def get_stats():
    df = load_data()
    
    if df is None:
        return jsonify({"error": "File nahi mili! Path check karo."})

    # --- SIMPLE LOGIC ---
    # Sirf pehli 50 rows bhej rahe hain (taake browser crash na ho)
    simple_data = df.head(50).to_dict(orient='records')

    return jsonify(simple_data)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    #Done