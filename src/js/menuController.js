export function menuController() {
  const stockHandle = document.getElementById('stockHandle');
  const employees = document.getElementById('employees');
  const company = document.getElementById('company');
  const info = document.getElementById('info');


  document.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', e => {
      document.querySelectorAll('li').forEach(item => {
        if (item.className === "active") {
          item.classList.remove("active");
        }
      });
      item.classList.add("active");
    });
  })
}