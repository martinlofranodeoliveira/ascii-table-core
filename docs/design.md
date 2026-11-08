# Design — ascii-table-core

Single width pass, then mechanical lines: border, header, border, body,
border. Numbers right-align by default (detected per column); anything
else is left unless asked. Multiline cells fail instead of breaking the
grid; ragged rows fail instead of padding silently.

Oracle: byte-exact bordered output, center-alignment pin, one case per
rejection. Fixed-width fonts assumed.
