const currentURL = window.location.href;
if (currentURL.includes('xronos')){
    try{
      const Complete = document.createElement('button');
      Complete.textContent = 'Complete';
      Complete.classList.add('unlockBlue')
      const inject = document.querySelector('.abstract')
      inject.appendChild(Complete);
      Complete.addEventListener('click', () => {
          complete()
      });
      }
      catch{
          console.log("Not on proper xronos page.")
      }
  }


  function latexToPlainText(latex) {
    let plainText = latex;
  
    // Replace \frac{a}{b} with a/b
    plainText = plainText.replace(/\\frac\s*{(.*?)}\s*{(.*?)}/g, '($1/$2)');
  
    // Replace curly braces {} with parentheses () for exponents
    plainText = plainText.replace(/\{([^{]*?)}\s*/g, '($1)');
  
    // Replace \pi with pi
    plainText = plainText.replace(/\\pi/g, 'pi');
  
    return plainText;
  }
  

function complete() {
    let hasVars = false;
    const preambleElement = document.querySelector('.preamble');
    const preambleScript = preambleElement.querySelector('script');
    const preambleContent = preambleScript.textContent || preambleScript.innerText;
    const lines = preambleContent.split('\n');
    //Check if we using variables
    if(preambleContent.includes("PIAI") || preambleContent.includes("ansP") || preambleContent.includes("PX") || preambleContent.includes('\\newcommand {\\PI')){
        hasVars = true;
    }

    const questions = document.querySelectorAll('.problem-environment');
    const ansArray = [];
    const variableArray = [];
    //If we're storing the answers in variables
    if(hasVars){

                //This block executes for each question
                const processedScripts = new Set();
                questions.forEach((currentQuestion) => {
                    const scriptTags = currentQuestion.querySelectorAll('script');
                    const answerRegex =  /\\answer(?:\s*\[[^\]]*\])?\s*(\{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*})/g
                    if (scriptTags.length > 0) {
                    // For each script tag inside each question
                    scriptTags.forEach((script) => {
                        if (processedScripts.has(script)) {
                            return;
                          }
                        else{
                            let scriptContent = script.textContent || script.innerText;
                            if (scriptContent.includes("answer")) {
                                let match;
                                while ((match = answerRegex.exec(scriptContent)) !== null) {
                                    const modified = "\\newcommand " + match[1].trim() + "[0]"
                            
                                    variableArray.push(modified);
                                }
                            }
                        }
                        
                        processedScripts.add(script);
                    });
                }
                });
                

                const resultMap = new Map();
            
                variableArray.forEach((variable) => {
                    lines.forEach((line) => {
                        if (line.includes(variable)) {
                        const remainingContent = line.substring(line.indexOf(variable) + variable.length).trim();
                        resultMap.set(variable, remainingContent);
                        }
                    });
                });

                const valuesArray = Array.from(resultMap.values()).map(value => {
                    return value.substring(1, value.length - 1).trim();
                });

                for (let i = 0; i < valuesArray.length; i++) {
                    console.log(`${i+1}: ${valuesArray[i]}`);
                }

                //Loops over only the real containers
                const mathjaxedInputElements = document.querySelectorAll('.mathjaxed-input');
                let valuesIndex = 0;
                for (let i = 0; i < mathjaxedInputElements.length && valuesIndex < valuesArray.length; i++) {
                    if (mathjaxedInputElements[i].hasAttribute('id')) {
                        const inputField = mathjaxedInputElements[i].querySelector('input');
                        if (inputField && !inputField.disabled) {
                        inputField.value = valuesArray[valuesIndex];
                        const submitButton = mathjaxedInputElements[i].querySelector('.btn-ximera-submit');
                        if (submitButton) { 
                            submitButton.click();
                        }
                        }
                        valuesIndex++;
                    }
                }        

                setTimeout(() => {
                    if(!document.querySelector('.progress-bar-striped')){
                        let valuesIndex = 0;
                        for (let i = 0; i < mathjaxedInputElements.length && valuesIndex < valuesArray.length; i++) {
                            if (mathjaxedInputElements[i].hasAttribute('id')) {
                                const inputField = mathjaxedInputElements[i].querySelector('input');
                                if (inputField && !inputField.disabled) {
                                    const latexExpression = valuesArray[valuesIndex]
                                    const plainTextExpression = latexToPlainText(latexExpression);
                                    inputField.value = plainTextExpression;
                                    console.log(`LaTeX answer for #${valuesIndex+1} didn't work, trying ${plainTextExpression}.`)
                                    const submitButton = mathjaxedInputElements[i].querySelector('.btn-ximera-submit');
                                if (submitButton) { 
                                    submitButton.click();
                                }
                                }
                                valuesIndex++;
                            }
                        }
                    }

                
                        const CorrectOptionsVars = document.querySelectorAll('.correct');
                        CorrectOptionsVars.forEach((option)=>{
                            option.click();
                        })
                        
                        setTimeout(() => {
                            const CheckWork = document.querySelectorAll('.pulsate')
                            CheckWork.forEach((option)=>{
                                option.click()
                            });
                            setTimeout(() => {
                                let modal = document.querySelector('#updateWarningModal')
                                let close = modal.querySelector('.close')
                                try{
                                    close.click() 
                                }
                                catch{
                                    setTimeout(() => {
                                        close.click() 
                                    }, 500);
                                }
                            }, 1000);
                        }, 50);

                }, 100);
            

  

    }


    else{
        const processedScripts = new Set();
        console.log("Non-formatted answers below:")
        questions.forEach((currentQuestion) => {
            const scriptTags = currentQuestion.querySelectorAll('script');
            const answerRegex =  /\\answer(?:\s*\[[^\]]*\])?\s*(\{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*})/g;
            if (scriptTags.length > 0) {
            // For each script tag inside each question
            
            scriptTags.forEach((script) => {
                if (processedScripts.has(script)) {
                    return;
                  }
                else{
                    let scriptContent = (script.textContent || script.innerText).trim()
                    if (scriptContent.includes("answer")) {
                        if (scriptContent.includes('\\text')) {
                            scriptContent = scriptContent.split('\\text')[0].trim();
                          }
                        console.log(scriptContent)
                        let match;
                        while ((match = answerRegex.exec(scriptContent)) !== null) {
                            ansArray.push(match[1].trim().slice(1, -1));
                        }
                    }
                }
                
                processedScripts.add(script);
            });

        }
        });

        
        // for (let i = 0; i < ansArray.length; i++) {
        //     console.log(`${i+1}: ${ansArray[i]}`);
        // }
    
        const mathjaxedInputElements = document.querySelectorAll('.mathjaxed-input');
        let valuesIndex = 0;
        for (let i = 0; i < mathjaxedInputElements.length && valuesIndex < ansArray.length; i++) {
            if (mathjaxedInputElements[i].hasAttribute('id')) {
                const inputField = mathjaxedInputElements[i].querySelector('input');
                if (inputField && !inputField.disabled) {
                inputField.value = ansArray[valuesIndex];
                const submitButton = mathjaxedInputElements[i].querySelector('.btn-ximera-submit');
                if (submitButton) { 
                    submitButton.click();
                }
                }
                valuesIndex++;
            }
        }

    setTimeout(() => {
        if(!document.querySelector('.progress-bar-striped')){
            let valuesIndex = 0;
            for (let i = 0; i < mathjaxedInputElements.length && valuesIndex < ansArray.length; i++) {
                if (mathjaxedInputElements[i].hasAttribute('id')) {
                    const inputField = mathjaxedInputElements[i].querySelector('input');
                    if (inputField && !inputField.disabled) {
                        const latexExpression = ansArray[valuesIndex]
                        const plainTextExpression = latexToPlainText(latexExpression);
                        inputField.value = plainTextExpression;
                        console.log(`LaTeX answer for #${valuesIndex+1} didn't work, trying ${plainTextExpression}.`)
                        const submitButton = mathjaxedInputElements[i].querySelector('.btn-ximera-submit');
                    if (submitButton) { 
                        submitButton.click();
                    }
                    }
                    valuesIndex++;
                }
            }
        }
    }, 100);


        const CorrectOptions = document.querySelectorAll('.correct');
        CorrectOptions.forEach((option)=>{
            option.click();
        })

        setTimeout(() => {
            const CheckWork = document.querySelectorAll('.pulsate')
            CheckWork.forEach((option)=>{
                option.click()
            });
            setTimeout(() => {
                let modal = document.querySelector('#updateWarningModal')
                let close = modal.querySelector('.close')
                try{
                    close.click() 
                }
                catch{
                    setTimeout(() => {
                        close.click() 
                    }, 500);
                }
            }, 1000);
        }, 50);



    
        }

    }
  


