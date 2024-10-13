from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

# Route to handle generate proofs
@app.route('/pyfiles/generate-proofs', methods=['GET'])
def generate_proofs():
    try:
        # Run your Python script
        result = subprocess.run(['python3', 'generate_proofs.py'], capture_output=True, text=True)
        
        # Assuming the script returns some output that you want to send back to the client
        return jsonify({
            'success': True,
            'output': result.stdout
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Route to handle aggregation
@app.route('/pyfiles/aggregation', methods=['GET'])
def aggregation():
    try:
        # Run your Python script
        result = subprocess.run(['python3', 'aggregation.py'], capture_output=True, text=True)
        
        # Send the result back to the client
        return jsonify({
            'success': True,
            'output': result.stdout
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Adjust the port as needed
