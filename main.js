// 費率設定（每次）
const RATE = {
  half_in:  480,     // 班內半小時
  half_out: 720,   // 班外半小時
  full_in:  880,   // 班內一小時
  full_out: 1320,  // 班外一小時
};

function fmt(n) {
  return n.toLocaleString('zh-TW');
}

function calc() {
  const hIn  = parseInt(document.getElementById('h_in').value)  || 0;
  const hOut = parseInt(document.getElementById('h_out').value) || 0;
  const fIn  = parseInt(document.getElementById('f_in').value)  || 0;
  const fOut = parseInt(document.getElementById('f_out').value) || 0;

  const hInSal  = hIn  * RATE.half_in;
  const hOutSal = hOut * RATE.half_out;
  const fInSal  = fIn  * RATE.full_in;
  const fOutSal = fOut * RATE.full_out;

  const subIn  = hInSal  + fInSal;
  const subOut = hOutSal + fOutSal;
  const total  = subIn   + subOut;

  document.getElementById('h_in_sal').textContent  = fmt(hInSal);
  document.getElementById('h_out_sal').textContent = fmt(hOutSal);
  document.getElementById('f_in_sal').textContent  = fmt(fInSal);
  document.getElementById('f_out_sal').textContent = fmt(fOutSal);
  document.getElementById('sub_in').textContent    = fmt(subIn);
  document.getElementById('sub_out').textContent   = fmt(subOut);
  document.getElementById('total').textContent     = fmt(total);

  // 零值變灰
  ['h_in_sal','f_in_sal'].forEach(id => {
	const el = document.getElementById(id);
	el.style.color = parseInt(el.textContent.replace(/,/g,'')) === 0 ? 'var(--muted)' : '';
  });
  ['h_out_sal','f_out_sal'].forEach(id => {
	const el = document.getElementById(id);
	el.style.color = parseInt(el.textContent.replace(/,/g,'')) === 0 ? 'var(--muted)' : '';
  });
}

// 點擊 cell 自動 focus input
document.querySelectorAll('.cell.input-cell').forEach(cell => {
  cell.addEventListener('click', () => cell.querySelector('input').focus());
});