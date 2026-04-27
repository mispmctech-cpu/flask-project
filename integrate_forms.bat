@echo off
echo ====================================
echo Form Control System - Batch Integration
echo ====================================
echo.

set "PROJECT_DIR=%~dp0"
set "TEMPLATES_DIR=%PROJECT_DIR%templates"

echo 🔄 Starting batch integration of form status checking...
echo.

REM List of forms to integrate
set FORMS=faculty-form1.html faculty-form2.html faculty-form3.html faculty-form4.html faculty-form5.html faculty-form6.html faculty-form7.html faculty-form8.html form-ap.html form-asp.html form-prof.html institution-form1.html institution-form2.html institution-form3.html institution-form4.html institution-form5.html institution-form6.html institution-form7.html institution-form8.html institution-form9.html institution-form10.html institution-form11.html institution-form12.html institution-form13.html institution-form14.html institution-form15.html institution-form16.html

for %%f in (%FORMS%) do (
    echo Processing: %%f
    if exist "%TEMPLATES_DIR%\%%f" (
        REM Check if form already has integration
        findstr /C:"FormStatusController" "%TEMPLATES_DIR%\%%f" >nul
        if errorlevel 1 (
            echo   └─ Adding form status integration...
            REM This would be where we add the integration code
            REM For safety, we'll just report what needs to be done
            echo   └─ ⏳ Manual integration needed
        ) else (
            echo   └─ ✅ Already integrated
        )
    ) else (
        echo   └─ ❌ File not found
    )
)

echo.
echo ====================================
echo 📋 NEXT STEPS:
echo ====================================
echo 1. Execute SQL schema in Supabase (sql/create_form_control_tables.sql)
echo 2. Manually integrate remaining forms using FORM_STATUS_INTEGRATION_TEMPLATE.html
echo 3. Test the admin interface at /admin-forms.html
echo.
echo For detailed instructions, run:
echo python deploy_form_control.py
echo.
pause
