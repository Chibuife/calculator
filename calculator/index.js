class Calculator{
   constructor(dataPreviousOperandText, dataCurrentOperandText){
      this.dataPreviousOperandText = dataPreviousOperandText;
      this.dataCurrentOperandText = dataCurrentOperandText;
      this.reset();
   }
   delete(){
      this.dataCurrentOperand = this.dataCurrentOperand.toString().slice(0,-1) 
   }
   reset(){
      this.dataPreviousOperand ='';
      this.dataCurrentOperand = '';
      this.operation = undefined;
   }
   appendNumber(number){
      if (number === '.' && this.dataCurrentOperand.includes('.'))return
      this.dataCurrentOperand =this.dataCurrentOperand.toString() + number.toString();
   }
   chooseOperation(operator){
      if(this.dataCurrentOperand === '')return
      if (this.dataPreviousOperand !== ''){
         this.compute();
      }
      this.operator = operator 
      this.dataPreviousOperand = this.dataCurrentOperand
      this.dataCurrentOperand = '';
   }
   compute(){
      let computation
      const prev = parseFloat(this.dataPreviousOperand);
      const current = parseFloat(this.dataCurrentOperand);
      if(isNaN(prev) || isNaN(current)) return 
      switch(this.operator){
         case '+':
            computation = prev + current
            break;
         case '-':
            computation = prev - current
            break;
         case '/':
            computation = prev / current
            break;
         case 'x':
            computation = prev * current
            break;
         default:
            return
      }
      this.dataCurrentOperand = computation
      this.operator = undefined
      this.dataPreviousOperand = ''
   }
   updateDisplay(){
      this.dataCurrentOperandText.innerText = this.dataCurrentOperand
      this.dataPreviousOperandText.innerText = this.dataPreviousOperand
   }
}
const _ = (string) => document.querySelector(string)
const __ = (string) => document.querySelectorAll(string)

const themes = _('.themebtn');
const themebtn = _('.themeselector');
const body = _('body');
const numbers = __('[data-number]');
const operators = __('[data-operation]');
const dataClear = _('[data-clear]');
const dataEquals = _('[data-equals]');
const dataPreviousOperandText  = _('[data-previousOperand]');
const dataCurrentOperandText = _('[data-currentOperand]');
const dataDelete  = _('[data-delete]');

const calculator = new Calculator(dataPreviousOperandText, dataCurrentOperandText);
[...numbers].forEach((button)=>{
    button.addEventListener('click', ()=>{
       calculator.appendNumber(button.innerText);
       calculator.updateDisplay();
    })
   
});

[...operators].forEach((button)=>{
   button.addEventListener('click', ()=>{
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
   })
  
})
themes.addEventListener('click',()=>{
 if(body.classList ==''){
    themebtn.classList.toggle('newthemetwo');
    body.classList.remove('three');
    body.classList.toggle('two');
 }
 else if(body.classList =='two'){
    themebtn.classList.toggle('newthemethree');
    body.classList.remove('two');
    body.classList.toggle('three');
 }
 else if(body.classList =='three'){
    themebtn.classList.remove('newthemethree');
    themebtn.classList.remove('newthemetwo');
    body.classList.remove('two');
    body.classList.remove('three');
 }
})

dataEquals.addEventListener('click', ()=>{
   calculator.compute();
   calculator.updateDisplay()
})

dataClear.addEventListener('click' ,()=>{
   calculator.reset();
   calculator.updateDisplay()
})

dataDelete.addEventListener('click' ,()=>{
   calculator.delete();
   calculator.updateDisplay()
})