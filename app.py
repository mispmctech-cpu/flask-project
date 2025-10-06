# Debug route to check session info

from flask import Flask, render_template, request, redirect, url_for, send_from_directory, session, abort
import os
from functools import wraps
from werkzeug.utils import secure_filename
import csv

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
# Use environment variable for secret key in production, fallback for development
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-change-in-production-please')
os.makedirs(os.path.join(app.root_path, app.config['UPLOAD_FOLDER']), exist_ok=True)

# Disable caching for debugging
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True

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
        for f in file_fields:
            file = request.files.get(f)
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
