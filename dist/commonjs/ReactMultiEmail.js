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
        var _this = _super.call(this, props) || this;
        _this.state = {
            focused: false,
            emails: [],
            inputValue: '',
        };
        _this.findEmailAddress = function (value, isEnter) {
            var validateEmail = _this.props.validateEmail;
            var validEmails = [];
            var inputValue = '';
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
            _this.setState({
                emails: __spreadArray(__spreadArray([], _this.state.emails, true), validEmails, true),
                inputValue: inputValue,
            });
            if (validEmails.length && _this.props.onChange) {
                _this.props.onChange(__spreadArray(__spreadArray([], _this.state.emails, true), validEmails, true));
            }
        };
        _this.onChangeInputValue = function (value) {
            _this.findEmailAddress(value);
        };
        _this.removeEmail = function (index, isDisabled) {
            if (isDisabled) {
                return;
            }
            _this.setState(function (prevState) {
                return {
                    emails: __spreadArray(__spreadArray([], prevState.emails.slice(0, index), true), prevState.emails.slice(index + 1), true),
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
                    e.preventDefault();
                    break;
                case 9:
                    if (e.currentTarget.value) {
                        e.preventDefault();
                    }
                    break;
                case 8:
                    if (!e.currentTarget.value) {
                        _this.removeEmail(_this.state.emails.length - 1, false);
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
        _this.emailInputRef = React.createRef();
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
        var _b = this.props, style = _b.style, getLabel = _b.getLabel, _c = _b.className, className = _c === void 0 ? '' : _c, noClass = _b.noClass, placeholder = _b.placeholder;
        // removeEmail
        return (React.createElement("div", { className: "".concat(className, " ").concat(noClass ? '' : 'react-multi-email', " ").concat(focused ? 'focused' : '', " ").concat(inputValue === '' && emails.length === 0 ? 'empty' : ''), style: style, onClick: function () {
                if (_this.emailInputRef.current) {
                    _this.emailInputRef.current.focus();
                }
            } },
            placeholder ? React.createElement("span", { "data-placeholder": true }, placeholder) : null,
            emails.map(function (email, index) {
                return getLabel(email, index, _this.removeEmail);
            }),
            React.createElement("input", { ref: this.emailInputRef, type: "text", value: inputValue, onFocus: this.handleOnFocus, onBlur: this.handleOnBlur, onChange: this.handleOnChange, onKeyDown: this.handleOnKeydown, onKeyUp: this.handleOnKeyup })));
    };
    return ReactMultiEmail;
}(React.Component));
exports.default = ReactMultiEmail;
