"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var isEmail_1 = require("./isEmail");
var ReactMultiEmail = /** @class */ (function (_super) {
    __extends(ReactMultiEmail, _super);
    function ReactMultiEmail(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.state = {
            focused: false,
            emails: [],
            inputValue: '',
        };
        _this.findEmailAddress = function (value, isEnter) {
            var validateEmail = _this.props.validateEmail;
            var validEmails = [];
            var inputValue = '';
            var re = /[ ,;]/g;
            var isEmail = validateEmail || isEmail_1.default;
            var addEmails = function (email) {
                var emails = _this.state.emails;
                for (var i = 0, l = emails.length; i < l; i++) {
                    if (emails[i] === email) {
                        return false;
                    }
                }
                validEmails.push(email);
                return true;
            };
            if (value !== '') {
                if (re.test(value)) {
                    var splitData = value.split(re).filter(function (n) {
                        return n !== '' && n !== undefined && n !== null;
                    });
                    var setArr = new Set(splitData);
                    var arr = __spreadArray([], __read(setArr), false);
                    do {
                        if (isEmail('' + arr[0])) {
                            addEmails('' + arr.shift());
                        }
                        else {
                            if (arr.length === 1) {
                                /// 마지막 아이템이면 inputValue로 남겨두기
                                inputValue = '' + arr.shift();
                            }
                            else {
                                arr.shift();
                            }
                        }
                    } while (arr.length);
                }
                else {
                    if (isEnter) {
                        if (isEmail(value)) {
                            addEmails(value);
                        }
                        else {
                            inputValue = value;
                        }
                    }
                    else {
                        inputValue = value;
                    }
                }
            }
            _this.setState({
                emails: __spreadArray(__spreadArray([], __read(_this.state.emails), false), __read(validEmails), false),
                inputValue: inputValue,
            });
            if (validEmails.length && _this.props.onChange) {
                _this.props.onChange(__spreadArray(__spreadArray([], __read(_this.state.emails), false), __read(validEmails), false));
            }
        };
        _this.onChangeInputValue = function (value) {
            _this.findEmailAddress(value);
        };
        _this.removeEmail = function (index) {
            _this.setState(function (prevState) {
                return {
                    emails: __spreadArray(__spreadArray([], __read(prevState.emails.slice(0, index)), false), __read(prevState.emails.slice(index + 1)), false),
                };
            }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange(_this.state.emails);
                }
            });
        };
        _this.handleOnKeydown = function (e) {
            switch (e.which) {
                case 13:
                case 9:
                    if (e.currentTarget.value) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break;
                case 8:
                    if (!e.currentTarget.value) {
                        _this.removeEmail(_this.state.emails.length - 1);
                    }
                    break;
                default:
            }
        };
        _this.handleOnKeyup = function (e) {
            switch (e.which) {
                case 13:
                case 9:
                    _this.findEmailAddress(e.currentTarget.value, true);
                    break;
                default:
            }
        };
        _this.handleOnChange = function (e) {
            return _this.onChangeInputValue(e.currentTarget.value);
        };
        _this.handleOnBlur = function (e) {
            _this.setState({ focused: false });
            _this.findEmailAddress(e.currentTarget.value, true);
        };
        _this.handleOnFocus = function () {
            return _this.setState({
                focused: true,
            });
        };
        _this.emailInputRef = (_a = props.emailInputRef) !== null && _a !== void 0 ? _a : React.createRef();
        return _this;
    }
    ReactMultiEmail.getDerivedStateFromProps = function (nextProps, prevState) {
        if (prevState.propsEmails !== nextProps.emails) {
            return {
                propsEmails: nextProps.emails || [],
                emails: nextProps.emails || [],
                inputValue: '',
                focused: false,
            };
        }
        return null;
    };
    ReactMultiEmail.prototype.render = function () {
        var _this = this;
        var _a = this.state, focused = _a.focused, emails = _a.emails, inputValue = _a.inputValue;
        var _b = this.props, inputId = _b.inputId, style = _b.style, getLabel = _b.getLabel, _c = _b.className, className = _c === void 0 ? '' : _c, noClass = _b.noClass, placeholder = _b.placeholder;
        // removeEmail
        var showPlaceholder = placeholder && emails.length === 0;
        return (React.createElement("div", { className: "".concat(className, " ").concat(noClass ? '' : 'react-multi-email', " ").concat(focused ? 'focused' : '', " ").concat(inputValue === '' && emails.length === 0 ? 'empty' : ''), style: style, onClick: function () {
                if (_this.emailInputRef.current) {
                    _this.emailInputRef.current.focus();
                }
            } },
            emails.map(function (email, index) {
                return getLabel(email, index, _this.removeEmail);
            }),
            React.createElement("input", { id: inputId, ref: this.emailInputRef, type: "text", value: inputValue, onFocus: this.handleOnFocus, onBlur: this.handleOnBlur, onChange: this.handleOnChange, onKeyDown: this.handleOnKeydown, onKeyUp: this.handleOnKeyup, placeholder: showPlaceholder ? placeholder : '' })));
    };
    return ReactMultiEmail;
}(React.Component));
exports.default = ReactMultiEmail;
