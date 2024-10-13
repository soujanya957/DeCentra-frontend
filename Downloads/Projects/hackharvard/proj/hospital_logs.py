import json
import random

def generate_hospital_logs(num_entries=7):
    # Initialize a list to hold hospital log entries
    logs = []

    # List of sample hospital names, model types, loss functions, and optimizers
    hospitals = [f"Hospital {chr(65 + i)}" for i in range(num_entries)]  # Hospital A to Hospital G
    model_types = ["ResNet", "VGG", "Inception", "DenseNet", "MobileNet", "EfficientNet", "Xception"]
    loss_functions = ["MSELoss", "CrossEntropyLoss", "BinaryCrossentropy", "HingeLoss", 
                      "CategoricalCrossentropy", "SparseCategoricalCrossentropy", "KullbackLeiblerDivergence"]
    optimizers = ["SGD", "Adam", "RMSprop", "Adagrad", "Adamax", "Nadam", "FTRL"]

    for i in range(num_entries):
        # Generate a random number of weights between 5 and 25
        num_weights = random.randint(5, 25)
        
        # Generate random weights
        weights = [round(random.uniform(0, 1), 2) for _ in range(num_weights)]
        
        # Create a log entry
        log_entry = {
            "hospital": hospitals[i],
            "modelType": model_types[i % len(model_types)],  # Cycle through model types
            "lossFunction": loss_functions[i % len(loss_functions)],  # Cycle through loss functions
            "optimizer": optimizers[i % len(optimizers)],  # Cycle through optimizers
            "weights": weights,
            "id": i + 1
        }

        logs.append(log_entry)

    return logs

# Generate logs and write to JSON file
hospital_logs = generate_hospital_logs()

with open('hospital_logs.json', 'w') as json_file:
    json.dump(hospital_logs, json_file, indent=4)

print("hospital_logs.json has been generated.")
