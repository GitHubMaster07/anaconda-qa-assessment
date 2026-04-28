const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, '../test-results/results.json');
const metricsPath = path.join(__dirname, '../metrics.json');

function loadHistoricalMetrics() {
  if (fs.existsSync(metricsPath)) {
    return JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
  }
  return [];
}

function saveMetrics(metrics) {
  fs.writeFileSync(metricsPath, JSON.stringify(metrics, null, 2));
}

function collectMetrics() {
  if (!fs.existsSync(resultsPath)) {
    console.log('No test results found. Run tests first.');
    return;
  }

  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  const metrics = loadHistoricalMetrics();

  const totalDuration = results.stats?.duration || 0;
  const totalTests = results.stats?.total || 0;
  const passedTests = results.stats?.passed || 0;
  const failedTests = results.stats?.failed || 0;
  const flakyCount = results.suites?.reduce((acc, suite) => {
    return acc + (suite.specs?.filter(s => 
      s.tests?.some(t => t.retry > 0)
    ).length || 0);
  }, 0) || 0;

  const newMetric = {
    timestamp: new Date().toISOString(),
    totalDuration,
    totalTests,
    passedTests,
    failedTests,
    flakyCount,
    successRate: ((passedTests / totalTests) * 100).toFixed(2)
  };

  metrics.push(newMetric);
  
  // Keep only last 100 runs
  if (metrics.length > 100) {
    metrics.shift();
  }

  saveMetrics(metrics);
  
  console.log('\n📊 Metrics collected:');
  console.log(`   Time: ${newMetric.timestamp}`);
  console.log(`   Duration: ${(totalDuration / 1000).toFixed(2)}s`);
  console.log(`   Tests: ${passedTests}/${totalTests} passed`);
  console.log(`   Flaky: ${flakyCount}`);
  console.log(`   Success rate: ${newMetric.successRate}%`);

  // Generate trend report
  if (metrics.length >= 5) {
    const last5 = metrics.slice(-5);
    const avgDuration = last5.reduce((sum, m) => sum + m.totalDuration, 0) / last5.length;
    const avgSuccessRate = last5.reduce((sum, m) => sum + parseFloat(m.successRate), 0) / last5.length;
    
    console.log('\n📈 Trend (last 5 runs):');
    console.log(`   Avg duration: ${(avgDuration / 1000).toFixed(2)}s`);
    console.log(`   Avg success rate: ${avgSuccessRate.toFixed(2)}%`);
    
    // Alert on degradation
    if (parseFloat(newMetric.successRate) < avgSuccessRate - 10) {
      console.log('\n⚠️ Alert: Success rate dropped by >10%!');
    }
    if (newMetric.totalDuration > avgDuration * 1.2) {
      console.log('\n⚠️ Alert: Test duration increased by >20%!');
    }
  }
}

collectMetrics();