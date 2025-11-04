


// form-modal-mapper.js
// Reusable modal content mapper for all faculty forms

function getFormModalContent(row, details) {
  // Detect form type
  let portfolio = row.portfolio ? row.portfolio.toLowerCase() : '';
  let tableName = row.table ? row.table.toLowerCase() : '';
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
    html += `<div class="mb-4"><span class="text-2xl font-extrabold text-purple-800 tracking-wide">Faculty Core Scope - AP Form</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name'] || details['Portfolio Name:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || '-'}</span></div>`;
    html += `</div>`;
    // Section headers for visual clarity
    const sectionMap = [
      { title: 'Teaching and Curriculum Delivery', color: 'bg-blue-100 text-blue-800', range: [1, 4] },
      { title: 'Student Mentorship and Support', color: 'bg-green-100 text-green-800', range: [5, 9] },
      { title: 'Research and Development', color: 'bg-yellow-100 text-yellow-800', range: [10, 12] },
      { title: 'Institutional Development', color: 'bg-pink-100 text-pink-800', range: [13, 15] },
      { title: 'Professional Development', color: 'bg-purple-100 text-purple-800', range: [16, 18] },
      { title: 'Community and Industry Engagement', color: 'bg-orange-100 text-orange-800', range: [19, 20] },
      { title: 'Administrative Duties', color: 'bg-gray-100 text-gray-800', range: [21, 22] },
      { title: 'Other', color: 'bg-red-100 text-red-800', range: [23, 23] },
    ];
    const scopes = [
      'Design and deliver lectures, tutorials, and lab sessions as per the academic calendar and subjects assigned.',
      'Develop course materials, lesson plans, and assessments aligned with OBE for the subjects assigned.',
      'Incorporate innovative teaching methods, including ICT tools and experiential learning.',
      'Prepare Product model and instructional Chart for the assigned subject.',
      'Act as academic mentors and guide 30 students on coursework, projects, and career planning.',
      'Monitor student attendance, performance, and well-being.',
      'Provide remedial support and encourage participation in co-curricular and extra-curricular activities.',
      'Maintain the Mentor book for assigned mentee.',
      'Consolidate innovative course material, Lab manuals',
      'Publish in peer-reviewed journals',
      'Apply for research grants',
      'Guide student research and final-year projects',
      'Participate in curriculum development and revision through Boards of Studies.',
      'Contribute to accreditation processes (NBA, NAAC) and quality assurance initiatives.',
      'Serve on academic and administrative committees.',
      'Organize FDP/ workshops/ seminar.',
      'NPTEL/MOOC and certifications.',
      'Memberships in professional bodies.',
      'Facilitate MoUs',
      'Engage in consultancy',
      'Maintain academic records, course files, Log Book and student evaluations.',
      'Assist in examination duties, including question paper setting, invigilation, and evaluation.',
      'Other duties as assigned.'
    ];
    let sectionIdx = 0;
    html += `<div class="divide-y">`;
    for (let i = 1; i <= 23; i++) {
      // Section header logic
      if (sectionIdx < sectionMap.length && i === sectionMap[sectionIdx].range[0]) {
        html += `<div class="col-span-3 py-2 px-3 rounded ${sectionMap[sectionIdx].color} font-bold text-lg mt-4 mb-2 shadow-sm">${sectionMap[sectionIdx].title}</div>`;
      }
      if (sectionIdx < sectionMap.length && i > sectionMap[sectionIdx].range[1]) {
        sectionIdx++;
        if (sectionIdx < sectionMap.length && i === sectionMap[sectionIdx].range[0]) {
          html += `<div class="col-span-3 py-2 px-3 rounded ${sectionMap[sectionIdx].color} font-bold text-lg mt-4 mb-2 shadow-sm">${sectionMap[sectionIdx].title}</div>`;
        }
      }
      html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 items-center border-b">`;
      html += `<div class="font-semibold text-gray-700">${i}. ${scopes[i-1]}</div>`;
      html += `<div><span class="text-gray-500">Status:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
      html += `<div><span class="text-gray-500">Description:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
      let fileVal = details[`Upload the scanned file_${i}`];
      let fileHtml = '-';
      if (fileVal && typeof fileVal === 'string' && fileVal !== 'null' && fileVal.trim() !== '' && fileVal !== '-') {
        fileHtml = `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
      }
      html += `<div class="md:col-span-3 ml-2">${fileHtml !== '-' ? `<span class='text-gray-500'>File:</span> ${fileHtml}` : ''}</div>`;
      html += `</div>`;
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
        // New 13-row schema and row names from institution-form11.html
        const fileLabels = [
          'Identify skill gaps among students and faculty (survey/feedback)',
          'Collaborate with departments for curriculum/industry alignment',
          'Design annual training calendars (technical, soft skills, career readiness)',
          'Coordinate logistics for workshops, seminars, certifications, guest lectures',
          'Ensure alignment with NBA/NAAC graduate attributes and outcome-based education',
          'Liaise with industry experts, trainers, HR for resource mobilization',
          'Facilitate MoUs for training, internships, experiential learning',
          'Finalize training dates, venues, resource persons (with departments)',
          'Prepare budget proposals, seek approvals (Principal/Governing Body)',
          'Maintain training reports, attendance, feedback, impact analysis',
          'Ensure training modules meet institutional, accreditation standards',
          'Organize training, aptitude sessions, technical bootcamps',
          'Track participation/performance (dashboards, ERP systems)'
        ];
        html += `<div class=\"overflow-x-auto rounded-xl\">`;
        html += `<table class=\"w-full min-w-[800px] text-xs md:text-sm table-fixed mt-2 border border-[#f7a440]\">`;
        html += `<thead class=\"bg-[#f7a440]\"><tr>`;
        html += `<th class=\"text-white font-bold py-2 px-2 text-center rounded-l-xl border-r border-white\">S.No</th>`;
        html += `<th class=\"text-white font-bold py-2 px-2 border-r border-white\">Scope</th>`;
        html += `<th class=\"text-white font-bold py-2 px-2 border-r border-white\">Status</th>`;
        html += `<th class=\"text-white font-bold py-2 px-2 border-r border-white\">Description</th>`;
        html += `<th class=\"text-white font-bold py-2 px-2 text-center rounded-r-xl\">File</th>`;
        html += `</tr></thead><tbody>`;
        for (let i = 0; i < fileLabels.length; i++) {
          const idx = i + 1;
          const status = details[`Status_${idx}`] || '-';
          const desc = details[`Description_${idx}`] || '-';
          let fileCell = '-';
          const fileUrl = details[`Upload the scanned file_${idx}`];
          if (fileUrl && typeof fileUrl === 'string' && fileUrl.trim() !== '') {
            fileCell = `<a href=\"${fileUrl}\" target=\"_blank\" class=\"text-blue-700 underline\">View File</a>`;
          }
          html += `<tr>`;
          html += `<td class=\"border px-2 py-2 text-center\">${idx}</td>`;
          html += `<td class=\"border px-2 py-2\">${fileLabels[i]}</td>`;
          html += `<td class=\"border px-2 py-2\">${status}</td>`;
          html += `<td class=\"border px-2 py-2\">${desc}</td>`;
          html += `<td class=\"border px-2 py-2 text-center\">${fileCell}</td>`;
          html += `</tr>`;
        }
        html += `</tbody></table></div>`;
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
            'Promote a culture of high-quality, interdisciplinary research among faculty and students.',
            'Facilitate the establishment of research centers and labs aligned with national priorities and institutional strengths.',
            'Identify and secure funding from government agencies (eg. DST, AICTE, UGC) and industry partners.',
            'Encourage ideation, prototyping, and product development through hackathons, design challenges, and innovation cells.',
            'Guide faculty and students in patent filing, IPR management, and technology transfer.',
            'Collaborate with Innovation & Incubation Council (IIC) to implement innovation roadmap.',
            'Establish and strengthen incubation centers or tie-ups with external incubators',
            '	Mentor student/faculty start-ups through business model validation, funding support, and investor connects.',
            'Organize entrepreneurship bootcamps, investor meets, and awareness programs.',
            'Draft and implement institutional policies on research, innovation, and entrepreneurship in line with NEP.',
            'Allocate resources (space, seed funding, mentorship) to nurture start-ups.',
            'Promote gender equity and support for women and minority entrepreneurs.',
            '	Establish linkages with industries, research organizations, and international institutions.',
            'Align alumni support for innovation, mentorship, and funding.',
            'Monitor progress against KPIs such as patents, start-ups, funding, and awards.',
            'Publish reports to governing bodies and accreditation agencies.',
            'Assist reports to governing bodies and accreditation agencies.',
            
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
      // New logic: 15 rows, but without Target and TAT columns
      const rows = [
        {scope: "Develop and implement academic policies in line with the institution's vision and autonomy framework."},
        {scope: "Coordinate curriculum design, revision, and approval through Boards of Studies and Academic Council."},
        {scope: "Ensure alignment with AICTE, UGC, and affiliating university norms while leveraging the flexibility of autonomy."},
        {scope: "Oversee the introduction of new programs and courses based on industry trends and academic advancements."},
        {scope: "Promote interdisciplinary learning and outcome-based education (OBE)."},
        {scope: "Ensure timely updates to syllabi with inputs from industry and academia."},
        {scope: "Supervise academic calendars, timetables, and course delivery across departments."},
        {scope: "Coordinate with the Controller of Examinations for smooth conduct of internal and end-semester assessments."},
        {scope: "Monitor academic performance and implement corrective measures when needed."},
        {scope: "Facilitate faculty orientation, and mentoring."},
        {scope: "Organize faculty development programs (FDPs), workshops, and seminars on quality enhancement and UGC mandate for faculty."},
        {scope: "Promote faculty participation in strategic planning and continuous improvement."},
        {scope: "Coordinate with statutory bodies like the Academic Council and IQAC."},
        {scope: "Ensure compliance with government and regulatory bodies for academic approvals."},
        {scope: "Promote benchmarking and innovation in strategic planning and academic development."},
      ];
      html += `<div class=\"overflow-x-auto rounded-xl\">`;
      html += `<table class=\"w-full min-w-[800px] text-xs md:text-sm table-fixed mt-2 border border-[#f7a440]\">`;
      html += `<thead class=\"bg-[#f7a440]\"><tr>`;
      html += `<th class=\"text-white font-bold py-2 px-2 text-center rounded-l-xl border-r border-white\">S.No</th>`;
      html += `<th class=\"text-white font-bold py-2 px-2 border-r border-white\">Scope</th>`;
      html += `<th class=\"text-white font-bold py-2 px-2 border-r border-white\">Status</th>`;
      html += `<th class=\"text-white font-bold py-2 px-2 border-r border-white\">Description</th>`;
      html += `<th class=\"text-white font-bold py-2 px-2 text-center rounded-r-xl\">File</th>`;
      html += `</tr></thead><tbody>`;
      for (let i = 0; i < rows.length; i++) {
        const idx = i + 1;
        html += `<tr class=\"border-b\">`;
        html += `<td class=\"py-2 px-2 text-center border-r border-[#f7a440]\">${idx}</td>`;
        html += `<td class=\"py-2 px-2 border-r border-[#f7a440]\">${rows[i].scope}</td>`;
        html += `<td class=\"py-2 px-2 border-r border-[#f7a440]\">${details[`Status_${idx}`] || '-'}</td>`;
        html += `<td class=\"py-2 px-2 border-r border-[#f7a440]\">${details[`Description_${idx}`] || '-'}</td>`;
        if (details[`Upload the scanned file_${idx}`]) {
          html += `<td class=\"py-2 px-2 text-center\"><a href=\"${details[`Upload the scanned file_${idx}`]}\" target=\"_blank\" class=\"text-blue-600 underline\">View</a></td>`;
        } else {
          html += `<td class=\"py-2 px-2 text-center\">-</td>`;
        }
        html += `</tr>`;
      }
      html += `</tbody></table></div>`;
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
        // New logic: 20 monthly rows, matching the new schema and design
        const rows = [
          {scope: 'Develop and implement quality benchmarks for academic and administrative activities.'},
          {scope: 'Align institutional practices with NAAC, NBA, and other accreditations, ranking frameworks.'},
          {scope: 'Promote a culture of evidence-based decision-making and continuous improvement.'},
          {scope: 'Adopt quality mandate as per the guidelines of UGC/MOE'},
          {scope: 'Share the UGC/AICTE/MOE Guidelines, Benchmarks with respective Heads/Person concerned towards implementation.'},
          {scope: 'Develop Audit Calendar for the academic year.'},
          {scope: 'Oversee internal audits, academic reviews, and performance evaluations.'},
          {scope: 'Track key performance indicators (KPIs) related to teaching, research, and governance.'},
          {scope: 'Facilitate submission of AQARs, SSRs, and other quality-related documents.'},
          {scope: 'Conduct External AAA, BO Audits.'},
          {scope: 'Conduct External AAA, ISO Audits.'},
          {scope: 'Organize workshops, FDPs, and training programs on quality assurance, teaching innovations, and instructional best practices.'},
          {scope: 'Facilitate implementation of outcome-based teaching-learning methods and accreditation outcomes (OBE).'},
          {scope: 'Facilitate feedback collection from students, alumni, employers, and other stakeholders.'},
          {scope: 'Analyze feedback and initiate corrective actions to enhance quality.'},
          {scope: 'Maintain documentation and records of quality initiatives, audits, and reviews.'},
          {scope: 'Develop and implement policies related to quality, accreditation, and ranking.'},
          {scope: 'Coordinate NAAC, NBA, and other accreditation/ranking support.'},
          {scope: 'Promote innovation, internal audits, and inter-institutional quality initiatives within institutions.'},
          {scope: 'Initiate quality initiative within institutions.'},
        ];
        html += `<div class="mb-4"><span class="text-3xl font-extrabold text-[#7d4c9e] tracking-wide">DEAN - IQAC : MONTHLY</span></div>`;
        html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">`;
        html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
        html += `</div>`;
        html += `<div class="overflow-x-auto rounded-xl">`;
        html += `<table class="w-full min-w-[800px] text-xs md:text-sm table-fixed mt-2 border border-[#f7a440]">`;
        html += `<thead class="bg-[#f7a440]"><tr>`;
        html += `<th class="text-white font-bold py-2 px-2 text-center rounded-l-xl border-r border-white">S.No</th>`;
        html += `<th class="text-white font-bold py-2 px-2 border-r border-white">Scope</th>`;
        html += `<th class="text-white font-bold py-2 px-2 border-r border-white">Status</th>`;
        html += `<th class="text-white font-bold py-2 px-2 border-r border-white">Description</th>`;
        html += `<th class="text-white font-bold py-2 px-2 text-center rounded-r-xl">File</th>`;
        html += `</tr></thead><tbody>`;
        for (let i = 0; i < rows.length; i++) {
          const idx = i + 1;
          html += `<tr class="bg-[#faf7ff]">`;
          html += `<td class="text-center font-semibold">${idx}.</td>`;
          html += `<td class="px-2">${rows[i].scope}</td>`;
          html += `<td class="text-center">${details[`Status_${idx}`] || '-'}</td>`;
          html += `<td class="px-2">${details[`Description_${idx}`] || '-'}</td>`;
          if (details[`Upload the scanned file_${idx}`]) {
            html += `<td class="text-center"><a href="${details[`Upload the scanned file_${idx}`]}" target="_blank" class="text-blue-700 underline">View</a></td>`;
          } else {
            html += `<td class="text-center">-</td>`;
          }
          html += `</tr>`;
        }
        html += `</tbody></table></div>`;
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
      // 35 monthly rows (show all 35, generic label)
      html += `<div class='overflow-x-auto rounded-xl'>`;
      html += `<table class='w-full min-w-[900px] text-xs md:text-sm table-fixed mt-2 border border-[#f7a440]'>`;
      html += `<thead class='bg-[#f7a440]'><tr>`;
      html += `<th class='text-white font-bold py-2 px-2 text-center rounded-l-xl border-r border-white'>S.No</th>`;
      html += `<th class='text-white font-bold py-2 px-2 border-r border-white'>Scope</th>`;
      html += `<th class='text-white font-bold py-2 px-2 border-r border-white'>Status</th>`;
      html += `<th class='text-white font-bold py-2 px-2 border-r border-white'>Description</th>`;
      html += `<th class='text-white font-bold py-2 px-2 text-center rounded-r-xl'>File</th>`;
      html += `</tr></thead><tbody>`;
      // Use the same monthlyRows as in the HTML (35 rows)
      const monthlyRows = [
        'Ensure the physical, emotional, and psychological well-being of students.',
        'Facilitate access to counselling services, health care, and emergency support.',
        'Address student grievances and act as a mediator when necessary.',
        'Organize and oversee extracurricular activities, including cultural, literary, and sports events.',
        'Promote student clubs, societies, and leadership initiatives.',
        'Coordinate orientation and induction programs for new students.',
        'Supervise hostel administration in collaboration with wardens.',
        'Ensure safety, hygiene, and a conducive living environment in hostels.',
        'Address issues related to mess, accommodation, and student discipline.',
        'Facilitate the disbursement of scholarships, fellowships, and student aid funds.',
        'Liaise with government and private agencies for student welfare schemes.',
        'Work with the Principal and disciplinary committees to maintain campus discipline.',
        'Promote awareness of institutional policies and codes of conduct.',
        'Act as a bridge between students and administration.',
        'Represent student interests in academic and administrative councils.',
        'Coordinate with external bodies for student exchange, competitions, and outreach.',
        'Support students from marginalized or underrepresented backgrounds.',
        'Promote inclusivity, gender sensitization, and anti-ragging measures.',
        'Execute admission policies as per the guidelines of State Government of Tamil Nadu.',
        'Ensure adherence to reservation policies and government norms.',
        'Lead institutional outreach through school visits, education fairs, and digital campaigns.',
        'Collaborate with marketing teams to develop brochures, videos, and online content that highlight the college’s strengths.',
        'Build relationships with feeder institutions and career counsellors.',
        'Oversee the entire admissions cycle—from application receipt to final enrolment.',
        'Coordinate entrance exams, interviews, and counselling sessions.',
        'Ensure timely communication with applicants and resolution of queries.',
        'Maintain accurate records of applications, admissions, and enrolment trends.',
        'Analyse data to refine recruitment strategies and forecast future intake.',
        'Prepare reports for internal review and regulatory compliance.',
        'Oversee the entire admissions cycle—from application receipt to final enrolment. (Repeat)',
        'Coordinate entrance exams, interviews, and counselling sessions. (Repeat)',
        'Ensure timely communication with applicants and resolution of queries. (Repeat)',
        'Maintain accurate records of applications, admissions, and enrolment trends. (Repeat)',
        'Analyse data to refine recruitment strategies and forecast future intake. (Repeat)',
        'Prepare reports for internal review and regulatory compliance. (Repeat)'
      ];
      for (let i = 0; i < 35; i++) {
        const idx = i + 1;
        html += `<tr class='bg-[#faf7ff]'>`;
        html += `<td class='text-center font-semibold'>${idx}.</td>`;
        html += `<td class='px-2'>${monthlyRows[i]}</td>`;
        html += `<td class='text-center'>${details[`Status_${idx}`] || '-'}</td>`;
        html += `<td class='px-2'>${details[`Description_${idx}`] || '-'}</td>`;
        html += `<td class='text-center'>${details[`Upload the scanned file_${idx}`] ? `<a href='${details[`Upload the scanned file_${idx}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</td>`;
        html += `</tr>`;
      }
      html += `</tbody></table></div>`;
      return html;
    }
    // Institution-form7.html
    if (row.table && row.table.toLowerCase().includes('institution-form7')) {
      // New logic: 16 monthly rows, matching the new schema
      const rows = [
        { scope: "Formulate and implement the institution’s internationalization roadmap.", target: "", tot: "30TH JULY" },
        { scope: "Align global initiatives with the college’s academic mission and regulatory framework.", target: "", tot: "30TH JULY" },
        { scope: "Develop policies for international partnerships, mobility, and global program delivery.", target: "", tot: "30TH JULY" },
        { scope: "Identify and establish collaborations with foreign universities, research centers, and industries.", target: "FLU; RC-4; INDUSTRY-2", tot: "31ST MAY" },
        { scope: "Facilitate signing and execution of MoUs for student/faculty exchange, joint research, and dual-degree programs.", target: "3 MOUS", tot: "31ST MAY" },
        { scope: "Facilitate, supervise, and exchange of MoUs for student/faculty exchange, joint research, and dual-degree programs.", target: "3", tot: "31ST MAY" },
        { scope: "Maintain active engagement with international consortia and networks.", target: "", tot: "31ST MAY" },
        { scope: "Promote and manage inbound and outbound exchange programs, internships, and study-abroad programs.", target: "20 STUDENTS, 10 FACULTY", tot: "31ST MAY" },
        { scope: "Facilitate participation in international teaching, research, and sabbatical programs.", target: "5 FACULTY", tot: "31ST MAY" },
        { scope: "Ensure visa facilitation, orientation, and support services for international students and faculty.", target: "10 EXTERNAL STUDENTS AND 5 FACULTY", tot: "31ST MAY" },
        { scope: "Develop digital strategies to attract international students.", target: "10 COUNTRY", tot: "30TH SEP" },
        { scope: "Plan, guide, and coordinate admission of international students.", target: "10 COUNTRY", tot: "31ST DEC" },
        { scope: "Facilitate accommodation, onboarding, and integration of international students.", target: "10 COUNTRY", tot: "END OF FRIDAY" },
        { scope: "Ensure compliance with national and international regulations related to international education.", target: "10 COUNTRY", tot: "25TH OF EVERY MONTH" },
        { scope: "Liaise with regulatory bodies for policy alignment and reporting.", target: "10 COUNTRY", tot: "25TH OF EVERY MONTH" },
        { scope: "Track KPIs such as MoUs signed, international student/faculty numbers, and international leadership accreditation bodies, and regulatory agencies.", target: "", tot: "31ST MAY" },
      ];
      html += `<div class="mb-4"><span class="text-2xl font-extrabold text-[#7d4c9e] tracking-wide">EXECUTIVE DEAN – INTERNATIONAL AFFAIRS (Monthly)</span></div>`;
      html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">`;
      html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name:'] || details['Portfolio Name'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month:'] || details['Month'] || '-'}</span></div>`;
      html += `</div>`;
      html += `<div class="overflow-x-auto rounded-xl">`;
      html += `<table class="w-full min-w-[800px] text-xs md:text-sm table-fixed mt-2 border border-[#f7a440]">`;
      html += `<thead class="bg-[#f7a440]"><tr>`;
      html += `<th class="text-white font-bold py-2 px-2 text-center rounded-l-xl border-r border-white">S.No</th>`;
      html += `<th class="text-white font-bold py-2 px-2 border-r border-white">Scope</th>`;
      html += `<th class="text-white font-bold py-2 px-2 border-r border-white">Status</th>`;
      html += `<th class="text-white font-bold py-2 px-2 border-r border-white">Description</th>`;
      html += `<th class="text-white font-bold py-2 px-2 text-center rounded-r-xl">File</th>`;
      html += `</tr></thead><tbody>`;
      for (let i = 0; i < rows.length; i++) {
        const idx = i + 1;
        html += `<tr class="bg-[#faf7ff]">`;
        html += `<td class="text-center font-semibold">${idx}.</td>`;
        html += `<td class="px-2">${rows[i].scope}</td>`;
        html += `<td class="text-center">${details[`Status_${idx}`] || '-'}</td>`;
        html += `<td class="px-2">${details[`Description_${idx}`] || '-'}</td>`;
        if (details[`Upload the scanned file_${idx}`]) {
          html += `<td class="text-center"><a href="${details[`Upload the scanned file_${idx}`]}" target="_blank" class="text-blue-700 underline">View</a></td>`;
        } else {
          html += `<td class="text-center">-</td>`;
        }
        html += `</tr>`;
      }
      html += `</tbody></table></div>`;
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
    // Improved frequency detection for bi-weekly/15 days
    if (tableName.includes('once in 15 days') || tableName.includes('bi-weekly') || tableName.includes('15 days') || portfolio.includes('once in 15 days') || portfolio.includes('bi-weekly') || portfolio.includes('15 days')) {
      freq = '15days';
    } else if (tableName.includes('weekly') || portfolio.includes('weekly')) {
      freq = 'weekly';
    } else if (tableName.includes('semester') || portfolio.includes('semester')) {
      freq = 'semester';
    } else if (tableName.includes('year') || portfolio.includes('year')) {
      freq = 'yearly';
    } else {
      freq = 'weekly'; // default
    }

  html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Students Performance in Training & Placement Member (${freq === '15days' ? 'Once in 15 Days' : freq === 'weekly' ? 'Weekly' : freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    if (freq === '15days') {
      html += `<div><span class=\"font-semibold text-gray-700\">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `<div class='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Department Meeting File</div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class=\"font-semibold text-gray-700\">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
      function getFileButton(val) {
        if (val && typeof val === 'string' && val !== '-' && val !== 'null' && val.trim() !== '') {
          return `<a href='${val}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
        }
        return '-';
      }
  html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file:</span> <span>${getFileButton(details['Upload The Scanned File_1'])}</span></div>`;
  html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>2. Career Guidance Program File</div>`;
  html += `<div><span class=\"font-semibold text-gray-700\">Status_2:</span> <span>${details['Status_2'] || '-'}</span></div>`;
  html += `<div><span class=\"font-semibold text-gray-700\">Description_2:</span> <span>${details['Description_2'] || '-'}</span></div>`;
  html += `<div><span class=\"font-semibold text-gray-700\">Upload the scanned file_2:</span> <span>${getFileButton(details['Upload The Scanned File_2'])}</span></div>`;
      html += `</div>`;
    } else if (freq === 'weekly') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `</div>`;
      
      html += `<div class='space-y-4'>`;
      
      // Define field labels for weekly Students Performance form
      const weeklyLabels = [
        'Lab Visit File',
        'Theory Class Monitoring File',
        'Placement File',
        'Training File'
      ];
      
      // Show only fields that have content
      for (let i = 1; i <= weeklyLabels.length; i++) {
        const hasStatus = details[`Status_${i}`] && details[`Status_${i}`] !== '-' && details[`Status_${i}`].trim() !== '';
        const hasDescription = details[`Description_${i}`] && details[`Description_${i}`] !== '-' && details[`Description_${i}`].trim() !== '';
        
        // Try multiple possible field name patterns for file upload
        let fileVal = details[`Upload The Scanned File_${i}`] || details[`Upload the scanned file_${i}`] || details[`Upload Scanned File_${i}`] || '-';
        const hasFile = fileVal && fileVal !== '-' && fileVal.trim() !== '';
        
        // Only show this block if it has any content
        if (hasStatus || hasDescription || hasFile) {
          html += `<div class="border-b pb-2 mb-2">
            <div class="font-semibold text-orange-500 mb-1">${i}. ${weeklyLabels[i-1]}</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div class="flex flex-col"><span class="font-medium text-purple-700">Status:</span> <span>${details[`Status_${i}`] || '-'}</span></div>
              <div class="flex flex-col"><span class="font-medium text-purple-700">Description:</span> <span>${details[`Description_${i}`] || '-'}</span></div>
              <div class="flex flex-col"><span class="font-medium text-purple-700">Upload:</span> `;
          if (fileVal && fileVal !== '-' && typeof fileVal === 'string' && (fileVal.startsWith('http://') || fileVal.startsWith('https://') || fileVal.match(/\.(pdf|docx?|xlsx?|jpg|jpeg|png)$/i))) {
            html += `<a href="${fileVal}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow text-sm font-semibold inline-block">View File</a>`;
          } else {
            html += '-';
          }
          html += `</div>
            </div>
          </div>`;
        }
      }
      
      html += `</div>`;
      return html;
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
      
      // Only show blocks that have some content (status, description, or file)
      for (let i = 1; i <= rowHeaders.length; i++) {
        const hasStatus = details[`Status-${i}`] && details[`Status-${i}`] !== '-' && details[`Status-${i}`].trim() !== '';
        const hasDescription = details[`Description-${i}`] && details[`Description-${i}`] !== '-' && details[`Description-${i}`].trim() !== '';
        
        // Try multiple possible field name patterns for file upload
        // For Faculty Information & Contribution Member, the field name is just "Upload The Scanned File" without number
        let fileVal = '';
        if (i === 1) {
          // For the first item, try the field without number suffix
          fileVal = details[`Upload The Scanned File`] || details[`Upload The Scanned File-${i}`] || details[`Upload The Scanned File_${i}`] || details[`Upload the scanned file_${i}`] || details[`Upload the Scanned File-${i}`] || '-';
        } else {
          // For other items, try with number suffix
          fileVal = details[`Upload The Scanned File-${i}`] || details[`Upload The Scanned File_${i}`] || details[`Upload the scanned file_${i}`] || details[`Upload the Scanned File-${i}`] || '-';
        }
        const hasFile = fileVal && fileVal !== '-' && fileVal.trim() !== '';
        
        // Only show this block if it has any content
        if (hasStatus || hasDescription || hasFile) {
          html += `<div class="border-b pb-2 mb-2">
            <div class="font-semibold text-orange-500 mb-1">${i}. ${rowHeaders[i-1]}</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div class="flex flex-col"><span class="font-medium text-purple-700">Status:</span> <span>${details[`Status-${i}`] || '-'}</span></div>
              <div class="flex flex-col"><span class="font-medium text-purple-700">Description:</span> <span>${details[`Description-${i}`] || '-'}</span></div>
              <div class="flex flex-col"><span class="font-medium text-purple-700">Upload:</span> `;
          if (fileVal && fileVal !== '-' && typeof fileVal === 'string' && (fileVal.startsWith('http://') || fileVal.startsWith('https://') || fileVal.match(/\.(pdf|docx?|xlsx?|jpg|jpeg|png)$/i))) {
            html += `<a href="${fileVal}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow text-sm font-semibold inline-block">View File</a>`;
          } else {
            html += '-';
          }
          html += `</div>
            </div>
          </div>`;
        }
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
    portfolio.includes('faculty asp scope') ||
    (tableName && tableName.includes('asp'))
  ) {
    html += `<div class="mb-4"><span class="text-2xl font-extrabold text-purple-800 tracking-wide">Faculty Core Scope - ASP Form</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name'] || details['Portfolio Name:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Member Name'] || '-'}</span></div>`;
    html += `</div>`;
    // Section headers for visual clarity
    const sectionMap = [
      { title: 'Teaching and Curriculum Delivery', color: 'bg-blue-100 text-blue-800', range: [1, 4] },
      { title: 'Student Mentorship and Support', color: 'bg-green-100 text-green-800', range: [5, 9] },
      { title: 'Research and Development', color: 'bg-yellow-100 text-yellow-800', range: [10, 12] },
      { title: 'Institutional Development', color: 'bg-pink-100 text-pink-800', range: [13, 15] },
      { title: 'Professional Development', color: 'bg-purple-100 text-purple-800', range: [16, 18] },
      { title: 'Community and Industry Engagement', color: 'bg-orange-100 text-orange-800', range: [19, 20] },
      { title: 'Administrative Duties', color: 'bg-gray-100 text-gray-800', range: [21, 22] },
      { title: 'Other', color: 'bg-red-100 text-red-800', range: [23, 23] },
    ];
    const scopes = [
      'Design and deliver lectures, tutorials, and lab sessions as per the academic calendar and subjects assigned.',
      'Develop course materials, lesson plans, and assessments aligned with OBE for the subjects assigned.',
      'Incorporate innovative teaching methods, including ICT tools and experiential learning.',
      'Prepare Product model and instructional Chart for the assigned subject.',
      'Act as academic mentors and guide 30 students on coursework, projects, and career planning.',
      'Monitor student attendance, performance, and well-being.',
      'Provide remedial support and encourage participation in co-curricular and extra-curricular activities.',
      'Maintain the Mentor book for assigned mentee.',
      'Consolidate innovative course material, Lab manuals',
      'Publish in peer-reviewed journals',
      'Apply for research grants',
      'Guide student research and final-year projects',
      'Participate in curriculum development and revision through Boards of Studies.',
      'Contribute to accreditation processes (NBA, NAAC) and quality assurance initiatives.',
      'Serve on academic and administrative committees.',
      'Organize FDP/ workshops/ seminar.',
      'NPTEL/MOOC and certifications.',
      'Memberships in professional bodies.',
      'Facilitate industry-institute interaction through guest lectures, Internships.',
      'Engage in consultancy',
      'Maintain academic records, course files, Log Book and student evaluations.',
      'Assist in examination duties, including question paper setting, invigilation, and evaluation.',
      'Other duties as assigned.'
    ];
    let sectionIdx = 0;
    html += `<div class="divide-y">`;
    for (let i = 1; i <= 23; i++) {
      // Section header logic
      if (sectionIdx < sectionMap.length && i === sectionMap[sectionIdx].range[0]) {
        html += `<div class="col-span-3 py-2 px-3 rounded ${sectionMap[sectionIdx].color} font-bold text-lg mt-4 mb-2 shadow-sm">${sectionMap[sectionIdx].title}</div>`;
      }
      if (sectionIdx < sectionMap.length && i > sectionMap[sectionIdx].range[1]) {
        sectionIdx++;
        if (sectionIdx < sectionMap.length && i === sectionMap[sectionIdx].range[0]) {
          html += `<div class="col-span-3 py-2 px-3 rounded ${sectionMap[sectionIdx].color} font-bold text-lg mt-4 mb-2 shadow-sm">${sectionMap[sectionIdx].title}</div>`;
        }
      }
      html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 items-center border-b">`;
      html += `<div class="font-semibold text-gray-700">${i}. ${scopes[i-1]}</div>`;
      html += `<div><span class="text-gray-500">Status:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
      html += `<div><span class="text-gray-500">Description:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
      let fileVal = details[`Upload the scanned file_${i}`];
      let fileHtml = '-';
      if (fileVal && typeof fileVal === 'string' && fileVal !== 'null' && fileVal.trim() !== '' && fileVal !== '-') {
        fileHtml = `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
      }
      html += `<div class="md:col-span-3 ml-2">${fileHtml !== '-' ? `<span class='text-gray-500'>File:</span> ${fileHtml}` : ''}</div>`;
      html += `</div>`;
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
    html += `<div class="mb-4"><span class="text-2xl font-extrabold text-purple-800 tracking-wide">Faculty Core Scope - Professor Form</span></div>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Name:</span> <span>${details['Portfolio Name'] || details['Portfolio Name:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Member Name'] || '-'}</span></div>`;
    html += `</div>`;
    // Section headers for visual clarity
    const sectionMap = [
      { title: 'Teaching and Curriculum Delivery', color: 'bg-blue-100 text-blue-800', range: [1, 4] },
      { title: 'Student Mentorship and Support', color: 'bg-green-100 text-green-800', range: [5, 9] },
      { title: 'Research and Development', color: 'bg-yellow-100 text-yellow-800', range: [10, 11] },
      { title: 'Institutional Development', color: 'bg-pink-100 text-pink-800', range: [12, 14] },
      { title: 'Professional Development', color: 'bg-purple-100 text-purple-800', range: [15, 16] },
      { title: 'Community and Industry Engagement', color: 'bg-orange-100 text-orange-800', range: [17, 18] },
      { title: 'Administrative Duties', color: 'bg-gray-100 text-gray-800', range: [19, 21] },
      { title: 'Other', color: 'bg-red-100 text-red-800', range: [22, 22] },
    ];
    const scopes = [
      'Design and deliver lectures, tutorials, and lab sessions as per the academic calendar and subjects assigned.',
      'Develop course materials, lesson plans, and assessments aligned with OBE for the subjects assigned.',
      'Incorporate innovative teaching methods, including ICT tools and experiential learning.',
      'Prepare Product model and instructional Chart for the assigned subject.',
      'Act as academic mentors and guide 30 students on coursework, projects, and career planning.',
      'Monitor student attendance, performance, and well-being.',
      'Provide remedial support and encourage participation in co-curricular and extra-curricular activities.',
      'Maintain the Mentor book for assigned mentee.',
      'Consolidate innovative course material, Lab manuals',
      'Present at conferences.',
      'Guide student research and final-year projects',
      'Participate in curriculum development and revision through Boards of Studies.',
      'Contribute to accreditation processes (NBA, NAAC) and quality assurance initiatives.',
      'Serve on academic and administrative committees.',
      'Attend FDP/ workshops/ seminar.',
      'Pursue higher qualifications, NPTEL/MOOC and certifications, and memberships in professional bodies.',
      'Facilitate industry-institute interaction through guest lectures, Internships.',
      'Engage in extension activities, and social outreach Programs.',
      'Maintain academic records, course files, Log Book and student evaluations.',
      'Assist in examination duties, including question paper setting, invigilation, and evaluation.',
      'Submit the FPBA (Faculty performance Based Appraisal) along with the support documents on time.',
      'Any other work assigned by the Principal/Head of Department.'
    ];
    let sectionIdx = 0;
    html += `<div class="divide-y">`;
    for (let i = 1; i <= 22; i++) {
      // Section header logic
      if (sectionIdx < sectionMap.length && i === sectionMap[sectionIdx].range[0]) {
        html += `<div class="col-span-3 py-2 px-3 rounded ${sectionMap[sectionIdx].color} font-bold text-lg mt-4 mb-2 shadow-sm">${sectionMap[sectionIdx].title}</div>`;
      }
      if (sectionIdx < sectionMap.length && i > sectionMap[sectionIdx].range[1]) {
        sectionIdx++;
        if (sectionIdx < sectionMap.length && i === sectionMap[sectionIdx].range[0]) {
          html += `<div class="col-span-3 py-2 px-3 rounded ${sectionMap[sectionIdx].color} font-bold text-lg mt-4 mb-2 shadow-sm">${sectionMap[sectionIdx].title}</div>`;
        }
      }
      html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 items-center border-b">`;
      html += `<div class="font-semibold text-gray-700">${i}. ${scopes[i-1]}</div>`;
      html += `<div><span class="text-gray-500">Status:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
      html += `<div><span class="text-gray-500">Description:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
      let fileVal = details[`Upload the scanned file_${i}`];
      let fileHtml = '-';
      if (fileVal && typeof fileVal === 'string' && fileVal !== 'null' && fileVal.trim() !== '' && fileVal !== '-') {
        fileHtml = `<a href='${fileVal}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>`;
      }
      html += `<div class="md:col-span-3 ml-2">${fileHtml !== '-' ? `<span class='text-gray-500'>File:</span> ${fileHtml}` : ''}</div>`;
      html += `</div>`;
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
