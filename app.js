const WA="255617585318";
const state={
students:[
{id:"MVT-001",name:"Amina Juma",course:"ICT",year:"2026",phone:"0712 345 678",status:"Active",fee:"Paid"},
{id:"MVT-002",name:"Baraka Hassan",course:"Electrical Installation",year:"2026",phone:"0754 222 819",status:"Active",fee:"Pending"},
{id:"MVT-003",name:"Neema Peter",course:"Tailoring & Fashion",year:"2025",phone:"0788 410 902",status:"Active",fee:"Paid"},
{id:"MVT-004",name:"John Michael",course:"Motor Vehicle Mechanics",year:"2026",phone:"0621 118 444",status:"Inactive",fee:"Pending"},
{id:"MVT-005",name:"Zawadi Ally",course:"Plumbing",year:"2025",phone:"0698 331 120",status:"Active",fee:"Paid"}],
staff:[
{name:"Grace Mwinyi",role:"Academic Officer",dept:"Administration",status:"Active"},
{name:"Daniel Mushi",role:"Instructor",dept:"ICT",status:"Active"},
{name:"Rehema Salum",role:"Instructor",dept:"Electrical",status:"Active"},
{name:"Peter Joseph",role:"Finance Officer",dept:"Finance",status:"Active"}]
};
const pages={dashboard:"Dashboard",students:"Students",admissions:"Student Admissions",staff:"Staff Management",fees:"Fees & Payments",results:"Academic Results",timetable:"Class Timetable",notices:"Notice Board",emails:"Email Center"};

