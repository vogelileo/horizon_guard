#!/usr/bin/env python3
import serial
import subprocess
import re
import requests
import select
import statistics

def send_data_to_api(api_data):
    # Define the URL where the POST request will be sent
    url = 'http://127.0.0.1:3001/api/horizon-guard/transferdata'

    try:
        # Send a POST request with the data as JSON
        response = requests.post(url, json=api_data)

        # Check the response status
        if response.status_code == 200:
            #print("Data successfully sent!")
            #print("Response:", response)
            pass
        else:
            print(f"Failed to send data. Status code: {response.status_code}")
            print("Response:", response)

    except requests.exceptions.RequestException as e:
        # Handle exceptions such as connection errors
        print(f"Error occurred: {e}")


def extract_value_for_key(input_string, key):
    # Define the regex pattern to match the key, optional minus sign, colon,
    # and number which can be either integer or float
    pattern = rf'{key}:\s*(-?\d+(\.\d+)?)'

    # Search for the pattern in the input string
    match = re.search(pattern, input_string)
    try:
        if match:
            # Extract the numeric value (either int or float) from the match
            return float(match.group(1))
        else:
            return None  # Return None if the key is not found or if no valid number follows
    except():
        pass

def extract_mac_address(input_string):
    # Define the regex pattern for a MAC address (XX:XX:XX:XX:XX:XX)
    mac_address_pattern = r'([0-9A-Fa-f]{2}(:[0-9A-Fa-f]{2}){5})'

    # Search for the MAC address in the input string
    match = re.search(mac_address_pattern, input_string)

    if match:
        # Remove colons from the matched MAC address
        return match.group(0).replace(":", "")
    else:
        return None  # Return None if no match is found


def extract_frame_values(input_string, min, max):
    # Use a regex pattern to match all the floating-point numbers after "frame:"
    pattern = r"frame:\s*([0-9.]+(?:, [0-9.]+)*)"

    match = re.search(pattern, input_string)

    if match:
        # Get the matched part and split it by commas
        frame_data = match.group(1).split(', ')

        # Initialize an empty list to store the frame values
        frame_values = []

        # Variable to hold the last valid value (initially None)
        last_valid_value = None

        for value in frame_data:
            try:
                # Try to convert each value to a float
                current_value = float(value)
                if current_value < max and current_value > min:
                    frame_values.append(current_value)  # Append the valid value
                    last_valid_value = current_value   # Update the last valid value
                else:
                    frame_values.append(last_valid_value)
            except ValueError as e:
                # If conversion fails, use the last valid value
                if last_valid_value is not None:
                    print(f"Error: could not convert string to float: '{value}'. Using previous valid value: {last_valid_value}")
                    frame_values.append(last_valid_value)  # Use the previous valid value
                else:
                    # If no valid previous value exists, append None (or skip, depending on your preference)
                    print(f"Error: could not convert string to float: '{value}'. No previous valid value found.")
                    frame_values.append(None)  # Or continue to skip by using `continue` instead

        return frame_values
    else:
        # If no match is found, return None
        return None




def get_serial_ports():
    # Run the `ls /dev/ttyACM*` command and capture the output
    try:
        # Use shell=True to allow wildcard expansion for `ls`
        result = subprocess.run('ls /dev/ttyACM*', capture_output=True, text=True, check=True, shell=True)
        # Split the output into a list of port names
        serial_ports = result.stdout.splitlines()
        return serial_ports
    except subprocess.CalledProcessError as e:
        #print(f"Error running command: {e}")
        return []
    except FileNotFoundError:
        #print("The `ls` command was not found.")
        return []

# Initialize api_data as a dictionary
api_data = {}
minimum_temp = 0
maximum_temp = 0

# Example usage of getting serial ports
ports = get_serial_ports()
print("Detected serial ports:", ports)

# If we find any serial ports, initialize a connection
if ports:
    # Use the first available serial port for the serial connection
    port = ports[0]  # For example, pick the first port found

    # Initialize the serial connection
    ser = serial.Serial(
        port=port,            # Use the detected serial port
        baudrate=115200,        # Communication speed (baud rate)
        parity=serial.PARITY_NONE,  # No parity checking
        stopbits=serial.STOPBITS_ONE,  # One stop bit for each communication frame
        bytesize=serial.EIGHTBITS,    # 8 data bits per byte
        timeout=0.5                 # Timeout for read operations (seconds)
    )

    def read_serial():
        # Continuously read data from the serial port
        while True:
            try:

                # Use select to wait for data to be available on the serial port
                # Timeout is set to None for blocking mode; you can set a specific timeout
                readable, _, _ = select.select([ser], [], [], 0.5)  # Non-blocking, timeout 0.5 seconds

                # If the serial port is readable (data is available)
                if readable:
                    serial_data = ser.readline()
                    utf_data = (serial_data.decode('utf-8').strip())  # Decode bytes to string and remove any trailing whitespace
                    print(utf_data)

                    # Parse and update api_data based on received data
                    if "Start-Of-Transmission" in utf_data:
                        api_data.clear()  # Clear the data dictionary at the start of transmission
                        minimum_temp = 0
                        maximum_temp = 0


                    if "Sender-ID:" in utf_data:
                       sender_id = extract_mac_address(utf_data)
                       if sender_id:
                           api_data["sensorId"] = sender_id

                    if "acc_x:" in utf_data:
                        acc_x = extract_value_for_key(utf_data, "acc_x")
                        if acc_x is not None:
                            api_data["acc_x"] = acc_x

                    if "acc_y:" in utf_data:
                        acc_y = extract_value_for_key(utf_data, "acc_y")
                        if acc_y is not None:
                            api_data["acc_y"] = acc_y

                    if "acc_z:" in utf_data:
                        acc_z = extract_value_for_key(utf_data, "acc_z")
                        if acc_z is not None:
                            api_data["acc_z"] = acc_z

                    if "is_radar_1:" in utf_data:
                        is_radar_1 = extract_value_for_key(utf_data, "is_radar_1")
                        if is_radar_1 is not None:
                            api_data["is_radar_1"] = bool(is_radar_1)

                    if "is_radar_2:" in utf_data:
                        is_radar_2 = extract_value_for_key(utf_data, "is_radar_2")
                        if is_radar_2 is not None:
                            api_data["is_radar_2"] = bool(is_radar_2)

                    if "minimum_temp: " in utf_data:
                        minimum_temp = extract_value_for_key(utf_data, "minimum_temp")

                    if "maximum_temp: " in utf_data:
                        maximum_temp = extract_value_for_key(utf_data, "maximum_temp")


                    if "frame" in utf_data:
                        frame = extract_frame_values(utf_data, minimum_temp, maximum_temp)
                        api_data["thermalImage"] = frame

                    if "End-Of-Transmission" in utf_data:
                        send_data_to_api(api_data)
                        print(api_data)
                        api_data.clear()  # Optionally clear the data after printing
            except Exception as e:
               # Print any exception that occurs
               print(f"Error: {e}")

    # Call the read function to start reading data
    read_serial()

else:
    print("No serial ports found!")
