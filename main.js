// 費率設定
const RATE = {
  h_in: Number(localStorage.getItem('__h_in__')) || 0,  // 班內半小時
  h_out: Number(localStorage.getItem('__h_out__')) || 0, // 班外半小時
  f_in: Number(localStorage.getItem('__f_in__')) || 0,  // 班內一小時
  f_out: Number(localStorage.getItem('__f_out__')) || 0, // 班外一小時
};

const RATE_CONTENT = {
  h_in: '班內半小時',
  h_out: '班外半小時',
  f_in: '班內一小時',
  f_out: '班外一小時'
};

function fmt(n) {
  return n.toLocaleString('zh-TW');
}

function calc() {
  const hIn = parseInt(document.getElementById('h_in').value) || 0;
  const hOut = parseInt(document.getElementById('h_out').value) || 0;
  const fIn = parseInt(document.getElementById('f_in').value) || 0;
  const fOut = parseInt(document.getElementById('f_out').value) || 0;

  const hInSal = hIn * RATE.h_in;
  const hOutSal = hOut * RATE.h_out;
  const fInSal = fIn * RATE.f_in;
  const fOutSal = fOut * RATE.f_out;

  const subIn = hInSal + fInSal;
  const subOut = hOutSal + fOutSal;
  const total = subIn + subOut;

  document.getElementById('h_in_sal').textContent = fmt(hInSal);
  document.getElementById('h_out_sal').textContent = fmt(hOutSal);
  document.getElementById('f_in_sal').textContent = fmt(fInSal);
  document.getElementById('f_out_sal').textContent = fmt(fOutSal);
  document.getElementById('sub_in').textContent = fmt(subIn);
  document.getElementById('sub_out').textContent = fmt(subOut);
  document.getElementById('total').textContent = fmt(total);

  // 零值變灰
  ['h_in_sal', 'f_in_sal'].forEach(id => {
    const el = document.getElementById(id);
    el.style.color = parseInt(el.textContent.replace(/,/g, '')) === 0 ? 'var(--muted)' : '';
  });
  ['h_out_sal', 'f_out_sal'].forEach(id => {
    const el = document.getElementById(id);
    el.style.color = parseInt(el.textContent.replace(/,/g, '')) === 0 ? 'var(--muted)' : '';
  });
}

// 點擊 cell 自動 focus input
// document.querySelectorAll('.cell.input-cell').forEach(cell => {
  // cell.addEventListener('click', () => cell.querySelector('input').focus());
// });

let resetCount = 0;
let openRateDialog, confirmRates, clearRates;
let setNum;
let close;

// 定義所有的輸入框 ID
const fields = ['h_in', 'h_out', 'f_in', 'f_out'];

// DOM 載入後才添加方法
window.onload = function () {
  const myDialogEl = document.getElementById('myDialog');
  const dialogTitleEl = document.getElementById('dialogTitle');
  const numInputEl = document.getElementById('numInput');

  openRateDialog = () => {
    // 開啟時帶入目前費率
    document.getElementById('rate_h_in').value  = RATE.h_in  || '';
    document.getElementById('rate_h_out').value = RATE.h_out || '';
    document.getElementById('rate_f_in').value  = RATE.f_in  || '';
    document.getElementById('rate_f_out').value = RATE.f_out || '';
    document.getElementById('myDialog').showModal();
  }

confirmRates = () => {
  fields.forEach(id => {
    const val = Number(document.getElementById(`rate_${id}`).value) || 0;
    RATE[id] = val;
    localStorage.setItem(`__${id}__`, val);
  });
  document.getElementById('myDialog').close();
  calc();
}

clearRates = () => {
  const fields = ['h_in', 'h_out', 'f_in', 'f_out'];
  fields.forEach(id => {
    document.getElementById(`rate_${id}`).value = '';
  });
}

};