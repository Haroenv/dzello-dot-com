+++
categories = ["Technology"]
date = "2017-02-19"
description = "Several important facts and best practices to make sure the enter key behaves the way your users expect."
image = "v1523548333/blog/react-forms-codepen.png"
title = "Demystifying enter key submission for React forms"

+++

There are some common problems that developers run into when trying to get enter key submission to work for forms with multiple buttons. This is true for both React and plain HTML.

Take a form with "Cancel" and "Save" buttons as an example. There are at least three things that can go wrong:

- The enter key does nothing
- The enter key causes a cancel instead of a save
- The enter key causes both a cancel and a save

This is with just two buttons. If the form has more than two buttons the situation can get uglier. Thankfully, there are just a few things to know to get the right behavior every time. Keep reading to learn what they are.

### Fact 1: \<button\> is type="submit" by default

HTML button tags are not type="button" by default. They're type="submit". (See \<button\> on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button).) It's easy to forget to add a type attribute to your buttons, and if you don't then they'll all be submit buttons. This [little-known fact](https://github.com/facebook/react/issues/2093#issuecomment-53494076) is where the problems start, which are then compounded by this next fact.

### Fact 2: Pressing the enter key triggers the click handler of the **first** type="submit" button

Yep, a *keypress* causes a *click* event to fire. It's not intuitive, it's just HTML.

Furthermore, it's the DOM order that determines which button's onClick event is called. If the Save button comes before the Cancel button, the Save button's onClick will be called. If the Cancel button comes first, the Cancel button's onClick will be called. This makes it very easy to introduce bugs just by switching the order of elements.

## Broken Example

Let's look at an example React component that renders a form. `FormOne` looks innocent enough, but it has a serious problem. The enter key will cause the form submission to be cancelled, not saved.

```javascript
var FormOne = React.createClass({
  onSave: function(event) {
    event.preventDefault();
    console.log("onSave handler called");
  },
  onCancel: function(event) {
   event.preventDefault();
   console.log("onCancel handler called");
  },
  render: function() {
    return (
      <form onSubmit={this.onSave}>
        <input type="text" />
        <button onClick={this.onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    );
  }
});
```

[Try it on Codepen.](http://codepen.io/dzello/pen/wgLZYN)

Because the Cancel button is before the Save button and both are type="submit" (remember Fact 1), the enter key will trigger the onClick event of the Cancel button.

The onCancel event handler prevents the default event, so the form's onSubmit will never be called. If the onCancel did not prevent the default event, both the onCancel and the onSave handlers would be called.

## Fixed Example

Let's look at another form, `FormTwo`. There is only one change—the type of the Cancel button is now type="button". This small difference makes all the difference. The first type="submit" button is now the Save button, which does not have an onClick handler. It doesn't need one because the form's onSubmit handler will be called, which has been bound to the onSave method for saving the form.

```javascript
var FormTwo = React.createClass({
  onSave: function(event) {
    event.preventDefault();
    console.log("onSave handler called");
  },
  onCancel: function(event) {
   event.preventDefault();
   console.log("onCancel handler called");
  },
  render: function() {
    return (
      <form onSubmit={this.onSave}>
        <input type="text" />
        <button type="button" onClick={this.onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    );
  }
});
```

[Try it on Codepen.](http://codepen.io/dzello/pen/wgLZYN)

This example satisfies our requirements. The enter key and the Save button both save the form. The Cancel button cancels the form. Rearranging the buttons won't break anything.

Plus, it's easy to read the code and determine what will happen without chasing multiple calls around:

- When clicked, the Cancel button will call `this.onCancel` and nothing else.
- Because the Save button is type="submit" and no click handler is registered, we know that clicking it will immediately trigger the form's onSubmit handler.
- Because there are no type="submit" buttons with click handlers, we can be sure that pressing the enter key will immediately trigger the form's onSubmit handler.


## Best Practices

Two best practices to take from this are **always remember to add type="button" to non-submit buttons** and **only have one type="submit" button per form**. That helps avoid ambiguity and makes following execution easy.

Here are some things **not** to do:

* Don't re-order type="submit" elements to get the desired behavior. It's brittle and it will break immediately if someone or something reorders the elements on the page.
* Don't decide not to implement predictable behavior for the enter key. This is bad UX and will frustrate some users, especially those who rely on the keyboard for accessibility reasons. And as you can see, it's easy once you know the rules.

## Further Research

- [Forms mishandle submit for Enter key, facebook/react #2093](https://github.com/facebook/react/issues/2093)
- [Button Click event fires when pressing Enter key in different input (no forms)](http://stackoverflow.com/questions/12325066/button-click-event-fires-when-pressing-enter-key-in-different-input-no-forms)

## Codepens

- [Codepen - React Version](http://codepen.io/dzello/pen/wgLZYN)
- [Codepen - Plain HTML Version](http://codepen.io/dzello/pen/LxwPQJ)
