function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//  Chat - Initializes the autosize library and scrolls chat list to bottom

/* global autosize */
autosize(document.querySelectorAll('.chat-module-bottom textarea')); // Scrolls the chat-module-body to the bottom

(function ($) {
  $(window).on('load', function () {
    var lastChatItems = document.querySelectorAll('.media.chat-item:last-child');

    if (lastChatItems) {
      mrUtil.forEach(lastChatItems, function (index, item) {
        item.scrollIntoView();
      });
    }
  });
})(jQuery); // Checklist - Initializes the Shopify Draggable library on our Checklist elements.

/* global Draggable, SwapAnimation */

/* eslint-disable no-unused-vars */


var mrAutoWidth = function () {
  /*
     Special Thanks to Lim Yuan Qing
     for autosize-input
      https://github.com/yuanqing/autosize-input
      The MIT License (MIT)
     Copyright (c) 2018 Lim Yuan Qing
     Permission is hereby granted, free of charge, to any person obtaining
     a copy of this software and associated documentation files (the "Software"),
     to deal in the Software without restriction, including without limitation
     the rights to use, copy, modify, merge, publish, distribute, sublicense,
     and/or sell copies of the Software, and to permit persons to whom the Software
     is furnished to do so, subject to the following conditions:
     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.
     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
     BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
     ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */
  var AutoWidth =
  /*#__PURE__*/
  function () {
    function AutoWidth(element, options) {
      this.element = element;
      var elementStyle = window.getComputedStyle(this.element); // prettier-ignore

      this.elementCssText = "box-sizing:" + elementStyle.boxSizing + "\n                          ;border-left:" + elementStyle.borderLeftWidth + " solid red           \n                          ;border-right:" + elementStyle.borderRightWidth + " solid red\n                          ;font-family:" + elementStyle.fontFamily + "\n                          ;font-feature-settings:" + elementStyle.fontFeatureSettings + "\n                          ;font-kerning:" + elementStyle.fontKerning + "\n                          ;font-size:" + elementStyle.fontSize + "\n                          ;font-stretch:" + elementStyle.fontStretch + "\n                          ;font-style:" + elementStyle.fontStyle + "\n                          ;font-variant:" + elementStyle.fontVariant + "\n                          ;font-variant-caps:" + elementStyle.fontVariantCaps + "\n                          ;font-variant-ligatures:" + elementStyle.fontVariantLigatures + "\n                          ;font-variant-numeric:" + elementStyle.fontVariantNumeric + "\n                          ;font-weight:" + elementStyle.fontWeight + "\n                          ;letter-spacing:" + elementStyle.letterSpacing + "\n                          ;margin-left:" + elementStyle.marginLeft + "\n                          ;margin-right:" + elementStyle.marginRight + "\n                          ;padding-left:" + elementStyle.paddingLeft + "\n                          ;padding-right:" + elementStyle.paddingRight + "\n                          ;text-indent:" + elementStyle.textIndent + "\n                          ;text-transform:" + elementStyle.textTransform + ";";
      this.GHOST_ELEMENT_ID = '__autosizeInputGhost';
      element.addEventListener('input', AutoWidth.passWidth);
      element.addEventListener('keydown', AutoWidth.passWidth);
      element.addEventListener('cut', AutoWidth.passWidth);
      element.addEventListener('paste', AutoWidth.passWidth);
      this.extraPixels = options && options.extraPixels ? parseInt(options.extraPixels, 10) : 0;
      this.width = AutoWidth.setWidth(this); // Set `min-width` only if `options.minWidth` was set, and only if the initial
      // width is non-zero.

      if (options && options.minWidth && this.width !== '0px') {
        this.element.style.minWidth = this.width;
      }
    }

    AutoWidth.setWidth = function setWidth(input) {
      var string = input.element.value || input.element.getAttribute('placeholder') || ''; // Check if the `ghostElement` exists. If no, create it.

      var ghostElement = document.getElementById(input.GHOST_ELEMENT_ID) || input.createGhostElement(); // Copy all width-affecting styles to the `ghostElement`.

      ghostElement.style.cssText += input.elementCssText;
      ghostElement.innerHTML = AutoWidth.escapeSpecialCharacters(string); // Copy the width of `ghostElement` to `element`.

      var _window$getComputedSt = window.getComputedStyle(ghostElement),
          width = _window$getComputedSt.width;

      width = Math.ceil(width.replace('px', '')) + input.extraPixels;
      /* eslint-disable no-param-reassign */

      input.element.style.width = width + "px";
      return width;
    };

    AutoWidth.passWidth = function passWidth(evt) {
      var input = $(evt.target).data('autoWidth');
      AutoWidth.setWidth(input);
    };

    AutoWidth.mapSpecialCharacterToCharacterEntity = function mapSpecialCharacterToCharacterEntity(specialCharacter) {
      var characterEntities = {
        ' ': 'nbsp',
        '<': 'lt',
        '>': 'gt'
      };
      return "&" + characterEntities[specialCharacter] + ";";
    };

    AutoWidth.escapeSpecialCharacters = function escapeSpecialCharacters(string) {
      return string.replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }; // Create `ghostElement`, with inline styles to hide it and ensure that the text is all
    // on a single line.


    var _proto = AutoWidth.prototype;

    _proto.createGhostElement = function createGhostElement() {
      var ghostElement = document.createElement('div');
      ghostElement.id = this.GHOST_ELEMENT_ID;
      ghostElement.style.cssText = 'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;';
      document.body.appendChild(ghostElement);
      return ghostElement;
    };

    return AutoWidth;
  }();

  $(document).ready(function () {
    var checklistItems = document.querySelectorAll('form.checklist .custom-checkbox div input');

    if (checklistItems) {
      mrUtil.forEach(checklistItems, function (index, item) {
        $(item).data('autoWidth', new AutoWidth(item, {
          extraPixels: 3
        }));
        item.addEventListener('keypress', function (evt) {
          if (evt.which === 13) {
            evt.preventDefault();
          }
        });
      });
    }
  });
  return AutoWidth;
}();

