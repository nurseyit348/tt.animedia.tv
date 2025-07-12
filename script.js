// Модалды ачуу жана жабуу
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.btn-signin');
const closeLoginModal = document.getElementById('closeLoginModal');
const sendCodeBtn = document.getElementById('sendCodeBtn');
const codeSection = document.getElementById('codeSection');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

let generatedCode = null;

loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'flex';
  loginMessage.textContent = '';
  codeSection.style.display = 'none';
  loginForm.codeInput.value = '';
});

closeLoginModal.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Код генерациясы
sendCodeBtn.addEventListener('click', () => {
  const email = document.getElementById('emailInput').value.trim();
  if (!validateEmail(email)) {
    loginMessage.textContent = 'Туура email киргизиңиз.';
    return;
  }
  generatedCode = generateCode();
  loginMessage.style.color = 'lightgreen';
  loginMessage.textContent = `Код жөнөтүлдү! (демо: ${generatedCode})`;
  codeSection.style.display = 'block';
});

// Кирүү формасы
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const enteredCode = document.getElementById('codeInput').value.trim();
  if (enteredCode === generatedCode) {
    localStorage.setItem('loggedIn', 'true');
    loginMessage.style.color = 'lightgreen';
    loginMessage.textContent = 'Кирүү ийгиликтүү болду!';
    setTimeout(() => {
      loginModal.style.display = 'none';
      updateUIAfterLogin();
    }, 1500);
  } else {
    loginMessage.style.color = 'red';
    loginMessage.textContent = 'Код туура эмес.';
  }
});

// Функциялар
function validateEmail(email) {
  const re = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
  return re.test(email);
}
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Киргенден кийин UI жаңылоо
function updateUIAfterLogin() {
  loginBtn.textContent = 'Чыгуу';
  loginBtn.classList.remove('btn-signin');
  loginBtn.style.background = '#444';
  loginBtn.style.cursor = 'pointer';
  loginBtn.removeEventListener('click', openLoginModal);
  loginBtn.addEventListener('click', logout);
}

// Logout функциясы
function logout() {
  localStorage.removeItem('loggedIn');
  loginBtn.textContent = 'Кирүү';
  loginBtn.classList.add('btn-signin');
  loginBtn.style.background = '#e50914';
  loginBtn.style.cursor = 'pointer';
  loginBtn.removeEventListener('click', logout);
  loginBtn.addEventListener('click', openLoginModal);
}

// Баштапкы абалды коюу
function openLoginModal() {
  loginModal.style.display = 'flex';
  loginMessage.textContent = '';
  codeSection.style.display = 'none';
  loginForm.codeInput.value = '';
}

// Колдонуучунун абалын текшерүү
window.addEventListener('load', () => {
  if (localStorage.getItem('loggedIn') === 'true') {
    updateUIAfterLogin();
  } else {
    loginBtn.addEventListener('click', openLoginModal);
  }
});

