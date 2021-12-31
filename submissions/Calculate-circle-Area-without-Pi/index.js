const log = console.log;


const resultOut = document.getElementById("resultOut")


const submitBtn = document.getElementById("submitBtn")


const SInput = document.getElementById("S")


const NInput = document.getElementById("N")



submitBtn.addEventListener("click", () => {

  let S = SInput.value
  const N = NInput.value

  calculatePIs(S, N)
    .then(viewResults)
})

async function calculatePIs(S,N) {
  while (S > Math.exp(-10)) 
    S = Math.sqrt(1-Math.sqrt(1-S*S))/2;
  
  
  return (N/2)*S;
}


function viewResults(r){
  resultOut.innerText = r
}
