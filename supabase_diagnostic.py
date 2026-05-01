#!/usr/bin/env python3
"""
Supabase Database Diagnostic Tool
Run this to check your Supabase connection and see what tables exist
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_supabase_connection():
    """Test Supabase connection and list tables"""
    try:
        # Initialize Supabase client
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_ANON_KEY")
        
        if not url or not key:
            print("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables")
            print("   Check your .env file or environment variables")
            return False
            
        print(f"🔗 Connecting to: {url}")
        supabase: Client = create_client(url, key)
        
        # Test basic connection
        print("✅ Supabase client created successfully")
        
        # Check if FormStatus table exists
        print("\n📊 Checking for FormStatus table...")
        try:
            result = supabase.table('FormStatus').select('*').limit(1).execute()
            print("✅ FormStatus table EXISTS and is accessible")
            print(f"   Found {len(result.data)} records")
            if result.data:
                print(f"   Sample record: {result.data[0]}")
        except Exception as e:
            print(f"❌ FormStatus table NOT FOUND or not accessible")
            print(f"   Error: {str(e)}")
        
        # Try to list all available tables using SQL query
        print("\n📋 Attempting to list all tables...")
        try:
            # This requires RPC or direct SQL access
            tables_query = """
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
            """
            # Note: This might not work depending on your Supabase setup
            print("   (Direct SQL queries may be restricted in client-side access)")
            
        except Exception as e:
            print(f"   Could not list tables: {str(e)}")
        
        # Test a simple query to any table to verify basic connectivity
        print("\n🧪 Testing basic connectivity...")
        try:
            # Try to query a system table or create a test
            test_result = supabase.rpc('version').execute()
            print("✅ Basic RPC connectivity works")
        except Exception as e:
            print(f"⚠️  RPC test failed: {str(e)}")
        
        return True
        
    except Exception as e:
        print(f"❌ Failed to connect to Supabase: {str(e)}")
        return False

def check_environment():
    """Check environment variables"""
    print("🔍 Environment Variables Check:")
    
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_ANON_KEY")
    
    print(f"   SUPABASE_URL: {'✅ Set' if url else '❌ Missing'}")
    print(f"   SUPABASE_ANON_KEY: {'✅ Set' if key else '❌ Missing'}")
    
    if url:
        print(f"   URL: {url[:30]}...")
    if key:
        print(f"   Key: {key[:20]}...")

if __name__ == "__main__":
    print("🚀 Supabase Database Diagnostic Tool")
    print("=" * 50)
    
    check_environment()
    print()
    test_supabase_connection()
    
    print("\n" + "=" * 50)
    print("📝 Next Steps if FormStatus table not found:")
    print("1. Go to your Supabase Dashboard")
    print("2. Navigate to SQL Editor")
    print("3. Execute the simple_form_status_setup.sql file")
    print("4. Make sure to grant proper permissions")
    print("5. Run this diagnostic again")
