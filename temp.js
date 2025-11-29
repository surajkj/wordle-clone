let a = [

  ];

let b = [


];

const c = b.filter(value => !a.includes(value));

let uniq = [...new Set(c)];


// Filter values that have length of 3
const filteredValues = uniq.filter(value => value.length === 6);

console.log("Values with length 3 (10 per line):");
console.log("=" .repeat(50));

// Print values with 10 per line, single quotes, and commas
let line = "";
let count = 0;

filteredValues.forEach(value => {
  if (count === 30) {
    console.log(line);
    line = "";
    count = 0;
  }

  if (line !== "") {
    line += " ";
  }
  line += `'${value}',`;
  count++;
});

// Print any remaining values
if (line !== "") {
  console.log(line);
}

console.log(`\nTotal values printed: ${filteredValues.length}`);
