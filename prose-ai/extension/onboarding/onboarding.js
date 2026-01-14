import { setOnboardingCompleted, setSelectedApps } from '../utils/storage.js';

let currentStep = 1;
const totalSteps = 4;

const steps = document.querySelectorAll('.step');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showStep(stepNumber) {
  steps.forEach(step => {
    step.classList.remove('active');
    if (parseInt(step.dataset.step) === stepNumber) {
      step.classList.add('active');
    }
  });

  dots.forEach(dot => {
    dot.classList.remove('active');
    if (parseInt(dot.dataset.step) === stepNumber) {
      dot.classList.add('active');
    }
  });

  prevBtn.style.display = stepNumber === 1 ? 'none' : 'block';
  
  if (stepNumber === totalSteps) {
    nextBtn.textContent = 'Get Started';
    nextBtn.classList.add('btn-success');
  } else {
    nextBtn.textContent = 'Next';
    nextBtn.classList.remove('btn-success');
  }

  currentStep = stepNumber;
}

function getSelectedApps() {
  const checkboxes = document.querySelectorAll('input[name="app"]:checked');
  return Array.from(checkboxes).map(cb => cb.value);
}

async function completeOnboarding() {
  const selectedApps = getSelectedApps();
  
  if (selectedApps.length === 0) {
    alert('Please select at least one app to continue.');
    showStep(1);
    return;
  }

  await setSelectedApps(selectedApps);
  await setOnboardingCompleted(true);

  chrome.runtime.sendMessage({ type: 'ONBOARDING_COMPLETED' });

  setTimeout(() => {
    window.close();
  }, 500);
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
});

nextBtn.addEventListener('click', async () => {
  if (currentStep < totalSteps) {
    showStep(currentStep + 1);
  } else {
    await completeOnboarding();
  }
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const stepNumber = parseInt(dot.dataset.step);
    showStep(stepNumber);
  });
});

showStep(1);
