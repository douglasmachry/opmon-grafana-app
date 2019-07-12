'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpMonDatasourceQueryCtrl = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _sdk = require('app/plugins/sdk');

require('./css/query-editor.css!');

var _constants = require('./constants');

var c = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var OpMonDatasourceQueryCtrl = exports.OpMonDatasourceQueryCtrl = function (_QueryCtrl) {
  _inherits(OpMonDatasourceQueryCtrl, _QueryCtrl);

  function OpMonDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
    _classCallCheck(this, OpMonDatasourceQueryCtrl);

    var _this = _possibleConstructorReturn(this, (OpMonDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(OpMonDatasourceQueryCtrl)).call(this, $scope, $injector));

    _this.scope = $scope;
    _this.uiSegmentSrv = uiSegmentSrv;
    _this.target.host = _this.target.host || _this.datasource.DEFAULT_HOST;
    _this.target.service = _this.target.service || _this.datasource.DEFAULT_SERVICE;
    _this.target.metric = _this.target.metric || _this.datasource.DEFAULT_METRIC;
    //this.target.timecut = this.target.timecut      || this.datasource.DEFAULT_TIMECUT;
    _this.target.mode = _this.$scope.$root.mode ? _this.$scope.$root.mode : _this.target.mode || c.MODE_AVAIL;
    //this.target.groupby      = this.target.groupby      || 'none';
    //this.target.resultFormat = this.target.resultFormat      || this.datasource.DEFAULT_RESULT_FORMAT;
    _this.target.objecttype = _this.$scope.$root.objecttype ? _this.$scope.$root.objecttype : _this.target.objecttype || _this.datasource.DEFAULT_OBJECT_TYPE;
    //this.target.fill      = this.target.fill      || 'fill';
    _this.target.resultformat = _this.$scope.$root.resultformat ? _this.$scope.$root.resultformat : _this.target.resultformat || _this.datasource.DEFAULT_RESULT_FORMAT;

    _this.target.timecut = _this.$scope.$root.timecut ? _this.$scope.$root.timecut : _this.target.timecut || _this.datasource.DEFAULT_TIMECUT;
    _this.target.groupby = _this.$scope.$root.groupby ? _this.$scope.$root.groupby : _this.target.groupby || 'none';

    _this.editorModes = [{ value: 'avail', text: 'Availability', mode: c.MODE_AVAIL }, { value: 'cp', text: 'Capacity', mode: c.MODE_CP }, { value: 'system', text: 'System', mode: c.MODE_SYSTEM }];

    _this.$scope.editorMode = {
      AVAIL: c.MODE_AVAIL,
      CP: c.MODE_CP,
      SYSTEM: c.MODE_SYSTEM
      //     ITEMID: c.MODE_ITEMID,
      //    TRIGGERS: c.MODE_TRIGGERS
    };

    /*if (this.$scope.$root.p) {
      this.$scope.$root.p.push(this.panelCtrl)
    } else {
      this.$scope.$root.p = [this.panelCtrl]
    }*/

    _this.slaPropertyList = [{ name: "Status", property: "status" }, { name: "SLA", property: "sla" }, { name: "OK time", property: "okTime" }, { name: "Problem time", property: "problemTime" }, { name: "Down time", property: "downtimeTime" }];

    _this.ackFilters = [{ text: 'all triggers', value: 2 }, { text: 'unacknowledged', value: 0 }, { text: 'acknowledged', value: 1 }];

    _this.resultFormats = [{ text: 'Time series', value: 'time_series' }, { text: 'Table', value: 'table' }];

    return _this;
  }

  /**
   * Switch query editor to specified mode.
   * Modes:
   *  0 - items
   *  1 - IT services
   *  2 - Text metrics
   */

  _createClass(OpMonDatasourceQueryCtrl, [{
    key: 'switchValue',
    value: function switchValue(name, value) {
      this.target[name] = value;
      this.$scope.$root[name] = value;
      console.log(name, value);
      //this.init();
      this.onChangeInternal();
    }
  }, {
    key: 'getHost',
    value: function getHost() {
      return this.datasource.metricFindData("host", this.target, true).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'getService',
    value: function getService() {
      return this.datasource.metricFindData("service", this.target, true).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'getMetric',
    value: function getMetric() {
      return this.datasource.metricFindData("metric", this.target, true).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'getTimecut',
    value: function getTimecut() {
      return this.datasource.metricFindData("timecut", this.target, true).then(this.uiSegmentSrv.transformToSegments(false));
    }
  }, {
    key: 'onChangeInternal',
    value: function onChangeInternal() {
      //this.$scope.$root.p.forEach((e) => {
      //  e.refresh()
      //})
      this.panelCtrl.refresh();
    }
  }, {
    key: 'getCollapsedText',
    value: function getCollapsedText() {
      if (this.target.metric == this.datasource.DEFAULT_METRIC && this.target.host == this.datasource.DEFAULT_HOST && this.target.service == this.datasource.DEFAULT_SERVICE) {
        return "click to edit query";
      }
      return this.target.metric + ': ' + this.target.host + ' - ' + this.target.service;
    }
  }]);

  return OpMonDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

OpMonDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
//# sourceMappingURL=query_ctrl.js.map
//# sourceMappingURL=query_ctrl.js.map
