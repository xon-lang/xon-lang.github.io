var { translateProgram } = require("@xon/translator-ts");
var code = require("./sample");

input.value = code;
translate();

const debounce = (func) => {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, 500);
  };
};

function translate() {
  try {
    output.textContent = translateProgram(input.value);
    error.textContent = "";
  } catch (err) {
    error.textContent = err.message;
  }
}

input.addEventListener("input", debounce(translate));

input.onkeydown = function (e) {
  console.log("sdf");
  if (e.keyCode == 9 || e.which == 9) {
    e.preventDefault();
    var s = this.selectionStart;
    this.value =
      this.value.substring(0, this.selectionStart) +
      "    " +
      this.value.substring(this.selectionEnd);
    this.selectionEnd = s + 4;
  }
};

console.error = (x) =>
  setTimeout(() => (document.getElementById("error").textContent = x));
