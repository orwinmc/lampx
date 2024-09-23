import Lifx from "node-lifx-lan";
import readline from "readline";
let device_list = await Lifx.discover({ wait: 500 });
let device = await device_list[0];
/* Read Keyboard */
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);
console.log("press q to exit, or any key to print log");
process.stdin.on("keypress", async (chunk, key) => {
    if (key && key.name == "q") {
        process.exit();
    }
    else if (key && key.name == "space") {
        let hue = Math.random() * 0.1 + 0.85;
        await device.setColor({
            color: {
                hue: hue,
                saturation: 1.0,
                brightness: 1.0,
            },
            duration: 0,
        });
        await device.setColor({
            color: {
                hue: hue,
                saturation: 1.0,
                brightness: 0,
            },
            duration: 1000,
        });
    }
});
