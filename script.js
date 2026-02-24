
/* Theme */
const themeIcon = document.getElementById("themeIcon");

themeIcon.onclick = () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme",
        document.body.classList.contains("light") ? "light" : "dark");
};

if (localStorage.getItem("theme") === "light")
    document.body.classList.add("light");

/* IEEE754 Breakdown */
floatBreakBtn.onclick = () => {
    const val = parseFloat(floatBreakInput.value);
    if (isNaN(val)) return;

    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    view.setFloat32(0, val);

    const bits = [...new Uint8Array(buf)]
        .map(b => b.toString(2).padStart(8,'0'))
        .join("");

    floatBreakResult.innerText =
        `Sign: ${bits[0]}
Exponent: ${bits.slice(1,9)}
Mantissa: ${bits.slice(9)}`;
};

/* ADC Converter */
adcBtn.onclick = () => {
    const v = parseFloat(voltageInput.value);
    const ref = parseFloat(adcRef.value);
    const res = parseInt(adcRes.value);

    if (!v || !ref || !res) return;

    const max = (1 << res) - 1;
    const count = (v / ref) * max;

    adcResult.innerText =
        `ADC Count ≈ ${count.toFixed(2)}`;
};

/* dB ↔ Gain */
dbBtn.onclick = () => {
    const db = parseFloat(dbInput.value);
    if (isNaN(db)) return;

    const gain = Math.pow(10, db / 20);

    dbResult.innerText =
        `Linear Gain ≈ ${gain.toFixed(4)}`;
};

/* CAN Formatter */
canBtn.onclick = () => {
    const id = parseInt(canInput.value);
    if (isNaN(id)) return;

    canResult.innerText =
        `HEX: 0x${id.toString(16).toUpperCase()}
BIN: ${id.toString(2)}`;
};

/* Bit Visualizer */
bitBtn.onclick = () => {
    const val = parseInt(bitInput.value, 16);
    if (isNaN(val)) return;

    const bin = val.toString(2).padStart(8,'0');

    bitResult.innerHTML =
        bin.split("").map((b,i)=>
            `Bit ${7-i}: ${b}`).join("<br>");
};

/* Packet Decoder */
packetBtn.onclick = () => {
    const bytes = packetInput.value.trim().split(/\s+/);

    packetResult.innerText =
        bytes.map((b,i)=>`Byte ${i}: 0x${b}`)
             .join("\n");
};
