# Blender Elements

Bringing the UI controls from Blender to the web.

Reason: The controls in Blender have advanced features, which are useful.

Initial use-case: Manipulate values inside the Pixi Inspector.
Hypothetical use-case: Building an animation editor.

- Desktop first
- Reactive controls
- Observable aware
- Using webcomponents?
- Typescript?

# Using webcomponents

Framework agnostic? using webcomponents, maybe some react wrappers.- angular wrappers? not needed for webcomponents?

Issues how to bind data?


Hierachy
Window
- Panel
  - Control
  - Float


# Decoupled data
Blender uses 2 abstractions: DNA and RNA

DNA is the raw serializable data, think json with types, easily adds meta (animation) data.

RNA is used to describe the data (range, toolip, label, key)

# Example markup
<b-menu>
	<b-prop path="renderer.resoluton_x">

# Pixi Inspector

Issues: No direct access to the data.
Solution: Treat the state as a document that has been opened (but cannot be saved.)
The controls reflect the data.

# Animation editor
The value depends on the current frame. value of the last keyframe + interpolation. green background when interpolated, yellow when on a keyframe, gray when the value doesn't change.

