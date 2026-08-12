import requests
import os

url = 'https://wqknwlxfcecvzxdakrtn.supabase.co/rest/v1/'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxa253bHhmY2Vjdnp4ZGFrcnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk3ODkwNywiZXhwIjoyMTAwNTU0OTA3fQ.DFbF6KgA8lch3f9zVqw76HYiCqP3Fs1oejoDBUORjgg',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxa253bHhmY2Vjdnp4ZGFrcnRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk3ODkwNywiZXhwIjoyMTAwNTU0OTA3fQ.DFbF6KgA8lch3f9zVqw76HYiCqP3Fs1oejoDBUORjgg',
    'Content-Type': 'application/json'
}

def run_sql(sql, description):
    """Try to run SQL via the Supabase REST API."""
    print(f"\n--- {description} ---")
    print(f"SQL: {sql}")
    try:
        resp = requests.post(
            f'{url}/rpc/exec_sql',
            headers=headers,
            json={'sql': sql},
            timeout=10
        )
        print(f"Status: {resp.status_code}")
        print(f"Response: {resp.text[:500]}")
        return resp
    except Exception as e:
        print(f"Error: {e}")
        return None

# First, let me check what tables exist currently
print("=== Checking current tables ===")
resp = requests.get(f'{url}/profiles', headers=headers, timeout=5)
print(f"profiles table: status={resp.status_code}, rows={len(resp.json()) if resp.status_code == 200 else 'N/A'}")

# Try running DROP TABLE via a custom RPC function
print("\n=== Attempting to drop profiles table ===")
run_sql('DROP TABLE IF EXISTS public.profiles;', 'Drop profiles table')

# Verify the table is dropped
print("\n=== Verifying profiles table is dropped ===")
resp = requests.get(f'{url}/profiles', headers=headers, timeout=5)
print(f"profiles table after drop: status={resp.status_code}")

# List all tables that exist
print("\n=== Scanning for all possible tables ===")
possible_tables = [
    'profiles', 'students', 'users', 'courses', 'teachers', 
    'enrollments', 'departments', 'subjects', 'grades',
    'categories', 'academic_years', 'sections', 'classrooms'
]
for table in possible_tables:
    resp = requests.get(f'{url}/{table}', headers=headers, timeout=3)
    if resp.status_code == 200:
        print(f"  EXISTS: {table}")
    elif resp.status_code == 404:
        pass  # not found is expected for most
    else:
        print(f"  OTHER: {table} - {resp.status_code}")

print("\n=== Reset check complete ===")