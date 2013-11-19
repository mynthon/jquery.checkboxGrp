jquery.checkboxGrp
==================

Group checkboxes to behave like radioboxes


options
-------

*changeMethod* check|click
If option is set to check currently selected checkbox is simply checked/unchecked. If option is click then click event is fired. It has big impact on wchich events are fired.

Eg. checkbox1 is currently checked and checkbox2 is clicked. With check method events fired are:

```
checkbox2.click
checkbox2.change
```

With click method events fired are:

```
checkbox2.click
checkbox1.click
checkbox1.change
checkbox2.change
```

Plugin works that way that currently unchecking checkbox's change event is always fired before currently checking chekbox's one. This allows to make cleanup.
```