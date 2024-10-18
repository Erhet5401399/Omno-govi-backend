let isExpanded = true;

let sidebar = document.getElementById("sidebar");
let btn_sidebar_toggle = document.getElementById("btn_sidebar_toggle");
let menu_labels = document.querySelectorAll(".sidebar .menu a span");
let logo = document.getElementById("logo");

const toggleSidebarHandler = () => {
  sidebar.style.height = '510px'
  if (isExpanded) {
    // Code for shrinking
    sidebar.classList.add("isShrinked");

    menu_labels.forEach((elm) => {
      elm.animate([{ opacity: 0 }], {
        duration: 600,
        easing: "ease-in",
        fill: "both"
      });

      setTimeout(() => {
        elm.style.display = "none";
      }, 450);
    });

    sidebar.animate([{ width: "80px" }], {
      duration: 600,
      easing: "ease-in",
      fill: "both"
    });
    
    logo.style.width = "30px"
  } else {
    // Code for expanding
    sidebar.classList.remove("isShrinked");
     sidebar.style.height = '645px'

    sidebar.animate([{ width: "200px" }], {
      duration: 600,
      easing: "ease-in",
      fill: "both"
    });

    logo.style.width = "50px"

    menu_labels.forEach((elm) => {
      setTimeout(() => {
        elm.style.display = "inline-block";
      }, 200);

      elm.animate([{ opacity: 1 }], {
        duration: 400,
        easing: "ease-in",
        fill: "both"
      });
    });
  }

  isExpanded = !isExpanded;
};

btn_sidebar_toggle.addEventListener("click", toggleSidebarHandler);


document.querySelectorAll('.menu li').forEach(function(item) {
  item.addEventListener('click', function() {
    document.querySelectorAll('.menu li').forEach(function(li) {
      li.classList.remove('menu_active');
    });
    this.classList.add('menu_active');
  });
});

