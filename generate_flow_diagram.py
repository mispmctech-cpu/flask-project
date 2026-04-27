import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import matplotlib.lines as mlines

# Create figure and axis
fig, ax = plt.subplots(1, 1, figsize=(14, 16))
ax.set_xlim(0, 10)
ax.set_ylim(0, 20)
ax.axis('off')

# Define colors
color_start = '#9333EA'  # Purple
color_faculty = '#3B82F6'  # Blue
color_hod = '#F59E0B'  # Orange
color_database = '#10B981'  # Green
color_dashboard = '#EF4444'  # Red
color_end = '#6B7280'  # Gray

def draw_box(ax, x, y, width, height, text, color, fontsize=10, bold=False):
    """Draw a rounded rectangle box with text"""
    box = FancyBboxPatch((x, y), width, height,
                          boxstyle="round,pad=0.1",
                          edgecolor='black',
                          facecolor=color,
                          linewidth=2)
    ax.add_patch(box)
    weight = 'bold' if bold else 'normal'
    ax.text(x + width/2, y + height/2, text,
            ha='center', va='center',
            fontsize=fontsize, weight=weight,
            color='white' if color != '#FFFFFF' else 'black',
            wrap=True)

def draw_arrow(ax, x1, y1, x2, y2, label=''):
    """Draw an arrow between two points"""
    arrow = FancyArrowPatch((x1, y1), (x2, y2),
                           arrowstyle='->,head_width=0.4,head_length=0.4',
                           color='black',
                           linewidth=2,
                           mutation_scale=20)
    ax.add_patch(arrow)
    if label:
        mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
        ax.text(mid_x + 0.3, mid_y, label, fontsize=8, style='italic')

# Title
ax.text(5, 19.5, 'FACULTY PERFORMANCE MANAGEMENT SYSTEM', 
        ha='center', fontsize=16, weight='bold', color=color_start)
ax.text(5, 19, 'System Flow Diagram', 
        ha='center', fontsize=12, style='italic')

# 1. Start - User Login
draw_box(ax, 3.5, 17.5, 3, 0.6, 'START: User Login', color_start, 11, True)
draw_arrow(ax, 5, 17.5, 5, 16.8)

# 2. Authentication
draw_box(ax, 3.5, 16, 3, 0.6, 'Role-Based Authentication', '#8B5CF6', 10)
draw_arrow(ax, 5, 16, 5, 15.2)

# 3. Role Selection
draw_box(ax, 1, 14, 2, 0.8, 'Faculty', color_faculty, 10, True)
draw_box(ax, 4, 14, 2, 0.8, 'HOD', color_hod, 10, True)
draw_box(ax, 7, 14, 2, 0.8, 'IQAC/Principal', color_dashboard, 10, True)

draw_arrow(ax, 4.5, 15.2, 2, 14.8)
draw_arrow(ax, 5, 15.2, 5, 14.8)
draw_arrow(ax, 5.5, 15.2, 8, 14.8)

# Faculty Path
ax.text(2, 13.5, 'FACULTY WORKFLOW', ha='center', fontsize=10, weight='bold', color=color_faculty)
draw_arrow(ax, 2, 14, 2, 13.2)

draw_box(ax, 1, 12.4, 2, 0.6, 'View Dashboard', color_faculty, 9)
draw_arrow(ax, 2, 12.4, 2, 11.8)

draw_box(ax, 1, 11, 2, 0.6, 'Select Form Type', color_faculty, 9)
ax.text(2, 10.6, '• Core Scope (15)\n• Yearly (AP/ASP/Prof)\n• Dept Portfolio (8)\n• Inst Portfolio (17)', 
        ha='center', fontsize=7, style='italic')
draw_arrow(ax, 2, 10.4, 2, 9.8)

draw_box(ax, 1, 9, 2, 0.6, 'Fill Form Details', color_faculty, 9)
draw_arrow(ax, 2, 9, 2, 8.4)

draw_box(ax, 1, 7.6, 2, 0.6, 'Upload Documents', color_faculty, 9)
draw_arrow(ax, 2, 7.6, 2, 7)

