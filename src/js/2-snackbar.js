import iziToast from "izitoast";


// `✅ Fulfilled promise in ${delay}ms`

// `❌ Rejected promise in ${delay}ms`

function initSnackbar() {
  iziToast.settings({
    position: "topRight",
    timeout: 20000,
    close: false,
    progressBar: false,
    icon: undefined,
    // transitionIn: "fadeInDown",
    // transitionOut: "fadeOutUp",
  });
}
function showSnackbar(message, type = "success") {
  iziToast[type]({
    message: message,
    class: type,
    icon: type === "success" ? "fas fa-check" : "fas fa-times",
    progressBarColor: type === "success" ? "#4caf50" : "#f44336",
  });
}

initSnackbar();

showSnackbar("This is a success message", "success");
showSnackbar("This is an error message", "error");