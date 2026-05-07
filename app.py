from flask import Flask, render_template, request, redirect, url_for, send_from_directory, session, abort, jsonify
import os
from functools import wraps
from werkzeug.utils import secure_filename
import csv
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import string
from datetime import datetime, timedelta
import threading
import requests

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
# Use environment variable for secret key in production, fallback for development
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-change-in-production-please')
os.makedirs(os.path.join(app.root_path, app.config['UPLOAD_FOLDER']), exist_ok=True)

# Email Configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', "smtp.gmail.com")
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
# Prefer environment variables for credentials. Fallback kept for development only.
EMAIL_ADDRESS = os.environ.get('SMTP_EMAIL', "mis.pmctech@gmail.com")
EMAIL_PASSWORD = os.environ.get('SMTP_PASSWORD', "unvidickusetxkun")

# Verification codes are now stored in database (password_reset_codes table)
# This ensures codes persist across server restarts and requests

# Supabase Configuration
SUPABASE_URL = "https://cbhodgwaazmjszkujrti.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaG9kZ3dhYXptanN6a3VqcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzY4NzEsImV4cCI6MjA3MTI1Mjg3MX0.sBRdfiWJJmZtLWsHCcNyxm1VcwkGwZWsIeeMlS49XTU"
SUPABASE_SERVICE_ROLE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

# Disable caching for debugging
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True

# --- Email Helper Functions ---
def generate_verification_code(length=6):
    """Generate a random 6-digit verification code"""
    return ''.join(random.choices(string.digits, k=length))

def generate_reset_token():
    """Generate a secure reset token"""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=32))

