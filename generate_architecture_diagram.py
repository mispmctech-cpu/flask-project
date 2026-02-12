import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, Rectangle
import matplotlib.lines as mlines

# Create figure and axis
fig, ax = plt.subplots(1, 1, figsize=(14, 16))
ax.set_xlim(0, 10)
ax.set_ylim(0, 18)
ax.axis('off')

# Define colors
color_presentation = '#3B82F6'  # Blue
color_application = '#10B981'  # Green
color_database = '#F59E0B'  # Orange
color_security = '#EF4444'  # Red
color_tech = '#8B5CF6'  # Purple

def draw_layer_box(ax, x, y, width, height, title, color, items=None):
    """Draw a layer box with title and items"""
    # Main box
    box = FancyBboxPatch((x, y), width, height,
                          boxstyle="round,pad=0.05",
                          edgecolor='black',
                          facecolor=color,
                          linewidth=2,
                          alpha=0.3)
    ax.add_patch(box)
    
    # Title bar
    title_box = Rectangle((x, y + height - 0.5), width, 0.5,
                          facecolor=color,
                          edgecolor='black',
                          linewidth=2)
    ax.add_patch(title_box)
    ax.text(x + width/2, y + height - 0.25, title,
            ha='center', va='center',
            fontsize=12, weight='bold', color='white')
    
    # Items
    if items:
        item_y = y + height - 1
        for item in items:
            ax.text(x + 0.2, item_y, f'• {item}',
                   fontsize=9, va='top')
            item_y -= 0.4

def draw_component_box(ax, x, y, width, height, text, color):
    """Draw a small component box"""
    box = FancyBboxPatch((x, y), width, height,
                          boxstyle="round,pad=0.05",
                          edgecolor='black',
                          facecolor=color,
                          linewidth=1.5)
    ax.add_patch(box)
    ax.text(x + width/2, y + height/2, text,
            ha='center', va='center',
            fontsize=8, weight='bold', color='white')

def draw_arrow(ax, x1, y1, x2, y2, label=''):
    """Draw connection arrow"""
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='->', lw=2, color='black'))
    if label:
        mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
        ax.text(mid_x + 0.3, mid_y, label, fontsize=8, style='italic')

# Title
ax.text(5, 17.5, 'SYSTEM ARCHITECTURE DIAGRAM', 
        ha='center', fontsize=16, weight='bold', color='#1F2937')
ax.text(5, 17, 'Three-Tier Architecture', 
        ha='center', fontsize=12, style='italic', color='#6B7280')

# ==================== LAYER 1: PRESENTATION LAYER ====================
draw_layer_box(ax, 0.5, 14.5, 9, 2, 
               'PRESENTATION LAYER (Client-Side)',
               color_presentation,
               ['Web Browsers - Chrome, Firefox, Safari, Edge',
                'Responsive UI - Mobile & Desktop Compatible',
                'Technologies: HTML5, CSS3, JavaScript (ES6+)'])

# Client boxes
draw_component_box(ax, 1, 15.2, 1.5, 0.5, 'Faculty\nBrowser', '#2563EB')
draw_component_box(ax, 2.8, 15.2, 1.5, 0.5, 'HOD\nBrowser', '#2563EB')
draw_component_box(ax, 4.6, 15.2, 1.5, 0.5, 'IQAC\nBrowser', '#2563EB')
draw_component_box(ax, 6.4, 15.2, 1.5, 0.5, 'Principal\nBrowser', '#2563EB')
draw_component_box(ax, 8.2, 15.2, 1.5, 0.5, 'Admin\nBrowser', '#2563EB')

# Connection label
ax.text(5, 14.2, 'HTTPS / WebSocket', ha='center', fontsize=9, style='italic', 
        bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.5))

# Arrow to application layer
draw_arrow(ax, 5, 14.5, 5, 13.8)

# ==================== LAYER 2: APPLICATION LAYER ====================
draw_layer_box(ax, 0.5, 9.5, 9, 4,
               'APPLICATION LAYER (Backend Server)',
               color_application,
               [])

# Flask Application Title
ax.text(5, 13, 'FLASK WEB APPLICATION (Python 3.x)', 
        ha='center', fontsize=11, weight='bold')

# Sub-components
draw_component_box(ax, 1, 12.2, 2.5, 0.5, 'Authentication &\nSession Management', '#059669')
draw_component_box(ax, 3.8, 12.2, 2.5, 0.5, 'Routing Layer\n(URL Mapping)', '#059669')
draw_component_box(ax, 6.6, 12.2, 2.5, 0.5, 'Middleware\n(Validation/CORS)', '#059669')

# Business Logic Layer
ax.text(5, 11.4, 'Business Logic Layer:', ha='center', fontsize=10, weight='bold', style='italic')
draw_component_box(ax, 0.8, 10.5, 1.8, 0.5, 'Form Processing\nModule', '#10B981')
draw_component_box(ax, 2.8, 10.5, 1.8, 0.5, 'Verification\nModule', '#10B981')
draw_component_box(ax, 4.8, 10.5, 1.8, 0.5, 'Calculation\nModule', '#10B981')
draw_component_box(ax, 6.8, 10.5, 1.8, 0.5, 'Report\nGenerator', '#10B981')

draw_component_box(ax, 1.8, 9.8, 1.8, 0.5, 'Notification\nService', '#10B981')
draw_component_box(ax, 3.8, 9.8, 1.8, 0.5, 'Dashboard\nGenerator', '#10B981')
draw_component_box(ax, 5.8, 9.8, 1.8, 0.5, 'Export\nModule', '#10B981')

# Connection label
ax.text(5, 9.2, 'REST API / Supabase SDK', ha='center', fontsize=9, style='italic',
        bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.5))

# Arrow to data layer
draw_arrow(ax, 5, 9.5, 5, 8.8)

