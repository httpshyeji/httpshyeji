// Function to change the language
function changeLanguage(language) {
  // Ensure any previous transition classes are removed
  document.body.classList.remove('fade-out', 'fade-in');
  
  // Add fade-out effect to the content
  document.body.classList.add('fade-out');

  // Wait for the fade-out animation to finish, then update content and trigger fade-in
  setTimeout(function() {
    // Set the language to localStorage
    localStorage.setItem('language', language);

    //language display in the dropdown
    const currentLanguageText = document.querySelector('.current-language');
    const dropdownItems = document.querySelectorAll('.language-options li');

    dropdownItems.forEach(item => {
      const lang = item.getAttribute('onclick').match(/'(\w+)'/)[1]; // Extract language from onclick handler
      if (language === lang) {
        const flag = item.querySelector('img').src;
        const text = item.textContent.trim();
        currentLanguageText.innerHTML = `<img src="${flag}" alt="${text} Flag" class="flag"> ${text}`;
      }
    });

    //page content based on the selected language
    updatePageContent(language);

    // Trigger the fade-in effect after content update
    document.body.classList.add('fade-in');
  }, 500); // Match this time with fade-out duration
}

// Function to set the language based on localStorage
function setLanguage() {
  const savedLanguage = localStorage.getItem('language') || 'en'; // Default to 'en' if no language is stored

  // Update the current language display in the dropdown
  const currentLanguageText = document.querySelector('.current-language');
  const dropdownItems = document.querySelectorAll('.language-options li');

  dropdownItems.forEach(item => {
    const lang = item.getAttribute('onclick').match(/'(\w+)'/)[1]; // Extract language from onclick handler
    if (savedLanguage === lang) {
      const flag = item.querySelector('img').src;
      const text = item.textContent.trim();
      currentLanguageText.innerHTML = `<img src="${flag}" alt="${text} Flag" class="flag"> ${text}`;
    }
  });

  //page content based on the stored language
  updatePageContent(savedLanguage);
}

// Function to update the page content based on language
function updatePageContent(language) {
  // For all elements that have `data-lang-en` or `data-lang-fr` attributes, update the content
  const elements = document.querySelectorAll('[data-lang-en], [data-lang-fr]');

  elements.forEach(element => {
    const langText = element.getAttribute(`data-lang-${language}`);
    if (langText) {
      element.innerHTML = langText;
    }
  });
}

// Run the function when the page loads
window.onload = setLanguage;
