"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.copyData = [{
  title: "Workspace 1",
  rows: [{
    type: "break"
  }, {
    type: "h",
    content: "Dev paths "
  }, {
    type: "text",
    content: "\\exemple\\exemple\\etc "
  }, {
    type: "text",
    content: "\\exemple\\exemple\\etc "
  }, {
    type: "text",
    content: "\\\\exemple\\exemple\\"
  }, {
    type: "text",
    content: "\\\\exemple\\exemple\\"
  }, {
    type: "text",
    content: "\\\\exemple\\exemple\\"
  }, {
    type: "text",
    content: "\\\\exemple\\exemple\\"
  }, {
    type: "text",
    content: "\\exemple\\exemple\\etc "
  }, {
    type: "break"
  }, {
    type: "h",
    content: "Server "
  }, {
    type: "text",
    content: "username "
  }, {
    type: "password",
    content: "my password "
  }, {
    type: "h",
    caution: true,
    content: "Important header "
  }, {
    type: "text",
    content: "something important "
  }]
}, {
  title: "Workspace 2",
  rows: [{
    type: "break"
  }, {
    type: "h",
    content: "Dev paths ws 2"
  }, {
    type: "text",
    content: "\\exemple\\exemple\\etc ws 2"
  }, {
    type: "text",
    content: "\\exemple\\exemple\\etc ws 2"
  }, {
    type: "text",
    content: "\\\\exemple\\exemple\\"
  }, {
    type: "text",
    content: "\\\\exemple\\exemple\\"
  }, {
    type: "text",
    content: "\\\\exemple\\exemple\\"
  }, {
    type: "text",
    content: "\\\\exemple\\exemple\\"
  }, {
    type: "text",
    content: "\\exemple\\exemple\\etc ws 2"
  }, {
    type: "break"
  }, {
    type: "h",
    content: "Server ws 2"
  }, {
    type: "text",
    content: "username ws 2"
  }, {
    type: "password",
    content: "my password ws 2"
  }, {
    type: "h",
    caution: true,
    content: "Important header ws 2"
  }, {
    type: "text",
    content: "something important ws 2"
  }]
}];
window.copyData = window.copyData.map(function (item) {
  return _objectSpread({}, item, {
    count: item.rows.filter(function (_item) {
      return _item.type === "text" || _item.type === "password";
    }).length
  });
});