


// form-modal-mapper.js
// Reusable modal content mapper for all faculty forms

function getFormModalContent(row, details) {
  // Detect form type
  let portfolio = row.portfolio ? row.portfolio.toLowerCase() : '';
  let html = '';

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
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
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
  if (portfolio.includes('course outcome & program outcome member')) {
    let freq = '';
    let tableName = row.table || '';
    
    // Detect frequency from table name or portfolio
    if (tableName.includes('weekly') || tableName.includes('Weekly') || portfolio.includes('weekly')) freq = 'weekly';
    else if (tableName.includes('month') || portfolio.includes('month')) freq = 'monthly';
    else if (tableName.includes('semester') || portfolio.includes('semester')) freq = 'semester';
    else freq = 'weekly'; // default
    
    html += `<div class="mb-4"><span class="text-lg font-bold text-purple-700">Course Outcome & Program Outcome Member (Exam Cell) (${freq.charAt(0).toUpperCase() + freq.slice(1)})</span></div>`;
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
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    } else if (freq === '3months') {
      const threeMonthFiles = [
        "Non-Teaching Faculty File",
        "Non-Teaching Faculty Training File"
      ];
      for (let i = 1; i <= 2; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${threeMonthFiles[i-1]}</div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    } else if (freq === 'semester') {
      const semesterFiles = [
        "List of Equipment's File for all Labs",
        "Lab manual, Master Lab Manual with Readings Sample Observations & Records",
        "Stock Register",
        "Maintenance Register",
        "Calibration Register",
        "Infrastructure File (Lab, Class, Seminar, Hall Details with Geotag Photo)",
        "New Lab Facility Created File",
        "Library Book requirements File",
        "Department Library File"
      ];
      for (let i = 1; i <= 9; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${semesterFiles[i-1]}</div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Status_${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Description_${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class=\"font-semibold text-gray-700\">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
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
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Lab Visit File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_1:</span> <span>${details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_1:</span> <span>${details['Description_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_1:</span> <span>${details['Upload The Scanned File_1'] ? `<a href='${details['Upload The Scanned File_1']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>2. Theory Class Monitoring File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_2:</span> <span>${details['Status_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_2:</span> <span>${details['Description_2'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_2:</span> <span>${details['Upload The Scanned File_2'] ? `<a href='${details['Upload The Scanned File_2']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>3. Placement File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_3:</span> <span>${details['Status_3'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_3:</span> <span>${details['Description_3'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload the scanned file_3:</span> <span>${details['Upload the scanned file_3'] ? `<a href='${details['Upload the scanned file_3']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>4. Training File</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status_4:</span> <span>${details['Status_4'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description_4:</span> <span>${details['Description_4'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload the scanned file_4:</span> <span>${details['Upload the scanned file_4'] ? `<a href='${details['Upload the scanned file_4']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
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
        'Master Attendence',
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
    html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    html += `<div><span class="font-semibold text-gray-700">Department:</span> <span>${details['Department'] || details['Department:'] || '-'}</span></div>`;
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Memeber Name'] || details['faculty_name'] || details['Faculty Name'] || details['Name'] || '-'}</span></div>`;
    if (freq === 'weekly') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>1. Faculty Achievements File (FDP, NPTEL, AWARDS, etc...)</div>`;
      html += `<div><span class="font-semibold text-gray-700">Status-1:</span> <span>${details['Status-1'] || details['Status_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Description-1:</span> <span>${details['Description-1'] || details['Description_1'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File:</span> <span>${details['Upload The Scanned File'] || details['Upload The Scanned File_1'] ? `<a href='${details['Upload The Scanned File'] || details['Upload The Scanned File_1']}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
    } else if (freq === '15days') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      // 8 status/desc/file blocks for once in 15 days
      const fifteenDaysFiles = [
        'Publications/Books/Book Chapter Publications File',
        'Patents File',
        'Faculty Funded Projects File',
        'Faculty Consultancy work File',
        'Faculty Industry Interaction File',
        'Faculty Outside world Interaction file',
        'Visiting/Adjunct/Emeritus Faculty/Prof. of Practice File',
        'MOUs/Collaborations'
      ];
      for (let i = 1; i <= 8; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${fifteenDaysFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status-${i}:</span> <span>${details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description-${i}:</span> <span>${details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File-${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    } else if (freq === 'semester') {
      html += `<div><span class="font-semibold text-gray-700">Month:</span> <span>${details['Month'] || details['Month:'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week no:</span> <span>${details['Week no'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Starting Date:</span> <span>${details['Week Starting Date'] || '-'}</span></div>`;
      html += `<div><span class="font-semibold text-gray-700">Week Ending Date:</span> <span>${details['Week Ending Date'] || '-'}</span></div>`;
      // 5 status/desc/file blocks for semester
      const semesterFiles = [
        'Faculty File',
        'Faculty Competency File',
        'Faculty Performance Appraisal File',
        'Faculty Training File',
        'Faculty Participation in Exam Duty, QP Setting, AUR File'
      ];
      for (let i = 1; i <= 5; i++) {
        html += `<div class='col-span-2 mt-2 mb-1 font-bold text-orange-700'>${i}. ${semesterFiles[i-1]}</div>`;
        html += `<div><span class="font-semibold text-gray-700">Status-${i}:</span> <span>${details[`Status-${i}`] || details[`Status_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Description-${i}:</span> <span>${details[`Description-${i}`] || details[`Description_${i}`] || '-'}</span></div>`;
        html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File-${i}:</span> <span>${details[`Upload The Scanned File-${i}`] || details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File-${i}`] || details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
      }
    }
    html += `</div>`;
    return html;
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
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Member Name:'] || '-'}</span></div>`;
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
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
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
    html += `<div><span class="font-semibold text-gray-700">Portfolio Member Name:</span> <span>${details['Portfolio Member Name'] || details['Portfolio Member Name:'] || '-'}</span></div>`;
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
      html += `<div><span class="font-semibold text-gray-700">Upload The Scanned File_${i}:</span> <span>${details[`Upload The Scanned File_${i}`] ? `<a href='${details[`Upload The Scanned File_${i}`]}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow'>View File</a>` : '-'}</span></div>`;
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
