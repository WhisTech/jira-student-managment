let allStudents = [];

(async () => {
  await requireAuth();
  await loadStudents();
})();

async function loadStudents() {
  const { data, error } = await supabase
    .from(STUDENTS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    showMsg("Failed to load students: " + error.message, "error");
    return;
  }
  allStudents = data || [];
  renderTable("");
}

function renderTable(filter) {
  const rows = document.getElementById("studentsBody");
  const q = filter.toLowerCase();
  const filtered = allStudents.filter((s) =>
    !q ||
    s.full_name.toLowerCase().includes(q) ||
    String(s.roll_number || "").toLowerCase().includes(q) ||
    String(s.department || "").toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    rows.innerHTML = '<tr><td colspan="7" class="empty">No students found.</td></tr>';
    return;
  }

  rows.innerHTML = filtered.map((s) => `
    <tr>
      <td>${esc(s.full_name)}</td>
      <td>${esc(s.roll_number)}</td>
      <td>${esc(s.department)}</td>
      <td>${esc(s.year)}</td>
      <td>${esc(s.email)}</td>
      <td>${esc(s.phone)}</td>
      <td>
        <div class="actions">
          <button class="btn btn-edit" onclick="editStudent('${s.id}')">Edit</button>
          <button class="btn btn-delete" onclick="deleteStudent('${s.id}')">Delete</button>
        </div>
      </td>
    </tr>`).join("");
}

document.getElementById("searchInput").addEventListener("input", (e) => renderTable(e.target.value));

function openModal(student) {
  document.getElementById("modalTitle").textContent = student ? "Edit Student" : "Add Student";
  document.getElementById("studentId").value = student ? student.id : "";
  document.getElementById("fullName").value = student ? student.full_name : "";
  document.getElementById("email").value = student ? student.email : "";
  document.getElementById("rollNumber").value = student ? student.roll_number : "";
  document.getElementById("department").value = student ? student.department : "";
  document.getElementById("year").value = student ? String(student.year) : "";
  document.getElementById("phone").value = student ? student.phone : "";
  document.getElementById("modalBackdrop").classList.add("open");
}

function editStudent(id) {
  const student = allStudents.find((s) => s.id === id);
  if (student) openModal(student);
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("open");
}

document.getElementById("modalBackdrop").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("studentId").value;
  const payload = {
    full_name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    roll_number: document.getElementById("rollNumber").value.trim() || null,
    department: document.getElementById("department").value || null,
    year: document.getElementById("year").value ? Number(document.getElementById("year").value) : null,
    phone: document.getElementById("phone").value.trim() || null,
  };

  let error;
  if (id) {
    ({ error } = await supabase.from(STUDENTS_TABLE).update(payload).eq("id", id));
  } else {
    ({ error } = await supabase.from(STUDENTS_TABLE).insert(payload));
  }

  if (error) {
    showMsg("Save failed: " + error.message, "error");
    return;
  }
  showMsg("Student saved successfully.", "success");
  closeModal();
  await loadStudents();
});

async function deleteStudent(id) {
  if (!confirm("Delete this student?")) return;
  const { error } = await supabase.from(STUDENTS_TABLE).delete().eq("id", id);
  if (error) {
    showMsg("Delete failed: " + error.message, "error");
    return;
  }
  showMsg("Student deleted.", "success");
  await loadStudents();
}

function showMsg(text, type) {
  const msg = document.getElementById("msg");
  msg.className = "msg " + type;
  msg.textContent = text;
  setTimeout(() => { msg.className = "msg"; }, 4000);
}

function esc(v) {
  if (v === null || v === undefined) return "";
  return String(v).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}