# PowerShell script to add form-access-control.js to all form HTML files
# Run this script from the flask-project-main directory

$templatesPath = ".\templates"
$scriptTag = '    <!-- Form Access Control - checks if form is open/closed -->'
$scriptTag2 = '    <script src="../static/javascript/form-access-control.js"></script>'

# List of form files to update
$formFiles = @(
    # Faculty Forms
    "faculty-form1.html",
    "faculty-form2.html",
    "faculty-form2-monthly.html",
    "faculty-form3.html",
    "faculty-form4.html",
    "faculty-form5.html",
    "faculty-form6.html",
    "faculty-form6-monthly.html",
    "faculty-form7.html",
    "faculty-form7-monthly.html",
    "faculty-form8.html",
    "faculty-form8-monthly.html",
    # Special Faculty Forms
    "form-ap.html",
    "form-asp.html",
    "form-prof.html",
    # Institution Forms
    "institution-form1.html",
    "institution-form2.html",
    "institution-form3.html",
    "institution-form4.html",
    "institution-form5.html",
    "institution-form6.html",
    "institution-form7.html",
    "institution-form8.html",
    "institution-form9.html",
    "institution-form10.html",
    "institution-form11.html",
    "institution-form12.html",
    "institution-form13.html",
    "institution-form14.html",
    "institution-form15.html",
    "institution-form16.html",
    "institution-form17.html"
)

$updatedCount = 0
$skippedCount = 0
$errorCount = 0

foreach ($file in $formFiles) {
    $filePath = Join-Path $templatesPath $file
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Check if script is already added
        if ($content -match "form-access-control\.js") {
            Write-Host "SKIPPED: $file (already has form-access-control.js)" -ForegroundColor Yellow
            $skippedCount++
            continue
        }
        
        # Add the script just before </body>
        $newContent = $content -replace '(</body>)', "$scriptTag`n$scriptTag2`n`$1"
        
        # Write the updated content
        Set-Content -Path $filePath -Value $newContent -NoNewline
        Write-Host "UPDATED: $file" -ForegroundColor Green
        $updatedCount++
    } else {
        Write-Host "NOT FOUND: $file" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Updated: $updatedCount files" -ForegroundColor Green
Write-Host "  Skipped: $skippedCount files" -ForegroundColor Yellow
Write-Host "  Not Found: $errorCount files" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
