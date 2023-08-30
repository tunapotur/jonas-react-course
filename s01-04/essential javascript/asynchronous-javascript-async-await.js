/* 
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

console.log("Hello World!");
*/

/*
async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos1");
  const data = await res.json();
  console.log(data);

  return data;
}

const todos = getTodos();
console.log(todos);

console.log("jonas");
*/

const timelyText = (text, duration) => {
  if (typeof text === "string")
    setTimeout(() => {
      console.log(`${text} text waited ${duration} millisecond`);
    }, duration);
  else throw new Error("Only String Value!");
};

const timelyText_callback = (text, duration, callback) => {
  if (typeof text === "string")
    setTimeout(() => {
      console.log(`${text} text wait ${duration} millisecond`);
      if (typeof callback === "function") callback();
    }, duration);
  else throw new Error("Only String Value!");
};

const timelyText_promise = (text, duration) => {
  return new Promise((resolve, reject) => {
    typeof text == "string"
      ? setTimeout(
          () => resolve(`${text} waited ${duration} millisecond`),
          duration
        )
      : reject(new Error("Only String Value!"));
  });
};

/*
//* incorrect output
timelyText('I.Step', 3000);
timelyText('II.Step', 2000);
timelyText('III.Step', 1000);
timelyText('VI.Step', 0); */
/*

/*
//* Callback Hell Soliton
timelyText_callback('I.Step', 3000, () => {
  timelyText_callback('II.Step', 2000, () => {
    timelyText_callback('III.Step', 1000, () => {
      timelyText_callback('VI.Step', 0);
    });
  });
}); 
*/

/*
//* Promis Soliton
timelyText_promise('I.Step', 3000)
  .then(text => {
    console.log(text);
    return timelyText_promise('II.Step', 2000);
  })
  .then(text => {
    console.log(text);
    return timelyText_promise('III.Step', 1000);
  })
  .then(text => {
    console.log(text);
    return timelyText_promise('VI.Step', 0);
  })
  .then(text => console.log(text))
  .catch(err => console.log(err));
*/

//* Async await Soliton
const timelyPrintAllText = async () => {
  console.log(await timelyText_promise("I.Step", 3000));
  console.log(await timelyText_promise("II.Step", 2000));
  console.log(await timelyText_promise("III.Step", 1000));
  console.log(await timelyText_promise("VI.Step", 0));
};

timelyPrintAllText();
