// Check localStorage contents
console.log('localStorage contents:');
console.log('timeEntries:', localStorage.getItem('timeEntries'));
console.log('Parsed entries:', JSON.parse(localStorage.getItem('timeEntries') || '[]'));
