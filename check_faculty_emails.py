#!/usr/bin/env python3
"""Check what emails exist in Faculty table"""

import requests
import json

SUPABASE_URL = "https://cbhodgwaazmjszkujrti.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaG9kZ3dhYXptanN6a3VqcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzY4NzEsImV4cCI6MjA3MTI1Mjg3MX0.sBRdfiWJJmZtLWsHCcNyxm1VcwkGwZWsIeeMlS49XTU"

headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
    'Content-Type': 'application/json'
}

print("=" * 70)
print("CHECKING AVAILABLE FACULTY EMAILS")
print("=" * 70)

try:
    # Get Faculty with CSE department
    url = f"{SUPABASE_URL}/rest/v1/Faculty?department=eq.CSE&select=email,Name,department&limit=10"
    response = requests.get(url, headers=headers, timeout=5)
    
    if response.status_code == 200:
        records = response.json()
        if records:
            print(f"\n✅ Found {len(records)} Faculty members in CSE department:\n")
            for i, record in enumerate(records, 1):
                email = record.get('email', 'N/A')
                name = record.get('Name', 'N/A')
                print(f"  {i}. {name}")
                print(f"     Email: {email}\n")
        else:
            print("\n❌ No Faculty found in CSE department")
            print("\nTrying to get ANY faculty records...")
            url = f"{SUPABASE_URL}/rest/v1/Faculty?select=email,Name,department&limit=5"
            response = requests.get(url, headers=headers, timeout=5)
            records = response.json()
            if records:
                print(f"\nFound {len(records)} Faculty records:\n")
                for record in records:
                    print(f"  Name: {record.get('Name')}, Email: {record.get('email')}, Dept: {record.get('department')}")
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"❌ ERROR: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
