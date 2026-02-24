
/* Theme */
themeIcon.onclick = () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme",
        document.body.classList.contains("light") ? "light" : "dark");
};

if (localStorage.getItem("theme") === "light")
    document.body.classList.add("light");

/* Timer */
timerBtn.onclick = () => {
    const clk = timerClock.value * timerUnit.value;
    const pres = prescaler.value;
    const t = time.value / 1000;

    const ticks = (clk / pres) * t;

    timerResult.innerText = `Ticks Required: ${ticks.toFixed(2)}`;
};

/* PWM */
pwmBtn.onclick = () => {
    const clk = pwmClock.value * pwmUnit.value;
    const pres = pwmPrescaler.value;
    const freq = pwmFreq.value;

    const top = (clk / (pres * freq)) - 1;

    pwmResult.innerText = `TOP Value ≈ ${top.toFixed(2)}`;
};

/* Baud */
baudBtn.onclick = () => {
    const clk = baudClock.value * baudUnit.value;
    const baud = baudRate.value;

    const ubrr = (clk / (16 * baud)) - 1;

    baudResult.innerText = `UBRR ≈ ${ubrr.toFixed(2)}`;
};

/* Battery */
batteryBtn.onclick = () => {
    const hours = capacity.value / current.value;
    batteryResult.innerText = `Life ≈ ${hours.toFixed(2)} hrs`;
};

/* Base Converter */
convertBtn.onclick = () => {
    const type = conversionType.value;
    const value = numberInput.value.trim();
    let result = "";

    try {
        switch(type) {
            case "hex-bin": result = parseInt(value,16).toString(2); break;
            case "bin-hex": result = "0x"+parseInt(value,2).toString(16).toUpperCase(); break;
            case "hex-dec": result = parseInt(value,16); break;
            case "dec-hex": result = "0x"+parseInt(value,10).toString(16).toUpperCase(); break;
            case "dec-bin": result = parseInt(value,10).toString(2); break;
            case "bin-dec": result = parseInt(value,2); break;
        }
    } catch { result = "Invalid Input"; }

    convertResult.innerText = result;
};

/* IEEE754 Breakdown */
floatBreakBtn.onclick = () => {
    const val = parseFloat(floatBreakInput.value);
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    view.setFloat32(0,val);

    const bits = [...new Uint8Array(buf)]
        .map(b=>b.toString(2).padStart(8,'0')).join("");

    floatBreakResult.innerText =
        `Sign: ${bits[0]}
Exponent: ${bits.slice(1,9)}
Mantissa: ${bits.slice(9)}`;
};

/* ADC */
adcBtn.onclick = () => {
    const v = voltageInput.value;
    const ref = adcRef.value;
    const res = adcRes.value;

    const max = (1<<res)-1;
    const count = (v/ref)*max;

    adcResult.innerText = `ADC Count ≈ ${count.toFixed(2)}`;
};

/* dB */
dbBtn.onclick = () => {
    const gain = Math.pow(10, dbInput.value / 20);
    dbResult.innerText = `Gain ≈ ${gain.toFixed(4)}`;
};

/* CAN */
canBtn.onclick = () => {
    const id = parseInt(canInput.value);
    canResult.innerText =
        `HEX: 0x${id.toString(16).toUpperCase()}
BIN: ${id.toString(2)}`;
};

/* CRC16 */
crcBtn.onclick = () => {
    let data = crcInput.value.match(/.{1,2}/g).map(b=>parseInt(b,16));
    let crc = 0xFFFF;

    data.forEach(byte=>{
        crc ^= byte << 8;
        for(let i=0;i<8;i++)
            crc = crc & 0x8000 ? (crc<<1)^0x1021 : crc<<1;
    });

    crcResult.innerText = `CRC16: 0x${(crc&0xFFFF).toString(16).toUpperCase()}`;
};

/* UART */
uartBtn.onclick = () => {
    const val = parseInt(uartInput.value,16);
    uartResult.innerText = `0 ${val.toString(2).padStart(8,'0')} 1`;
};

/* Register Visualizer */
bitBtn.onclick = () => {
    const val = parseInt(bitInput.value,16);
    const bin = val.toString(2).padStart(8,'0');

    bitResult.innerHTML =
        bin.split("").map((b,i)=>`Bit ${7-i}: ${b}`).join("<br>");
};

/* Packet Decoder */
packetBtn.onclick = () => {
    const bytes = packetInput.value.trim().split(/\s+/);

    packetResult.innerText =
        bytes.map((b,i)=>`Byte ${i}: 0x${b}`).join("\n");
};
