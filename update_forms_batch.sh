#!/bin/bash

# Batch update script to add double-submit prevention to all forms
# This script will add the necessary JavaScript include and update form handlers

# Array of all form files
FORM_FILES=(
    "templates/faculty-form1.html"
    "templates/faculty-form2.html" 
    "templates/faculty-form3.html"
    "templates/faculty-form4.html"
    "templates/faculty-form5.html"
    "templates/faculty-form6.html"
    "templates/faculty-form7.html"
    "templates/faculty-form8.html"
    "templates/form-ap.html"
    "templates/form-asp.html"
    "templates/form-prof.html"
    "templates/institution-form1.html"
    "templates/institution-form2.html"
    "templates/institution-form3.html"
    "templates/institution-form4.html"
    "templates/institution-form5.html"
    "templates/institution-form6.html"
    "templates/institution-form7.html"
    "templates/institution-form8.html"
    "templates/institution-form9.html"
    "templates/institution-form10.html"
    "templates/institution-form11.html"
    "templates/institution-form12.html"
    "templates/institution-form13.html"
    "templates/institution-form14.html"
    "templates/institution-form15.html"
    "templates/institution-form16.html"
    "templates/institution-form17.html"
)

echo "🚀 Starting batch update for double-submit prevention..."

# Function to add JavaScript includes to head section
add_js_includes() {
    local file="$1"
    echo "📝 Adding JavaScript includes to $file"
    
    # Check if already has the includes
    if grep -q "prevent-double-submit.js" "$file"; then
        echo "⚠️  $file already has double-submit prevention - skipping"
        return
    fi
    
    # Add the script includes after Tailwind CSS
    sed -i 's|<script src="https://cdn.tailwindcss.com"></script>|<script src="https://cdn.tailwindcss.com"></script>\n    <!-- Font Awesome for icons -->\n    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">\n    <!-- Prevent Double Submit Protection -->\n    <script src="../static/javascript/prevent-double-submit.js"></script>|' "$file"
}

# Function to update form submission handlers (basic pattern)
update_form_handlers() {
    local file="$1"
    echo "🔧 Updating form handlers in $file"
    
    # This is a basic update - for complex forms, manual editing may be needed
    # Replace basic error handling patterns
    sed -i 's/window\.location\.href = '\''notification\.html?status=error/if (protection) protection.handleError();\n                        window.location.href = '\''notification.html?status=error/g' "$file"
    sed -i 's/window\.location\.href = '\''notification\.html?status=success/if (protection) protection.handleSuccess();\n                        window.location.href = '\''notification.html?status=success/g' "$file"
}

# Process all form files
for file in "${FORM_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "🎯 Processing $file"
        add_js_includes "$file"
        update_form_handlers "$file"
        echo "✅ Completed $file"
    else
        echo "❌ File not found: $file"
    fi
    echo "---"
done

echo "🎉 Batch update completed!"
echo "📋 Summary:"
echo "   - Added double-submit prevention JavaScript to all forms"
echo "   - Updated form submission handlers with protection callbacks"
echo "   - Forms will now prevent duplicate submissions automatically"
echo ""
echo "🔧 Next steps:"
echo "   1. Test forms to ensure they work correctly"
echo "   2. Manually review complex forms for proper integration"
echo "   3. Update any custom submission handlers as needed"
