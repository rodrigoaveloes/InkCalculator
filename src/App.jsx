import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Modal from 'react-modal';
function App() {

//modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const [frase, setFrase]= useState('');
  function openModal() { setIsOpen(true)}
  function closeModal() {setIsOpen(false)}
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  //modal


 // react-hook-form e armazenando dados do formulario no useState
  const { register, handleSubmit, reset, resetField,  formState: { errors } } = useForm({
  bgWallHeight:"",
  frontWallHeight:"",
  leftWallHeight:"",
  rightWallHeight:"",
  bgWallWidth:"",
  frontWallWidth:"",
  leftWallWidth:"",
  rightWall:""
  });
  const onSubmit = (data) => {
        calculateArea(data)
        reset();
        resetField();
    
      }


const calculateArea = (data) => {
  
   // SEPARANDO INFORMAÇÕES DE LARGURA E ALTURA
   const height = [data.bgWallHeight, data.frontWallHeight, data.leftWallHeight, data.rightWallHeight]
   const width = [data.bgWallWidth, data.frontWallWidth, data.leftWallWidth, data.rightWallWidth]
 
    //convertendo de string para number, map no array calculando a altura das 4 paredes 
     let numberHeight = height.map(Number) 
      const reducerHeight = (accumulator, curr) => accumulator + curr ;
      let resultFinalHeight = (numberHeight.reduce(reducerHeight));
  
  //convertendo de string para number, map no array calculando a largura das 4 paredes 
      let numberWidth = width.map(Number) 
      const reducerWidth = (accumulator, curr) => accumulator + curr ;
      let resultFinalWidth = (numberWidth.reduce(reducerWidth));


  //calculando o valor total das paredes
      const valueTotalWalls = resultFinalWidth * resultFinalHeight / 4
      alert(`O tamanho total das paredes é: ${valueTotalWalls.toFixed(2)} m²`)
  
  
      // calculando o valor a retirar com janelas e portas 
      const windowSize  = 2.00 * 1.20 
      const doorSize =  0.80 * 1.90
      const totalDoorsValue = doorSize * data.doors
      const totalWindowsValue = windowSize * data.windows
  
      const valueOfWithDraw = totalDoorsValue + totalWindowsValue

  
      if(valueOfWithDraw > valueTotalWalls/2){
        alert('o tamanho das portas e janelas não pode ultrapassar 50% da area de parede disponivel ')
      }else
      {
        let areaM2 =  valueTotalWalls - valueOfWithDraw
        
        
        let TotalM2 = areaM2.toFixed(1)
        
        
        
        let litros = TotalM2 / 5
        let total = Math.round(litros)
        alert(`Sua área total a ser pintada tem: ${TotalM2} M², e será necessário ${total} Litro(s) de tinta`)
        
      
        const latas = [18, 3.6, 2.5, 0.5];
        const result = [];
        
        // declarei uma variável que vai possuir o resto da conta.
        let rest = total.toFixed(2);
        
        for (let value of latas) {
          // Math.floor para pegar somente o menor número inteiro 
          const amount = Math.floor( rest / value);
          
          //  se a condição para que quando o resultado for igual a zero ele ignore o script e passe para o próximo valor
          if (amount === 0) continue; 
          
          // Adicionamos os valores na lista
          result.push({ value, amount  });
          
          // Atribui o resto da divisão ao resto para continuar o proximo calculo do loopíng 
          rest = rest % value;
          
       }
       
       let resultFinal = result.map(function(item, indice){
         const value = item.value
         const amount = item.amount
         
         return [` ${amount} lata(s) de ${value} Litros` ]
        });


        const finalResult = `para pintar a área informada sugerimos que compre: ${resultFinal}`;
        setFrase(finalResult)
        openModal()
       
        return finalResult;
        
      }
      
    }

      return (

<div className="App">

      <Header/>
{/* MODAL */}
      <div>
      <Modal  
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 className="font-bold my-2">Concluído ✅</h1>
        <hr className="mb-6"/>
        <h2 className="font-normal text-slate-400">{frase}</h2>
        <button onClick={closeModal} className="custom-button p-3 text-sm">Fazer um novo calculo 🎨</button>
      </Modal>
    </div>    
{/* MODAL */}

<div className=" w-2/3 m-3 flex px-auto mx-auto lg:px-4 lg:w-full sm:flex-col align-center">
  <div className="w-1/2 md:w-full  my-auto mx-auto align-middle">
    <h1 className="h1-custom">Calculadora de Tinta</h1>
    <p className="p-custom">Faça o cálculo para saber a quantidade de tinta necessária para pintar um ambiente e evitar desperdicios.</p>
  <h5 className="h5-custom">Em todos os cantos colocar medida em metros entre 1 e 50 M² <br/> EX: 5.3 </h5>

<form onSubmit={handleSubmit(onSubmit)}>

<label className=" ml-1"> parede de fundo</label>
<div className="flex">
<input
    type="number"
    className="custom-input"
    placeholder="Altura"
    {...register("bgWallHeight",{required: true, maxLength: 4, min: 1, max: 50})}
    />
    <br />
    <div>

    {errors.bgWallHeight && <p className="error">Coloque um valor valido entre 1 e 50</p>}
    </div>

<input 
    type="number"
    className="custom-input"
    placeholder="Largura"
    {...register("bgWallWidth" ,{required: true, maxLength: 4, min: 1, max: 50})}
    />
    {errors.bgWallWidth && <p className="error">Coloque um valor valido entre 1 e 50</p>}
  </div>

<label className="ml-1">parede de frente</label>
<div className="flex">
    <input 
    type="number"
    className="custom-input"
    placeholder="Altura"
    {...register("frontWallHeight" ,{required: true, maxLength: 4, min: 1, max: 50})}
    />
        {errors.frontWallHeight && <p className="error">Coloque um valor valido entre 1 e 50</p>}

    <input 
    type="number"
    className="custom-input"
    placeholder="Largura"
    {...register("frontWallWidth",{required: true, maxLength: 4, min: 1, max: 50})}
    />
        {errors.frontWallWidth && <p className="error">Coloque um valor valido entre 1 e 50</p>}
    
</div>


<label className=" ml-1">parede de direita</label>
<div className="flex">
    <input 
    type="number"
    className="custom-input"
    placeholder="Altura"
    {...register("rightWallHeight" ,{required: true, maxLength: 4, min: 1, max: 50})}
    />
        {errors.rightWallHeight && <p className="error">Coloque um valor valido entre 1 e 50</p>}


    <input 
    type="number"
    className="custom-input"
    placeholder="Largura"
    {...register("rightWallWidth",{required: true, maxLength: 4, min: 1, max: 50})}
    />
    {errors.rightWallWidth && <p className="error">Coloque um valor valido entre 1 e 50</p>}
    
</div>


<label className=" ml-1">parede esquerda</label>
<div className="flex">
  <input 
      type="number"
      className="custom-input"
      placeholder="Altura"
      {...register("leftWallHeight",{required: true, maxLength: 4, min: 1, max: 50})}
      />
    {errors.leftWallHeight && <p className="error">Coloque um valor valido entre 1 e 50</p>}


  <input 
      type="number"
      className="custom-input"
      placeholder="Largura"
      {...register("leftWallWidth",{required: true, maxLength: 4, min: 1, max: 50})}
      />
    {errors.leftWallWidth && <p className="error">Coloque um valor valido entre 1 e 50</p>}
  </div>

    <hr className="my-6"/>    
    {/* inputs janela e porta */}
    <label className="select-label">Porta(s)</label>
    <select className="custom-select" 
     {...register("doors",{required: true})} >

        <option value={"default"} disabled>
          Escolha uma opção
        </option>
          <option value="1">1 Porta</option>
          <option value="2">2 Portas</option>
          <option value="3">3 Portas</option>
          <option value="4">4 Portas</option>
          <option value="5">5 Portas</option>
          <option value="6">6 Portas</option>
          <option value="7">7 Portas</option>
          <option value="8">8 Portas</option>
          <option value="9">9 Portas</option>
          <option value="10">10 Portas</option>
      </select>
<br/>

    <label className="select-label">Janela(s)</label>
    <select className="custom-select" 
    {...register('windows')}   
    >  
          <option value="0" >
          Escolha uma opção
        </option>
          <option value="1">1 Janela</option>
          <option value="2">2 Janelas</option>
          <option value="3">3 Janelas</option>
          <option value="4">4 Janelas</option>
          <option value="5">5 Janelas</option>
          <option value="6">6 Janelas</option>
          <option value="7">7 Janelas</option>
          <option value="8">8 Janelas</option>
          <option value="9">9 Janelas</option>
          <option value="10">10 Janelas</option>
      </select>
      <button type="submit" className="custom-button">Calcular</button>
     </form>
      </div>
        </div>
          <Footer/>
              </div>
      )
}
export default App

