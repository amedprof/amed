console.clear();
credits();

/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 GLOBAL FUNCTIONS
1.0 TRIGONOMETRY
    1.1 DOM ELEMENTS
    1.2 FUNCTIONS
    1.3 EVENT LISTENERS
2.0 COSINE RULE
    2.1 DOM ELEMENTS
    2.2 FUNCTIONS
    2.3 EVENT LISTENERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 GLOBAL FUNCTIONS
--------------------------------------------------------------*/

function generateAnswer(changedVariables, variable, requiredVariables, generatorFunction) {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != variable) {
        changedVariables.push(variable);
    }

    if (changedVariables.length <= 1) { return }

    const inputs = changedVariables.slice(changedVariables.length-requiredVariables);

    generatorFunction(inputs);
}

async function displayError(element, defaultMessage, errorMessage, delay=2000) {
    element.innerHTML = errorMessage;
    await sleep(delay);
    element.innerHTML = defaultMessage;
}

function toRadians(degrees) {
    return degrees * Math.PI/180;
}

function toDegrees(radians) {
    return radians * 180/Math.PI;
}

function sin(degrees) {
    return Math.sin(toRadians(degrees))
}

function cos(degrees) {
    return Math.cos(toRadians(degrees))
}

function tan(degrees) {
    return Math.tan(toRadians(degrees))
}

function asin(degrees) {
    return toDegrees(Math.asin(degrees))
}

function acos(degrees) {
    return toDegrees(Math.acos(degrees))
}

function atan(degrees) {
    return toDegrees(Math.atan(degrees))
}

/*--------------------------------------------------------------
1.0 TRIGONOMETRY
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 1.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const inputATrig = document.querySelector('#a-trig');
const inputBTrig = document.querySelector('#b-trig');
const inputCTrig = document.querySelector('#c-trig');
const inputAlphaTrig = document.querySelector('#alpha-trig');
const inputBetaTrig = document.querySelector('#beta-trig');
const outputTrig = document.querySelector('#output-trig');

    /*------------------------------------------------------------
    |
    | 1.2 FUNCTIONS
    |
    ------------------------------------------------------------*/

let changedVariablesTrig = [];