draw_box(ax, 1, 6.2, 2, 0.6, 'Submit Form', color_faculty, 9, True)
draw_arrow(ax, 3, 6.5, 4, 6.5)

# Database
draw_box(ax, 4, 6.2, 2, 0.6, 'Supabase Database\n(Store Data)', color_database, 9, True)
draw_arrow(ax, 5, 6.2, 5, 5.6)

# Notification
draw_box(ax, 4, 4.8, 2, 0.6, 'Send Notification\nto HOD', '#EC4899', 9)
draw_arrow(ax, 6, 5.1, 7, 5.1)

# HOD Path
ax.text(8, 13.5, 'HOD WORKFLOW', ha='center', fontsize=10, weight='bold', color=color_hod)
draw_arrow(ax, 8, 14, 8, 7.5)

draw_box(ax, 7, 6.8, 2, 0.6, 'HOD Dashboard', color_hod, 9)
draw_arrow(ax, 8, 6.8, 8, 6.2)

draw_box(ax, 7, 5.4, 2, 0.6, 'Review Submission', color_hod, 9)
draw_arrow(ax, 8, 5.4, 8, 4.8)

draw_box(ax, 6.5, 4, 1.2, 0.6, 'Approve', '#10B981', 9, True)
draw_box(ax, 7.8, 4, 1.2, 0.6, 'Reject', '#EF4444', 9, True)

# Approval path
draw_arrow(ax, 7.1, 4, 7.1, 3.4)
draw_box(ax, 6.4, 2.8, 1.4, 0.5, 'Update Status\nVerified', '#10B981', 8)

# Rejection path
draw_arrow(ax, 8.4, 4, 8.4, 3.4)
draw_box(ax, 7.8, 2.8, 1.4, 0.5, 'Notify Faculty\nRe-submit', '#EF4444', 8)
draw_arrow(ax, 8.5, 2.8, 2, 8, 'Re-submission')

# Both paths merge
draw_arrow(ax, 7.1, 2.8, 7.1, 2.2)
draw_arrow(ax, 8.4, 2.8, 7.1, 2.2)

# Update database
draw_box(ax, 6.3, 1.6, 1.6, 0.5, 'Update Database', color_database, 9)
draw_arrow(ax, 7.1, 1.6, 5, 1.4)

# Dashboards - Bottom
draw_box(ax, 1, 0.8, 1.8, 0.6, 'IQAC Dashboard\n(Monitor All)', color_dashboard, 8)
draw_box(ax, 3.2, 0.8, 1.8, 0.6, 'Principal\n(Overview)', '#DC2626', 8)
draw_box(ax, 5.4, 0.8, 1.8, 0.6, 'Analytics &\nReports', '#7C3AED', 8)
draw_box(ax, 7.6, 0.8, 1.8, 0.6, 'Export\nPDF/Excel', '#059669', 8)

# Final arrow to dashboards
draw_arrow(ax, 5, 1.4, 2, 1.4)
draw_arrow(ax, 5, 1.4, 4.1, 1.4)
draw_arrow(ax, 5, 1.4, 6.3, 1.4)
draw_arrow(ax, 5, 1.4, 8.5, 1.4)

# Add legend box
legend_elements = [
    mpatches.Patch(color=color_faculty, label='Faculty Actions'),
    mpatches.Patch(color=color_hod, label='HOD Actions'),
    mpatches.Patch(color=color_database, label='Database Operations'),
    mpatches.Patch(color=color_dashboard, label='Monitoring & Reports')
]
ax.legend(handles=legend_elements, loc='lower right', fontsize=8, framealpha=0.9)

# Save the figure
plt.tight_layout()
plt.savefig('FLOW_DIAGRAM.png', dpi=300, bbox_inches='tight', facecolor='white')
plt.savefig('FLOW_DIAGRAM.pdf', bbox_inches='tight', facecolor='white')
print('✅ Flow diagram saved as:')
print('   - FLOW_DIAGRAM.png (High resolution image)')
print('   - FLOW_DIAGRAM.pdf (Vector format for printing)')
plt.show()
