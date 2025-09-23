


// form-modal-mapper.js
// Reusable modal content mapper for all faculty forms

function getFormModalContent(row, details) {
  // Detect form type
  let portfolio = row.portfolio ? row.portfolio.toLowerCase() : '';
  let html = '';
  // Custom view for form1-once in a semester
  if (row.table && row.table.toLowerCase() === 'form1-once in a semester') {
    const customFields = [
      'Department Budget File',
      'PAC File',
      'DAAC File',
      'BOS File',
      'Department Academic Calendar File',
      'Subject Allocation File',
      'Workload File',
      'Time Table',
      'Vision, Mission, PO, PEO Process & Dissemination File',
      'Syllabus & Regulations File'
    ];
    html += `<div class=\"mb-4\"><span class=\"text-2xl font-bold text-purple-700\">Department Semester Workdone Details</span></div>`;
    html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
    html += `<div><span class=\"font-semibold text-gray-700\">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    html += `<div><span class=\"font-semibold text-gray-700\">Semester:</span> <span>${details['Semester'] || '-'}</span></div>`;
    html += `</div>`;
    html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>`;
    customFields.forEach((label, i) => {
      const idx = i + 1;
      html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${label}</span></div>`;
      // Use correct field names from schema
      const statusKey = `Status-${idx}`;
      const descKey = `Description-${idx}`;
      const fileKey = `Upload The Scanned File-${idx}`;
      html += `<div><span class=\"font-semibold text-gray-700\">${statusKey}:</span> <span>${details[statusKey] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">${descKey}:</span> <span>${details[descKey] || '-'}</span></div>`;
      let fileVal = details[fileKey];
      let fileHtml = '-';
      if (fileVal && typeof fileVal === 'string' && fileVal !== 'null' && fileVal.trim() !== '' && fileVal !== '-') {
        fileHtml = `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
      }
      html += `<div><span class=\"font-semibold text-gray-700\">${fileKey}:</span> <span>${fileHtml}</span></div>`;
    });
    html += `</div>`;
    return html;
  }

    // form-ap.html
  if (
    portfolio.includes('faculty core scope') ||
    portfolio.includes('ap form') ||
    portfolio.includes('ap core scope form')
  ) {
    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Faculty Core Scope - AP Form</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || '-'}</span></div>`;
    html += `</div>`;
    html += `<div class='mt-4'>`;
    // SCOPE blocks (21 rows)
    const scopes = [
      'Teaching and Curriculum Delivery: Design and deliver lectures, tutorials, and lab sessions as per the academic calendar and subjects assigned.',
      'Teaching and Curriculum Delivery: Develop course materials, lesson plans, and assessments aligned with OBE for the subjects assigned.',
      'Teaching and Curriculum Delivery: Incorporate innovative teaching methods, including ICT tools and experiential learning.',
      'Teaching and Curriculum Delivery: Prepare Product model and instructional Chart for the assigned subject.',
      'Student Mentorship and Support: Act as academic mentors and guide 30 students on coursework, projects, and career planning.',
      'Student Mentorship and Support: Monitor student attendance, performance, and well-being.',
      'Student Mentorship and Support: Provide remedial support and encourage participation in co-curricular and extra-curricular activities.',
      'Student Mentorship and Support: Maintain the Mentor book for assigned mentee.',
      'Student Mentorship and Support: Consolidate innovative course material, Lab manuals',
      'Research and Development: Present at conferences.',
      'Research and Development: Guide student research and final-year projects',
      'Institutional Development: Participate in curriculum development and revision through Boards of Studies.',
      'Institutional Development: Contribute to accreditation processes (NBA, NAAC) and quality assurance initiatives.',
      'Institutional Development: Serve on academic and administrative committees.',
      'Professional Development: Attend FDP/ workshops/ seminar.',
      'Professional Development: Pursue higher qualifications, NPTEL/MOOC and certifications, and memberships in professional bodies.',
      'Community and Industry Engagement: Facilitate industry-institute interaction through guest lectures, Internships.',
      'Community and Industry Engagement: Engage in extension activities, and social outreach Programs.',
      'Administrative Duties: Maintain academic records, course files, Log Book and student evaluations.',
      'Administrative Duties: Assist in examination duties, including question paper setting, invigilation, and evaluation.',
      'Administrative Duties: Submit the FPBA (Faculty performance Based Appraisal) along with the support documents on time.'
    ];
    for (let i = 1; i <= 21; i++) {
      html += `<div class='col-span-2 mt-4 mb-2'><span class="text-lg font-bold text-purple-700">${i}. ${scopes[i-1]}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
    }
    html += `</div>`;
    return html;
  }
    // Institution-form8.html
    if (row.table && row.table.toLowerCase().includes('institution-form8')) {
      html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">PLACEMENT CELL : MONTHLY</span></div>`;
      html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      const fileLabels = [
        'Placement File',
        'Paid Internship File',
        'On/Off Campus Recruitments File',
        'Higher Studies File',
        'Entrepreneurship File',
        'Competitive Exams File',
        'Career Guidance Programs File',
        'Alumni Feedback on placed company',
        'Industry Feedback File'
      ];
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
      for (let i = 1; i <= fileLabels.length; i++) {
        html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
      html += `</div>`;
      return html;
    }
    // Institution-form9.html
    if (row.table && row.table.toLowerCase().includes('institution-form9')) {
      html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">PLACEMENT OFFICER : ONCE IN A MONTH</span></div>`;
      html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      const fileLabels = [
        'Campus placement schedule file',
        'Company database file',
        'Job profile file',
        'Placement records and statistics',
        'Students profile file',
        'Company feedback file',
        'MOU file(for Placement and internship)',
        'Placement policy file',
        'Aptitude ,technical and soft skill file',
        'Mock interview file',
        'Resume building workshop file',
        'GD file',
        'Skill gap identification file',
        'Placement reports file (On bar off campus)',
        'Offer letter file',
        'Placement Grievances file'
      ];
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
      for (let i = 1; i <= fileLabels.length; i++) {
        html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
      html += `</div>`;
      return html;
    }
      // Institution-form10.html
      if (row.table && row.table.toLowerCase().includes('institution-form10')) {
        let isSixMonths = row.table.toLowerCase().includes('once in six months');
        if (!isSixMonths) {
          html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">HEAD PLACEMENT : MONTHLY</span></div>`;
          html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
          html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
          html += `</div>`;
          const fileLabels = [
            'Placement File',
            'Paid Internship File',
            'On/Off Campus Recruitments File',
            'Industry Visit File',
            'HR Conclave File',
            'Placement Orientation Programs File'
          ];
          html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
          for (let i = 1; i <= fileLabels.length; i++) {
            html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
          }
          html += `</div>`;
        } else {
          html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">HEAD-TRAINING: ONCE IN SIX MONTHS</span></div>`;
          html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
          html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Person Name:</span> <span>${details['Portfolio Person Name:'] || details['Portfolio Person Name'] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
          html += `</div>`;
          const fileLabels = [
            'Budget File',
            'Vendor Database & Quotations File'
          ];
          html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
          for (let i = 1; i <= fileLabels.length; i++) {
            html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i + 6}. ${fileLabels[i-1]}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Discription_${i}:</span> <span>${details[`Discription_${i}`] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
          }
          html += `</div>`;
        }
        return html;
      }
      // Institution-form11.html
      if (row.table && row.table.toLowerCase().includes('institution-form11')) {
        html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">TRAINING OFFICER : ONCE IN A MONTH</span></div>`;
        html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
        html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
        html += `</div>`;
        const fileLabels = [
          'Training calendar file',
          'Students categorization file',
          'Gap analysis file',
          'Industry expectations file',
          'Training reports file',
          'MOU File(training)',
          'Budget file',
          'Students analysis file',
          'Mapping file(NBA&NAAC)'
        ];
        html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
        for (let i = 1; i <= fileLabels.length; i++) {
          html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
        }
        html += `</div>`;
        return html;
      }
        // Institution-form12.html
        if (row.table && row.table.toLowerCase().includes('institution-form12')) {
          html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">HEAD RISE : MONTHLY</span></div>`;
          html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
          html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
          html += `</div>`;
          const fileLabels = [
            'Roadmap File',
            'Establishment of Research Labs File',
            'Funding Agencies, Research Calls and its Submission Status File',
            'Innovation Programs Calendar & its Execution File',
            'Innovation Product File',
            'Innovation Bootcamp File',
            'Publications File',
            'Patents File',
            'Research Proposal Submission status File',
            'Incubation Centre Status File',
            'Startups File',
            'Alumni networks for mentorship, funding, and collaboration File',
            'Consultancy File',
            'Industry Database file',
            'Research Centre Database file',
            'Scientists Database File',
            'Research Advisory Committee File',
            'Seed Money File',
            'Entrepreneurship Development Cell File'
          ];
          html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
          for (let i = 1; i <= fileLabels.length; i++) {
            html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
          }
          html += `</div>`;
          return html;
        }
        // Institution-form13.html
        if (row.table && row.table.toLowerCase().includes('institution-form13')) {
          let isSixMonths = row.table.toLowerCase().includes('oncein6months') || row.table.toLowerCase().includes('once in six months');
          if (!isSixMonths) {
            html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">IT INFRA COORDINATOR: MONTHLY</span></div>`;
            html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
            html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
            html += `</div>`;
            const fileLabels = [
              'IT Infrastructure Planning File',
              'Security & Compliance File',
              'Vendor & AMC Management File',
              'Disaster Recovery & Backup File',
              'Performance Monitoring File',
              'Inventory of IT assets File',
              'IT audits File',
              'IT Training sessions File'
            ];
            html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
            for (let i = 1; i <= fileLabels.length; i++) {
              html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
            }
            html += `</div>`;
          } else {
            html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">IT INFRA COORDINATOR: ONCE IN SIX MONTHS</span></div>`;
            html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
            html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
            html += `</div>`;
            html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
            html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">9. Budget File</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_1:</span> <span>${details['Upload the scanned file_1'] ? `<a href='${details['Upload the scanned file_1']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
            html += `</div>`;
          }
          return html;
        }
          // Institution-form14.html
          if (row.table && row.table.toLowerCase().includes('institution-form14')) {
            let isSixMonths = row.table.toLowerCase().includes('oncein6months') || row.table.toLowerCase().includes('once in six months');
            if (!isSixMonths) {
              html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">WEBSITE COORDINATOR: MONTHLY</span></div>`;
              html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
              html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
              html += `</div>`;
              const fileLabels = [
                'Website updation File',
                'Data security updates file',
                'No of Viewers File',
                'Student portals, fee payment gateways, and ERP integrations updates File',
                'Newsletters, magazines, alumni testimonials updates File',
                'Audit File',
                'Department Page update status File'
              ];
              html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
              for (let i = 1; i <= fileLabels.length; i++) {
                html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
              }
              html += `</div>`;
            } else {
              html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">WEBSITE COORDINATOR: ONCE IN SIX MONTHS</span></div>`;
              html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
              html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
              html += `</div>`;
              html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
              html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">8. Budget File</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_1:</span> <span>${details['Upload the scanned file_1'] ? `<a href='${details['Upload the scanned file_1']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
              html += `</div>`;
            }
            return html;
          }
          // Institution-form15.html
          if (row.table && row.table.toLowerCase().includes('institution-form15')) {
            html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">ERP COORDINATOR : MONTHLY</span></div>`;
            html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
            html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
            html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
            html += `</div>`;
            const fileLabels = [
              'Academic ERP File',
              'Finance ERP File',
              'Administrative HR ERP  File',
              'Exam ERP File',
              'Ranking framework file(NBA,NAAC,NIRF)',
              'Data security & access control file',
              'Academic module audit file',
              'Administrative HR audit file',
              'Academic ERP audit file',
              'Finance ERP audit file',
              'Administrative HR ERP audit file',
              'Exam ERP audit file',
              'Reporting and analytics file',
              'User manual file',
              'Training file',
              'System integration and Maintenance file',
              'Budget file'
            ];
            html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
            for (let i = 1; i <= fileLabels.length; i++) {
              html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
            }
            html += `</div>`;
            return html;
          }
            // Institution-form16.html
            if (row.table && row.table.toLowerCase().includes('institution-form16')) {
              html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">PRO : MONTHLY</span></div>`;
              html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
              html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
              html += `</div>`;
              const fileLabels = [
                'Media Relations File',
                'Institutional Branding File',
                'Stakeholder Communication File',
                'Event Coordination File',
                'Digital Presence Management File',
                'Crisis Communication File',
                'Collaboration with Schools File',
                'Collaboration with Local; Officers File',
                'Collaboration with District Administration File'
              ];
              html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
              for (let i = 1; i <= fileLabels.length; i++) {
                html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
              }
              html += `</div>`;
              return html;
            }
            // Institution-form17.html
            if (row.table && row.table.toLowerCase().includes('institution-form17')) {
              html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">LOGISTICS COORDINATOR: MONTHLY</span></div>`;
              html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
              html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
              html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
              html += `</div>`;
              const fileLabels = [
                'Transport and Database file',
                'Logistics Maintenance file',
                'Logistics logbook file',
                'BUS requirement file',
                'Grievances file',
                'IV/Sports/Village visit file'
              ];
              html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
              for (let i = 1; i <= fileLabels.length; i++) {
                html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-1]}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
                html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
              }
              html += `</div>`;
              return html;
            }
    // Institution-form6.html (monthly and once in six months)
    if (row.table && row.table.toLowerCase().includes('institution-form6')) {
      html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">COE</span></div>`;
      html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      let fileLabels = [];
      let startIdx = 1;
      let endIdx = 5;
      if (row.table.toLowerCase().includes('oncein6months')) {
        fileLabels = [
          'UGC, AICTE, AU Regulatory Compliance and Reporting',
          'Remuneration Settlement File',
          'Purchase File',
          'Finance Committee File',
          'Hall Ticket Updates File',
          'Semester Result Analysis File',
          'Discontinued, Debarred, Transfer, Shortage of Students Attendance File',
          'Budget File'
        ];
        startIdx = 6;
        endIdx = 13;
      } else {
        fileLabels = [
          'Academic Schedule & Its Execution Status File',
          'Question Paper Collection Progress File',
          'Certificate Printing process File',
          'Malpractice Prevention and Redressal',
          'Technology and Reforms Once in Six Months'
        ];
      }
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
      for (let i = startIdx; i <= endIdx; i++) {
        html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-startIdx]}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
      html += `</div>`;
      return html;
    }
    // Institution-form5.html
    if (row.table && row.table.toLowerCase().includes('institution-form5')) {
      html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">DIRECTOR - ACADEMICS : MONTHLY</span></div>`;
      html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      const acadRows = [
        'Autonomous Regulations & Curriculum File',
        'AICTE Communications File',
        'UGC Communications File',
        'AU Communications File',
        'Order for Nominees of BOS, Academic council, Governing Council, Finance Committee from AU File',
        'Governing Council File & Its Implementations File',
        'Academic Council File & Its Implementations File',
        'BOS Minutes & Implementation File',
        'Proposal of New Program Introduction with supporting Documents',
        'OBE Promotion Programs for Faculty',
        'Institution Academic Calendar Its Execution Status File',
        'Result Analysis File',
        'New Faculty orientation Programs File',
        'New Faculty Mentoring File',
        'FDP/Workshop/Seminar Programs on UGC Mandate File',
        'Internal Compliance Committee File',
        'Planning and Monitoring File',
        'PO Attainment File (For all Programs)'
      ];
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
      for (let i = 1; i <= acadRows.length; i++) {
        html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${acadRows[i-1]}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
      html += `</div>`;
      return html;
    }
    // Institution-form4.html (monthly and once in six months)
    if (row.table && row.table.toLowerCase().includes('institution-form4')) {
      html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">DEAN - IQAC</span></div>`;
      html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      let fileLabels = [];
      let startIdx = 1;
      let endIdx = 6;
      if (row.table.toLowerCase().includes('once in six months')) {
        fileLabels = [
          'Students Satisfaction Survey File',
          'Academic Administrative Audit File',
          'AQAR Submission Status File'
        ];
        startIdx = 7;
        endIdx = 9;
      } else {
        fileLabels = [
          'Audit Calendar & Its Execution Status File',
          'Internal Audit File',
          'External Audit File',
          'FDP/Workshop/Training on Quality File',
          'Feedback File',
          'Faculty Grievances File'
        ];
      }
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
      for (let i = startIdx; i <= endIdx; i++) {
        html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-startIdx]}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
      html += `</div>`;
      return html;
    }
    // Institution-form3.html
    if (row.table && row.table.toLowerCase().includes('institution-form3')) {
      html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">PRINCIPAL</span></div>`;
      html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      const principalRows = [
        'Strategic Planning and Vision File',
        'Compliance with statutory bodies like AICTE, UGC, and AU File',
        'Budget File',
        'NBA, NAAC, ISO Reports and Certifications  File',
        'Stakeholder Visit Feedback Note'
      ];
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
      for (let i = 1; i <= principalRows.length; i++) {
        html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${principalRows[i-1]}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
      html += `</div>`;
      return html;
    }
    // Institution-form2.html
    if (row.table && row.table.toLowerCase().includes('institution-form2')) {
      html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">HEAD-HR</span></div>`;
      html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      const hrSections = [
        { title: '1.FACULTY RECORDS ( FACULTY GREEN FILE)', rows: [
          'Appointment letters and joining reports',
          'Qualification documents (degrees, certifications)',
          'Experience certificates',
          'Promotion and increment records'
        ] },
        { title: '2.STAFF RECORDS', rows: [
          'Attendance registers or biometric logs',
          'Leave records and approvals',
          'Training and development participation',
          'Disciplinary actions (if any)'
        ] },
        { title: '3.RECRUITMENT DOCUMENTATION', rows: [
          'Recruitment advertisements and selection criteria',
          'Interview panel reports and score sheets',
          'Offer letters and acceptance records'
        ] },
        { title: '4.COMPLIANCE &STATUTORY FILES', rows: [
          'Employment contracts and service rules',
          'Equal opportunity and diversity policies'
        ] },
        { title: '5.POLICY & GOVERNANCE DOCUMENTS', rows: [
          'HR policy manual',
          'Code of conduct',
          'Grievance redressal procedures',
          'Exit interview formats and resignation records'
        ] },
        { title: '6.TRAINING &DEVELOPMENT', rows: [
          'Faculty development program records',
          'Skill enhancement workshops',
          'Feedback and impact analysis reports'
        ] },
        { title: '7.PERFORMANCE ASSESMENT', rows: [
          'Monthly compliance record',
          'Performance appraisal reports'
        ] }
      ];
      let sn = 1;
      html += `<div class='grid grid-cols-1'>`;
      hrSections.forEach(section => {
        html += `<div class='col-span-2 mt-6 mb-2 font-bold text-orange-700 text-lg'>${section.title}</div>`;
        section.rows.forEach((name, i) => {
          html += `<div class='col-span-2 mt-2 mb-1'><span class=\"text-lg font-bold text-purple-700\">${sn}. ${name}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Status_${sn}:</span> <span>${details[`Status_${sn}`] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Description_${sn}:</span> <span>${details[`Description_${sn}`] || '-'}</span></div>`;
          html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${sn}:</span> <span>${details[`Upload the scanned file_${sn}`] ? `<a href='${details[`Upload the scanned file_${sn}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
          sn++;
        });
      });
      html += `</div>`;
      return html;
    }
    // Institution-form1.html (monthly and once in six months)
    if (row.table && row.table.toLowerCase().includes('institution-form1')) {
      html += `<div class=\"mb-4\"><span class=\"text-3xl font-extrabold text-[#7d4c9e] tracking-wide\">Director – Students Welfare & Admissions</span></div>`;
      html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-8\">`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || details['Portfolio Member Name'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      let fileLabels = [];
      let startIdx = 1;
      let endIdx = 21;
      if (row.table.toLowerCase().includes('once in six months')) {
        fileLabels = ['Induction Program for First Year Students'];
        startIdx = 22;
        endIdx = 22;
      } else {
        fileLabels = [
          'Students External Counselling File',
          'Medical Facilities File',
          'Students Grievances',
          'Institution Level Cultural',
          'Institution Level Sports',
          'Institution Level Extra Curricular Activities',
          'Students Clubs',
          'Orientation Program for Students',
          'Hostel Mess File',
          'Hostel Students Attendance',
          'Hostel Certifications',
          'Hotel Grievance Redressal',
          'Scholarship File',
          'Students Welfare schemes File',
          'Campus Discipline',
          'Institution Policy and Code of Conduct for Students',
          'Outreach programs',
          'School Visit File',
          'Marketing Progress',
          'Admission File',
          'Admission Process'
        ];
      }
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
      for (let i = startIdx; i <= endIdx; i++) {
        html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${fileLabels[i-startIdx]}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_${i}:</span> <span>${details[`Upload the scanned file_${i}`] ? `<a href='${details[`Upload the scanned file_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
      html += `</div>`;
      return html;
    }
    // Institution-form7.html
    if (row.table && row.table.toLowerCase().includes('institution-form7')) {
      html += `<div class="mb-4"><span class="text-3xl font-extrabold text-[#7d4c9e] tracking-wide">EXECUTIVE DEAN : MONTHLY</span></div>`;
      html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">`;
      html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month:'] || '-'}</span></div>`;
      html += `</div>`;
      const fileLabels = [
        'Roadmap for internalization and its Progress File',
        'Policy for International Partnership with University & Research Centers',
        'Global Partnership MOU File',
        'Students Mobility Programs File',
        'International Students Admission File',
        'Global Ranking Applications File'
      ];
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>`;
      for (let i = 1; i <= 6; i++) {
        html += `<div class='col-span-2 mt-4 mb-2'><span class="text-lg font-bold text-purple-700">${i}. ${fileLabels[i-1]}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        let fileVal = details[`Upload the scanned file_${i}`];
        let fileHtml = '-';
        if (fileVal && typeof fileVal === 'string' && fileVal !== 'null' && fileVal.trim() !== '' && fileVal !== '-') {
          fileHtml = `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
        }
        html += `<div><span class="font-semibold text-gray-700">Upload the scanned file_${i}:</span> <span>${fileHtml}</span></div>`;
      }
      html += `</div>`;
      return html;
    }
  // Faculty-form7.html
  if (portfolio.includes('student support system member')) {
    let freq = '';
    let tableName = row.table || '';
    
    // Detect frequency from table name or portfolio 
    if (tableName.includes('weekly') || portfolio.includes('weekly')) freq = 'weekly';
    else if (tableName.includes('2 month') || tableName.includes('2months') || portfolio.includes('2 month') || portfolio.includes('2months') || portfolio.includes('once in 2 months')) freq = '2months';
    else if (tableName.includes('semester') || portfolio.includes('semester')) freq = 'semester';
    else freq = 'weekly'; // default
    
    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Student Support System Member (Discipline & Extra Curricular) (${freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || details['Week No'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
    if (freq === 'weekly') {
      const weeklyFiles = [
        'Mentor File',
        'Disciplinary Actions File',
        'Extra-Curricular Activities & Achievements File (Sports, Yoga & Cultural)',
        'National Festival celebration & Participation File',
        'Extension Activities File'
      ];
      for (let i = 1; i <= 5; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${weeklyFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    } else if (freq === '2months') {
      const twoMonthFiles = [
        'Student Feedback On Faculty File',
        'Feedback Analysis & Action Taken Report File',
        'Students Grievance Redressal File'
      ];
      for (let i = 1; i <= 3; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${twoMonthFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    } else if (freq === 'semester') {
      const semesterFiles = [
        'Student Feedback On Faculty File',
        'Feedback Analysis & Action Taken Report File',
        'Students Grievance Redressal File'
      ];
      for (let i = 1; i <= 3; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${semesterFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    }
    html += `</div>`;
    return html;
  }

  // Faculty-form4.html - Course Outcome & Program Outcome Member (Exam Cell)
  // Faculty-form4.html - Course Outcome & Program Outcome Member (Exam Cell) (Monthly, form4-once in a month)
  if (portfolio.includes('course outcome & program outcome member') && (row.table || '').toLowerCase().includes('form4-once in a month')) {
    html += `<div class=\"mb-4\"><span class=\"text-2xl font-bold text-purple-700\">Course Outcome & Program Outcome Member (Exam Cell) - Monthly</span></div>`;
    html += `<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6\">`;
    html += `<div><span class=\"font-semibold text-gray-700\">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Name:</span> <span>${details['Portfolio Name'] || details['Portfolio Name:'] || '-'}</span></div>`;
    html += `<div><span class=\"font-semibold text-gray-700\">Portfolio Member Name:</span> <span>${details['Portfolio Memeber Name'] || details['Portfolio Member Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
    html += `</div>`;
    // Only 8 required fields
    const labels = [
      'Exam TimeTable File',
      'Internal Exam Question Paper File With Answer Key',
      'Result Analysis File',
      'Question Bank',
      'Slow Learner Couching File',
      'Action taken for Internal Test Failures File',
      'Result File',
      'ERP internal Mark Entry File'
    ];
    html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>`;
    for (let i = 1; i <= labels.length; i++) {
      html += `<div class='col-span-2 mt-4 mb-2'><span class=\"text-lg font-bold text-purple-700\">${i}. ${labels[i-1]}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
      let fileVal = details[`Upload The Scanned File_${i}`];
      let fileHtml = '-';
      if (fileVal && typeof fileVal === 'string' && fileVal !== 'null' && fileVal.trim() !== '' && fileVal !== '-') {
        fileHtml = `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
      }
      html += `<div><span class=\"font-semibold text-gray-700\">Upload The Scanned File_${i}:</span> <span>${fileHtml}</span></div>`;
    }
    html += `</div>`;
    return html;
  }

  // Faculty-form8.html - Facilities & Technical Support Member (Lab Member)
  if (portfolio.includes('facilities & technical support member') || portfolio.includes('lab member')) {
    let freq = '';
    let tableName = row.table || '';
    
    // Detect frequency from table name or portfolio
    if (tableName.includes('weekly') || portfolio.includes('weekly')) freq = 'weekly';
    else if (tableName.includes('3 month') || tableName.includes('3months') || tableName.includes('3 Months') || portfolio.includes('3 month')) freq = '3months';
    else if (tableName.includes('semester') || tableName.includes('Semester') || portfolio.includes('semester')) freq = 'semester';
    else freq = 'weekly'; // default
    
    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Facilities & Technical Support Member (Lab Member) (${freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || details['Week No'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
    
    if (freq === 'weekly') {
      const weeklyFiles = [
        "Lab Student Entry Register File for all labs",
        "Lab Observation and Record audit Report (2 Labs per week)"
      ];
      for (let i = 1; i <= 2; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${weeklyFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    } else if (freq === '3months') {
      const threeMonthFiles = [
        "Lab Facility Requirements File",
        "Lab Equipment Audit Report",
        "Technical Support Activities File"
      ];
      for (let i = 1; i <= 3; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${threeMonthFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    } else if (freq === 'semester') {
      const semesterFiles = [
        "Semester Lab Report",
        "Equipment Maintenance Report"
      ];
      for (let i = 1; i <= 2; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${semesterFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    }
    html += `</div>`;
    return html;
  }

  // Faculty-form1.html
  if (portfolio.includes('students performance in training & placement member')) {
    let freq = '';
    let tableName = row.table || '';
    
    // Detect frequency from table name or portfolio
    if (tableName.includes('weekly') || tableName.includes('Weekly') || portfolio.includes('weekly')) freq = 'weekly';
    else if (tableName.includes('15') || portfolio.includes('15')) freq = '15days';
    else if (tableName.includes('semester') || portfolio.includes('semester')) freq = 'semester';
    else if (tableName.includes('year') || portfolio.includes('year')) freq = 'yearly';
    else freq = 'weekly'; // default
    
    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Students Performance in Training & Placement Member (${freq === '15days' ? 'Once in 15 Days' : freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    if (freq === 'weekly') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week No:</span> <span>${details['Week No'] || details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      // Helper function for file field
      function getFileButton(val1, val2) {
        let fileVal = val1 || val2;
        if (fileVal && typeof fileVal === 'string' && fileVal !== '-' && fileVal !== 'null' && fileVal.trim() !== '' && (fileVal.startsWith('http://') || fileVal.startsWith('https://') || fileVal.match(/\.(pdf|docx?|xlsx?|jpg|jpeg|png)$/i))) {
          return `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
        }
        return '-';
      }
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Lab Visit File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_1:</span> <span>${getFileButton(details['Upload The Scanned File_1'], details['Upload the scanned file_1'])}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>2. Theory Class Monitoring File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_2:</span> <span>${details['Status_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_2:</span> <span>${details['Description_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_2:</span> <span>${getFileButton(details['Upload The Scanned File_2'], details['Upload the scanned file_2'])}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>3. Placement File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_3:</span> <span>${details['Status_3'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_3:</span> <span>${details['Description_3'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_3:</span> <span>${getFileButton(details['Upload The Scanned File_3'], details['Upload the scanned file_3'])}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>4. Training File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_4:</span> <span>${details['Status_4'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_4:</span> <span>${details['Description_4'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_4:</span> <span>${getFileButton(details['Upload The Scanned File_4'], details['Upload the scanned file_4'])}</span></div>`;
    } else if (freq === '15days') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Department Meeting File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload the scanned file:</span> <span>${details['Upload the scanned file'] ? `<a href='${details['Upload the scanned file']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>2. Career Guidance Program File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_2:</span> <span>${details['Status_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_2:</span> <span>${details['Description_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload the scanned file_2:</span> <span>${details['Upload the scanned file_2'] ? `<a href='${details['Upload the scanned file_2']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
    } else if (freq === 'yearly') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week No:</span> <span>${details['Week No'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Admission File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload Scanned File_1:</span> <span>${details['Upload Scanned File_1'] ? `<a href='${details['Upload Scanned File_1']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>2. Dept.Best Practices File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_2:</span> <span>${details['Status_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_2:</span> <span>${details['Description_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload Scanned File_2:</span> <span>${details['Upload Scanned File_2'] ? `<a href='${details['Upload Scanned File_2']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
    } else if (freq === 'semester') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>Semester Workdone Details</div>`;
      // Dynamically show all status/desc/file blocks for semester
      for (let i = 1; i <= 10; i++) {
  html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. Workdone Block</div>`;
  html += `<div><span class='font-semibold text-gray-700'>Status-${i}:</span> <span>${details[`Status-${i}`] || '-'}</span></div>`;
  html += `<div><span class='font-semibold text-gray-700'>Description-${i}:</span> <span>${details[`Description-${i}`] || '-'}</span></div>`;
  let fileUrl = details[`Upload The Scanned File-${i}`] || '';
  html += `<div><span class='font-semibold text-gray-700'>Upload The Scanned File-${i}:</span> <span>${fileUrl ? `<a href='${fileUrl}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    }
    html += `</div>`;
    return html;
  }

  // Faculty-form2.html
  if (portfolio.includes('class advisor')) {
    let freq = '';
    let tableName = row.table || '';
    
    // Detect frequency from table name or portfolio
    if (tableName.includes('daily') || portfolio.includes('daily')) freq = 'daily';
    else if (tableName.includes('weekly') || portfolio.includes('weekly')) freq = 'weekly';
    else if (tableName.includes('month') || portfolio.includes('month')) freq = 'monthly';
    else if (tableName.includes('semester') || portfolio.includes('semester')) freq = 'semester';
    else freq = 'daily'; // default frequency
    
    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Class Advisor Workdone Details (${freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    if (freq === 'daily') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Action Taken report for Absentees</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload the scanned file:</span> <span>${details['Upload the scanned file'] ? `<a href='${details['Upload the scanned file']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>2. Master Logbook</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_2:</span> <span>${details['Status_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_2:</span> <span>${details['Description_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload the scanned file_2:</span> <span>${details['Upload the scanned file_2'] ? `<a href='${details['Upload the scanned file_2']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
    } else if (freq === 'weekly') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week No:</span> <span>${details['Week No'] || details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Student Achievements File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload Scanned File_1:</span> <span>${details['Upload Scanned File_1'] ? `<a href='${details['Upload Scanned File_1']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>2. Individual Student Report</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_2:</span> <span>${details['Status_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_2:</span> <span>${details['Description_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload Scanned File_2:</span> <span>${details['Upload Scanned File_2'] ? `<a href='${details['Upload Scanned File_2']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
    } else if (freq === 'monthly') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      // 8 status/desc/upload blocks
      const monthFiles = [
        'Master Log Book',
        'Attendence Report To Parents',
        'ERP Attendence Entry',
        'Test Report to Parents',
        'Class Committee Meeting File',
        'Scholarship file',
        'Project File',
        'Student Publications File'
      ];
      for (let i = 1; i <= 8; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${monthFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    } else if (freq === 'semester') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Number:</span> <span>${details['Week Number'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Semester Report to Parents</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_1:</span> <span>${details['Upload The Scanned File_1'] ? `<a href='${details['Upload The Scanned File_1']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
    }
    html += `</div>`;
    return html;
  }

  // Faculty-form3.html
  if (portfolio.includes('faculty information & contribution member')) {
    let freq = '';
    let tableName = row.table || '';
    // Detect frequency from table name or portfolio
    if (tableName.includes('weekly') || tableName.includes('Weekly') || portfolio.includes('weekly')) freq = 'weekly';
    else if (tableName.includes('15') || portfolio.includes('15')) freq = '15days';
    else if (tableName.includes('semester') || portfolio.includes('semester')) freq = 'semester';
    else freq = 'weekly'; // default

    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Faculty Information & Contribution Member (${freq === '15days' ? 'Once in 15 Days' : freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
    // Render header fields in a single grid row for proper alignment
    html += `<div class="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4 items-center">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
    html += `</div>`;
    if (freq === 'weekly') {
      const rowHeaders = [
        'Faculty Achievements File(FDP,NPTEL,AWARDS,etc...)',
        'Publications/Books/Book Chapter Publications File',
        'Patents File',
        'Faculty Funded Projects File',
        'Faculty Consultancy work File',
        'Faculty Industry Interaction File',
        'Faculty Outside world Interaction file',
        'Visiting/Adjunct/Emeritus Faculty/Prof. of Practice File',
        'MOUs/Collaborations'
      ];
      html += `<div class='space-y-4'>`;
      for (let i = 1; i <= 8; i++) {
        html += `<div class="border-b pb-2 mb-2">
          <div class="font-semibold text-orange-500 mb-1">${i}. ${rowHeaders[i]}</div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div class="flex flex-col"><span class="font-medium text-purple-700">Status:</span> <span>${details[`Status-${i}`] || '-'}</span></div>
            <div class="flex flex-col"><span class="font-medium text-purple-700">Description:</span> <span>${details[`Description-${i}`] || '-'}</span></div>
            <div class="flex flex-col"><span class="font-medium text-purple-700">Upload:</span> `;
        let fileVal = details[`Upload The Scanned File-${i}`] || '-';
        if (fileVal && fileVal !== '-' && typeof fileVal === 'string' && (fileVal.startsWith('http://') || fileVal.startsWith('https://') || fileVal.match(/\.(pdf|docx?|xlsx?|jpg|jpeg|png)$/i))) {
          html += `<a href="${fileVal}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow text-sm font-semibold inline-block">View File</a>`;
        } else {
          html += '-';
        }
        html += `</div>
          </div>
        </div>`;
      }
      html += `</div>`;
      return html;
    }
  }
  if (portfolio.includes('course outcome & program outcome member')) {
      let freq = '';
      if (portfolio.includes('weekly')) freq = 'weekly';
      else if (portfolio.includes('month')) freq = 'monthly';
      else if (portfolio.includes('semester')) freq = 'semester';
      html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Course Outcome & Program Outcome Member (${freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
      html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
      html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || details['Week No'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      if (freq === 'weekly') {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Slip Test File</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload Scanned File_1:</span> <span>${details['Upload Scanned File_1'] ? `<a href='${details['Upload Scanned File_1']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      } else if (freq === 'monthly') {
        const monthFiles = [
          'Exam TimeTable File',
          'Internal Exam Question Paper File With Answer Key',
          'Result Analysis File',
          'Question Bank',
          'Slow Learner Couching File',
          'Action taken for Internal Test Failures File',
          'Result File',
          'ERP internal Mark Entry File'
        ];
        for (let i = 1; i <= 8; i++) {
          html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${monthFiles[i-1]}</div>`;
          html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
        }
      } else if (freq === 'semester') {
        const semesterFiles = [
          'Semester Result and Analysis File',
          'Average Grade Point File',
          'Success Rate with Backlog & without Backlog',
          'Academic Performance in Second Year',
          'Attainment of CO',
          'Attainment of PO',
          'Attainment of PSO',
          'Mapping of CO & PO File'
        ];
        for (let i = 1; i <= 8; i++) {
          html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${semesterFiles[i-1]}</div>`;
          html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
        }
      }
      html += `</div>`;
      return html;
    }

    // Faculty-form5.html
    if (portfolio.includes('continuous improvement member')) {
      let freq = '';
      let tableName = row.table || '';
      
      // Detect frequency from table name or portfolio
      if (tableName.includes('weekly') || portfolio.includes('weekly')) freq = 'weekly';
      else if (tableName.includes('3 month') || tableName.includes('3months') || tableName.includes('3 Months') || portfolio.includes('3 month') || portfolio.includes('3months') || portfolio.includes('once in 3 months')) freq = '3months';
      else if (tableName.includes('semester') || portfolio.includes('semester')) freq = 'semester';
      else freq = 'weekly'; // default
      
      html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Continuous Improvement Member (Program Member) (${freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
      html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
      html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || details['Week No'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      if (freq === 'weekly') {
        const weeklyFiles = [
          'Cocurricular Activities (Including MOU, Professional Body, Association, Club activities) File',
          'MOU & Professional Body Document File (Including office Bearers)',
          'Industry Visit file',
          'Entrepreneurship Activities File',
          'Student Internship File',
          'Student In-plant Training File'
        ];
        for (let i = 1; i <= 6; i++) {
          html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${weeklyFiles[i-1]}</div>`;
          html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Upload a Scanned File_${i}:</span> <span>${details[`Upload a Scanned File_${i}`] || details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload a Scanned File_${i}`] || details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
        }
      } else if (freq === '3months') {
        const threeMonthFiles = [
          'Dept. Technical Magazine',
          'Dept. News letter',
          'Website Updation File'
        ];
        for (let i = 1; i <= 3; i++) {
          html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${threeMonthFiles[i-1]}</div>`;
          html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
        }
      } else if (freq === 'semester') {
        const semesterFiles = [
          'Improvement in Curriculum for mapping POs and PSOs',
          'Indirect Assessment to show attainment of POs and PSOs',
          'Success Rate with Backlog & without Backlog'
        ];
        for (let i = 1; i <= 3; i++) {
          html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${semesterFiles[i-1]}</div>`;
          html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
          html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
        }
      }
      html += `</div>`;
      return html;
    }

      // Faculty-form6.html
      if (portfolio.includes('teaching & learning process member')) {
        let freq = '';
        let tableName = row.table || '';
        
        // Detect frequency from table name or portfolio
        if (tableName.includes('weekly') || portfolio.includes('weekly')) freq = 'weekly';
        else if (tableName.includes('2 month') || tableName.includes('2months') || portfolio.includes('2 month') || portfolio.includes('2months') || portfolio.includes('once in 2 months')) freq = '2months';
        else if (tableName.includes('semester') || portfolio.includes('semester')) freq = 'semester';
        else freq = 'semester'; // default for form6
        
        html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Teaching & Learning Process Member (IQAC) (${freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
        html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
        html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || details['Week No'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
        if (freq === 'weekly') {
          const weeklyFiles = [
            'Course File Audit Report(2 Faculty)',
            'Logbook Audit Report(2 Faculty)',
            'Master Logbook Audit Report',
            'ERP Entry REport',
            'Assignments File',
            'Innovative Teaching Tools File',
            'Dept.Youtube Channel File',
            'Google Class Room(3 Faculty)',
            'Mentor Book Audit Report(2 Faculty)'
          ];
          for (let i = 1; i <= 9; i++) {
            html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${weeklyFiles[i-1]}</div>`;
            html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
            html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
            html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
          }
        } else if (freq === '2months') {
          const twoMonthFiles = [
            'Feedback from Alumini File',
            'Feedback from Parenst File',
            'Feedback from Employer File',
            'Feedback from Faculty File'
          ];
          for (let i = 1; i <= 4; i++) {
            html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${twoMonthFiles[i-1]}</div>`;
            html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
            html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
            html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
          }
        } else if (freq === 'semester') {
          const semesterFiles = [
            'Internal Audit File',
            'External Audit File',
            'Students Satisfaction Survey'
          ];
          for (let i = 1; i <= 3; i++) {
            html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${semesterFiles[i-1]}</div>`;
            html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
            html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
            html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
          }
        }
        html += `</div>`;
        return html;
      }

        // form-asp.html
  if (
    portfolio.includes('asp core scope form') ||
    portfolio.includes('asp form') ||
    portfolio.includes('faculty asp scope')
  ) {
    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Faculty Core Scope - ASP Form</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name'] || details['Portfolio Name:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Member Name'] || '-'}</span></div>`;
    html += `</div>`;
    html += `<div class='mt-4'>`;
    // SCOPE blocks (22 rows)
    const scopes = [
      'Teaching and Curriculum Delivery: Design and deliver lectures, tutorials, and lab sessions as per the academic calendar and subjects assigned.',
      'Teaching and Curriculum Delivery: Develop course materials, lesson plans, and assessments aligned with OBE for the subjects assigned.',
      'Teaching and Curriculum Delivery: Incorporate innovative teaching methods, including ICT tools and experiential learning.',
      'Teaching and Curriculum Delivery: Prepare Product model and instructional Chart for the assigned subject.',
      'Student Mentorship and Support: Act as academic mentors and guide 30 students on coursework, projects, and career planning.',
      'Student Mentorship and Support: Monitor student attendance, performance, and well-being.',
      'Student Mentorship and Support: Provide remedial support and encourage participation in co-curricular and extra-curricular activities.',
      'Student Mentorship and Support: Maintain the Mentor book for assigned mentee.',
      'Student Mentorship and Support: Consolidate innovative course material, Lab manuals',
      'Research and Development: Present at conferences.',
      'Research and Development: Guide student research and final-year projects',
      'Institutional Development: Participate in curriculum development and revision through Boards of Studies.',
      'Institutional Development: Contribute to accreditation processes (NBA, NAAC) and quality assurance initiatives.',
      'Institutional Development: Serve on academic and administrative committees.',
      'Professional Development: Attend FDP/ workshops/ seminar.',
      'Professional Development: Pursue higher qualifications, NPTEL/MOOC and certifications, and memberships in professional bodies.',
      'Community and Industry Engagement: Facilitate industry-institute interaction through guest lectures, Internships.',
      'Community and Industry Engagement: Engage in extension activities, and social outreach Programs.',
      'Administrative Duties: Maintain academic records, course files, Log Book and student evaluations.',
      'Administrative Duties: Assist in examination duties, including question paper setting, invigilation, and evaluation.',
      'Administrative Duties: Submit the FPBA (Faculty performance Based Appraisal) along with the support documents on time.',
      'Other: Any other work assigned by the Principal/Head of Department.'
    ];
    for (let i = 1; i <= 22; i++) {
      html += `<div class='col-span-2 mt-4 mb-2'><span class="text-lg font-bold text-purple-700">${i}. ${scopes[i-1]}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
      let fileVal = details[`Upload the scanned file_${i}`];
      let fileHtml = '-';
      if (fileVal && typeof fileVal === 'string' && fileVal !== 'null' && fileVal.trim() !== '' && fileVal !== '-') {
        fileHtml = `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
      }
      html += `<div><span class="font-semibold text-gray-700">Upload the scanned file_${i}:</span> <span>${fileHtml}</span></div>`;
    }
    html += `</div>`;
    return html;
  }
   
    // form-prof.html
  if (
    portfolio.includes('professor core scope form') ||
    portfolio.includes('prof form') ||
    portfolio.includes('faculty prof scope')
  ) {
    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Faculty Core Scope - Professor Form</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name'] || details['Portfolio Name:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Member Name'] || '-'}</span></div>`;
    html += `</div>`;
    html += `<div class='mt-4'>`;
    // SCOPE blocks (22 rows)
    const scopes = [
      'Teaching and Curriculum Delivery: Design and deliver lectures, tutorials, and lab sessions as per the academic calendar and subjects assigned.',
      'Teaching and Curriculum Delivery: Develop course materials, lesson plans, and assessments aligned with OBE for the subjects assigned.',
      'Teaching and Curriculum Delivery: Incorporate innovative teaching methods, including ICT tools and experiential learning.',
      'Teaching and Curriculum Delivery: Prepare Product model and instructional Chart for the assigned subject.',
      'Student Mentorship and Support: Act as academic mentors and guide 30 students on coursework, projects, and career planning.',
      'Student Mentorship and Support: Monitor student attendance, performance, and well-being.',
      'Student Mentorship and Support: Provide remedial support and encourage participation in co-curricular and extra-curricular activities.',
      'Student Mentorship and Support: Maintain the Mentor book for assigned mentee.',
      'Student Mentorship and Support: Consolidate innovative course material, Lab manuals',
      'Research and Development: Present at conferences.',
      'Research and Development: Guide student research and final-year projects',
      'Institutional Development: Participate in curriculum development and revision through Boards of Studies.',
      'Institutional Development: Contribute to accreditation processes (NBA, NAAC) and quality assurance initiatives.',
      'Institutional Development: Serve on academic and administrative committees.',
      'Professional Development: Attend FDP/ workshops/ seminar.',
      'Professional Development: Pursue higher qualifications, NPTEL/MOOC and certifications, and memberships in professional bodies.',
      'Community and Industry Engagement: Facilitate industry-institute interaction through guest lectures, Internships.',
      'Community and Industry Engagement: Engage in extension activities, and social outreach Programs.',
      'Administrative Duties: Maintain academic records, course files, Log Book and student evaluations.',
      'Administrative Duties: Assist in examination duties, including question paper setting, invigilation, and evaluation.',
      'Administrative Duties: Submit the FPBA (Faculty performance Based Appraisal) along with the support documents on time.',
      'Other: Any other work assigned by the Principal/Head of Department.'
    ];
    for (let i = 1; i <= 22; i++) {
      html += `<div class='col-span-2 mt-4 mb-2'><span class="text-lg font-bold text-purple-700">${i}. ${scopes[i-1]}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
      let fileVal = details[`Upload the scanned file_${i}`];
      let fileHtml = '-';
      if (fileVal && typeof fileVal === 'string' && fileVal !== 'null' && fileVal.trim() !== '' && fileVal !== '-') {
        fileHtml = `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
      }
      html += `<div><span class="font-semibold text-gray-700">Upload the scanned file_${i}:</span> <span>${fileHtml}</span></div>`;
    }
    html += `</div>`;
    return html;
  }
  // Default: show all fields as table
  html += '<table class="min-w-full text-left">';
  for (const [key, value] of Object.entries(details)) {
    if (key === '_original') continue;
    let cellContent = '';
    if (typeof value === 'string' && value.startsWith('http')) {
      cellContent = `<a href='${value}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow' style='text-decoration:none;'>View File</a>`;
    } else if (value === '') {
      cellContent = "<span class='text-gray-400'>-</span>";
    } else {
      cellContent = value;
    }
    html += `<tr><th class="pr-4 py-2 text-gray-700 font-semibold align-top">${key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</th><td class="py-2">${cellContent}</td></tr>`;
  }
  html += '</table>';
  return html;
}
