document.getElementById("searchInput").addEventListener("input", function () {
  let searchText = this.value.toLowerCase();
  let divs = document.querySelectorAll("tbody tr");

  divs.forEach((div) => {
    if (
      div.textContent.toLowerCase().includes(searchText) ||
      searchText === ""
    ) {
      div.classList.remove("hidden");
    } else {
      div.classList.add("hidden");
    }
  });
});
