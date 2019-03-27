## SPLITPOINT.JS

**[DEMO](https://newah1.github.io/splitpoint/)**

splitpoint is a small script designed to allow you to split an element on any given Y coordinate in your document (as defined by a DOM element).

Example:
```
new Splitpoint(
    document.querySelector(".white-box"), // the element you will be splitting
    {
        absolute: false, // Whether the new element will be absolute or not
        split_element: document.querySelector(".gray-bg"), // element we use as the split point
        side: "top" // what side of that element to split on
    }
);

```

splitpoint.js adds a duplicate element as a child to the element you passed in, and gives it an additional class of ".splitpoint", making it easy to customize your duplicate element as you wish.