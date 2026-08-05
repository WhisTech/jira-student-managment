"""Create the Supabase database tables by running supabase/schema.sql.

Requires SUPABASE_DB_URL in backend/.env, e.g.:
  postgresql://postgres.<project-ref>:<db-password>@aws-0-<region>.pooler.supabase.com:6543/postgres

Usage:
  python backend/create_tables.py [path/to/schema.sql]
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv
import psycopg

BACKEND_DIR = Path(__file__).resolve().parent
load_dotenv(BACKEND_DIR / ".env")

SCHEMA_PATH = Path(__file__).resolve().parent.parent / "supabase" / "schema.sql"
if len(sys.argv) > 1:
    SCHEMA_PATH = Path(sys.argv[1])


def main():
    db_url = os.getenv("SUPABASE_DB_URL")
    if not db_url:
        print("SUPABASE_DB_URL not set in backend/.env")
        sys.exit(1)
    if not SCHEMA_PATH.exists():
        print(f"Schema file not found: {SCHEMA_PATH}")
        sys.exit(1)

    sql = SCHEMA_PATH.read_text(encoding="utf-8")
    with psycopg.connect(db_url) as conn:
        with conn.cursor() as cur:
            cur.execute(sql)
        conn.commit()
    print(f"Tables created successfully from {SCHEMA_PATH}")


if __name__ == "__main__":
    main()