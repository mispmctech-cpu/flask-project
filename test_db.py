#!/usr/bin/env python3
"""Test if password_reset_codes table exists and can be accessed"""

import requests
import os

SUPABASE_URL = "https://cbhodgwaazmjszkujrti.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaG9kZ3dhYXptanN6a3VqcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzY4NzEsImV4cCI6MjA3MTI1Mjg3MX0.sBRdfiWJJmZtLWsHCcNyxm1VcwkGwZWsIeeMlS49XTU"

print("=" * 60)
print("TESTING PASSWORD RESET TABLE")
print("=" * 60)

headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
    'Content-Type': 'application/json'
}

try:
    # Test 1: Check if table exists by trying to select from it
    print("\n[1] Checking if password_reset_codes table exists...")
    url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?limit=1"
    response = requests.get(url, headers=headers, timeout=5)
    
    if response.status_code == 200:
        print("✅ Table EXISTS and is accessible")
        print(f"   Current records: {len(response.json())}")
    else:
        print(f"❌ Error accessing table: {response.status_code}")
        print(f"   Response: {response.text}")
    
    # Test 2: Try to insert a test record
    print("\n[2] Testing INSERT operation...")
    from datetime import datetime, timedelta
    test_data = {
        'email': 'test@example.com',
        'role': 'ADMIN',
        'department': None,
        'code': '123456',
        'token': 'test_token_12345678901234567890',
        'expires_at': (datetime.now() + timedelta(minutes=15)).isoformat()
    }
    
    url = f"{SUPABASE_URL}/rest/v1/password_reset_codes"
    response = requests.post(url, json=test_data, headers=headers, timeout=5)
    
    if response.status_code in [200, 201]:
        print("✅ INSERT works - Database connection successful!")
    else:
        print(f"❌ INSERT failed: {response.status_code}")
        print(f"   Response: {response.text}")
    
    # Test 3: Try to delete the test record
    print("\n[3] Testing DELETE operation...")
    url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?email=eq.test@example.com&code=eq.123456"
    response = requests.delete(url, headers=headers, timeout=5)
    
    if response.status_code == 204:
        print("✅ DELETE works - Cleanup successful!")
    else:
        print(f"⚠️  DELETE response: {response.status_code}")
    
except Exception as e:
    print(f"❌ ERROR: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
