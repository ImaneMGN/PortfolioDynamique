// ربط الأزرار مع الدوال
document.getElementById("addEducationBtn").addEventListener("click", addEducation);
document.getElementById("addSkillBtn").addEventListener("click", addSkill);
document.getElementById("addProjectBtn").addEventListener("click", addProject);

function addEducation() {
    const container = document.getElementById("educationList");
    const div = document.createElement("div");
    div.innerHTML = `
        <input type="text" placeholder="اسم المؤسسة أو الجامعة" class="edu-institution" required />
        <input type="text" placeholder="التخصص" class="edu-major" required />
        <input type="text" placeholder="الفترة (مثلاً 2019-2023)" class="edu-period" required />
        <button type="button" onclick="this.parentElement.remove()">حذف</button>
        <br/><br/>
    `;
    container.appendChild(div);
}

function addSkill() {
    const container = document.getElementById("skillsList");
    const div = document.createElement("div");
    div.innerHTML = `
        <input type="text" placeholder="المهارة" class="skill" required />
        <button type="button" onclick="this.parentElement.remove()">حذف</button><br/><br/>
    `;
    container.appendChild(div);
}

function addProject() {
    const container = document.getElementById("projectsList");
    const div = document.createElement("div");
    div.innerHTML = `
        <input type="text" placeholder="عنوان المشروع" class="proj-title" required />
        <input type="text" placeholder="وصف المشروع" class="proj-desc" required />
        <input type="url" placeholder="رابط المشروع" class="proj-link" required />
        <button type="button" onclick="this.parentElement.remove()">حذف</button><br/><br/>
    `;
    container.appendChild(div);
}

// إرسال البيانات إلى Flask
document.getElementById("portfolioForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const full_name = e.target.full_name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const education = Array.from(document.querySelectorAll("#educationList > div")).map(div => ({
        institution: div.querySelector(".edu-institution").value,
        major: div.querySelector(".edu-major").value,
        period: div.querySelector(".edu-period").value,
    }));

    const skills = Array.from(document.querySelectorAll("#skillsList > div")).map(div =>
        div.querySelector(".skill").value
    );

    const projects = Array.from(document.querySelectorAll("#projectsList > div")).map(div => ({
        title: div.querySelector(".proj-title").value,
        description: div.querySelector(".proj-desc").value,
        link: div.querySelector(".proj-link").value,
    }));

    const data = { full_name, email, phone, education, skills, projects };

    fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => {
        if (res.user_id) {
            window.location.href = `/portfolio/${res.user_id}`;
        } else {
            alert("حدث خطأ في إرسال البيانات.");
        }
    })
    .catch(() => alert("حدث خطأ في الإتصال بالخادم."));
 console.log("JS loaded"); // لإختبار التحميل

});
