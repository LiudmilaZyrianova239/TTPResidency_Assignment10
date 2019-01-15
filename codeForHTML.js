function generateSuccessHTMLOutput(response) {
    console.log (JSON.stringify(response.data, null, '\t'));
    return  '<h5>Data:</h5>' +
            '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
}
  
function generateErrorHTMLOutput(error) {
    return  '<h4>Error:</h4>' +'<pre>' + error.message + '</pre>'
}

function clearAll() {
    var resultElement = document.getElementById('resultData');
    resultElement.innerHTML = '';
} 

function doGet(){
    var resultElement = document.getElementById('resultData');
    resultElement.innerHTML = '';
  
    axios.get('http://localhost:3000/api/input')
      .then(function (response) {
        resultElement.innerHTML = generateSuccessHTMLOutput(response);
      })
      .catch(function (error) {
        resultElement.innerHTML = generateErrorHTMLOutput(error);
      });
  }



  document.getElementById('inputForm').addEventListener('submit', doPost);
  function doPost(e) {
    var resultElement = document.getElementById('resultData');
    var inputLine = document.getElementById('inputLine').value;
    resultElement.innerHTML = '';
  
    axios.post('http://localhost:3000/api/input', {
        "input": inputLine,
        "length": `${inputLine.length}`
    })
    .then(function(response) {
      //resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function(error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    })
    e.preventDefault();
  }

  

  
