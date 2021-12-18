$(".select-search-btn").click(function () {
  $(".result").show();
});

function btnClicker() {
  console.log("clicked");
  window.addEventListener("click", (e) => {
    const a = e.target;
    console.log(a);
  });
}
