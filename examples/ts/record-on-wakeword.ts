// August Weinbren 2022
// 
// When a wake word (excuse me/qingwen) is spoken, the computer will record a ten-second audio clip
// and save it in a directory of the user's choice.
// This software is based off of the "classify-audio-maf" example.
//
import { AudioClassifier, AudioRecorder, LinuxImpulseRunner, MovingAverageFilter } from "../../library";
var record = require('node-record-lpcm16')
var fs = require('fs')
var recordingCount = 0;

// tslint:disable-next-line: no-floating-promises
(async () => {
    try  {
        if (!process.argv[2]) {
            console.log('Missing one argument (model file)');
            process.exit(1);
        }

        let runner = new LinuxImpulseRunner(process.argv[2]);
        let model = await runner.init();

        console.log('Starting the audio classifier for',
            model.project.owner + ' / ' + model.project.name, '(v' + model.project.deploy_version + ')');
        console.log('Parameters', 'freq', model.modelParameters.frequency + 'Hz',
            'window length', ((model.modelParameters.input_features_count / model.modelParameters.frequency) * 1000) + 'ms.',
            'classes', model.modelParameters.labels);

        // Find the right microphone to run this model with (can be passed in as argument to the script)
        let devices = await AudioRecorder.ListDevices();
        if (devices.length === 0) {
            devices = [{ id: '', name: 'Default microphone' }];
        }
        if (!process.argv[3]) {
            throw new Error('Microphone(s) found (' + devices.map(n => '"' + n.name + '"').join(', ') + '), ' +
                'add the microphone to use to this script (node classify-audio-maf.js model.eim microphone)');
        }
        let device;
        let d = devices.find(x => x.name === process.argv[3]);
        if (!d) {
            throw new Error('Invalid microphone name (' + process.argv[3] + '), found: ' +
                devices.map(n => '"' + n.name + '"').join(', '));
        }
        device = d.id;

        let audioClassifier = new AudioClassifier(runner, false /* verbose */);
        let movingAverageFilter = new MovingAverageFilter(4, model.modelParameters.labels);

        audioClassifier.on('noAudioError', async () => {
            console.log('');
            console.log('ERR: Did not receive any audio. Here are some potential causes:');
            console.log('* If you are on macOS this might be a permissions issue.');
            console.log('  Are you running this command from a simulated shell (like in Visual Studio Code)?');
            console.log('* If you are on Linux and use a microphone in a webcam, you might also want');
            console.log('  to initialize the camera (see camera.js)');
            await audioClassifier?.stop();
            process.exit(1);
        });
        var recordingInProgress = false;
        var valuableWakewords = ["excuseme", "qingwen"]; // wake words; adjust to model
        await audioClassifier.start(device, 250 /* interval, so here 4 times per second */);
        audioClassifier.on('result', (ev, timeMs) => {
            if (!ev.result.classification) return;

            let mfa = movingAverageFilter.run(ev);

            // print the raw predicted values for this frame
            // (turn into string here so the content does not jump around)
            // tslint:disable-next-line: no-unsafe-any
            let c = <{ [k: string]: string | number }>(<any>mfa.result.classification);

            for (let k of Object.keys(c)) {
                c[k] = (<number>c[k]).toFixed(4); // fixed precision
                if (!recordingInProgress && c[k] > 0.6 && valuableWakewords.includes(k)) {
                    // A wake word has been said and a recording is not currently in progress
                    recordingInProgress = true;
                    // Start recording audio for 10 seconds
                    var file = fs.createWriteStream('question_recordings/question_' + recordingCount + '.wav', { encoding: 'binary' });
                    recordingCount++;
                    const recording = record.record({
                        silence: 10.0,
                        device: process.argv[3],
                        recorder: 'rec'
                        // the seconds of silence before recording will stop. Set to 10 to prevent premature stopping
                    });
                    recording.stream().pipe(file);

                    // Stop recording after fifteen seconds
                    setTimeout(function () {
                        recording.stop();
                        recordingInProgress = false;
                    }, 15000);                 
                }
            }
            console.log('classification', timeMs + 'ms.', c);
        });
    }
    catch (ex) {
        console.error(ex);
        process.exit(1);
    }
})();
