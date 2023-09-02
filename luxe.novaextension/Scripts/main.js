const { TaskProvider } = require("./TaskProvider");

// TODO: Add menus to create new assets: e.g. Materials, Shaders, etc.
// These actions should create new `*.lx` files, e.g. `player.material.lx`
// Also add snippets for these asset resources for `*.lx` files

// TODO: Add autocompletes for luxe built-in assets, e.g. `luxe: material_basis/solid`
// These are basically references to `*.lx` resources in https://github.com/luxeengine/luxe-module/tree/main/assets

exports.activate = function() {
  console.log("activated");
}

exports.deactivate = function() {
  // Clean up state before the extension is deactivated
}

nova.assistants.registerTaskAssistant(new TaskProvider(), {
  identifier: "luxe",
  name: "luxe"
});
