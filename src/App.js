import { type } from '@testing-library/user-event/dist/type';
import { useReducer, useState } from 'react';
import styled from 'styled-components';




let countMoney = 0;
const todoReducer = (oldState, action) => {
  switch (action.type) {
    case 'ADD':
      if(action.moneyType === '' || action.text === '') {
        alert('값을 입력하세요.');
        return oldState;
      }
      let newList = [...oldState];


      let newId = 0;
      // 키값을 위한 id
      if (oldState.length !== 0) {
        newId = oldState[oldState.length - 1].id + 1;
      }

      // console.log(newId);
      // console.log(action.moneyType);
      // console.log(typeof action.text);  // String형
      // console.log(action.text);

      if(action.moneyType === 'moneyin') {
        countMoney += parseInt(action.text);
        newList.push({ moneyType: '(수입)', text: action.text, id: newId});
      }
      else if(action.moneyType === 'moneyout') {
        countMoney -= parseInt(action.text);
        newList.push({ moneyType: '(지출)', text: action.text, id: newId});
      }

      //console.log(countMoney);
      return newList;

    case 'DELETE':
      
      console.log(action.moneyType);
//      console.log(action.money); // undifined
      if(action.moneyType === '(수입)') {
        countMoney -= parseInt(action.money);
      }
      else if(action.moneyType === '(지출)') {
        countMoney += parseInt(action.money);
      }
//      console.log(countMoney); // Nan?
      return oldState.filter(todo => todo.id !== action.id);


    default:
      return oldState;
  }
}


function App() {

  const [todo, todoDispatch] = useReducer(todoReducer, []);

  const [input, setInput] = useState('');

  // 타입 선택
  const [moneyType, setMoneyType] = useState('');

  // 금액 계산
  //const [totalMoney, setTotalMoney] = useState(0);

  return (
    <div className="App">
      <h1>가계부</h1>

      <div>
        <input type="radio" name="type" value="moneyin"
        onChange={(e) => setMoneyType(e.target.value)}
        /> 수입
        <input type="radio" name="type" value="moneyout"
        onChange={(e) => setMoneyType(e.target.value)}
        /> 지출
      </div>


      금액<input type="number"
      plackeholder="금액"
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
        // 금액 계산
        //setTotalMoney(e.target.value);
      }}
      />


      <button
      onClick={() => {
        todoDispatch({ type: 'ADD', text: input, moneyType: moneyType});
        setInput(''); 
      }}
      >추가</button>

      <br/>
      {/* 수입 지출에 따라 총 금액 출력 */}
      {/* todo에서 계산해서 출력해야하나? */}
      {/* 새로 reducer 만들어야하나? */}
      <h3>총 금액 : {countMoney}</h3>
      <ul>

        {/* 일단 아이디로 키 값을 정함 */}
      { todo.map(todo => (
        <li key={todo.id}>
          {todo.moneyType}
          {todo.text}
          <button onClick={() => todoDispatch(
            // 삭제하기 위해서 id과 타입, 그리고 가격 보내기
            {type: 'DELETE', id: todo.id, moneyType:todo.moneyType, money:todo.text}
            )}>
            삭제
          </button>
        </li>
      )) }

      </ul>

    </div>
  );
}

export default App;
