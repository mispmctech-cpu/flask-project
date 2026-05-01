#!/usr/bin/env python3
"""
Quick script to check input_id columns in form tables and hod-workdone table
"""

import os
from supabase import create_client, Client

# Set credentials (same as used before)
SUPABASE_URL = 'https://ohaacjuxfkshlbqektrj.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYWFjanV4ZmtzaGxicWVrdHJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNTQ4MzIsImV4cCI6MjA0OTgzMDgzMn0.aBNcvBSdPj-WtPq9FHMKAyTOGSJV1QDDXa3BtFfKv1Q'

client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("🔍 Checking input_id columns in form tables and hod-workdone...")
print("=" * 60)

# Check a few form tables
form_tables = ['faculty_form1', 'faculty_form2', 'faculty_form3', 'faculty_form4', 'faculty_form5']

for table in form_tables:
    try:
        # Get first record to check structure
        result = client.table(table).select('*').limit(1).execute()
        if result.data:
            row = result.data[0]
            print(f"\n📋 {table}:")
            print(f"   Keys: {list(row.keys())}")
            if 'input_id' in row:
                input_id = row['input_id']
                print(f"   ✅ input_id found: {input_id} (type: {type(input_id).__name__})")
            else:
                print(f"   ❌ No input_id column")
        else:
            print(f"\n📋 {table}: No data found")
    except Exception as e:
        print(f"\n📋 {table}: Error - {e}")

# Check hod-workdone table
print(f"\n🏢 hod-workdone table:")
try:
    result = client.table('hod-workdone').select('*').limit(5).execute()
    if result.data:
        print(f"   📊 Found {len(result.data)} records")
        for i, row in enumerate(result.data):
            input_id = row.get('input_id', 'None')
            table_name = row.get('table_name', 'None')
            dept = row.get('department', 'None')
            print(f"   Record {i+1}: input_id={input_id} (type: {type(input_id).__name__}), table={table_name}, dept={dept}")
    else:
        print(f"   📭 No verified records found")
except Exception as e:
    print(f"   ❌ Error accessing hod-workdone: {e}")

print("\n" + "=" * 60)
print("✅ Check complete!!!!!")
