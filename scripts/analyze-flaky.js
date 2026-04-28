const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, '../test-results/results.json');

if (fs.existsSync(resultsPath)) {
  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  
  const flakyTests = [];
  
  results.suites?.forEach(suite => {
    suite.specs?.forEach(spec => {
      const retries = spec.tests?.filter(t => t.retry > 0).length || 0;
      if (retries > 0) {
        flakyTests.push({
          title: spec.title,
          retries: retries,
          duration: spec.tests?.[0]?.duration
        });
      }
    });
  });
  
  if (flakyTests.length > 0) {
    console.log(`\n🚨 Found ${flakyTests.length} flaky test(s):\n`);
    flakyTests.forEach(test => {
      console.log(`   📍 ${test.title}`);
      console.log(`      Retries: ${test.retries}`);
      console.log(`      Duration: ${test.duration}ms\n`);
    });
  } else {
    console.log('\n✅ No flaky tests detected\n');
  }
} else {
  console.log('No test results found. Run tests first: npm test');
}