var mrChecklist = {
  sortableChecklists: new Draggable.Sortable(document.querySelectorAll('form.checklist, .drop-to-delete'), {
    plugins: [SwapAnimation.default],
    draggable: '.checklist > .row',
    handle: '.form-group > span > i'
  })
}; //
//
// dropzone.js
//
//

/* global Dropzone */

Dropzone.autoDiscover = false;
$(function () {
  var template = "<li class=\"list-group-item dz-preview dz-file-preview\">\n    <div class=\"media align-items-center dz-details\">\n      <ul class=\"avatars\">\n        <li>\n          <div class=\"avatar bg-primary dz-file-representation\">\n            <img class=\"avatar\" data-dz-thumbnail />\n            <i class=\"material-icons\">attach_file</i>\n          </div>\n        </li>\n      </ul>\n      <div class=\"media-body d-flex justify-content-between align-items-center\">\n        <div class=\"dz-file-details\">\n          <span class=\"dz-filename\"><span data-dz-name></span></span<br>\n          <span class=\"text-small dz-size\" data-dz-size></span>\n        </div>\n        <img alt=\"Loader\" src=\"assets/img/loader.svg\" class=\"dz-loading\" />\n        <div class=\"dropdown\">\n          <button class=\"btn-options\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            <i class=\"material-icons\">more_vert</i>\n          </button>\n          <div class=\"dropdown-menu dropdown-menu-right\">\n            <a class=\"dropdown-item text-danger\" href=\"#\" data-dz-remove>Delete</a>\n          </div>\n        </div>\n        <button class=\"btn btn-danger btn-sm dz-remove\" data-dz-remove>\n          Cancel\n        </button>\n      </div>\n    </div>\n    <div class=\"progress dz-progress\">\n      <div class=\"progress-bar dz-upload\" data-dz-uploadprogress></div>\n    </div>\n  </li>";
  template = document.querySelector('.dz-template') ? document.querySelector('.dz-template').innerHTML : template;
  $('.dropzone').dropzone({
    previewTemplate: template,
    thumbnailWidth: 320,
    thumbnailHeight: 320,
    thumbnailMethod: 'contain',
    previewsContainer: '.dropzone-previews'
  });
}); //
//
// filter.js
//
// Initialises the List.js plugin and provides interface to list objects
//

/* global List */

