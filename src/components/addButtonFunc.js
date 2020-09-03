var count;
if (!count) {
    count = 0;
}

function incrementCount(key) {
    count++;
    if (count > 0 || count == 0) {
        document.getElementById(key).value = count;
    }
}

function decrementCount(key) {
    count--;
    if (count < 0 || count == 0) {
        count = 0;
        document.getElementById(key).value = 0;
    }
    else {
        document.getElementById(key).value = count;
    }
}


var count2;
if (!count2) {
    count2 = 0;
}
function incrementCount2(key) {
    count2++;
    if (count2 > 0 || count2 == 0) {
        document.getElementById(key).value = count2;
    }
}

function decrementCount2(key) {
    count2--;
    if (count2 < 0 || count2 == 0) {
        count2 = 0;
        document.getElementById(key).value = 0;
    }
    else {
        document.getElementById(key).value = count2;
    }
}

export { incrementCount, decrementCount, incrementCount2, decrementCount2 };