def send_verification_email(email, code, name="User"):
    """Send verification code email - synchronous with proper error handling"""
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = email
        msg['Subject'] = "FWAPMS - Password Reset Verification Code"

        # Email body
        body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f8f6f2; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="background: linear-gradient(135deg, #6a2c91 0%, #501e73 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 24px;">FWAPMS Password Reset</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">PMC Tech Faculty Work Allocation & Progress Monitoring System</p>
                </div>
                
                <div style="padding: 30px;">
                    <h2 style="color: #6a2c91; margin-top: 0;">Hello {name},</h2>
                    
                    <p style="color: #2d2a32; line-height: 1.6; margin: 20px 0;">
                        We received a request to reset your password for your FWAPMS account. 
                        Use the verification code below to proceed with resetting your password:
                    </p>
                    
                    <div style="background-color: #f8f6f2; border: 2px dashed #6a2c91; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
                        <p style="margin: 0 0 10px 0; color: #6a2c91; font-weight: bold; font-size: 14px;">Your Verification Code:</p>
                        <div style="font-size: 36px; font-weight: bold; color: #6a2c91; font-family: 'Courier New', monospace; letter-spacing: 5px;">
                            {code}
                        </div>
                        <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">This code expires in 15 minutes</p>
                    </div>
                    
                    <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
                        <p style="margin: 0; color: #856404; font-size: 14px;">
                            <strong>Important:</strong> If you did not request this password reset, please ignore this email. 
                            Your password will remain unchanged.
                        </p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; line-height: 1.5; margin-top: 30px;">
                        For security reasons, this verification code will expire in 15 minutes. 
                        If you need a new code, please return to the forgot password page and request a new one.
                    </p>
                    
                    <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px;">
                        <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                            This is an automated message from FWAPMS. Please do not reply to this email.<br>
                            &copy; 2026 PMC Tech. All rights reserved.<br>
                            <em>Powered by Zeony Technologies</em>
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """

        msg.attach(MIMEText(body, 'html'))

        # Create secure connection and send email
        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10) as server:
            server.starttls(context=context)
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        
        print(f"[SUCCESS] Verification email sent to {email} with code {code}")
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send email to {email}: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def check_smtp_credentials():
    """Attempt to connect and login to the SMTP server using configured creds.
    Returns (True, None) on success or (False, error_message) on failure.
    """
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10) as server:
            server.starttls(context=context)
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        return True, None
    except Exception as e:
        return False, str(e)

def cleanup_expired_codes():
    """Remove expired password reset codes from database"""
    try:
        import requests
        headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'Content-Type': 'application/json'
        }
        
        # Delete codes that have expired
        url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?expires_at=lt.now()&is_used=eq.false"
        response = requests.delete(url, headers=headers)
        
        if response.status_code == 204:
            print("[DEBUG] Cleaned up expired password reset codes")
        else:
            print(f"[WARNING] Failed to cleanup expired codes: {response.status_code}")
    except Exception as e:
        print(f"[ERROR] Cleanup expired codes failed: {str(e)}")

@app.after_request
def after_request(response):
    """Disable caching for all responses"""
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, public, max-age=0'
    response.headers['Expires'] = '0'
    response.headers['Pragma'] = 'no-cache'
    return response

# --- Session-based login check ---
def is_logged_in():
    return session.get('logged_in', False)

# --- Role-based login required decorator ---
def login_required(role=None):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Only login.html is public
            if not is_logged_in():
                return redirect(url_for('login_page'))
            if role:
                user_role = session.get('role', '').lower()
                if user_role != role.lower():
                    session.clear()
                    return redirect(url_for('login_page'))
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# --- Login page route (public) ---

@app.route('/login.html')
def login_page():
    # If already logged in, show message and logout button instead of redirecting
    if is_logged_in():
        return render_template('login.html', already_logged_in=True)
    return render_template('login.html', already_logged_in=False)


# Home route (public)
@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception:
        return '<h2>Welcome to PMC Flask App</h2><p>No index.html found in templates.</p>'


# Example: Faculty Form 1 (faculty only)
@app.route('/faculty-form1', methods=['GET', 'POST'])
@login_required(role='faculty')
def faculty_form1():
    if request.method == 'POST':
        # ...existing code...
        department = request.form.get('department')
        portfolioName = request.form.get('portfolioName')
        portfolioMemberName = request.form.get('portfolioMemberName')
        month = request.form.get('month')
        weekNo = request.form.get('weekNo')
        weekStartDate = request.form.get('weekStartDate')
        weekEndDate = request.form.get('weekEndDate')
        file_fields = ['file1', 'file2', 'file3', 'file4']
        status_fields = ['status1', 'status2', 'status3', 'status4']
        desc_fields = ['desc1', 'desc2', 'desc3', 'desc4']
        file_urls = []
        for field in file_fields:
            file = request.files.get(field)
            if file and file.filename:
                filename = secure_filename(file.filename)
                save_path = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename)
                file.save(save_path)
                file_urls.append(url_for('static', filename=f'uploads/{filename}'))
            else:
                file_urls.append('')
        row = [department, portfolioName, portfolioMemberName, month, weekNo, weekStartDate, weekEndDate]
        for i in range(4):
            row.extend([request.form.get(status_fields[i]), request.form.get(desc_fields[i]), file_urls[i]])
        csv_path = os.path.join(app.root_path, 'faculty_form1_submissions.csv')
        with open(csv_path, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(row)
        return render_template('faculty-form1-success.html')
    return render_template('faculty-form1.html')



# Route for serving static files (uploads, docs, etc.)
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)



# Login route (POST: set session)
@app.route('/login', methods=['POST'])
def login():
    # This endpoint is called via AJAX/fetch from login.html after successful Supabase auth
    role = request.form.get('role')
    session['logged_in'] = True
    session['role'] = role
    session['department'] = request.form.get('department')
    session['email'] = request.form.get('email')
    # Store additional admin data if it's an admin login
    if role and role.upper() == 'ADMIN':
        session['name'] = request.form.get('name') or 'Administrator'
        session['admin_role'] = request.form.get('admin_role') or 'admin'
    # Debug print
    print('Session after login:', dict(session))
    return {'success': True}


# Logout route
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login_page'))


# --- Example dashboards for each role (protected) ---
@app.route('/faculty-profile.html')
@login_required()
def faculty_dashboard():
    return render_template('faculty-profile.html')

@app.route('/hod.html')
@login_required()
def hod_dashboard():
    # Allow HOD, IQAC, and Principal to access this page
    user_role = session.get('role', '').lower()
    if user_role not in ['hod', 'iqac', 'principal']:
        session.clear()
        return redirect(url_for('login_page'))
    return render_template('hod.html')

@app.route('/principal.html')
@login_required(role='principal')
def principal_dashboard():
    return render_template('principal.html')

@app.route('/management.html')
@login_required(role='management')
def management_dashboard():
    return render_template('management.html')

@app.route('/iqac.html')
@login_required(role='iqac')
def iqac_dashboard():
    return render_template('iqac.html')


@app.route('/faculty-report.html')
@login_required(role='iqac')
def faculty_report():
    return render_template('faculty-report.html')


@app.route('/api/faculty-list')
@login_required(role='iqac')
def api_faculty_list():
    """Return a JSON list of faculty members from the Faculty table.
    Each item: { id: <input_id>, name: <Name>, department: <department>, email: <email> }
    """
    try:
        import requests
        headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'Content-Type': 'application/json'
        }
        # Request name, input_id, department, email
        url = f"{SUPABASE_URL}/rest/v1/Faculty?select=input_id,Name,department,email&order=Name.asc"
        resp = requests.get(url, headers=headers, timeout=10)
        if resp.status_code != 200:
            return jsonify({'success': False, 'error': f'HTTP {resp.status_code}: {resp.text}'}), 500
        data = resp.json()
        # Map to expected format
        out = []
        for row in data:
            out.append({
                'id': row.get('input_id'),
                'name': row.get('Name') or row.get('name') or '',
                'department': row.get('department'),
                'email': row.get('email')
            })
        return jsonify(out)
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/admin-dashboard.html')
@login_required(role='admin')
def admin_dashboard():
    return render_template('admin-dashboard.html')

# Add API endpoint to test database connection
@app.route('/api/test-departments')
@login_required(role='admin')
def test_departments():
    """Test endpoint to check if we can connect to Supabase and get departments"""
    from flask import jsonify
    import requests
    
    # Supabase configuration (updated to match HTML forms project)
    supabase_url = "https://cbhodgwaazmjszkujrti.supabase.co"
    supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaG9kZ3dhYXptanN6a3VqcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzY4NzEsImV4cCI6MjA3MTI1Mjg3MX0.sBRdfiWJJmZtLWsHCcNyxm1VcwkGwZWsIeeMlS49XTU"
    
    try:
        # Test Faculty table query
        headers = {
            'apikey': supabase_key,
            'Authorization': f'Bearer {supabase_key}',
            'Content-Type': 'application/json'
        }
        
        response = requests.get(
            f"{supabase_url}/rest/v1/Faculty?select=department,Name",
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            departments = {}
            for faculty in data:
                dept = faculty.get('department', 'Unknown')
                if dept not in departments:
                    departments[dept] = 0
                departments[dept] += 1
            
            return jsonify({
                'success': True,
                'departments': departments,
                'total_faculty': len(data),
                'raw_data': data[:3]  # First 3 records for debugging
            })
        else:
            return jsonify({
                'success': False,
                'error': f'HTTP {response.status_code}: {response.text}',
                'departments': {}
            })
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'departments': {}
        })

# --- Forgot Password Routes ---

@app.route('/test-server')
def test_server():
    """Simple test route to check if server is responding"""
    return jsonify({'status': 'ok', 'message': 'Server is running'})

@app.route('/test-supabase')
def test_supabase():
    """Test Supabase connection with the specific email"""
    try:
        import requests
        
        headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'Content-Type': 'application/json'
        }
        
        email = "sanjusanjay2031@gmail.com"
        department = "CSE"
        
        # Test the exact query
        url1 = f"{SUPABASE_URL}/rest/v1/Faculty?email=eq.{email}&department=eq.{department}&select=email,name,department"
        url2 = f"{SUPABASE_URL}/rest/v1/Faculty?select=email,department&limit=5"  # Get first 5 records
        url3 = f"{SUPABASE_URL}/rest/v1/Faculty?email=eq.{email}&select=*"  # Search without department
        
        response1 = requests.get(url1, headers=headers)
        response2 = requests.get(url2, headers=headers) 
        response3 = requests.get(url3, headers=headers)
        
        return jsonify({
            'specific_query': {
                'url': url1,
                'status': response1.status_code,
                'result': response1.text
            },
            'sample_records': {
                'url': url2,
                'status': response2.status_code,
                'result': response2.text
            },
            'email_only_search': {
                'url': url3,
                'status': response3.status_code,
                'result': response3.text
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/forgot-password.html')
def forgot_password_page():
    """Render the forgot password page"""
    return render_template('forgot-password.html')


# Server endpoint to allocate a month to faculty (uses service role key server-side)
@app.route('/api/allocate-month', methods=['POST'])
@login_required(role='admin')
def api_allocate_month():
    import requests
    payload = request.get_json() or {}
    month = payload.get('month')
    staff_ids = payload.get('staff_ids', [])
    if not month or not isinstance(staff_ids, list):
        return jsonify({'success': False, 'error': 'Invalid payload'}), 400

    # choose service key if available, else fallback to anon key
    service_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY') or SUPABASE_ANON_KEY
    headers = {
        'apikey': service_key,
        'Authorization': f'Bearer {service_key}',
        'Content-Type': 'application/json'
    }

    try:
        # Upsert month_allocations
        upsert_payload = {'month': month, 'staff_ids': staff_ids}
        r = requests.post(f"{SUPABASE_URL}/rest/v1/month_allocations?on_conflict=month", json=upsert_payload, headers=headers)
        if r.status_code not in (200, 201, 204):
            return jsonify({'success': False, 'error': 'Failed to upsert month_allocations', 'details': r.text}), 500

        # Ensure month exists in month_control id=1 (upsert)
        # Fetch existing enabled_months
        r2 = requests.get(f"{SUPABASE_URL}/rest/v1/month_control?id=eq.1", headers=headers)
        enabled = []
        if r2.status_code == 200 and r2.json():
            row = r2.json()[0]
            enabled = row.get('enabled_months') or []
        if month not in enabled:
            enabled.append(month)
        up = {'id': 1, 'enabled_months': enabled}
        r3 = requests.post(f"{SUPABASE_URL}/rest/v1/month_control?on_conflict=id", json=up, headers=headers)
        if r3.status_code not in (200,201,204):
            # warning only
            print('Warning: month_control upsert failed', r3.status_code, r3.text)

        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    """Handle forgot password request - send verification code"""
    try:
        import requests
        
        data = request.get_json()
        email = data.get('email', '').strip()  # Don't convert to lowercase yet
        role = data.get('role', '').upper()
        department = data.get('department', '')
        
        print(f"[DEBUG] Forgot password request: email={email}, role={role}, department={department}")
        
        if not email or not role:
            return jsonify({'success': False, 'message': 'Email and role are required'})
        
        # Clean up expired codes first
        cleanup_expired_codes()
        
        # Check if user exists based on role
        headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'Content-Type': 'application/json'
        }
        
        user_found = False
        user_name = "User"
        
        if role in ['HOD', 'FACULTY']:
            if not department:
                return jsonify({'success': False, 'message': 'Department is required for HOD/Faculty'})
            
            table_name = 'Faculty' if role == 'FACULTY' else 'HOD'
            # Use correct column names - Faculty uses 'Name' with capital N
            url1 = f"{SUPABASE_URL}/rest/v1/{table_name}?email=eq.{email}&department=eq.{department}&select=email,Name,department"
            url2 = f"{SUPABASE_URL}/rest/v1/{table_name}?email=eq.{email.lower()}&department=eq.{department}&select=email,Name,department"
            
            print(f"[DEBUG] Trying URL1: {url1}")
            
        elif role == 'ADMIN':
            url1 = f"{SUPABASE_URL}/rest/v1/Admin?email=eq.{email}&is_active=eq.true&select=email,name"
            url2 = f"{SUPABASE_URL}/rest/v1/Admin?email=eq.{email.lower()}&is_active=eq.true&select=email,name"
            
        elif role == 'MANAGEMENT':
            url1 = f"{SUPABASE_URL}/rest/v1/Management?email=eq.{email}&select=email,name"
            url2 = f"{SUPABASE_URL}/rest/v1/Management?email=eq.{email.lower()}&select=email,name"
            
        elif role == 'PRINCIPAL':
            url1 = f"{SUPABASE_URL}/rest/v1/Principal?Email=eq.{email}&select=Email,Name"
            url2 = f"{SUPABASE_URL}/rest/v1/Principal?Email=eq.{email.lower()}&select=Email,Name"
            
        elif role == 'HR':
            url1 = f"{SUPABASE_URL}/rest/v1/HR?email=eq.{email}&select=email,name"
            url2 = f"{SUPABASE_URL}/rest/v1/HR?email=eq.{email.lower()}&select=email,name"
            
        elif role == 'IQAC':
            url1 = f"{SUPABASE_URL}/rest/v1/IQAC?email=eq.{email}&select=email,name"
            url2 = f"{SUPABASE_URL}/rest/v1/IQAC?email=eq.{email.lower()}&select=email,name"
            
        else:
            return jsonify({'success': False, 'message': 'Invalid role selected'})
        
        # Try original email first
        response = requests.get(url1, headers=headers)
        print(f"[DEBUG] Response status: {response.status_code}")
        print(f"[DEBUG] Response text: {response.text}")
        
        if response.status_code == 200:
            users = response.json()
            print(f"[DEBUG] Users found with original email: {users}")
            if users:
                user_found = True
                user_data = users[0]
                # Get name field (different column names for different tables)
                if role == 'PRINCIPAL':
                    user_name = user_data.get('Name', 'User')
                elif role in ['HOD', 'FACULTY']:
                    user_name = user_data.get('Name', 'User')  # Faculty and HOD use 'Name' with capital N
                else:
                    user_name = user_data.get('name', 'User')
        
        # If not found with original email, try lowercase
        if not user_found:
            response = requests.get(url2, headers=headers)
            print(f"[DEBUG] Response status (lowercase): {response.status_code}")
            print(f"[DEBUG] Response text (lowercase): {response.text}")
            
            if response.status_code == 200:
                users = response.json()
                print(f"[DEBUG] Users found with lowercase email: {users}")
                if users:
                    user_found = True
                    user_data = users[0]
                    # Get name field (different column names for different tables)
                    if role == 'PRINCIPAL':
                        user_name = user_data.get('Name', 'User')
                    elif role in ['HOD', 'FACULTY']:
                        user_name = user_data.get('Name', 'User')  # Faculty and HOD use 'Name' with capital N
                    else:
                        user_name = user_data.get('name', 'User')
                    # Use the actual email from database
                    if role == 'PRINCIPAL':
                        email = user_data.get('Email', email)
                    else:
                        email = user_data.get('email', email)
        
        if not user_found:
            print(f"[DEBUG] User not found for email: {email}, role: {role}, department: {department}")
            return jsonify({'success': False, 'message': 'Email not found in our records for the selected role'})
        
        # Generate verification code and token
        verification_code = generate_verification_code()
        reset_token = generate_reset_token()
        
        expires_at = datetime.now() + timedelta(minutes=15)  # Code expires in 15 minutes
        
        # DELETE any existing codes for this email/role/department combination (allow fresh requests)
        delete_url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?email=eq.{email.lower()}&role=eq.{role}&department=eq.{department or ''}&is_used=eq.false"
        delete_response = requests.delete(delete_url, headers=headers)
        print(f"[DEBUG] Deleted old codes: {delete_response.status_code}")
        
        # Store verification code in database
        code_data = {
            'email': email.lower(),
            'role': role,
            'department': department or None,
            'code': verification_code,
            'token': reset_token,
            'expires_at': expires_at.isoformat()
        }
        
        insert_url = f"{SUPABASE_URL}/rest/v1/password_reset_codes"
        insert_response = requests.post(insert_url, json=code_data, headers=headers)
        
        print(f"[DEBUG] Stored verification code in database: {insert_response.status_code}")
        if insert_response.status_code not in [200, 201]:
            print(f"[ERROR] Failed to store code in database: {insert_response.text}")
            return jsonify({'success': False, 'message': 'Failed to generate verification code. Please try again.'})
        
        print(f"[DEBUG] Sending verification code {verification_code} to {email}")
        
        # Send verification email - NOW SYNCHRONOUS WITH RETURN STATUS
        email_sent = send_verification_email(email, verification_code, user_name)
        
        if email_sent:
            return jsonify({'success': True, 'message': 'Verification code sent to your email'})
        else:
            # Email failed, delete the code from database
            delete_url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?email=eq.{email.lower()}&code=eq.{verification_code}"
            requests.delete(delete_url, headers=headers)
            return jsonify({'success': False, 'message': 'Failed to send email. Please check your email address and try again.'})
        
    except Exception as e:
        print(f"[ERROR] Forgot password error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': 'An error occurred. Please try again later.'})

@app.route('/verify-reset-code', methods=['POST'])
def verify_reset_code():
    """Verify the reset code entered by user"""
    try:
        import requests
        
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        code = data.get('code', '').strip()
        role = data.get('role', '').upper()
        
        if not all([email, code, role]):
            return jsonify({'success': False, 'message': 'All fields are required'})
        
        # Clean up expired codes first
        cleanup_expired_codes()
        
        headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'Content-Type': 'application/json'
        }
        
        # Find the verification record from database
        url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?email=eq.{email}&code=eq.{code}&role=eq.{role}&is_used=eq.false"
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            return jsonify({'success': False, 'message': 'Invalid or expired verification code'})
        
        records = response.json()
        if not records:
            return jsonify({'success': False, 'message': 'Invalid or expired verification code'})
        
        record = records[0]
        reset_token = record['token']
        record_id = record['id']
        
        # Mark code as used
        update_url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?id=eq.{record_id}"
        update_data = {'is_used': True, 'used_at': datetime.now().isoformat()}
        requests.patch(update_url, json=update_data, headers=headers)
        
        return jsonify({'success': True, 'token': reset_token, 'message': 'Code verified successfully'})
        
    except Exception as e:
        print(f"[ERROR] Verify reset code error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': 'An error occurred. Please try again later.'})

@app.route('/reset-password', methods=['POST'])
def reset_password():
    """Reset the password using verified token"""
    try:
        import requests
        
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        role = data.get('role', '').upper()
        token = data.get('token', '').strip()
        new_password = data.get('new_password', '').strip()
        
        if not all([email, role, token, new_password]):
            return jsonify({'success': False, 'message': 'All fields are required'})
        
        if len(new_password) < 6:
            return jsonify({'success': False, 'message': 'Password must be at least 6 characters long'})
        
        # Clean up expired codes first
        cleanup_expired_codes()
        
        headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'Content-Type': 'application/json'
        }
        
        # Find and verify the token in database
        url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?email=eq.{email}&token=eq.{token}&role=eq.{role}"
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            return jsonify({'success': False, 'message': 'Invalid or expired reset token'})
        
        records = response.json()
        if not records:
            return jsonify({'success': False, 'message': 'Invalid or expired reset token'})
        
        verification_record = records[0]
        record_id = verification_record['id']
        department = verification_record.get('department', '')
        
        # Update password in database
        if role in ['HOD', 'FACULTY']:
            table_name = 'Faculty' if role == 'FACULTY' else 'HOD'
            url = f"{SUPABASE_URL}/rest/v1/{table_name}?email=eq.{email}&department=eq.{department}"
            
        elif role == 'ADMIN':
            url = f"{SUPABASE_URL}/rest/v1/Admin?email=eq.{email}"
            
        elif role == 'MANAGEMENT':
            url = f"{SUPABASE_URL}/rest/v1/Management?email=eq.{email}"
            
        elif role == 'PRINCIPAL':
            url = f"{SUPABASE_URL}/rest/v1/Principal?Email=eq.{email}"
            
        elif role == 'HR':
            url = f"{SUPABASE_URL}/rest/v1/HR?email=eq.{email}"
            
        elif role == 'IQAC':
            url = f"{SUPABASE_URL}/rest/v1/IQAC?email=eq.{email}"
        else:
            return jsonify({'success': False, 'message': 'Invalid role'})
        
        # Update password
        update_data = {'password': new_password}
        response = requests.patch(url, json=update_data, headers=headers)
        
        if response.status_code == 204:  # Supabase returns 204 for successful updates
            # Mark the verification code as used
            code_url = f"{SUPABASE_URL}/rest/v1/password_reset_codes?id=eq.{record_id}"
            code_update = {'is_used': True, 'used_at': datetime.now().isoformat()}
            requests.patch(code_url, json=code_update, headers=headers)
            
            print(f"[SUCCESS] Password reset for {email} ({role})")
            return jsonify({'success': True, 'message': 'Password reset successfully'})
        else:
            print(f"[ERROR] Failed to update password: {response.status_code} - {response.text}")
            return jsonify({'success': False, 'message': 'Failed to update password. Please try again.'})
        
    except Exception as e:
        print(f"[ERROR] Reset password error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': 'An error occurred. Please try again later.'})

# --- Catch-all for other HTML pages: only allow if logged in, else redirect to login ---
@app.route('/<page>')
def render_page(page):
    # Only allow access to pages that exist in templates
    # Block access to login.html (should use /login.html route)
    if page == 'login.html':
        return redirect(url_for('login_page'))
    # Exception: allow unauthenticated access to admin-queries.html
    if page == 'admin-queries.html':
        return render_template('admin-queries.html')
    # Optionally, restrict by role here if needed
    try:
        return render_template(page)
    except Exception:
        return 'Page not found', 404

if __name__ == '__main__':
    # For production, use environment variable for debug mode
    import os
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=debug_mode, host='0.0.0.0', port=port)