var mrFilterList = function ($) {
  /**
   * Check for List.js dependency
   * List.js - http://listjs.com
   */
  if (typeof List === 'undefined') {
    throw new Error('mrFilterList requires list.js (http://listjs.com)');
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME = 'mrFilterList';
  var VERSION = '1.0.0';
  var DATA_KEY = 'mr.filterList';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Event = {
    LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
  };
  var Selector = {
    FILTER: '[data-filter-list]',
    DATA_ATTR: 'filter-list',
    DATA_ATTR_CAMEL: 'filterList',
    DATA_FILTER_BY: 'data-filter-by',
    DATA_FILTER_BY_CAMEL: 'filterBy',
    FILTER_INPUT: 'filter-list-input',
    FILTER_TEXT: 'filter-by-text'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var FilterList =
  /*#__PURE__*/
  function () {
    function FilterList(element) {
      // The current data-filter-list element
      this.element = element; // Get class of list elements to be used within this data-filter-list element

      var listData = element.dataset[Selector.DATA_ATTR_CAMEL]; // data-filter-by rules collected from filterable elements
      // to be passed to List.js

      this.valueNames = []; // List.js instances included in this filterList

      this.lists = []; // Find all matching list elements and initialise List.js on each

      this.initAllLists(listData); // Bind the search input to each list in the array of lists

      this.bindInputEvents();
    } // version getter


    var _proto2 = FilterList.prototype;

    _proto2.initAllLists = function initAllLists(listData) {
      var _this = this;

      // Initialise each list matching the selector in data-filter-list attribute
      mrUtil.forEach(this.element.querySelectorAll("." + listData), function (index, listElement) {
        _this.initList(_this.element, listElement);
      });
    };

    _proto2.initList = function initList(element, listElement) {
      var _this2 = this;

      // Each individual list needs a unique ID to be added
      // as a class as List.js identifies lists by class
      var listID = Selector.DATA_ATTR + "-" + new Date().getTime(); // Use the first child of the list and parse all data-filter-by attributes inside.
      // Pass to parseFilters to construct an array of valueNames appropriate for List.js

      var filterables = listElement.querySelectorAll("*:first-child [" + Selector.DATA_FILTER_BY + "]");
      mrUtil.forEach(filterables, function (index, filterElement) {
        // Parse the comma separated values in the data-filter-by attribute
        // on each filterable element
        _this2.parseFilters(listElement, filterElement, filterElement.dataset[Selector.DATA_FILTER_BY_CAMEL]);
      }); // De-duplicate the array by creating new set of stringified objects and
      // mapping back to parsed objects.
      // This is necessary because similar items in the list element could produce
      // the same rule in the valueNames array.

      this.valueNames = mrUtil.dedupArray(this.valueNames); // Add unique ID as class to the list so List.js can handle it individually

      listElement.classList.add(listID); // Set up the list instance using the List.js library

      var list = new List(element, {
        valueNames: this.valueNames,
        listClass: listID
      }); // Add this list instance to the array associated with this filterList instance
      // as each filterList can have miltiple list instances connected to the
      // same filter-list-input

      this.lists.push(list);
    };

    _proto2.parseFilters = function parseFilters(listElement, filterElement, filterBy) {
      var _this3 = this;

      // Get a jQuery instance of the list for easier class manipulation on multiple elements
      var $listElement = $(listElement);
      var filters = []; // Get array of filter-by instructions from the data-filter-by attribute

      try {
        filters = filterBy.split(',');
      } catch (err) {
        throw new Error("Cannot read comma separated data-filter-by attribute: \"\n          " + filterBy + "\" on element: \n          " + this.element);
      }

      filters.forEach(function (filter) {
        // Store appropriate rule for List.js in the valueNames array
        if (filter === 'text') {
          if (filterElement.className !== filterElement.nodeName + "-" + Selector.FILTER_TEXT) {
            _this3.valueNames.push(filterElement.className + " " + filterElement.nodeName + "-" + Selector.FILTER_TEXT);
          }

          $listElement.find(filterElement.nodeName.toLowerCase() + "[" + Selector.DATA_FILTER_BY + "*=\"text\"]") // Prepend element type to class on filterable element as List.js needs separate classes
          .addClass(filterElement.nodeName + "-" + Selector.FILTER_TEXT);
        } else if (filter.indexOf('data-') === 0) {
          $listElement.find("[" + Selector.DATA_FILTER_BY + "*=\"" + filter + "\"]").addClass("filter-by-" + filter);

          _this3.valueNames.push({
            name: "filter-by-" + filter,
            data: filter.replace('data-', '')
          });
        } else if (filterElement.getAttribute(filter)) {
          $listElement.find("[" + Selector.DATA_FILTER_BY + "*=\"" + filter + "\"]").addClass("filter-by-" + filter);

          _this3.valueNames.push({
            name: "filter-by-" + filter,
            attr: filter
          });
        }
      });
    };

    _proto2.bindInputEvents = function bindInputEvents() {
      var filterInput = this.element.querySelector("." + Selector.FILTER_INPUT); // Store reference to data-filter-list element on the input itself

      $(filterInput).data(DATA_KEY, this);
      filterInput.addEventListener('keyup', this.searchLists, false);
      filterInput.addEventListener('paste', this.searchLists, false); // Handle submit to disable page reload

      filterInput.closest('form').addEventListener('submit', function (evt) {
        if (evt.preventDefault) {// evt.preventDefault();
        }
      });
    };

    _proto2.searchLists = function searchLists(event) {
      // Retrieve the filterList object from the element
      var filterList = $(this).data(DATA_KEY); // Apply the currently searched term to the List.js instances in this filterList instance

      mrUtil.forEach(filterList.lists, function (index, list) {
        list.search(event.target.value);
      });
    };

    FilterList.jQueryInterface = function jQueryInterface() {
      return this.each(function jqEachFilterList() {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new FilterList(this);
          $element.data(DATA_KEY, data);
        }
      });
    };

    _createClass(FilterList, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return FilterList;
  }(); // END Class definition

  /**
   * ------------------------------------------------------------------------
   * Initialise by data attribute
   * ------------------------------------------------------------------------
   */


  $(window).on(Event.LOAD_DATA_API, function () {
    var filterLists = $.makeArray($(Selector.FILTER));
    /* eslint-disable no-plusplus */

    for (var i = filterLists.length; i--;) {
      var $list = $(filterLists[i]);
      FilterList.jQueryInterface.call($list, $list.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  /* eslint-disable no-param-reassign */

  $.fn[NAME] = FilterList.jQueryInterface;
  $.fn[NAME].Constructor = FilterList;

  $.fn[NAME].noConflict = function FilterListNoConflict() {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return FilterList.jQueryInterface;
  };
  /* eslint-enable no-param-reassign */


  return FilterList;
}(jQuery); // Kanban - Initializes the Shopify Draggable library on our Kanban elements.

/* global Draggable, SwapAnimation */

/* eslint-disable no-unused-vars */


var mrKanban = {
  sortableKanbanLists: new Draggable.Sortable(document.querySelectorAll('div.kanban-board'), {
    draggable: '.kanban-col:not(:last-child)',
    handle: '.card-list-header'
  }),
  sortableKanbanCards: new Draggable.Sortable(document.querySelectorAll('.kanban-col .card-list-body'), {
    plugins: [SwapAnimation.default],
    draggable: '.card-kanban',
    handle: '.card-kanban',
    appendTo: 'body'
  })
}; //
//
// prism.js
//
// Initialises the prism code highlighting plugin

/* global Prism */

Prism.highlightAll(); //
//
// Util
//
// Medium Rare utility functions
// v 1.1.0

var mrUtil = function ($) {
  // Activate tooltips
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body'
  });
  var Util = {
    activateIframeSrc: function activateIframeSrc(iframe) {
      var $iframe = $(iframe);

      if ($iframe.attr('data-src')) {
        $iframe.attr('src', $iframe.attr('data-src'));
      }
    },
    idleIframeSrc: function idleIframeSrc(iframe) {
      var $iframe = $(iframe);
      $iframe.attr('data-src', $iframe.attr('src')).attr('src', '');
    },
    forEach: function forEach(array, callback, scope) {
      for (var i = 0; i < array.length; i += 1) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    },
    dedupArray: function dedupArray(arr) {
      return arr.reduce(function (p, c) {
        // create an identifying String from the object values
        var id = JSON.stringify(c); // if the JSON string is not found in the temp array
        // add the object to the output array
        // and add the key to the temp array

        if (p.temp.indexOf(id) === -1) {
          p.out.push(c);
          p.temp.push(id);
        }

        return p; // return the deduped array
      }, {
        temp: [],
        out: []
      }).out;
    }
  };
  return Util;
}(jQuery);