from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

# Route for "Generate Proofs" button (apiActionOne)
@app.route('/generate-proofs', methods=['GET'])
def generate_proofs():
    try:
        print("Request received at /generate-proofs, running the script...")
        
        # Run the Python script for generating proofs
        result = subprocess.run(['python', 'generate_proofs.py'], capture_output=True, text=True)
        
        print("Proofs generated, output:", result.stdout)
        return jsonify({"message": result.stdout})
    except Exception as e:
        print("Error during proof generation:", e)
        return jsonify({"error": str(e)}), 500

# Route for "Aggregation" button (apiActionTwo)
@app.route('/aggregation', methods=['GET'])
def aggregation():
    try:
        print("Request received at /aggregation, running the script...")
        
        # Run the Python script for aggregation
        result = subprocess.run(['python', 'aggregation.py'], capture_output=True, text=True)
        
        print("Aggregation completed, output:", result.stdout)
        return jsonify({"message": result.stdout})
    except Exception as e:
        print("Error during aggregation:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
