const roles=document.querySelectorAll(".role");let selected="student";
roles.forEach(btn=>btn.addEventListener("click",()=>{roles.forEach(x=>x.classList.remove("active"));btn.classList.add("active");selected=btn.dataset.role;}));
const form=document.getElementById("loginForm"); if(form) form.addEventListener("submit",e=>{e.preventDefault();const paths={student:"student.html",staff:"staff.html",admin:"admin.html"};window.location.href=paths[selected]});
const toggle=document.getElementById("togglePwd");if(toggle)toggle.onclick=()=>{const p=document.getElementById("password");p.type=p.type==="password"?"text":"password";toggle.textContent=p.type==="password"?"Show":"Hide"};
document.querySelectorAll(".mobile-menu").forEach(b=>b.addEventListener("click",()=>document.querySelector(".sidebar").classList.toggle("open")));
