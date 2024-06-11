/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SaturnTestDataCreateFormInputValues = {
    testScore?: number;
};
export declare type SaturnTestDataCreateFormValidationValues = {
    testScore?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SaturnTestDataCreateFormOverridesProps = {
    SaturnTestDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    testScore?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SaturnTestDataCreateFormProps = React.PropsWithChildren<{
    overrides?: SaturnTestDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SaturnTestDataCreateFormInputValues) => SaturnTestDataCreateFormInputValues;
    onSuccess?: (fields: SaturnTestDataCreateFormInputValues) => void;
    onError?: (fields: SaturnTestDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SaturnTestDataCreateFormInputValues) => SaturnTestDataCreateFormInputValues;
    onValidate?: SaturnTestDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function SaturnTestDataCreateForm(props: SaturnTestDataCreateFormProps): React.ReactElement;
