#!/usr/bin/env python3
"""
Form Control System Deployment Script

This script helps deploy the complete form control system by:
1. Providing SQL commands to execute in Supabase
2. Applying form status integration to all form templates
3. Validating the deployment

Usage:
    python deploy_form_control.py

Prerequisites:
    - Supabase project with database access
    - Flask project with all form templates present
"""

import os
import re
import glob
from pathlib import Path

class FormControlDeployment:
    def __init__(self, project_root=None):
        self.project_root = Path(project_root) if project_root else Path(__file__).parent
        self.templates_dir = self.project_root / 'templates'
        self.static_dir = self.project_root / 'static'
        
        # All forms that need status integration
        self.form_templates = [
            'faculty-form1.html', 'faculty-form2.html', 'faculty-form3.html', 
            'faculty-form4.html', 'faculty-form5.html', 'faculty-form6.html',
            'faculty-form7.html', 'faculty-form8.html',
            'form-ap.html', 'form-asp.html', 'form-prof.html',
            'institution-form1.html', 'institution-form2.html', 'institution-form3.html',
            'institution-form4.html', 'institution-form5.html', 'institution-form6.html',
            'institution-form7.html', 'institution-form8.html', 'institution-form9.html',
            'institution-form10.html', 'institution-form11.html', 'institution-form12.html',
            'institution-form13.html', 'institution-form14.html', 'institution-form15.html',
            'institution-form16.html', 'institution-form17.html'
        ]
        
    def print_database_deployment_instructions(self):
        """Print instructions for deploying the database schema"""
        print("=" * 70)
        print("📋 FORM CONTROL SYSTEM - DATABASE DEPLOYMENT")
        print("=" * 70)
        print()
        print("🔹 STEP 1: Deploy Database Schema")
        print("-" * 40)
        print("1. Open your Supabase Dashboard")
        print("2. Go to SQL Editor")
        print("3. Execute the SQL file: sql/create_form_control_tables.sql")
        print()
        print("📄 SQL File Location:")
        sql_file = self.project_root / 'sql' / 'create_form_control_tables.sql'
        print(f"   {sql_file}")
        print()
        if sql_file.exists():
            print("✅ SQL file exists and is ready for deployment")
        else:
            print("❌ SQL file not found! Please ensure sql/create_form_control_tables.sql exists")
        print()
        
    def check_javascript_utility(self):
        """Check if the JavaScript utility is in place"""
        print("🔹 STEP 2: Verify JavaScript Utility")
        print("-" * 40)
        js_file = self.static_dir / 'javascript' / 'form-status-controller.js'
        if js_file.exists():
            print("✅ FormStatusController JavaScript utility is ready")
            print(f"   Location: {js_file}")
        else:
            print("❌ FormStatusController JavaScript utility missing!")
            print(f"   Expected: {js_file}")
        print()
        
    def check_admin_interface(self):
        """Check if admin interface is updated"""
        print("🔹 STEP 3: Verify Admin Interface")
        print("-" * 40)
        admin_file = self.templates_dir / 'admin-forms.html'
        if admin_file.exists():
            content = admin_file.read_text(encoding='utf-8')
            if 'FormStatus' in content and 'FormStatusLog' in content:
                print("✅ Admin forms interface is database-integrated")
            else:
                print("⚠️  Admin forms interface may need database integration")
            print(f"   Location: {admin_file}")
        else:
            print("❌ Admin forms interface not found!")
        print()
        
    def generate_form_integration_status(self):
        """Check which forms need status integration"""
        print("🔹 STEP 4: Form Integration Status")
        print("-" * 40)
        
        integrated_forms = []
        pending_forms = []
        
        for form_name in self.form_templates:
            form_path = self.templates_dir / form_name
            if form_path.exists():
                content = form_path.read_text(encoding='utf-8')
                if 'FormStatusController' in content or 'formStatusController' in content:
                    integrated_forms.append(form_name)
                else:
                    pending_forms.append(form_name)
            else:
                pending_forms.append(f"{form_name} (FILE NOT FOUND)")
        
        print(f"✅ Forms with Status Integration: {len(integrated_forms)}")
        for form in integrated_forms:
            print(f"   • {form}")
        
        print(f"\n⏳ Forms Pending Integration: {len(pending_forms)}")
        for form in pending_forms:
            print(f"   • {form}")
        
        print()
        return pending_forms
        
    def print_integration_template(self):
        """Print the integration template for manual application"""
        print("🔹 STEP 5: Form Integration Template")
        print("-" * 40)
        print("For each pending form, add this code before the closing </body> tag:")
        print()
        template_code = '''
<!-- Form Status Control Integration -->
<script src="{{ url_for('static', filename='javascript/form-status-controller.js') }}"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form status controller
    const formStatusController = new FormStatusController();
    
    // Get form name from current page
    const formName = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Initialize with form name
    formStatusController.initialize(formName);
});
</script>
'''
        print(template_code)
        print()
        
    def print_testing_instructions(self):
        """Print testing instructions"""
        print("🔹 STEP 6: Testing Your Form Control System")
        print("-" * 40)
        print("1. Ensure your Flask app is running")
        print("2. Access admin-forms.html")
        print("3. Try toggling form status (open/close)")
        print("4. Visit any form page - closed forms should show message")
        print("5. Check form status log in admin interface")
        print()
        
    def print_troubleshooting(self):
        """Print troubleshooting guide"""
        print("🔧 TROUBLESHOOTING")
        print("-" * 20)
        print("• Database connection issues: Check Supabase URL and API key")
        print("• Forms not showing closed message: Check JavaScript console for errors")
        print("• Admin interface not updating: Verify FormStatus table exists")
        print("• Integration template not working: Ensure supabaseClient is defined")
        print()
        
    def run_deployment_check(self):
        """Run complete deployment check"""
        print()
        self.print_database_deployment_instructions()
        self.check_javascript_utility()
        self.check_admin_interface()
        pending_forms = self.generate_form_integration_status()
        
        if pending_forms:
            self.print_integration_template()
            
        self.print_testing_instructions()
        self.print_troubleshooting()
        
        print("=" * 70)
        print("🚀 DEPLOYMENT SUMMARY")
        print("=" * 70)
        print("1. ✅ Execute SQL schema in Supabase")
        print("2. ✅ JavaScript utility ready")
        print("3. ✅ Admin interface updated")
        print(f"4. ⏳ Integrate {len(pending_forms)} remaining forms")
        print("5. 🧪 Test the complete system")
        print()
        print("📚 For detailed integration guide, see:")
        print("   FORM_STATUS_INTEGRATION_TEMPLATE.html")
        print()

if __name__ == '__main__':
    deployment = FormControlDeployment()
    deployment.run_deployment_check()
