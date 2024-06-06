document.getElementById('addProblemForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const problemUrl = document.getElementById('problemUrl').value;
    if (problemUrl) {
      addProblem(problemUrl);
      document.getElementById('problemUrl').value = '';
    }
  });
  
  function addProblem(url) {
    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    problems.push({ url: url, status: 'New', nextReview: getNextReviewDate(1) });
    localStorage.setItem('problems', JSON.stringify(problems));
    displayProblems();
  }
  
  function getNextReviewDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }
  
  function displayProblems() {
    const problems = JSON.parse(localStorage.getItem('problems')) || [];
    const problemList = document.getElementById('problemList');
    problemList.innerHTML = '';
    problems.forEach((problem, index) => {
      const problemElement = document.createElement('div');
      problemElement.innerHTML = `
        <div>
          ${problem.url} - ${problem.status} - Next Review: ${problem.nextReview}
          <button onclick="editProblem(${index})" class="edit-button">Edit</button>
          <button onclick="deleteProblem(${index})" class="delete-button">Delete</button>
        </div>
      `;
      problemList.appendChild(problemElement);
    });
  }
  
  function deleteProblem(index) {
    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    problems.splice(index, 1);
    localStorage.setItem('problems', JSON.stringify(problems));
    displayProblems();
  }
  
  function editProblem(index) {
    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    const newUrl = prompt("Enter the new URL", problems[index].url);
    if (newUrl) {
      problems[index].url = newUrl;
      localStorage.setItem('problems', JSON.stringify(problems));
      displayProblems();
    }
  }
  
  document.addEventListener('DOMContentLoaded', displayProblems);
  