# ==================== LAYER 3: DATA ACCESS LAYER ====================
draw_layer_box(ax, 0.5, 7.8, 9, 1,
               'DATA ACCESS LAYER',
               color_tech,
               ['Supabase Client SDK', 'Query Builder & ORM', 'Real-time Subscriptions'])

# Arrow to database
draw_arrow(ax, 5, 7.8, 5, 7.1)
ax.text(5, 7.4, 'PostgreSQL Protocol', ha='center', fontsize=8, style='italic')

# ==================== LAYER 4: DATABASE LAYER ====================
draw_layer_box(ax, 0.5, 3, 9, 4,
               'DATABASE LAYER (Supabase - PostgreSQL)',
               color_database,
               [])

# Database title
ax.text(5, 6.5, 'SUPABASE BACKEND', ha='center', fontsize=11, weight='bold')

# Tables section
ax.text(1.5, 6, 'Core Tables:', fontsize=9, weight='bold')
tables_left = [
    'Faculty (Users)',
    'Core_scope (Monthly)',
    'AP/ASP/Prof (Yearly)',
    'form1-8 (Dept Portfolio)'
]
y_pos = 5.7
for table in tables_left:
    ax.text(1, y_pos, f'• {table}', fontsize=7)
    y_pos -= 0.25

ax.text(5, 6, 'Verification Tables:', fontsize=9, weight='bold')
tables_middle = [
    'Hod-workdone',
    'hod-workdone_reject',
    'FormStatusLog',
    'notification'
]
y_pos = 5.7
for table in tables_middle:
    ax.text(4.5, y_pos, f'• {table}', fontsize=7)
    y_pos -= 0.25

ax.text(8, 6, 'System Tables:', fontsize=9, weight='bold')
tables_right = [
    'admin',
    'DeletedFaculty',
    'institution-form1-17',
    'Document metadata'
]
y_pos = 5.7
for table in tables_right:
    ax.text(7.5, y_pos, f'• {table}', fontsize=7)
    y_pos -= 0.25

# Storage section
draw_component_box(ax, 1, 4.2, 3.5, 0.6, 'SUPABASE STORAGE\n(File Management)', '#F59E0B')
ax.text(2.75, 3.8, 'Buckets: faculty-documents, form-attachments,\nverification-files, reports', 
        ha='center', fontsize=7)

# Security section
draw_component_box(ax, 5, 4.2, 3.5, 0.6, 'SECURITY LAYER', '#EF4444')
ax.text(6.75, 3.8, 'Row Level Security (RLS)\nRole-based Access Control\nAPI Authentication', 
        ha='center', fontsize=7)

# Backup & Monitoring
draw_component_box(ax, 2, 3.3, 2.5, 0.5, 'Auto Backup\n& Recovery', '#6366F1')
draw_component_box(ax, 5, 3.3, 2.5, 0.5, 'Performance\nMonitoring', '#6366F1')

# ==================== TECHNOLOGY STACK (Bottom) ====================
# Frontend Tech
tech_box = Rectangle((0.5, 1.5), 4, 1.2, facecolor='#EFF6FF', edgecolor='black', linewidth=2)
ax.add_patch(tech_box)
ax.text(2.5, 2.4, 'FRONTEND STACK', ha='center', fontsize=10, weight='bold', color='#1E40AF')
ax.text(2.5, 2.1, 'HTML5 • CSS3 • JavaScript (ES6+)', ha='center', fontsize=8)
ax.text(2.5, 1.85, 'Tailwind CSS • Chart.js', ha='center', fontsize=8)
ax.text(2.5, 1.6, 'SheetJS • html2pdf.js', ha='center', fontsize=8)

# Backend Tech
tech_box2 = Rectangle((5, 1.5), 4, 1.2, facecolor='#F0FDF4', edgecolor='black', linewidth=2)
ax.add_patch(tech_box2)
ax.text(7, 2.4, 'BACKEND STACK', ha='center', fontsize=10, weight='bold', color='#166534')
ax.text(7, 2.1, 'Python 3.x • Flask Framework', ha='center', fontsize=8)
ax.text(7, 1.85, 'Werkzeug • Gunicorn', ha='center', fontsize=8)
ax.text(7, 1.6, 'PostgreSQL • Supabase', ha='center', fontsize=8)

# Deployment
deploy_box = Rectangle((0.5, 0.5), 9, 0.8, facecolor='#FEF3C7', edgecolor='black', linewidth=2)
ax.add_patch(deploy_box)
ax.text(5, 1, 'DEPLOYMENT & HOSTING', ha='center', fontsize=10, weight='bold', color='#92400E')
ax.text(5, 0.7, 'Render / Vercel • Environment Configuration • CI/CD Pipeline', 
        ha='center', fontsize=8)

# Add legend
legend_elements = [
    mpatches.Patch(color=color_presentation, label='Presentation Layer', alpha=0.7),
    mpatches.Patch(color=color_application, label='Application Layer', alpha=0.7),
    mpatches.Patch(color=color_database, label='Database Layer', alpha=0.7),
    mpatches.Patch(color=color_security, label='Security', alpha=0.7)
]
ax.legend(handles=legend_elements, loc='upper right', fontsize=8, framealpha=0.9)

# Save the figure
plt.tight_layout()
plt.savefig('ARCHITECTURE_DIAGRAM.png', dpi=300, bbox_inches='tight', facecolor='white')
plt.savefig('ARCHITECTURE_DIAGRAM.pdf', bbox_inches='tight', facecolor='white')
print('✅ Architecture diagram saved as:')
print('   - ARCHITECTURE_DIAGRAM.png (High resolution image)')
print('   - ARCHITECTURE_DIAGRAM.pdf (Vector format for printing)')
plt.show()
