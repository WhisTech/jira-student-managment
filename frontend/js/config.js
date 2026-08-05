const SUPABASE_URL = "https://wqknwlxfcecvzxdakrtn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxa253bHhmY2Vjdnp4ZGFrcnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5Nzg5MDcsImV4cCI6MjEwMDU1NDkwN30.6zeczs9DmT-JrAsuAbPAeRJT3arta-aEC9xZwVOsgmU";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const STUDENTS_TABLE = "students";

async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "index.html";
  }
  return session;
}

async function signOut() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
