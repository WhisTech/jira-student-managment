(async () => {
  await requireAuth();

  const { data: students, error } = await supabase
    .from(STUDENTS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    document.getElementById("statTotal").textContent = "!";
    console.error(error);
    return;
  }

  const depts = new Set(students.map((s) => s.department).filter(Boolean));
  const currentYear = new Date().getFullYear();
  const thisYear = students.filter((s) => Number(s.year) === currentYear).length;

  document.getElementById("statTotal").textContent = students.length;
  document.getElementById("statDepts").textContent = depts.size;
  document.getElementById("statYear").textContent = thisYear;

  const rows = document.getElementById("recentRows");
  const recent = students.slice(0, 5);
  if (recent.length === 0) {
    rows.innerHTML = '<tr><td colspan="5" class="empty">No students yet.</td></tr>';
  } else {
    rows.innerHTML = recent.map((s) => `
      <tr>
        <td>${esc(s.full_name)}</td>
        <td>${esc(s.roll_number)}</td>
        <td>${esc(s.department)}</td>
        <td>${esc(s.year)}</td>
        <td>${esc(s.email)}</td>
      </tr>`).join("");
  }
})();

function esc(v) {
  if (v === null || v === undefined) return "";
  return String(v).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}