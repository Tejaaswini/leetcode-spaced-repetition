// chrome.alarms.onAlarm.addListener(function (alarm) {
//     if (alarm.name === 'reviewReminder') {
//       const problems = JSON.parse(localStorage.getItem('problems')) || [];
//       const now = new Date().toISOString().split('T')[0];
//       const problemsToReview = problems.filter(problem => problem.nextReview <= now);
//       if (problemsToReview.length > 0) {
//         const message = problemsToReview.map(problem => problem.url).join('\n');
//         chrome.notifications.create({
//           type: 'basic',
//           iconUrl: 'icons/icon48.png',
//           title: 'LeetCode Review Reminder',
//           message: `You have problems to review today:\n${message}`
//         });
//       }
//     }
//   });
  
  function scheduleNextReview() {
    const problems = JSON.parse(localStorage.getItem('problems')) || [];
    const now = new Date().toISOString().split('T')[0];
    const problemsToReview = problems.filter(problem => problem.nextReview <= now);
    if (problemsToReview.length > 0) {
      chrome.alarms.create('reviewReminder', { delayInMinutes: 1 });
    }
  }
  
  chrome.runtime.onStartup.addListener(scheduleNextReview);
  chrome.runtime.onInstalled.addListener(scheduleNextReview);
  