# Yolan - YOcto LANguage 

A meta programming language on top of JavaScript (later to be retargeted other virtual machines too).

## Language levels

- Source code - Can be transformed to/from EUL via parser/prettyprinter.
- End User language (EUL) - AST without macros applied, apply macros to get IL.
- Intermediate language (IL) - AST with macros applied, suitable for program transformations. Reverse macro transform can translate this into EUL
- Compiled Code - depending on target
