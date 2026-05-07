#!/usr/bin/env python3
"""Test the complete forgot password flow"""

import requests
import json

BASE_URL = "http://localhost:5000"

print("=" * 70)
print("TESTING COMPLETE FORGOT PASSWORD FLOW")
print("=" * 70)

# Test data - use a REAL email and role that exists in your database
test_email = "sanjusanjay2031@gmail.com"
test_role = "FACULTY"
test_department = "CSE"

print(f"\nTest Parameters:")
print(f"  Email: {test_email}")
print(f"  Role: {test_role}")
print(f"  Department: {test_department}")
print("\n" + "-" * 70)

try:
    # Step 1: Send forgot password request
    print("\n[1] Sending forgot password request...")
    
    payload = {
        "email": test_email,
        "role": test_role,
        "department": test_department
    }
    
    print(f"   Payload: {json.dumps(payload, indent=6)}")
    
    response = requests.post(
        f"{BASE_URL}/forgot-password",
        json=payload,
        headers={'Content-Type': 'application/json'},
        timeout=30
    )
    
    print(f"   Status Code: {response.status_code}")
    print(f"   Response: {response.text}")
    
    data = response.json()
    
    if data.get('success'):
        print("✅ PASSWORD RESET EMAIL SENT SUCCESSFULLY!")
        print(f"   Message: {data.get('message')}")
    else:
        print(f"❌ FAILED: {data.get('message')}")
        
except requests.exceptions.ConnectionError:
    print(f"❌ ERROR: Cannot connect to Flask server at {BASE_URL}")
    print("   Make sure Flask app is running: py app.py")
    
except Exception as e:
    print(f"❌ ERROR: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
