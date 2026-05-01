// Database setup utility for workdone verification enhancement
// This script helps add the original_data column to hod-workdone table

async function addOriginalDataColumn() {
  const supabaseClient = window.supabase.createClient(
    "https://cbhodgwaazmjszkujrti.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaG9kZ3dhYXptanN6a3VqcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzY4NzEsImV4cCI6MjA3MTI1Mjg3MX0.sBRdfiWJJmZtLWsHCcNyxm1VcwkGwZWsIeeMlS49XTU"
  );

  try {
    console.log('🔧 Checking if original_data column exists...');
    
    // Test if original_data column exists by trying to select it
    const { data, error } = await supabaseClient
      .from('hod-workdone')
      .select('original_data')
      .limit(1);
    
    if (error && error.message.includes('column "original_data" does not exist')) {
      console.log('❌ original_data column does not exist');
      console.log('ℹ️  Please add the column manually in Supabase Dashboard:');
      console.log('   1. Go to https://supabase.com/dashboard');
      console.log('   2. Navigate to your project');
      console.log('   3. Go to Table Editor → hod-workdone');
      console.log('   4. Add a new column:');
      console.log('      - Name: original_data');
      console.log('      - Type: JSONB');
      console.log('      - Nullable: Yes');
      console.log('      - Default: null');
      console.log('   5. Save the changes');
      return false;
    } else {
      console.log('✅ original_data column exists or accessible');
      return true;
    }
  } catch (err) {
    console.error('Error checking column:', err);
    return false;
  }
}

// Check for the column when this script loads
if (typeof window !== 'undefined' && window.supabase) {
  addOriginalDataColumn().then(exists => {
    if (exists) {
      console.log('✅ Database is ready for enhanced verification');
    } else {
      console.log('⚠️  Database needs manual column addition');
    }
  });
}

window.addOriginalDataColumn = addOriginalDataColumn;
