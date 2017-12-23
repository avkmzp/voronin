var Kw = 1E-14, e = 1E-5, KDiss = [];
var V0 = 0.05, CTitrant = 0.1, VtitrantMl = 0;
var CInitialSolution = [];
var variantOfLab;
var imageData, imageData1;
var dataTitr = [];
var Vequi = [];
Vequi[2] = 0;
Vequi[3] = 0;
function preparationLab(count) {
    variantOfLab = +count;
    var canvas = document.getElementById("graph");
    var context = canvas.getContext("2d");
    for (var x = 0.5; x < 602; x += 10) {
        context.moveTo(x, 0);
        context.lineTo(x, 400);
    }
    for (var y = 0.5; y < 402; y += 10) {
        context.moveTo(0, y);
        context.lineTo(600, y);
    }
    context.strokeStyle = "#eee";
    context.stroke();
    context.beginPath();
    for (x = 20.5; x < 601; x += 50) {
        context.moveTo(x, 380.5);
        context.lineTo(x, 384.5);
        context.fillText(xGraphToDigit(x), x - 8, 394);
    }
    for (y = 380.5; y > 0; y -= 50) {
        context.moveTo(16.5, y);
        context.lineTo(20.5, y);
        if (yGraphToDigit(y) >= 10) {
            context.fillText(yGraphToDigit(y), 0.5, y + 2);
        }
        else {
            context.fillText(yGraphToDigit(y), 6.5, y + 2);
        }
    }
    context.moveTo(16, 380.5);
    context.lineTo(600.5, 380.5);
    context.moveTo(20.5, 0);
    context.lineTo(20.5, 384.5);
    context.moveTo(20.5, 0);
    context.lineTo(17.5, 12);
    context.moveTo(20.5, 0);
    context.lineTo(23.5, 12);
    context.moveTo(600.5, 380.5);
    context.lineTo(588.5, 383.5);
    context.moveTo(600.5, 380.5);
    context.lineTo(588.5, 377.5);
    context.strokeStyle = "#000";
    context.stroke();
    context.font = "bold 13px Verdana";
    context.fillText("pH", 22.5, 25);
    context.fillText("Vi (мл)", 530.5, 375);
    setConcentration();
}
function setConcentration() {
    var D = new Date();
    switch (variantOfLab) {
        case 1:
            CInitialSolution[0] = +(D.getMilliseconds() * 0.018 / 999 + 0.002).toFixed(5);
            break;
        case 2:
            CInitialSolution[1] = +(D.getMilliseconds() * 0.018 / 999 + 0.002).toFixed(5);
            KDiss[1] = 1.754e-5;
            break;
        case 3:
            CInitialSolution[1] = +((D.getMilliseconds() * 0.018 / 999 + 0.002) / 2).toFixed(5);
            KDiss[1] = 5.4e-2;
            KDiss[2] = 5.4e-5;
            break;
        case 4:
            CInitialSolution[1] = +((D.getMilliseconds() * 0.018 / 999 + 0.002) / 3).toFixed(5);
            KDiss[1] = 7.52e-3;
            KDiss[2] = 6.31e-8;
            KDiss[3] = 1.26e-12;
            break;
        case 5:
            CInitialSolution[1] = +(D.getMilliseconds() * 0.008 / 999 + 0.002).toFixed(5);
            CInitialSolution[2] = +(D.getSeconds() * 0.008 / 59 + 0.002).toFixed(5);
            KDiss[1] = 1.77e-4;
            KDiss[2] = 1.754e-5;
    }
}
function titr() {
    VtitrantMl += 0.025;
    var pH = pHV(VtitrantMl / 1000, CInitialSolution);
    var vBuretka = 34 - VtitrantMl;
    var buretka = document.getElementById("buretka");
    var strVi = document.getElementById("vi");
    var strpH = document.getElementById("ph");
    buretka.style.backgroundPosition = "4px " + (10 + VtitrantMl * 10) + "px, 4px 350px";
    buretka.style.backgroundSize = "12px " + (vBuretka * 10) + "px, 12px 11px";
    strVi.innerHTML = " " + VtitrantMl.toFixed(3) + " мл";
    strpH.innerHTML = " " + pH.toFixed(2);
    dataTitr.push(VtitrantMl / 1000);
    dataTitr.push(pH);
    drawGraph(VtitrantMl, pH);
}
function pHV(ViL, CAcid) {
    var pHmin = -1;
    var pHmax = 14;
    var pH = (pHmax + pHmin) / 2;
    var Vappr = VpH(pH, CAcid);
    do {
        if (ViL < Vappr) {
            pHmax = pH;
        }
        else {
            pHmin = pH;
        }
        pH = (pHmax + pHmin) / 2;
        Vappr = VpH(pH, CAcid);
    } while (Math.abs(ViL - Vappr) > e);
    return pH;
}
function VpH(pH, CAcid) {
    var f = [];
    var H = Math.pow(10, -pH);
    f[0] = H - Kw / H;
    switch (variantOfLab) {
        case 1:
            return V0 * (CAcid[0] - f[0]) / (f[0] + CTitrant);
            break;
        case 2:
            f[1] = 1 + H / KDiss[1];
            return V0 * (CAcid[1] / f[1] - f[0]) / (f[0] + CTitrant);
            break;
        case 3:
            f[1] = 1 + H / KDiss[2] + H * H / KDiss[1] / KDiss[2];
            return V0 * (CAcid[1] * (H / KDiss[2] / f[1] + 2 / f[1]) - f[0]) / (f[0] + CTitrant);
            break;
        case 4:
            f[1] = 1 / (1 + H / KDiss[3] + H * H / KDiss[2] / KDiss[3] + H * H * H / KDiss[1] / KDiss[2] / KDiss[3]);
            f[2] = f[1] * (H * H / KDiss[2] / KDiss[3] + 2 * H / KDiss[3] + 3);
            return V0 * (CAcid[1] * f[2] - f[0]) / (f[0] + CTitrant);
            break;
        case 5:
            f[1] = 1 + H / KDiss[1];
            f[2] = 1 + H / KDiss[2];
            return V0 * (CAcid[1] / f[1] + CAcid[2] / f[2] - f[0]) / (f[0] + CTitrant);
    }
}
function drawGraph(X, Y) {
    var x = xDigitToGraph(X);
    var y = yDigitToGraph(Y);
    var canvas = document.getElementById("graph");
    var context = canvas.getContext("2d");
    context.fillRect(x - 1, y - 1, 2, 2);
}
function setVequi() {
    switch (variantOfLab) {
        case 1:
            Vequi[0] = checkDigit(document.getElementById("vequi").value);
            document.getElementById("vequi").value = Vequi[0];
            break;
        case 2:
            Vequi[1] = checkDigit(document.getElementById("vequi").value);
            document.getElementById("vequi").value = Vequi[1];
            break;
        case 3:
            Vequi[1] = checkDigit(document.getElementById("vequi").value);
            document.getElementById("vequi").value = Vequi[1];
            break;
        case 4:
            Vequi[1] = checkDigit(document.getElementById("vequi").value);
            document.getElementById("vequi").value = Vequi[1];
            break;
        case 5:
            Vequi[0] = checkDigit(document.getElementById("vequi").value);
            Vequi[1] = checkDigit(document.getElementById("vequi1").value);
            document.getElementById("vequi").value = Vequi[0];
            document.getElementById("vequi1").value = Vequi[1];
    }
    displeyVequi();
}
function reSetVequi(deltaVequi, count) {
    if (isNaN(parseFloat(Vequi[0]))) {
        Vequi[0] = 0
    }
    if (isNaN(parseFloat(Vequi[1]))) {
        Vequi[1] = 0
    }
    switch (variantOfLab) {
        case 1:
            Vequi[0] += deltaVequi;
            document.getElementById("vequi").value = Vequi[0].toFixed(2);
            break;
        case 2:
            Vequi[1] += deltaVequi;
            document.getElementById("vequi").value = Vequi[1].toFixed(2);
            break;
        case 3:
            Vequi[1] += deltaVequi;
            document.getElementById("vequi").value = Vequi[1].toFixed(2);
            break;
        case 4:
            Vequi[1] += deltaVequi;
            document.getElementById("vequi").value = Vequi[1].toFixed(2);
            break;
        case 5:
            if (count == 1) {
                Vequi[0] += deltaVequi;
                document.getElementById("vequi").value = Vequi[0].toFixed(2);
            } else {
                Vequi[1] += deltaVequi;
                document.getElementById("vequi1").value = Vequi[1].toFixed(2);
            }
    }
    displeyVequi();
}
function displeyVequi() {
    if (!Vequi[0] && !Vequi[1]) {
        return;
    }
    var x;
    var canvas = document.getElementById("graph");
    var context = canvas.getContext("2d");
    var R2 = document.getElementById("r2");
    switch (variantOfLab) {
        case 1:
            x = xDigitToGraph(Vequi[0]);
            if (Vequi[2] !== 0) {
                context.putImageData(imageData, xDigitToGraph(Vequi[2]), 10);
            }
            imageData = context.getImageData(x, 10, 1, 370);
            Vequi[2] = Vequi[0];
            context.beginPath();
            context.moveTo(x, 10);
            context.lineTo(x, 380);
            context.strokeStyle = "red";
            context.stroke();
            break;
        case 2:
            x = xDigitToGraph(Vequi[1]);
            if (Vequi[2] !== 0) {
                context.putImageData(imageData, xDigitToGraph(Vequi[2]), 10);
            }
            imageData = context.getImageData(x, 10, 1, 370);
            Vequi[2] = Vequi[1];
            context.beginPath();
            context.moveTo(x, 10);
            context.lineTo(x, 380);
            context.strokeStyle = "red";
            context.stroke();
            break;
        case 3:
            x = xDigitToGraph(Vequi[1]);
            if (Vequi[2] !== 0) {
                context.putImageData(imageData, xDigitToGraph(Vequi[2]), 10);
            }
            imageData = context.getImageData(x, 10, 1, 370);
            Vequi[2] = Vequi[1];
            context.beginPath();
            context.moveTo(x, 10);
            context.lineTo(x, 380);
            context.strokeStyle = "red";
            context.stroke();
            break;
        case 4:
            x = xDigitToGraph(Vequi[1]);
            if (Vequi[2] !== 0) {
                context.putImageData(imageData, xDigitToGraph(Vequi[2]), 10);
            }
            imageData = context.getImageData(x, 10, 1, 370);
            Vequi[2] = Vequi[1];
            context.beginPath();
            context.moveTo(x, 10);
            context.lineTo(x, 380);
            context.strokeStyle = "red";
            context.stroke();
            break;
        case 5:
            x = xDigitToGraph(Vequi[0]);
            if (Vequi[2] !== 0) {
                context.putImageData(imageData, xDigitToGraph(Vequi[2]), 10);
            }
            imageData = context.getImageData(x, 10, 1, 370);
            Vequi[2] = Vequi[0];
            context.beginPath();
            context.moveTo(x, 10);
            context.lineTo(x, 380);
            context.strokeStyle = "red";
            context.stroke();
            if (Vequi[1] !== 0) {
                var x1 = xDigitToGraph(Vequi[1]);
                if (Vequi[3] !== 0) {
                    context.putImageData(imageData1, xDigitToGraph(Vequi[3]), 10);
                }
                imageData1 = context.getImageData(x1, 10, 1, 370);
                Vequi[3] = Vequi[1];
                context.beginPath();
                context.moveTo(x1, 10);
                context.lineTo(x1, 380);
                context.strokeStyle = "blue";
                context.stroke();
            }
    }
    R2.innerHTML = calculateSumR2();
}
function xGraphToDigit(x) {
    var X = (x - 20.5) / 50;
    return X.toFixed(1);
}
function yGraphToDigit(y) {
    var Y = (380.5 - y) / 25;
    return Y.toFixed();
}
function xDigitToGraph(x) {
    return Math.round(20 + x * 50) + 0.5;
}
function yDigitToGraph(y) {
    return Math.round(380 - y * 25) + 0.5;
}
function calculateSumR2() {
    var numberOfTitr = dataTitr.length;
    var CAcid = [];
    var sum = 0, V, pH, i;
    switch (variantOfLab) {
        case 1:
            CAcid[0] = CTitrant * Vequi[0] / V0 / 1000;
            break;
        case 2:
            CAcid[1] = CTitrant * Vequi[1] / V0 / 1000;
            break;
        case 3:
            CAcid[1] = CTitrant * Vequi[1] / V0 / 1000;
            break;
        case 4:
            CAcid[1] = CTitrant * Vequi[1] / V0 / 1000;
            break;
        case 5:
            CAcid[2] = CTitrant * (Vequi[0] - Vequi[1]) / V0 / 1000;
            CAcid[1] = CTitrant * Vequi[1] / V0 / 1000;
    }
    for (i = 0; i < numberOfTitr; i += 2) {
        V = +dataTitr[i];
        pH = +dataTitr[i + 1];
        sum += Math.pow((pH - pHV(V, CAcid)), 2);
    }
    return sum.toFixed(3);
}
function resume(Flag) {
    var CCalc = checkDigit(document.getElementById("c_calculated").value);
    var CCalc2 = '0';
    var error;
    var error2 = '0';
    document.getElementById("c_calculated").value = CCalc;
    var total = document.getElementById('total');
    var err = document.getElementById('error');
    var paragraph = total.getElementsByTagName('p');
    if (Flag) {
        return;
    }
    switch (variantOfLab) {
        case 1:
            document.getElementById('c_real').innerHTML = CInitialSolution[0].toFixed(5);
            error = (Math.abs(CInitialSolution[0] - CCalc) / CInitialSolution[0] * 100).toFixed();
            err.innerHTML = error;
            break;
        case 2:
            document.getElementById('c_real').innerHTML = CInitialSolution[1].toFixed(5);
            error = (Math.abs(CInitialSolution[1] - CCalc) / CInitialSolution[1] * 100).toFixed();
            err.innerHTML = error;
            break;
        case 3:
            document.getElementById('c_real').innerHTML = CInitialSolution[1].toFixed(5);
            error = (Math.abs(CInitialSolution[1] - CCalc) / CInitialSolution[1] * 100).toFixed();
            err.innerHTML = error;
            break;
        case 4:
            document.getElementById('c_real').innerHTML = CInitialSolution[1].toFixed(5);
            error = (Math.abs(CInitialSolution[1] - CCalc) / CInitialSolution[1] * 100).toFixed();
            err.innerHTML = error;
            break;
        case 5:
            CCalc2 = checkDigit(document.getElementById("c2_calculated").value);
            document.getElementById("c2_calculated").value = CCalc2;
            var err2 = document.getElementById('error2');
            document.getElementById('c_real').innerHTML = CInitialSolution[1].toFixed(5);
            error = (Math.abs(CInitialSolution[1] - CCalc) / CInitialSolution[1] * 100).toFixed();
            err.innerHTML = error;
            document.getElementById('c2_real').innerHTML = CInitialSolution[2].toFixed(5);
            error2 = (Math.abs(CInitialSolution[2] - CCalc2) / CInitialSolution[2] * 100).toFixed();
            err2.innerHTML = error2;
            paragraph[2].style.display = 'inline';
            paragraph[3].style.display = 'inline';
    }
    paragraph[0].style.display = 'inline';
    paragraph[1].style.display = 'inline';
    document.getElementById("c_calculated").setAttribute("disabled", "disabled");
    if (variantOfLab == 5) {
        document.getElementById("c2_calculated").setAttribute("disabled", "disabled");
    }
    document.getElementById("resume").style.display = "none";
    var xmlhttp = getXmlHttp();
    var params = "labid=" + encodeURIComponent(variantOfLab) +
        "&conc=" + encodeURIComponent(CCalc) +
        "&error=" + encodeURIComponent(error) +
        "&conc2=" + encodeURIComponent(CCalc2) +
        "&error2=" + encodeURIComponent(error2);
    xmlhttp.open('POST', 'dbAdd.php', true); // Открываем асинхронное соединение
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
    xmlhttp.send(params);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                if (xmlhttp.responseText) {
                    alert(xmlhttp.responseText);
                } else {
                    alert("Результат записан в базу!")
                }
            } else {
                alert("Запись результата в базу не удалась!");
            }
        }
    }
}
function checkDigit(str) {
    var s = '', flag = true;
    for (var i = 0; i < str.length; i++) {
        if ((str[i] == ',' || str[i] == '.') && flag) {
            flag = false;
            s += '.';
        } else if (str[i] >= '0' && str[i] <= '9') {
            s += str[i];
        }
    }
    if (s === '') {
        return 0;
    }
    return +s;
}
