# PowerShell script to add double-submit prevention to all forms
# Run this from the flask-project-main directory

Write-Host "🚀 Starting batch update for double-submit prevention..." -ForegroundColor Green

# Array of all form files
$FormFiles = @(
    "templates\faculty-form1.html",
    "templates\faculty-form2.html", 
    "templates\faculty-form3.html",
    "templates\faculty-form4.html",
    "templates\faculty-form5.html",
    "templates\faculty-form6.html",
    "templates\faculty-form7.html",
    "templates\faculty-form8.html",
    "templates\form-ap.html",
    "templates\form-asp.html",
    "templates\form-prof.html",
    "templates\institution-form1.html",
    "templates\institution-form2.html",
    "templates\institution-form3.html",
    "templates\institution-form4.html",
    "templates\institution-form5.html",
    "templates\institution-form6.html",
    "templates\institution-form7.html",
    "templates\institution-form8.html",
    "templates\institution-form9.html",
    "templates\institution-form10.html",
    "templates\institution-form11.html",
    "templates\institution-form12.html",
    "templates\institution-form13.html",
    "templates\institution-form14.html",
    "templates\institution-form15.html",
    "templates\institution-form16.html",
    "templates\institution-form17.html"
)

# Function to add JavaScript includes
function Add-JSIncludes {
    param($FilePath)
    
    Write-Host "📝 Processing $FilePath" -ForegroundColor Yellow
    
    if (-not (Test-Path $FilePath)) {
        Write-Host "❌ File not found: $FilePath" -ForegroundColor Red
        return
    }
    
    $content = Get-Content $FilePath -Raw
    
    # Check if already has the includes
    if ($content -match "prevent-double-submit\.js") {
        Write-Host "⚠️  $FilePath already has double-submit prevention - skipping" -ForegroundColor Yellow
        return
    }
    
    # Add the script includes after Tailwind CSS
    $newContent = $content -replace '(<script src="https://cdn\.tailwindcss\.com"></script>)', 
        '$1
    <!-- Font Awesome for icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Prevent Double Submit Protection -->
    <script src="../static/javascript/prevent-double-submit.js"></script>'
    
    # Write the updated content back
    $newContent | Set-Content $FilePath -Encoding UTF8
    Write-Host "✅ Added JavaScript includes to $FilePath" -ForegroundColor Green
}

# Function to add protection integration to form handlers (basic pattern)
function Add-ProtectionIntegration {
    param($FilePath)
    
    if (-not (Test-Path $FilePath)) {
        return
    }
    
    $content = Get-Content $FilePath -Raw
    
    # Add protection variable declaration to form handlers
    $patterns = @(
        @{
            Pattern = '(form\.addEventListener\(''submit'', async function \(e\) \{[\s\n]*e\.preventDefault\(\);[\s\n]*const form = e\.target;)'
            Replacement = '$1
                    
                    // Get the double-submit protection instance
                    const protection = form.doubleSubmitPrevention;
                    
                    try {'
        },
        @{
            Pattern = '(window\.location\.href = ''notification\.html\?status=error)'
            Replacement = 'if (protection) protection.handleError();
                        $1'
        },
        @{
            Pattern = '(window\.location\.href = ''notification\.html\?status=success)'  
            Replacement = 'if (protection) protection.handleSuccess();
                        $1'
        }
    )
    
    $modified = $false
    foreach ($pattern in $patterns) {
        if ($content -match $pattern.Pattern) {
            $content = $content -replace $pattern.Pattern, $pattern.Replacement
            $modified = $true
        }
    }
    
    # Add try-catch wrapper if we found form handlers
    if ($content -match "Get the double-submit protection instance" -and $content -notmatch "catch \(error\)") {
        # Find the end of submit handlers and add catch blocks
        $content = $content -replace '(\}\);[\s\n]*\}[\s\n]*//)', 
            '                    } catch (error) {
                        console.error(''Form submission error:'', error);
                        if (protection) protection.handleError();
                        alert(''An error occurred while submitting the form. Please try again.'');
                    }
$1'
        $modified = $true
    }
    
    if ($modified) {
        $content | Set-Content $FilePath -Encoding UTF8
        Write-Host "🔧 Added protection integration to $FilePath" -ForegroundColor Cyan
    }
}

# Process all form files
$processedCount = 0
$skippedCount = 0

foreach ($file in $FormFiles) {
    if (Test-Path $file) {
        Write-Host "🎯 Processing $file" -ForegroundColor Blue
        Add-JSIncludes -FilePath $file
        Add-ProtectionIntegration -FilePath $file
        $processedCount++
        Write-Host "---" -ForegroundColor Gray
    } else {
        Write-Host "❌ File not found: $file" -ForegroundColor Red
        $skippedCount++
    }
}

Write-Host ""
Write-Host "🎉 Batch update completed!" -ForegroundColor Green
Write-Host "📋 Summary:" -ForegroundColor White
Write-Host "   - Processed: $processedCount files" -ForegroundColor Green
Write-Host "   - Skipped: $skippedCount files" -ForegroundColor Yellow
Write-Host "   - Added double-submit prevention JavaScript to all forms" -ForegroundColor White
Write-Host "   - Updated form submission handlers with protection callbacks" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Test forms to ensure they work correctly" -ForegroundColor White
Write-Host "   2. Manually review complex forms for proper integration" -ForegroundColor White
Write-Host "   3. Check browser console for any JavaScript errors" -ForegroundColor White
Write-Host "   4. Verify submit buttons disable properly during submission" -ForegroundColor White
