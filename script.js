const themeIcon = document.getElementById("themeIcon");

themeIcon.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}

/* Timer */
document.getElementById("timerBtn").onclick = () => {
    const clk = timerClock.value * timerUnit.value;
    const pres = prescaler.value;
    const t = time.value / 1000;

    const ticks = (clk / pres) * t;

    timerResult.innerText = `Ticks Required: ${ticks.toFixed(2)}`;
};

/* PWM */
document.getElementById("pwmBtn").onclick = () => {
    const clk = pwmClock.value * pwmUnit.value;
    const pres = pwmPrescaler.value;
    const freq = pwmFreq.value;

    const top = (clk / (pres * freq)) - 1;

    pwmResult.innerText = `TOP Value ≈ ${top.toFixed(2)}`;
};

/* Float */
document.getElementById("floatBtn").onclick = () => {
    const val = parseFloat(floatInput.value);
    const buf = new ArrayBuffer(4);
    new DataView(buf).setFloat32(0, val);

    const hex = [...new Uint8Array(buf)]
        .map(x => x.toString(16).padStart(2,'0')).join(' ');

    floatResult.innerText = hex.toUpperCase();
};

/* Register */
document.getElementById("regBtn").onclick = () => {
    const val = parseInt(regInput.value, 16);
    const width = regWidth.value;

    regResult.innerText = val.toString(2).padStart(width,'0');
};

/* CRC */
document.getElementById("crcBtn").onclick = () => {
    let data = crcInput.value.match(/.{1,2}/g).map(b=>parseInt(b,16));
    let crc = 0xFFFF;

    data.forEach(byte=>{
        crc ^= byte << 8;
        for(let i=0;i<8;i++)
            crc = crc & 0x8000 ? (crc<<1)^0x1021 : crc<<1;
    });

    crcResult.innerText = `0x${(crc&0xFFFF).toString(16).toUpperCase()}`;
};

/* UART */
document.getElementById("uartBtn").onclick = () => {
    const val = parseInt(uartInput.value,16);
    uartResult.innerText = `0 ${val.toString(2).padStart(8,'0')} 1`;
};

/* Copy */
document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.onclick = () => {
        const id = btn.dataset.copy;
        navigator.clipboard.writeText(document.getElementById(id).innerText);
    };
});
