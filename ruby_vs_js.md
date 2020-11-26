# Transitioning from Ruby to JS

Key differences
- Methods vs Functions
- Iteration
- Synchronous code interacting with Asynchronous Browser APIs
- declaring variables
- truthiness vs falsiness
- prototypical vs class based inheritance

## Methods vs Functions

In Ruby, methods are a bit easier to predict, because they are designed to be called and that's pretty much it. What I mean by that is, if you call a method by its name, you're invoking it. You can't define properties on a method, pass it as an argument to another method, or assign it as a property on another object (although you can simulate this by defining methods within a module and then including or extending that module within another class).

In javascript, a function is a first class object. What this means is that it has its own name, we can assign properties on it, we can pass it as an argument to another function and we can store it as a property of another object. Functions are at the heart of how javascript handles a lot of the situations that ruby would handle with a block. And, of course, functions are also used to handle tasks that ruby would handle with methods as well. 

## Iteration

One example of that case is iteration. When you iterate over an array, you pass a function as an argument in javascript, whereas in ruby you would pass a block.
```rb
array = [1,2,3]
array.each do |num|
  puts num
end
array.map do |num|
  num * 2
end
```

```js
let array = [1,2,3]
array.forEach(function(num) {
  console.log(num);
})
array.map(function(num) {
  return num * 2
})
```
In ruby, each element in the array is yielded to the block one at a time. This happens immediately (right when we call each or map) not at some later point in time. In javascript, each element in the array is passed to the function, one at a time. Again, this happens immediately (right when we call forEach for map).

```rb
array = ["Ty", "Dakota", "Samantha"]
longer_than_6 = array.select do |name|
  name.length > 6
end
```

```js
let array = ["Ty", "Dakota", "Samantha"]
let longerThanSix = array.filter(function(name){
  return name.length > 6
})
```

JavaScript for loop <=> ruby while loop

```rb
i = 0 
while i < array.length 
  array[i] # the element at the i index in the array
  i += 1
end
```

```js
let array = [1,2,3]
for(let i = 0 ; i < array.length ; i++) {
  array[i] // the element at the i index in the array
}
```

## Synchronous vs Asynchronous Code

A function that is passed as an argument to another function is called a `callback function`. If the callback function is invoked immediately, then it is called a `synchronous` function. If it's called at some time in the future, it's called an `asynchronous function`. 

Here's an example:

```js
document.addEventListener('click', function(event) {
  console.log('we clicked!');
})
```
The function passed as the second argument to the addEventListener function is an asynchronous function because it will not be invoked immediately when addEventListener gets called. Instead it will be invoked when a click event occurs on the document. The browser is actually keeping track of the events that occur when a user interacts with it and it will queue up the appropriate callback functions (called event handlers) when there is no synchronous code still in progress. There is a [video on youtube of a developer named Phillip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ) doing a talk about the Event Loop in JavaScript that is a great resource for understanding synchronous vs asynchronous code.

## Declaring variables

Whereas in ruby we declare variables by just giving them a name and assigning them a value, in javascript we need to include a keyword before the variable name. There are 3 choices we have for keywords: `var`, `let` and `const`. 1 of them, `var`, is a bit older and has been around for a lot longer than the other 2. It has a few quirks about how it behaves with respect to a strange mechanism in javascript called hoisting and because of that, we tend to avoid using it modern javascript. We'll prefer `let` and `const`

```js
function test() {
  console.log(name)

  var name = "Dakota"
  return name
}
```
This will log undefined, because name is declared with var and hoisted to the top of the scope.

```js
function test() {
  console.log(name)

  let name = "Dakota"
}
```

This throws an error:
```
Uncaught ReferenceError: Cannot access 'name' before initialization
    at test (REPL5:2:15)
```

```js
hello()

function hello() {
  console.log("Hi, Dakota!");
}
```
This actually works due to hoisting. The entire `hello()` function is hoisted to the top of the scope.

## Multiple ways of defining functions, not just def method_name like ruby

```js
hello()

var hello = function() {
  console.log("Hi, Dakota!")
}

```

## String Interpolation
Ruby
```rb
"hello, #{there}"
```

JS
```js
`hello, ${there}`
```

## Arrow functions vs Regular functions


## This vs self
In ruby self refers to the object receiving a method call.
In js this is a bit more complicated.
Because a function can be called in different ways, this won't always return the object that a function was called on, because it won't always be called on an object.

Say we have a list of links to posts. The links have the title of the post as their link text. We want to be able to click on a post and have its content loaded onto our current html page. We could use attributes that are attached to the a tag element and take that information and put it into a web request that loads data from our server takes the data and puts it into the page.

## Classes in Ruby vs Classes in JavaScript

```rb
class Dog 
  def initialize(name)
    @name = name
  end

  def greet
    "hello, I'm #{@name}"
  end
end 
dog = Dog.new
dog.greet
```

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.greet = function() {
  return `hello, I'm ${this.name}`
}

// or

class Dog {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `hello, I'm ${this.name}`
  }
}
```

## To check what type of object you're dealing with

```rb
object.class
```

```js
object.constructor
```

## Truthiness vs Falsiness

```rb
# truthy => everything except for false and nil
# falsey => false, nil
```

```js
// truthy => everything except the falsey stuff
// falsey => undefined, false, null, '', 0, NaN
```

## Comparisons

== vs ===

`===` doesn't do type coercion, so both operands must be the same type for a true result

`==` does type coercion, so false == 0 is true and false == undefined is true