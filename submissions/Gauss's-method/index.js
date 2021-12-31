const log = (...args)=> console.log(...args)

const resultOut= document.getElementById("resultOut")


const submitBtn= document.getElementById("submitBtn")


const MatrixAInput= document.getElementById("matrixA")


const MatrixBInput= document.getElementById("matrixB")


// starts from 1
// it sees the one from[0]

submitBtn.addEventListener("click",()=>{
  
const A = JSON.parse(MatrixAInput.value)
const B = JSON.parse(MatrixBInput.value)

log({A,B});

zeroingUsingGauss(A,B)
.then(solveForXs)
.then(viewResults)


})


async function zeroingUsingGauss(_A,_B){
  const A= _A;
  const B= _B;
for (let pevo = 0; pevo < A.length-1; pevo++) {
  const P=A[pevo][pevo]
  arrayDevideBy(A[pevo], P, pevo);
  B[pevo]/=P
  for (let i = pevo+1; i < A.length; i++) {
    const myPevo = A[i][pevo]
    
    // walk: this - thisInPevo*pevoInI
    for (let j = pevo; j < A[i].length; j++) {
        
        log(`${A[i][j]} - (${myPevo})*${A[pevo][j]} = ${A[i][j] -myPevo*A[pevo][j]}`);
        
        A[i][j] -= myPevo*A[pevo][j]
    }
    
    B[i] -= myPevo*B[pevo]
  }
}

return {A, B};

}

async function solveForXs({A,B}){
  const Xs=[]
  for (let i = A.length-1; i>=0; i--) {
    const per = B[i] - A[i].slice(i+1).reduce((tot,n,j)=> tot+(n*Xs[j]),0)
    Xs.unshift(roundNum(per/A[i][i],1e-2))
  }
  return Xs
}


function viewResults(res){
  resultOut.innerText = JSON.stringify(res)
    .replace(/,/gi, ",\n")
    .replace(/\[/gi, "[\n")
    .replace(/\]/gi, "\n]")
}


function arrayDevideBy(arr, val,startAt){
  for (let _i = startAt; _i < arr.length; _i++) {
    arr[_i]/=val
  }
}


function roundNum(num, pow=1){
  return Math.round(num/pow)*pow
}