document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>route(b.dataset.page));
 document.getElementById("mobileMenu").onclick=()=>document.querySelector(".sidebar").classList.toggle("open");
 route("dashboard");
});
function route(page){
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 document.getElementById("pageTitle").textContent=pages[page]||"Dashboard";
 document.querySelector(".sidebar").classList.remove("open");
 document.getElementById("content").innerHTML=views[page]();
}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function openModal(html){document.getElementById("modalBody").innerHTML=html;document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function wa(text){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank")}
function stat(label,num,icon){return `<div class="card stat"><div><div class="label">${label}</div><div class="num">${num}</div></div><div class="icon">${icon}</div></div>`}
function tableStudents(filter=""){let rows=state.students.filter(s=>(s.name+s.id+s.course).toLowerCase().includes(filter.toLowerCase()));return rows.map(s=>`<tr><td><b>${s.id}</b></td><td>${s.name}</td><td>${s.course}</td><td>${s.year}</td><td>${s.phone}</td><td><span class="badge ${s.status==="Active"?"active-b":"danger-b"}">${s.status}</span></td><td><span class="badge ${s.fee==="Paid"?"paid":"pending"}">${s.fee}</span></td><td><button class="btn light" onclick="wa('Hello, I need help regarding student ${s.id} - ${s.name}.')">Contact</button></td></tr>`).join("")||`<tr><td colspan="8" class="empty">No students found.</td></tr>`}

const views={
dashboard:()=>`<div class="welcome"><div><h1>Good afternoon, Administrator</h1><div class="muted">Mysore Vocational Training Center • Academic Year 2026</div></div><button class="btn green" onclick="route('admissions')">＋ New Admission</button></div>
<div class="grid stats">${stat("Total Students","1,248","◉")}${stat("Active Staff","42","♙")}${stat("Fees Collected","TZS 84.6M","▣")}${stat("Pending Fees","TZS 12.8M","!")}</div>
<div class="grid cols2"><div class="card"><div class="section-head"><h3>Recent Admissions</h3><button class="btn light" onclick="route('students')">View all</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Student</th><th>Course</th><th>Admission</th><th>Status</th></tr></thead><tbody>
<tr><td><b>Amina Juma</b><br><span class="mini">MVT-001</span></td><td>ICT</td><td>15 Sep 2026</td><td><span class="badge active-b">Approved</span></td></tr>
<tr><td><b>Baraka Hassan</b><br><span class="mini">MVT-002</span></td><td>Electrical Installation</td><td>14 Sep 2026</td><td><span class="badge pending">Review</span></td></tr>
<tr><td><b>Neema Peter</b><br><span class="mini">MVT-003</span></td><td>Tailoring & Fashion</td><td>12 Sep 2026</td><td><span class="badge active-b">Approved</span></td></tr>
</tbody></table></div></div>
<div class="card"><div class="section-head"><h3>Notice Board</h3><button class="btn light" onclick="route('notices')">Manage</button></div>
<div class="notice"><b>September assessment timetable released</b><p>Students can view their assessment dates from the timetable section.</p><time>Today • 09:30</time></div>
<div class="notice"><b>Fee clearance deadline</b><p>All outstanding balances should be cleared before practical exams.</p><time>Yesterday</time></div>
<div class="notice"><b>Staff meeting</b><p>Department heads meeting scheduled for Friday at 10:00 AM.</p><time>2 days ago</time></div></div></div>
<div class="grid cols2" style="margin-top:18px"><div class="card"><div class="section-head"><h3>Enrollment by Course</h3></div>
${["ICT|82","Electrical|67","Motor Vehicle|54","Tailoring|46","Plumbing|39"].map(x=>{let [a,b]=x.split("|");return `<div class="bar-row"><span>${a}</span><div class="bar"><i style="width:${b}%"></i></div><b>${b}%</b></div>`}).join("")}</div>
<div class="card"><div class="section-head"><h3>Quick Actions</h3></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button class="btn light" onclick="route('admissions')">＋ Admission</button><button class="btn light" onclick="route('fees')">▣ Record Fee</button><button class="btn light" onclick="route('results')">✓ Enter Results</button><button class="btn light" onclick="route('notices')">◈ Post Notice</button></div></div></div>`,

students:()=>`<div class="welcome"><div><h1>Student Management</h1><div class="muted">Search, view and manage enrolled students.</div></div><button class="btn green" onclick="route('admissions')">＋ Add Student</button></div>
<div class="card"><div class="toolbar"><input id="studentSearch" class="search" placeholder="Search name, ID or course…" oninput="document.getElementById('studentRows').innerHTML=tableStudents(this.value)"><button class="btn light" onclick="showToast('Demo export prepared')">Export CSV</button></div>
<div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>Student</th><th>Course</th><th>Year</th><th>Phone</th><th>Status</th><th>Fees</th><th></th></tr></thead><tbody id="studentRows">${tableStudents()}</tbody></table></div></div>`,

admissions:()=>`<div class="welcome"><div><h1>Student Admission</h1><div class="muted">Capture a new applicant and send the request to the admissions desk.</div></div></div>
<div class="card"><form onsubmit="submitAdmission(event)"><div class="form-grid">
${field("Full Name","full_name","Enter student's full name")}${field("Phone Number","phone","07xx xxx xxx")}${field("Email Address","email","student@example.com")}${selectField("Course","course",["ICT","Electrical Installation","Motor Vehicle Mechanics","Tailoring & Fashion","Plumbing","Carpentry"])}
${field("Date of Birth","dob","", "date")}${selectField("Gender","gender",["Male","Female"])}${field("Parent/Guardian Name","guardian","Full name")}${field("Guardian Phone","guardian_phone","07xx xxx xxx")}
${field("Previous School","previous_school","School / institution","text","full")}${field("Additional Information","message","Any admission notes…","text","full")}
</div><div style="margin-top:18px;display:flex;gap:9px;justify-content:flex-end"><button type="button" class="btn light" onclick="this.form.reset()">Clear</button><button class="btn green">Submit Admission Request</button></div></form></div>`,

staff:()=>`<div class="welcome"><div><h1>Staff Management</h1><div class="muted">Staff directory, departments and employment status.</div></div><button class="btn green" onclick="staffModal()">＋ Add Staff</button></div>
<div class="grid page-grid">${state.staff.map((s,i)=>`<div class="card"><div style="display:flex;justify-content:space-between"><div class="avatar">${s.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><span class="badge active-b">${s.status}</span></div><h3 style="font-size:14px;margin:14px 0 4px">${s.name}</h3><div class="muted">${s.role}</div><div class="mini" style="margin-top:8px">${s.dept} Department</div></div>`).join("")}</div>`,

fees:()=>`<div class="welcome"><div><h1>Fees & Payments</h1><div class="muted">Track invoices, balances and payment records.</div></div><button class="btn green" onclick="feeModal()">＋ Record Payment</button></div>
<div class="grid stats">${stat("Expected Fees","TZS 97.4M","▣")}${stat("Collected","TZS 84.6M","✓")}${stat("Outstanding","TZS 12.8M","!")}${stat("Collection Rate","86.9%","↗")}</div>
<div class="card"><div class="section-head"><h3>Recent Transactions</h3><button class="btn light" onclick="showToast('Demo statement generated')">Generate Statement</button></div><table class="table"><thead><tr><th>Receipt</th><th>Student</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead><tbody>
${["RC-20981|Amina Juma|450,000|M-Pesa|16 Sep 2026","RC-20980|Neema Peter|300,000|Bank|15 Sep 2026","RC-20979|Baraka Hassan|250,000|Cash|15 Sep 2026","RC-20978|Zawadi Ally|500,000|M-Pesa|14 Sep 2026"].map(r=>{let a=r.split("|");return `<tr><td>${a[0]}</td><td><b>${a[1]}</b></td><td>TZS ${a[2]}</td><td>${a[3]}</td><td>${a[4]}</td><td><span class="badge paid">Posted</span></td></tr>`}).join("")}</tbody></table></div>`,

results:()=>`<div class="welcome"><div><h1>Academic Results</h1><div class="muted">Enter, review and publish student assessment results.</div></div><button class="btn green" onclick="resultModal()">＋ Enter Result</button></div>
<div class="card"><div class="toolbar"><select class="search"><option>All Courses</option><option>ICT</option><option>Electrical Installation</option><option>Motor Vehicle Mechanics</option></select><select class="search"><option>2026</option><option>2025</option></select></div>
<table class="table"><thead><tr><th>Student</th><th>Course</th><th>Assessment</th><th>Score</th><th>Grade</th><th>Status</th></tr></thead><tbody>
<tr><td>Amina Juma</td><td>ICT</td><td>Computer Applications</td><td>86%</td><td><b>A</b></td><td><span class="badge paid">Published</span></td></tr>
<tr><td>Neema Peter</td><td>Tailoring</td><td>Pattern Design</td><td>74%</td><td><b>B</b></td><td><span class="badge paid">Published</span></td></tr>
<tr><td>Baraka Hassan</td><td>Electrical</td><td>Wiring Practice</td><td>62%</td><td><b>C</b></td><td><span class="badge pending">Draft</span></td></tr>
</tbody></table></div>`,

timetable:()=>`<div class="welcome"><div><h1>Class Timetable</h1><div class="muted">Weekly class schedule by day, course and instructor.</div></div><button class="btn green" onclick="timetableModal()">＋ Add Class</button></div>
<div class="card"><div class="section-head"><h3>Week 3 • September 2026</h3><button class="btn light" onclick="showToast('Timetable print view opened')">Print</button></div>
<table class="table"><thead><tr><th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr></thead><tbody>
<tr><th>08:00–10:00</th><td><b>ICT</b><br><span class="mini">Mr. Mushi • Lab 1</span></td><td><b>Electrical</b><br><span class="mini">Workshop A</span></td><td><b>Plumbing</b><br><span class="mini">Workshop B</span></td><td><b>ICT</b><br><span class="mini">Lab 1</span></td><td><b>Motor Vehicle</b><br><span class="mini">Garage</span></td></tr>
<tr><th>10:30–12:30</th><td><b>Tailoring</b><br><span class="mini">Studio</span></td><td><b>ICT</b><br><span class="mini">Lab 2</span></td><td><b>Electrical</b><br><span class="mini">Workshop A</span></td><td><b>Motor Vehicle</b><br><span class="mini">Garage</span></td><td><b>Plumbing</b><br><span class="mini">Workshop B</span></td></tr>
<tr><th>14:00–16:00</th><td>Practical Session</td><td>Practical Session</td><td>Assessment</td><td>Practical Session</td><td>Department Review</td></tr>
</tbody></table></div>`,

notices:()=>`<div class="welcome"><div><h1>Notice Board</h1><div class="muted">Publish announcements for students and staff.</div></div><button class="btn green" onclick="noticeModal()">＋ New Notice</button></div>
<div class="grid page-grid">${[
["September assessment timetable released","Academic Office","16 Sep 2026","Students can view their assessment dates from the timetable section.","Important"],
["Fee clearance deadline","Finance Department","15 Sep 2026","All outstanding balances should be cleared before practical examinations.","Finance"],
["Staff meeting","Administration","14 Sep 2026","Department heads meeting scheduled for Friday at 10:00 AM.","Staff"],
["Admissions open","Admissions Office","10 Sep 2026","Applications are now being accepted for selected vocational courses.","Admissions"]
].map(n=>`<div class="card"><span class="badge active-b">${n[4]}</span><h3 style="font-size:14px;margin:12px 0 5px">${n[0]}</h3><div class="mini">${n[1]} • ${n[2]}</div><p class="muted" style="line-height:1.5">${n[3]}</p><button class="btn light" onclick="wa('Hello, I would like more information about the notice: ${n[0]}')">Ask on WhatsApp</button></div>`).join("")}</div>`,

emails:()=>`<div class="welcome"><div><h1>Email Center</h1><div class="muted">Demo interface for school-wide and targeted email communication.</div></div><button class="btn green" onclick="emailModal()">＋ Compose Email</button></div>
<div class="grid cols2"><div class="card"><div class="section-head"><h3>Recent Campaigns</h3></div><table class="table"><thead><tr><th>Subject</th><th>Audience</th><th>Sent</th><th>Status</th></tr></thead><tbody>
<tr><td>Assessment timetable</td><td>All Students</td><td>16 Sep</td><td><span class="badge paid">Sent</span></td></tr><tr><td>Fee reminder</td><td>Students with balance</td><td>15 Sep</td><td><span class="badge paid">Sent</span></td></tr><tr><td>Staff meeting</td><td>All Staff</td><td>14 Sep</td><td><span class="badge paid">Sent</span></td></tr></tbody></table></div>
<div class="card"><h3 style="font-size:15px">Email Statistics</h3>${["Delivered|96","Opened|72","Clicked|34"].map(x=>{let a=x.split("|");return `<div class="bar-row"><span>${a[0]}</span><div class="bar"><i style="width:${a[1]}%"></i></div><b>${a[1]}%</b></div>`}).join("")}</div></div>`
};
function field(label,name,ph="",type="text",extra=""){return `<div class="field ${extra}"><label>${label}</label><input name="${name}" type="${type}" placeholder="${ph}" ${name==="full_name"?"required":""}></div>`}
function selectField(label,name,opts){return `<div class="field"><label>${label}</label><select name="${name}">${opts.map(o=>`<option>${o}</option>`).join("")}</select></div>`}
function submitAdmission(e){e.preventDefault();const f=new FormData(e.target);const text=`Hello, I want to submit a student admission request to Mysore VTC.%0AName: ${f.get("full_name")}%0APhone: ${f.get("phone")}%0ACourse: ${f.get("course")}%0AGender: ${f.get("gender")}`;window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text)," _blank");showToast("Opening WhatsApp admissions");}
function staffModal(){openModal(`<h2>Add Staff Member</h2><form onsubmit="demoSubmit(event,'staff')"><div class="form-grid">${field("Full Name","name","Full name")}${field("Phone","phone","07xx xxx xxx")}${selectField("Role","role",["Instructor","Academic Officer","Finance Officer","Administrator"])}${selectField("Department","dept",["ICT","Electrical","Administration","Finance","Motor Vehicle"])}</div><button class="btn green" style="margin-top:18px">Save Staff</button></form>`)}
function feeModal(){openModal(`<h2>Record Fee Payment</h2><form onsubmit="demoSubmit(event,'payment')"><div class="form-grid">${field("Student ID","id","MVT-000")}${field("Amount (TZS)","amount","e.g. 250000","number")}${selectField("Payment Method","method",["M-Pesa","Bank","Cash","Tigo Pesa","Airtel Money"])}${field("Reference","ref","Receipt / transaction number")}</div><button class="btn green" style="margin-top:18px">Record Payment</button></form>`)}
function resultModal(){openModal(`<h2>Enter Assessment Result</h2><form onsubmit="demoSubmit(event,'result')"><div class="form-grid">${field("Student ID","id","MVT-000")}${field("Assessment","assessment","Assessment name")}${field("Score (%)","score","0-100","number")}${selectField("Status","status",["Draft","Published"])}</div><button class="btn green" style="margin-top:18px">Save Result</button></form>`)}
function timetableModal(){openModal(`<h2>Add Timetable Class</h2><form onsubmit="demoSubmit(event,'class')"><div class="form-grid">${selectField("Day","day",["Monday","Tuesday","Wednesday","Thursday","Friday"])}${field("Time","time","08:00–10:00")}${selectField("Course","course",["ICT","Electrical","Plumbing","Tailoring","Motor Vehicle"])}${field("Room","room","Lab / Workshop")}</div><button class="btn green" style="margin-top:18px">Save Class</button></form>`)}
function noticeModal(){openModal(`<h2>Publish Notice</h2><form onsubmit="demoSubmit(event,'notice')"><div class="form-grid">${field("Notice Title","title","Announcement title","text","full")}${selectField("Audience","audience",["All Students","All Staff","Students & Staff","Specific Course"])}${field("Message","message","Write your announcement…","text","full")}</div><button class="btn green" style="margin-top:18px">Publish Notice</button></form>`)}
function emailModal(){openModal(`<h2>Compose Email</h2><form onsubmit="demoSubmit(event,'email')"><div class="form-grid">${selectField("Audience","audience",["All Students","All Staff","All Parents","Specific Course"])}${field("Subject","subject","Email subject")}${field("Message","message","Write your email…","text","full")}</div><button class="btn green" style="margin-top:18px">Send Demo Email</button></form>`)}
function demoSubmit(e,type){e.preventDefault();closeModal();showToast(type==="email"?"Demo email queued":"Saved in demo mode");}
