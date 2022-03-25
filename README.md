# Edge Impulse Linux SDK for Node.js

Note: adapted by August Weinbren from the parent fork released by Edge Impulse. 

This library lets you run machine learning models and collect sensor data on Linux machines using Node.js. This SDK is part of [Edge Impulse](https://www.edgeimpulse.com) where we enable developers to create the next generation of intelligent device solutions with embedded machine learning. [Start here to learn more and train your first model](https://docs.edgeimpulse.com).

## Installation guide

Add the library to your application via:

```
$ npm install edge-impulse-linux
```

## Collecting data

Before you can classify data you'll first need to collect it. If you want to collect data from the camera or microphone on your system you can use the Edge Impulse CLI, and if you want to collect data from different sensors (like accelerometers or proprietary control systems) you can do so in a few lines of code.

### Collecting data from the camera or microphone

1. Install the Edge Impulse CLI for Linux:

    ```
    $ npm install edge-impulse-linux -g --unsafe-perm
    ```

1. Start the CLI and follow the instructions:

    ```
    $ edge-impulse-linux
    ```

1. That's it. Your device is now connected to Edge Impulse and you can capture data from the camera and microphone. 

### CLI Options

You can pass in options to the CLI. Here are the key ones:

* `--disable-camera` - disables the camera.
* `--disable-microphone` - disable the microphone.
* `--clean` - clear credentials, and re-authenticate. Use this to switch projects or devices.
* `--api-key <apikey>` - set an API key, useful for automatic authentication with a new project.
* `--help` - see all options.

## Running the record-on-wakeword app

This step requires downloading the model,
downloading the necessary node.js libraries,
and compiling the typescript libraries. 
You will also need to create a directory
Within the build directory where the voice recordings
Recordings will be saved, and I ensure that
The model is in the same directory as the
Compiled typescript code. 
1. Install the Edge Impulse CLI:

    ```
    $ npm install edge-impulse-linux -g --unsafe-perm
    ```
2. Navigate to the head of edge-impulse-linux-cli:

    ```
    $ cd path/to/edge-impulse-linux-cli/
    ```
3. Download the model file via:

    ```
    $ edge-impulse-linux-runner --download modelfile.eim
    ```

    This downloads the file into `modelfile.eim`. (Want to switch projects? Add `--clean`)
4. Install the necessary node packages from
the head of this directory:
```
npm install
```
5. Compile the typescript files from the head of this directory:
```
tsc
```
6. Run the command with one missing argument to assess what microphone name to type in:
```
node build/examples/ts/record-on-wakeword.js ./modelfile.eim
```
7. Run the command with the correct microphone name:
```
node build/examples/ts/record-on-wakeword.js ./modelfile.eim <microphone name>
```

### No moving average record wakeword script

Note: the above version uses the moving average filter to smooth your results and reduce false positives. You may prefer to try out the version without moving average filtering
to see which version best suits your needs.

Run steps 1-6 from above, but replace step 7 with the following:
```
node build/examples/ts/record-on-wakeword_no_mfa.js ./modelfile.eim <microphone name>
```