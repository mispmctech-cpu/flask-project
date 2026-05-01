# Complete the double-submit protection implementation for all faculty forms

$forms = @(
    @{file="templates\faculty-form5.html"; forms=@("onceMonthForm4", "semesterForm4")},
    @{file="templates\faculty-form6.html"; forms=@("directDbForm", "once2MonthForm6", "semesterForm6")},
    @{file="templates\faculty-form7.html"; forms=@("weeklyForm7", "onceMonthForm7", "semesterForm7")},
    @{file="templates\faculty-form8.html"; forms=@("weeklyForm8", "onceMonthForm8", "semesterForm8")}
)

foreach ($formFile in $forms) {
    Write-Host "Processing $($formFile.file)..." -ForegroundColor Cyan
    
    if (Test-Path $formFile.file) {
        $content = Get-Content $formFile.file -Raw
        
        foreach ($formId in $formFile.forms) {
            # Add try block after preventDefault
            $content = $content -replace "(\s+)const form = e\.target;", '$1const form = e.target;$1$1// Get double-submit protection instance$1const protection = window.getFormProtection && window.getFormProtection(''' + $formId + ''');$1$1try {'
            
            # Add catch block before });
            $content = $content -replace "(\s+)form\.reset\(\);\s*(\}\s*\}\s*\);)", '$1form.reset();$1if (protection) protection.onSuccess();$1} catch (err) {$1    console.error(''Form submission error:'', err);$1    if (protection) protection.onError();$1    window.location.href = ''notification.html?status=error&msg='' + encodeURIComponent(''Submission failed: '' + err.message);$1}$2'
        }
        
        $content | Set-Content $formFile.file -Encoding UTF8
        Write-Host "✓ Completed $($formFile.file)" -ForegroundColor Green
    }
}

Write-Host "All faculty forms protection implementation completed!" -ForegroundColor Green
