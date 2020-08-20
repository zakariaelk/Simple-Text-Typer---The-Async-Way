// Let's create a promise based timer function
function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Let's create a function to get a random number between the range we've set in our data-type elements

// function getRandomBetween(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

// Now the above function works perfectly fine, however since this is not a pure function like 'function sum(a, b) {return a + b;}', and since it returns random results, it makes it hard to test when working with big applications. 

// For testing sake, we can add the possibility to add a third argument, that allows us to replace the Math.random() and returns a consistent result. 

// For now we can default the third argument to Math.random(), and change it to fixed number when we need to test.

// Here's how we can do it.

function getRandomBetween(min = 20, max = 50, randomNumber = Math.random()) {
    return Math.floor(randomNumber * (max - min) + min);
}

// Now each time we test with getRandomBetween(100, 150), we'll get a different number between 100 and 150, however if we want to test we can set the 3rd argument to any number (here 50) getRandomBetween(100, 150, 50), and we'll always get 2600. Pretty cool huh! 😍




// Let's create a function to draw each text character.

// Method 1: Using a for(of) Loop

async function draw(el) {
    // console.log(el);

    // Let's take a copy of the text element
    const text = el.textContent;
    // console.log(text);

    // Now let's create a variable with an empty string which will hold our updated content
    let soFar = '';

    // To loop over each letter and add it to a new text, we can use map and split methods, but we'll just keep it simple and use a for(item of items) loop.
    for (letter of text) {
        soFar += letter;
        // console.log(soFar);
        el.textContent = soFar;

        // let's wait for each letter print to the soFar variable 
        // We need to create a variable to return our getRandomNumber()
        // Now we need to get our data-type-min and data-type-max
        // We can destructure our el.dataset into typeMin and typeMax
        // Note that JavaScript converts the kebab-case 'data-type-min' to camelCase and that's why we can access it with 'typeMin'. Same for data-type-max
        const { typeMin, typeMax } = el.dataset;
        const timeToWait = getRandomBetween(typeMin, typeMax);
        await wait(timeToWait);

        // await wait(getRandomBetween(el.getAttribute('data-type-min'), el.getAttribute('data-type-max')));
    }

}


// Method 2: Using Recursion

// Rercursion is this concept where a function keeps calling itself until there is an exit condition

function draw2(el) {
    // initial index which we will increment as we type letters 
    let index = 1;

    // let's set a variable to the text content
    const text = el.textContent;

    // let's get our data-type-min and data-type-max. Later we'll see why we won't call the getRandomBetween() function at this stage.    
    const { typeMin, typeMax } = el.dataset;

    // Now let's create a closure function to draw each letter recursively. We're making async as we'll be awaiting some delay
    async function drawLetter() {
        // The idea here is slice the text and increment the end value with our index        
        el.textContent = text.slice(0, index);

        // We increment the index - This must be done before reruning the function recursively
        index++;


        // Let's add some random delay.
        // Notice that we're calling the getRandomBetween() inside the drawLetter(), so that we get a different random value for each letter to be drawn. Putting it outside would give us a constant value which isn't what we're looking for.
        const timeToWait = getRandomBetween(typeMin, typeMax);
        await wait(timeToWait);

        // We call the function inside itself
        if (index <= text.length) {
            drawLetter();
        }

    }

    drawLetter();

}




// Let's get our text elements
// const els = document.querySelectorAll('[data-type]');
// els.forEach(el => draw(el));

// We can make it SHORTER and directly call the draw() function inside our forEach
/* els.forEach(draw); */

// We can make EVEN SHORTER skip the els variable - All in one line
document.querySelectorAll('[data-type]').forEach(draw2);


