export declare const commonProps: {
    value: {
        type: StringConstructor;
        observer(value: string): void;
    };
    placeholder: StringConstructor;
    placeholderStyle: StringConstructor;
    placeholderClass: StringConstructor;
    disabled: BooleanConstructor;
    maxlength: {
        type: NumberConstructor;
        value: number;
    };
    cursorSpacing: {
        type: NumberConstructor;
        value: number;
    };
    autoFocus: BooleanConstructor;
    focus: BooleanConstructor;
    cursor: {
        type: NumberConstructor;
        value: number;
    };
    selectionStart: {
        type: NumberConstructor;
        value: number;
    };
    selectionEnd: {
        type: NumberConstructor;
        value: number;
    };
    adjustPosition: {
        type: BooleanConstructor;
        value: boolean;
    };
    holdKeyboard: BooleanConstructor;
};
export declare const inputProps: {
    type: {
        type: StringConstructor;
        value: string;
    };
    password: BooleanConstructor;
    confirmType: StringConstructor;
    confirmHold: BooleanConstructor;
};
export declare const textareaProps: {
    autoHeight: BooleanConstructor;
    fixed: BooleanConstructor;
    showConfirmBar: {
        type: BooleanConstructor;
        value: boolean;
    };
    disableDefaultPadding: {
        type: BooleanConstructor;
        value: boolean;
    };
};