async function trigonometry(inputs) {
    const a = inputATrig.value;
    const b = inputBTrig.value;
    const c = inputCTrig.value;
    const alpha = inputAlphaTrig.value;
    const beta = inputBetaTrig.value;

    const defaultMessage = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';

    // input a 
    if (inputs.includes('a') && inputs.includes('b')) {
        inputCTrig.value = round((a**2 + b**2) ** (0.5), 3);
        inputAlphaTrig.value = round(atan(a / b), 3);
        inputBetaTrig.value = round(atan(b / a), 3);
    } else if (inputs.includes('a') && inputs.includes('c')) {
        inputBTrig.value = round((c**2 - a**2) ** (0.5), 3);
        inputAlphaTrig.value = round(asin(a / c), 3);
        inputBetaTrig.value = round(acos(a / c), 3);
    } else if (inputs.includes('a') && inputs.includes('alpha')) {
        inputBTrig.value = round(a / tan(alpha), 3);
        inputCTrig.value = round(a / sin(alpha), 3);
        inputBetaTrig.value = round(atan((a / tan(alpha)) / a), 3);
    } else if (inputs.includes('a') && inputs.includes('beta')) {
        inputBTrig.value = round(a * tan(beta), 3);
        inputCTrig.value = round(a / cos(beta), 3);
        inputAlphaTrig.value = round(atan(a / (a * tan(beta))), 3);
    }

    // input b 
    else if (inputs.includes('b') && inputs.includes('c')) {
        inputATrig.value = round((c**2 - b**2) ** (0.5), 3);
        inputAlphaTrig.value = round(acos(b / c), 3);
        inputBetaTrig.value = round(asin(b / c), 3);
    } else if (inputs.includes('b') && inputs.includes('alpha')) {
        inputATrig.value = round(b * tan(alpha), 3);
        inputCTrig.value = round(b / cos(alpha), 3);
        inputBetaTrig.value = round(atan(b / (b * tan(alpha))), 3);
    } else if (inputs.includes('b') && inputs.includes('beta')) {
        inputATrig.value = round(b / tan(beta), 3);
        inputCTrig.value = round(b / sin(beta), 3);
        inputAlphaTrig.value = round(atan(b / (tan(beta) / b)), 3);
    }

    // input c 
    else if (inputs.includes('c') && inputs.includes('alpha')) {
        inputATrig.value = round(c * sin(alpha), 3);
        inputBTrig.value = round(c * cos(alpha), 3);
        inputBetaTrig.value = round(acos((c * sin(alpha)) / c), 3);
    } else if (inputs.includes('c') && inputs.includes('beta')) {
        inputATrig.value = round(c * cos(beta), 3);
        inputBTrig.value = round(c * sin(beta), 3);
        inputAlphaTrig.value = round(asin(c * cos(beta) / c), 3);
    }

    // input alpha 
    else if (inputs.includes('alpha') && inputs.includes('beta')) {
        let errorMessage = '<span class="orange-text">Hint</span>: Try adding the length of a <span class="orange-text">side</span>.';
        displayError(outputTrig, defaultMessage, errorMessage, delay=2000)
    }

    if (inputATrig.value == '' || inputBTrig.value == '' || inputCTrig.value == '' || inputAlphaTrig.value == '' || inputBetaTrig.value == '') {
        let errorMessage = '<span class="orange-text">Error</span>: Angle α and Angle β must be <span class="orange-text">bigger</span> than <span class="orange-text">zero</span>.';
        displayError(outputTrig, defaultMessage, errorMessage, delay=2000)
    }
}

    /*------------------------------------------------------------
    |
    | 1.3 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

inputATrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'a', 2, trigonometry);
}

inputBTrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'b', 2, trigonometry);
}

inputCTrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'c', 2, trigonometry);
}

inputAlphaTrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'alpha', 2, trigonometry);
}

inputBetaTrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'beta', 2, trigonometry);
}

/*--------------------------------------------------------------
2.0 COSINE RULE
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 2.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const inputACosine = document.querySelector('#a-cosine');
const inputBCosine = document.querySelector('#b-cosine');
const inputCCosine = document.querySelector('#c-cosine');
const inputGammaCosine = document.querySelector('#gamma-cosine');
const outputCosine = document.querySelector('#output-cosine');

    /*------------------------------------------------------------
    |
    | 2.2 FUNCTIONS
    |
    ------------------------------------------------------------*/

let changedVariablesCosine = [];

async function cosine(inputs) {
    const a = inputACosine.value;
    const b = inputBCosine.value;
    const c = inputCCosine.value;
    const gamma = inputGammaCosine.value;

    const defaultMessage = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';

    if (inputs.includes('a') && inputs.includes('b') && inputs.includes('c')) {
        inputGammaCosine.value = round(acos((a**2 + b**2 - c**2) / (2*a*b)), 3);
    } else if (inputs.includes('a') && inputs.includes('b') && inputs.includes('gamma')) {
        inputCCosine.value = round((a**2 + b**2 - 2*a*b*cos(gamma))**(1/2), 3);
    } else if (inputs.includes('a') && inputs.includes('c') && inputs.includes('gamma')) {
        inputBCosine.value = round(a * cos(gamma) + (c**2 - a**2 * (sin(gamma)**2))**(1/2), 3)
    } else if (inputs.includes('b') && inputs.includes('c') && inputs.includes('gamma')) {
        inputACosine.value = round(b * cos(gamma) + (c**2 - b**2 * (sin(gamma)**2))**(1/2), 3)
    }

    if (inputACosine.value == '' || inputBCosine.value == '' || inputCCosine.value == '' || inputGammaCosine.value == '') {
        let errorMessage = '<span class="orange-text">Error</span>: You f*cked up.';
        displayError(outputCosine, defaultMessage, errorMessage, delay=2000)
    }
}

    /*------------------------------------------------------------
    |
    | 2.3 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

inputACosine.oninput = function() {
    generateAnswer(changedVariablesCosine, 'a', 3, cosine);
}

inputBCosine.oninput = function() {
    generateAnswer(changedVariablesCosine, 'b', 3, cosine);
}

inputCCosine.oninput = function() {
    generateAnswer(changedVariablesCosine, 'c', 3, cosine);
}

inputGammaCosine.oninput = function() {
    generateAnswer(changedVariablesCosine, 'gamma', 3, cosine);
}