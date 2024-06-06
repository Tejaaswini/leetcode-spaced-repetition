document.getElementById('addProblemForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const problemUrl = document.getElementById('problemUrl').value;
    const problemNotes = document.getElementById('problemNotes').value;
    if (problemUrl) {
      addProblem(problemUrl, problemNotes);
      document.getElementById('problemUrl').value = '';
      document.getElementById('problemNotes').value = '';
    }
  });
  
  function addProblem(url, notes) {
    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    problems.push({ url: url, status: 'New', nextReview: getNextReviewDate(1), notes: notes });
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
      const problemElement = document.createElement('tr');
      problemElement.innerHTML = `
        <td><a href="${problem.url}" target="_blank">${problem.url}</a></td>
        <td>${problem.nextReview}</td>
        <td>${problem.notes}</td>
        <td><button class="edit-button" data-index="${index}">Edit</button></td>
        <td><button class="delete-button" data-index="${index}">Delete</button></td>
      `;
      problemList.appendChild(problemElement);
    });
  
    document.querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', function() {
        editProblem(this.dataset.index);
      });
    });
  
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', function() {
        deleteProblem(this.dataset.index);
      });
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
    const newNotes = prompt("Enter new notes", problems[index].notes);
    if (newUrl) {
      problems[index].url = newUrl;
    }
    if (newNotes) {
      problems[index].notes = newNotes;
    }
    localStorage.setItem('problems', JSON.stringify(problems));
    displayProblems();
  }
  
  document.addEventListener('DOMContentLoaded', displayProblems);
  